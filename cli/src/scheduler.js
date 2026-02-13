const cron = require('node-cron');
const chalk = require('chalk');
const { loadConfig, checkLimit, checkDailyLimit, checkSchedulerDays, incrementCounter, incrementDailyCounter, resetSchedulerDays } = require('./config');
const { openPostInBrowser } = require('./browser');
const logger = require('./logger');
const { canPost, recordPost, getUpgradeInfo, getUsageStats, isPro } = require('./license');

let scheduledTask = null;

/**
 * Parse time string to cron format
 * @param {string} timeStr - Time string like "9:00 AM" or "14:30"
 * @returns {Object} - { hour, minute }
 */
function parseTime(timeStr) {
  if (!timeStr) {
    throw new Error('Posting time is missing in configuration');
  }
  const str = timeStr.trim().toUpperCase();
  
  // Handle AM/PM format
  const ampmMatch = str.match(/(\d+):(\d+)\s*(AM|PM)/);
  if (ampmMatch) {
    let hour = parseInt(ampmMatch[1]);
    const minute = parseInt(ampmMatch[2]);
    const period = ampmMatch[3];
    
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    
    // Validate ranges
    if (hour < 0 || hour > 23) {
      throw new Error('Hour must be between 0 and 23');
    }
    if (minute < 0 || minute > 59) {
      throw new Error('Minutes must be between 0 and 59');
    }
    
    return { hour, minute };
  }
  
  // Handle 24-hour format
  const twentyFourMatch = str.match(/^(\d+):(\d+)$/);
  if (twentyFourMatch) {
    const hour = parseInt(twentyFourMatch[1]);
    const minute = parseInt(twentyFourMatch[2]);
    
    // Validate ranges
    if (isNaN(hour) || hour < 0 || hour > 23) {
      throw new Error('Hour must be between 0 and 23');
    }
    if (isNaN(minute) || minute < 0 || minute > 59) {
      throw new Error('Minutes must be between 0 and 59');
    }
    
    return { hour, minute };
  }
  
  throw new Error('Invalid time format. Use "9:00 AM" or "14:30"');
}

/**
 * Calculate which days to post based on posts per week
 * @param {number} postsPerWeek - Number of posts per week (1-7)
 * @returns {string} - Cron day-of-week pattern
 */
function calculatePostDays(postsPerWeek) {
  // Days: 0=Sunday, 1=Monday, ..., 6=Saturday
  const dayPatterns = {
    1: '1',        // Monday only
    2: '1,4',      // Monday, Thursday
    3: '1,3,5',    // Monday, Wednesday, Friday
    4: '1,2,4,5',  // Monday, Tuesday, Thursday, Friday
    5: '1,2,3,4,5', // Monday-Friday
    6: '0,1,2,3,4,5', // Sunday-Friday
    7: '*'         // Every day (0-6)
  };
  
  return dayPatterns[postsPerWeek] || '1,3,5'; // Default to 3 days
}

/**
 * Start the scheduler
 * @param {Object} config - User configuration
 */
