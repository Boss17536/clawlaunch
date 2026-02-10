const cron = require('node-cron');
const chalk = require('chalk');
const { loadConfig, checkLimit, checkDailyLimit, checkSchedulerDays, incrementCounter, incrementDailyCounter, resetSchedulerDays } = require('./config');
const { openPostInBrowser } = require('./browser');
const logger = require('./logger');

let scheduledTask = null;

/**
 * Parse time string to cron format
 * @param {string} timeStr - Time string like "9:00 AM" or "14:30"
 * @returns {Object} - { hour, minute }
 */
function parseTime(timeStr) {
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
      
      // Check scheduler days limit (5 days max, reconfigure on 6th day)
      const schedulerCheck = checkSchedulerDays();
      if (schedulerCheck.needsReconfigure) {
        console.log(chalk.red('❌ Scheduler period ended (5 days used)'));
        console.log(chalk.yellow('⚠️  You need to reconfigure the scheduler for the next 5 days'));
        console.log(chalk.gray('   Run the setup again to continue posting'));
        logger.warn('Scheduler reconfiguration needed');
        return;
      }
      
      // Check daily limit (1 post per day)
      const dailyLimit = checkDailyLimit();
      console.log(chalk.gray(`   Daily posts used: ${dailyLimit.current}/${dailyLimit.total}`));
      
      if (!dailyLimit.allowed) {
        console.log(chalk.red('❌ Daily limit reached (1 post per day)'));
        console.log(chalk.yellow('   Try again tomorrow!'));
        logger.warn('Daily limit reached');
        return;
      }
      
      // Check monthly limit
      const limit = checkLimit();
      console.log(chalk.gray(`   Monthly posts used: ${limit.current}/${limit.total}`));
      
      if (!limit.allowed) {
        console.log(chalk.red('❌ Free tier limit reached (20 posts/month)'));
        console.log(chalk.yellow('   Limit resets on the 1st of next month'));
        logger.warn('Monthly limit reached');
        return;
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
        
        // Increment daily counter ONLY on success
        if (incrementDailyCounter()) {
          const newDailyLimit = checkDailyLimit();
          console.log(chalk.gray(`   Daily posts remaining: ${newDailyLimit.remaining}/${newDailyLimit.total}`));
          logger.success('Daily counter incremented', { remaining: newDailyLimit.remaining });
        }
        
        // Increment monthly counter ONLY on success
        if (incrementCounter()) {
          const newLimit = checkLimit();
          console.log(chalk.gray(`   Monthly posts remaining: ${newLimit.remaining}/${newLimit.total}\n`));
          logger.success('Monthly counter incremented', { remaining: newLimit.remaining });
        }
      } else {
        console.log(chalk.red(`❌ Error: ${result.error}`));
        logger.error('Failed to open browser', { error: result.error });
        // Counters are NOT incremented on failure
      }
    }, {
      timezone: config.timezone || 'America/New_York'
    });
    
    console.log(chalk.green('✅ Scheduler started successfully!'));
    console.log(chalk.yellow('⚠️  Keep this terminal open for scheduler to run'));
    console.log(chalk.gray('   Press Ctrl+C to stop\n'));
    
    // Show scheduler days info
    const schedulerCheck = checkSchedulerDays();
    console.log(chalk.cyan(`📅 Scheduler Days: Day ${schedulerCheck.daysUsed + 1} of 5`));
    console.log(chalk.gray(`   ${5 - schedulerCheck.daysUsed} days remaining before reconfiguration needed\n`));
    
    // Show daily limit info
    const dailyLimit = checkDailyLimit();
    console.log(chalk.cyan(`📊 Daily Usage: ${dailyLimit.current}/${dailyLimit.total} post used today`));
    console.log(chalk.gray(`   ${dailyLimit.remaining} post remaining today\n`));
    
    // Show monthly limit info
    const limit = checkLimit();
    console.log(chalk.cyan(`📊 Monthly Usage: ${limit.current}/${limit.total} posts used`));
    console.log(chalk.gray(`   ${limit.remaining} posts remaining this month\n`));
    
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
  
  const limit = checkLimit();
  console.log(chalk.gray(`Posts used: ${limit.current}/${limit.total}`));
  
  if (!limit.allowed) {
    console.log(chalk.red('❌ Monthly limit reached'));
    return false;
  }
  
  // Show preview first
  const { getPostPreview } = require('./browser');
  const preview = getPostPreview(config.platform, config.topic, config);
  
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
