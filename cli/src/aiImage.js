const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const IMAGE_CACHE_DIR = path.join(os.homedir(), '.social-poster', 'images');

/**
 * Ensure image cache directory exists
 */
function ensureImageCacheDir() {
  if (!fs.existsSync(IMAGE_CACHE_DIR)) {
    fs.mkdirSync(IMAGE_CACHE_DIR, { recursive: true });
  }
}

/**
 * Download and save image to local cache
 * @param {string} imageUrl - URL of the image to download
 * @returns {Promise<string>} - Local file path
 */
async function downloadAndCacheImage(imageUrl) {
  if (!imageUrl) return null;
  
  ensureImageCacheDir();
  
  const timestamp = Date.now();
  const filename = `ai_image_${timestamp}.png`;
  const localPath = path.join(IMAGE_CACHE_DIR, filename);
  
  return new Promise((resolve, reject) => {
    const protocol = imageUrl.startsWith('https') ? https : http;
    
    protocol.get(imageUrl, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(localPath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(localPath);
      });
      
      fileStream.on('error', (err) => {
        fs.unlinkSync(localPath);
        reject(err);
      });
    }).on('error', reject);
  });
}

/**
 * Save base64 image to file
 * @param {string} base64Data - Base64 encoded image
 * @param {string} prefix - Filename prefix
 * @returns {string} - Local file path
 */
function saveBase64Image(base64Data, prefix = 'ai_image') {
  ensureImageCacheDir();
  
  const timestamp = Date.now();
  const filename = `${prefix}_${timestamp}.png`;
  const localPath = path.join(IMAGE_CACHE_DIR, filename);
  
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(localPath, buffer);
  
  return localPath;
}

/**
 * Generate an AI image using various APIs with 1-minute timeout
 * @param {string} prompt - The image generation prompt
 * @param {Object} config - Configuration with apiKey and apiProvider
 * @returns {Promise<Object|null>} - { url: string, localPath: string, timedOut: boolean } or null
 */
async function generateAIImage(prompt, config) {
  // If images disabled, return null
  if (!config.enableAIImages) {
    return null;
  }

  try {
    const provider = config.aiImageProvider || 'pollinations';
    let imageUrl = null;
    let localPath = null;
    
    // Create timeout promise (60 seconds = 1 minute)
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('TIMEOUT')), 60000);
    });
    
    // Create image generation promise
    const imageGenerationPromise = (async () => {
      // Try primary provider
      try {
        switch (provider.toLowerCase()) {
          case 'pollinations':
            imageUrl = generatePollinationsImage(prompt);
            break;
          
          case 'openai':
            if (config.aiImageApiKey) {
              imageUrl = await generateOpenAIImage(prompt, config.aiImageApiKey);
            }
            break;
          
          case 'stability':
            if (config.aiImageApiKey) {
              const result = await generateStabilityImage(prompt, config.aiImageApiKey);
              if (result) {
                localPath = result; // Stability returns local path directly
                imageUrl = result;
              }
            }
            break;
          
          case 'replicate':
            if (config.aiImageApiKey) {
              imageUrl = await generateReplicateImage(prompt, config.aiImageApiKey);
            }
            break;
          
          default:
            console.warn(`Unknown AI image provider: ${provider}, using Pollinations`);
            imageUrl = generatePollinationsImage(prompt);
        }
      } catch (providerError) {
        console.warn(`${provider} failed: ${providerError.message}`);
        imageUrl = null;
      }
      
      // Fallback to Pollinations if primary provider failed
      if (!imageUrl && provider !== 'pollinations') {
        console.log('Falling back to Pollinations.ai...');
        imageUrl = generatePollinationsImage(prompt);
      }
      
      // Download and cache the image if we have a URL
      if (imageUrl && !localPath) {
        try {
          localPath = await downloadAndCacheImage(imageUrl);
        } catch (downloadError) {
          console.warn('Failed to cache image:', downloadError.message);
        }
      }
      
      return imageUrl ? { url: imageUrl, localPath } : null;
    })();
    
    // Race between timeout and image generation
    try {
      const result = await Promise.race([imageGenerationPromise, timeoutPromise]);
      return result;
    } catch (error) {
      if (error.message === 'TIMEOUT') {
        // Return timeout indicator
        return { timedOut: true, url: null, localPath: null };
      }
      throw error;
    }
  } catch (error) {
    console.error('AI Image generation error:', error.message);
    // Final fallback to Pollinations
    try {
      const imageUrl = generatePollinationsImage(prompt);
      return { url: imageUrl, localPath: null };
    } catch {
      return null;
    }
  }
}