function startScheduler(config) {
  if (!config) {
    console.error(chalk.red('❌ No configuration found. Run setup first.'));
    return false;
  }
  
  const { platform, topic, postsPerWeek, postingTime } = config;
  
  try {
    const { hour, minute } = parseTime(postingTime);
    const days = calculatePostDays(postsPerWeek);
    
    // Cron format: minute hour day-of-month month day-of-week
    const cronExpression = `${minute} ${hour} * * ${days}`;
    
    console.log(chalk.cyan('⏰ Scheduler Configuration:'));
    console.log(chalk.gray(`   Platform: ${platform}`));
    console.log(chalk.gray(`   Topic: ${topic}`));
    console.log(chalk.gray(`   Schedule: ${postsPerWeek} posts/week at ${postingTime}`));
    console.log(chalk.gray(`   Cron: ${cronExpression}`));
    console.log('');
    
    // Validate cron expression
    if (!cron.validate(cronExpression)) {
      throw new Error('Invalid cron expression generated');
    }
    
    // Schedule the task
    scheduledTask = cron.schedule(cronExpression, async () => {
      console.log(chalk.yellow('\n⏰ Scheduled post time reached!'));
      logger.info('Scheduled post triggered', { platform, topic });
      
      // Check license and limits
      const postCheck = canPost();
      
      if (!postCheck.allowed) {
        const upgradeInfo = getUpgradeInfo();
        const stats = postCheck.stats;
        
        console.log(chalk.red('\n❌ Limit Reached!'));
        console.log(chalk.yellow(`   ${postCheck.message}`));
        console.log('');
        console.log(chalk.cyan('📊 Your Usage:'));
        console.log(chalk.gray(`   Today: ${stats.dailyCount}/1 post`));
        console.log(chalk.gray(`   This Month: ${stats.monthlyCount}/10 posts`));
        console.log(chalk.gray(`   Total: ${stats.totalPosts} posts`));
        console.log('');
        console.log(chalk.bold.green('🚀 Upgrade to ClawLaunch Pro for:'));
        upgradeInfo.features.pro.forEach(feature => {
          console.log(chalk.green(`   ✅ ${feature}`));
        });
        console.log('');
        console.log(chalk.bold.yellow('📞 Contact us to upgrade:'));
        console.log(chalk.white(`   📱 WhatsApp: ${upgradeInfo.contact.whatsapp}`));
        console.log(chalk.white(`   📧 Email: ${upgradeInfo.contact.email}`));
        console.log(chalk.cyan(`   🔗 Quick WhatsApp: ${upgradeInfo.contact.whatsappLink}`));
        console.log('');
        logger.warn('Post limit reached', { reason: postCheck.reason, stats });
        return;
      }
      
      // If PRO, show status
      if (postCheck.isPro) {
        console.log(chalk.green('✅ PRO License Active - No limits!'));
      } else {
        console.log(chalk.gray(`   Daily posts used: ${postCheck.stats.dailyCount}/1`));
        console.log(chalk.gray(`   Monthly posts used: ${postCheck.stats.monthlyCount}/10`));
      }
      
      // Open browser with post
      console.log(chalk.cyan('🌐 Opening browser with pre-filled post...'));
      const result = await openPostInBrowser(platform, topic, config);
      
      if (result.success) {
        console.log(chalk.green('✅ Browser opened successfully!'));
        console.log(chalk.gray(`   Post: "${result.postText}"`));
        if (result.imageUrl) {
          console.log(chalk.gray(`   Image URL: ${result.imageUrl}`));
          if (result.localImagePath) {
            console.log(chalk.gray(`   Local Image: ${result.localImagePath}`));
          }
          console.log(chalk.yellow('   💡 Use the local image file or URL to attach to your post'));
        }
        console.log(chalk.bold.yellow('\n👆 Click "Post" in the browser to publish'));
        
        // Record post in license system
        if (recordPost()) {
          const stats = getUsageStats();
          if (!isPro()) {
            console.log(chalk.gray(`   Daily posts remaining: ${1 - stats.dailyCount}/1`));
            console.log(chalk.gray(`   Monthly posts remaining: ${10 - stats.monthlyCount}/10\n`));
          }
          logger.success('Post recorded', { stats });
        }
      } else {
        console.log(chalk.red(`❌ Error: ${result.error}`));
        logger.error('Failed to open browser', { error: result.error });
      }
    }, {
      timezone: config.timezone || 'America/New_York'
    });
    
    console.log(chalk.green('✅ Scheduler started successfully!'));
    console.log(chalk.yellow('⚠️  Keep this terminal open for scheduler to run'));
    console.log(chalk.gray('   Press Ctrl+C to stop\n'));
    
    // Show license status
    if (isPro()) {
      console.log(chalk.green('💎 PRO License Active - Unlimited Posts!\n'));
    } else {
      const stats = getUsageStats();
      console.log(chalk.cyan('📊 FREE Tier Usage:'));
      console.log(chalk.gray(`   Today: ${stats.dailyCount}/1 post used`));
      console.log(chalk.gray(`   This Month: ${stats.monthlyCount}/10 posts used`));
      console.log(chalk.gray(`   Remaining Today: ${1 - stats.dailyCount}`));
      console.log(chalk.gray(`   Remaining This Month: ${10 - stats.monthlyCount}\n`));
      
      if (stats.monthlyCount >= 8 || stats.dailyCount >= 1) {
        const upgradeInfo = getUpgradeInfo();
        console.log(chalk.yellow('⚠️  Getting close to your limit!'));
        console.log(chalk.cyan('   Upgrade to Pro for unlimited posts:'));
        console.log(chalk.white(`   📱 WhatsApp: ${upgradeInfo.contact.whatsapp}`));
        console.log(chalk.white(`   📧 Email: ${upgradeInfo.contact.email}\n`));
      }
    }
    
    return true;
  } catch (error) {
    console.error(chalk.red(`❌ Scheduler error: ${error.message}`));
    return false;
  }
}

