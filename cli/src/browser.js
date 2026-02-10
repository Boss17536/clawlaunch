const open = require('open');
const ora = require('ora');
const chalk = require('chalk');
const { getRandomTemplate } = require('./templates');
const { generateAIImage, getImagePrompt } = require('./aiImage');
const logger = require('./logger');

// URL character limits for different platforms
const URL_LIMITS = {
  twitter: 4096,  // Twitter URL limit
  linkedin: 2048  // LinkedIn URL limit (conservative estimate)
};

/**
 * Truncate text to fit within URL limit
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum URL length
 * @returns {string} - Truncated text
 */
function truncateForUrl(text, maxLength) {
  const baseUrlLength = 100; // Estimate for base URL and encoding overhead
  const availableLength = maxLength - baseUrlLength;
  
  if (encodeURIComponent(text).length <= availableLength) {
    return text;
  }
  
  // Truncate text to fit
  let truncated = text;
  while (encodeURIComponent(truncated + '...').length > availableLength && truncated.length > 0) {
    truncated = truncated.slice(0, -1);
  }
  
  return truncated + '...';
}

/**
 * Platform-specific URL builders
 */
const platformUrls = {
  twitter: (text, imageUrl) => {
    const truncatedText = truncateForUrl(text, URL_LIMITS.twitter);
    const encodedText = encodeURIComponent(truncatedText);
    let url = `https://twitter.com/intent/tweet?text=${encodedText}`;
    
    // Validate final URL length
    if (url.length > URL_LIMITS.twitter) {
      console.warn(`Twitter URL exceeds limit (${url.length} > ${URL_LIMITS.twitter})`);
    }
    
    return url;
  },
  
  linkedin: (text, imageUrl) => {
    const truncatedText = truncateForUrl(text, URL_LIMITS.linkedin);
    const encodedText = encodeURIComponent(truncatedText);
    const url = `https://www.linkedin.com/share/update/?text=${encodedText}`;
    
    // Validate final URL length
    if (url.length > URL_LIMITS.linkedin) {
      console.warn(`LinkedIn URL exceeds limit (${url.length} > ${URL_LIMITS.linkedin})`);
    }
    
    return url;
  }
};

/**
 * Open browser with pre-filled post content
 * @param {string} platform - Platform name (twitter or linkedin)
 * @param {string} topic - Topic for template selection
 * @param {Object} config - User configuration (includes postLength, AI image settings)
 * @returns {Promise<Object>} - Result object with success status
 */
async function openPostInBrowser(platform, topic, config = {}) {
  let imageResult = null;
  const spinner = ora();
  
  try {
    // Get random template for the topic with specified length
    spinner.start('Generating post content...');
    const postLength = config.postLength || 'short';
    const postText = getRandomTemplate(topic, postLength, config);
    spinner.succeed('Post content generated');
    
    // Show preview
    console.log(chalk.cyan('\n📋 Post Preview:'));
    console.log(chalk.white('─'.repeat(60)));
    console.log(chalk.white(postText));
    console.log(chalk.white('─'.repeat(60) + '\n'));
    
    // Generate AI image if enabled
    if (config.enableAIImages) {
      spinner.start('Generating AI image...');
      const imagePrompt = getImagePrompt(postText, topic);
      imageResult = await generateAIImage(imagePrompt, config);
      
      if (imageResult) {
        // Check if timeout occurred
        if (imageResult.timedOut) {
          spinner.fail('AI image generation timed out (>1 minute)');
          console.log(chalk.yellow('\n⚠️  You need to buy paid Clawlaunch, that\'s just 1-2 dollar'));
          console.log(chalk.gray('   Faster image generation and premium features available!\n'));
        } else {
          spinner.succeed('AI image generated');
          if (imageResult.localPath) {
            console.log(chalk.green(`   📁 Saved to: ${imageResult.localPath}`));
          }
          if (imageResult.url) {
            console.log(chalk.gray(`   🔗 URL: ${imageResult.url}`));
          }
        }
      } else {
        spinner.warn('AI image generation skipped');
      }
    }
    
    // Build platform-specific URL
    const urlBuilder = platformUrls[platform.toLowerCase()];
    if (!urlBuilder) {
      throw new Error(`Unsupported platform: ${platform}`);
    }
    
    const url = urlBuilder(postText, imageResult ? imageResult.url : null);
    
    // Open in default browser
    spinner.start('Opening browser...');
    await open(url);
    spinner.succeed('Browser opened');
    
    // Log successful post attempt
    logger.logPost(
      platform, 
      topic, 
      postText, 
      imageResult ? imageResult.url : null, 
      true
    );
    
    return {
      success: true,
      platform,
      postText,
      imageUrl: imageResult ? imageResult.url : null,
      localImagePath: imageResult ? imageResult.localPath : null,
      message: 'Browser opened successfully'
    };
  } catch (error) {
    spinner.fail('Failed to open browser');
    
    // Log failed post attempt
    logger.logPost(platform, topic, '', null, false, error.message);
    
    return {
      success: false,
      platform,
      error: error.message,
      message: 'Failed to open browser'
    };
  }
}

/**
 * Get preview of what will be posted (for testing)
 * @param {string} platform - Platform name
 * @param {string} topic - Topic for template selection
 * @param {Object} config - User configuration
 * @returns {Object} - Preview object
 */
function getPostPreview(platform, topic, config = {}) {
  const postLength = config.postLength || 'short';
  const postText = getRandomTemplate(topic, postLength);
  const urlBuilder = platformUrls[platform.toLowerCase()];
  
  if (!urlBuilder) {
    return { error: `Unsupported platform: ${platform}` };
  }
  
  return {
    platform,
    topic,
    postText,
    postLength,
    enableAIImages: config.enableAIImages || false,
    url: urlBuilder(postText, null)
  };
}

module.exports = {
  openPostInBrowser,
  getPostPreview
};