/**
 * Generate image using Pollinations.ai (FREE - no API key needed)
 * @param {string} prompt - Image prompt
 * @returns {string} - Image URL
 */
function generatePollinationsImage(prompt) {
  // Pollinations.ai provides free AI image generation
  const encodedPrompt = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;
}

/**
 * Generate image using OpenAI DALL-E
 * @param {string} prompt - Image prompt
 * @param {string} apiKey - OpenAI API key
 * @returns {Promise<string|null>} - Image URL or null
 */
async function generateOpenAIImage(prompt, apiKey) {
  const options = {
    hostname: 'api.openai.com',
    path: '/v1/images/generations',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  };

  const postData = JSON.stringify({
    model: 'dall-e-3',
    prompt: prompt,
    n: 1,
    size: '1024x1024'
  });

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.data && response.data[0] && response.data[0].url) {
            resolve(response.data[0].url);
          } else {
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Generate image using Stability AI
 * @param {string} prompt - Image prompt
 * @param {string} apiKey - Stability AI API key
 * @returns {Promise<string|null>} - Local file path or null
 */
async function generateStabilityImage(prompt, apiKey) {
  const options = {
    hostname: 'api.stability.ai',
    path: '/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json'
    }
  };

  const postData = JSON.stringify({
    text_prompts: [{ text: prompt }],
    cfg_scale: 7,
    height: 1024,
    width: 1024,
    steps: 30,
    samples: 1
  });

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.artifacts && response.artifacts[0] && response.artifacts[0].base64) {
            // Save base64 image to file
            const localPath = saveBase64Image(response.artifacts[0].base64, 'stability');
            resolve(localPath);
          } else {
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Poll Replicate for prediction result
 * @param {string} predictionId - The prediction ID
 * @param {string} apiKey - Replicate API key
 * @returns {Promise<string|null>} - Image URL or null
 */
async function pollReplicatePrediction(predictionId, apiKey, maxAttempts = 30) {
  const options = {
    hostname: 'api.replicate.com',
    path: `/v1/predictions/${predictionId}`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${apiKey}`
    }
  };

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
    
    const result = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(error);
          }
        });
      });

      req.on('error', reject);
      req.end();
    });

    if (result.status === 'succeeded' && result.output && result.output[0]) {
      return result.output[0];
    } else if (result.status === 'failed' || result.status === 'canceled') {
      return null;
    }
    // Continue polling if status is 'starting' or 'processing'
  }
  
  return null; // Timeout
}

/**
 * Generate image using Replicate
 * @param {string} prompt - Image prompt
 * @param {string} apiKey - Replicate API key
 * @returns {Promise<string|null>} - Image URL or null
 */
async function generateReplicateImage(prompt, apiKey) {
  const options = {
    hostname: 'api.replicate.com',
    path: '/v1/predictions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${apiKey}`
    }
  };

  const postData = JSON.stringify({
    version: 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
    input: {
      prompt: prompt,
      width: 1024,
      height: 1024
    }
  });

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', async () => {
        try {
          const response = JSON.parse(data);
          if (response.id) {
            // Poll for the result
            const imageUrl = await pollReplicatePrediction(response.id, apiKey);
            resolve(imageUrl);
          } else {
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Get image prompt based on post content and topic
 * @param {string} postText - The post text
 * @param {string} topic - The topic
 * @returns {string} - Image generation prompt
 */
function getImagePrompt(postText, topic) {
  const prompts = {
    motivation: 'Inspiring abstract background with vibrant colors, motivational energy, uplifting atmosphere, professional quality, modern design',
    fitness: 'Dynamic fitness scene, athletic achievement, healthy lifestyle, energetic colors, professional photography',
    tech: 'Futuristic technology concept, digital innovation, clean modern design, tech aesthetic, professional quality',
    business: 'Professional business setting, success and growth concept, corporate modern design, premium quality',
    default: 'Clean abstract background, professional design, vibrant colors, modern aesthetic, high quality'
  };

  return prompts[topic] || prompts.default;
}

module.exports = {
  generateAIImage,
  getImagePrompt,
  IMAGE_CACHE_DIR
};