/**
 * Stop the scheduler
 */
function stopScheduler() {
  if (scheduledTask) {
    scheduledTask.stop();
    scheduledTask = null;
    console.log(chalk.yellow('⏸️  Scheduler stopped'));
    return true;
  }
  return false;
}

/**
 * Test post immediately (for testing purposes)
 */
async function testPost() {
  const config = loadConfig();
  
  if (!config) {
    console.log(chalk.red('❌ No configuration found'));
    return false;
  }
  
  console.log(chalk.cyan('🧪 Testing post (opens browser immediately)...\n'));
  
  // Check license
  const postCheck = canPost();
  
  if (!postCheck.allowed) {
    const upgradeInfo = getUpgradeInfo();
    const stats = postCheck.stats;
    
    console.log(chalk.red('❌ Limit Reached!'));
    console.log(chalk.yellow(`   ${postCheck.message}\n`));
    console.log(chalk.cyan('📊 Your Usage:'));
    console.log(chalk.gray(`   Today: ${stats.dailyCount}/1 post`));
    console.log(chalk.gray(`   This Month: ${stats.monthlyCount}/10 posts\n`));
    console.log(chalk.bold.yellow('📞 Contact us to upgrade to Pro:'));
    console.log(chalk.white(`   📱 WhatsApp: ${upgradeInfo.contact.whatsapp}`));
    console.log(chalk.white(`   📧 Email: ${upgradeInfo.contact.email}`));
    console.log(chalk.cyan(`   🔗 ${upgradeInfo.contact.whatsappLink}\n`));
    return false;
  }
  
  if (!postCheck.isPro) {
    const stats = postCheck.stats;
    console.log(chalk.gray(`Posts used today: ${stats.dailyCount}/1`));
    console.log(chalk.gray(`Posts used this month: ${stats.monthlyCount}/10\n`));
  }
  
  // Show preview first
  const { getPostPreview } = require('./browser');
  const preview = await getPostPreview(config.platform, config.topic, config);
  
  console.log(chalk.cyan('📋 Post Preview:'));
  console.log(chalk.white(`   Platform: ${preview.platform}`));
  console.log(chalk.white(`   Topic: ${preview.topic}`));
  console.log(chalk.white(`   Length: ${preview.postLength}`));
  console.log(chalk.white(`   Text: "${preview.postText}"`));
  console.log('');
  
  const result = await openPostInBrowser(config.platform, config.topic, config);
  
  if (result.success) {
    console.log(chalk.green('✅ Browser opened!'));
    console.log(chalk.gray(`Post: "${result.postText}"`));
    if (result.imageUrl) {
      console.log(chalk.gray(`Image URL: ${result.imageUrl}`));
      if (result.localImagePath) {
        console.log(chalk.gray(`Local Image: ${result.localImagePath}`));
      }
      console.log(chalk.yellow('💡 Use the local image file or URL to attach to your post'));
    }
    console.log(chalk.yellow('\n👆 Click "Post" to publish (this is a test)\n'));
    
    // Ask if they want to increment counter
    console.log(chalk.gray('Note: Test posts do not increment the counter'));
    return true;
  } else {
    console.log(chalk.red(`❌ Error: ${result.error}`));
    return false;
  }
}

module.exports = {
  startScheduler,
  stopScheduler,
  testPost,
  parseTime,
  calculatePostDays
};
