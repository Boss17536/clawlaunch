#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const { saveConfig, loadConfig, checkLimit, checkDailyLimit, checkSchedulerDays, deleteConfig, getConfigPath, resetSchedulerDays } = require('../src/config');
const { startScheduler, testPost } = require('../src/scheduler');
const { getAvailableTopics } = require('../src/templates');

/**
 * Display welcome banner
 */
function showBanner() {
  console.log(chalk.bold.cyan('\n╔════════════════════════════════════════╗'));
  console.log(chalk.bold.cyan('║       🚀 ClawLaunch CLI v1.0          ║'));
  console.log(chalk.bold.cyan('╚════════════════════════════════════════╝\n'));
  console.log(chalk.gray('Schedule social posts safely - you click "Post" manually\n'));
}

/**
 * Show installation tip for easier usage
 */
function showInstallTip() {
  const isGloballyInstalled = __dirname.includes('node_modules');
  
  if (!isGloballyInstalled) {
    console.log(chalk.yellow('\n💡 Tip: Install globally to use "clawlaunch" command anywhere:\n'));
    console.log(chalk.gray('   cd clawlaunch'));
    console.log(chalk.gray('   npm install'));
    console.log(chalk.gray('   npm link\n'));
    console.log(chalk.green('   Then just type: clawlaunch\n'));
  }
}

/**
 * Show help/usage information
 */
function showHelp() {
  console.log(chalk.cyan('\n📖 ClawLaunch Commands:\n'));
  console.log(chalk.white('  clawlaunch                    ') + chalk.gray('Start interactive setup'));
  console.log(chalk.white('  clawlaunch init               ') + chalk.gray('Run setup wizard'));
  console.log(chalk.white('  clawlaunch init --platform=X  ') + chalk.gray('Quick setup for specific platform'));
  console.log(chalk.white('  clawlaunch start              ') + chalk.gray('Start the scheduler'));
  console.log(chalk.white('  clawlaunch daemon             ') + chalk.gray('Run in background mode'));
  console.log(chalk.white('  clawlaunch test               ') + chalk.gray('Test post immediately'));
  console.log(chalk.white('  clawlaunch status             ') + chalk.gray('View current configuration and limits'));
  console.log(chalk.white('  clawlaunch help               ') + chalk.gray('Show this help message'));
  console.log(chalk.gray('\n💡 After initial setup, just run "clawlaunch" to start!\n'));
}

/**
 * Setup wizard - asks 5 questions
 */
async function setupWizard() {
  console.log(chalk.yellow('📝 Setup Wizard (7 questions)\n'));
  
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'platform',
      message: '1️⃣  Which platform do you want to use?',
      choices: [
        { name: '🐦 Twitter/X', value: 'twitter' },
        { name: '💼 LinkedIn', value: 'linkedin' }
      ]
    },
    {
      type: 'list',
      name: 'topic',
      message: '2️⃣  What topic will you post about?',
      choices: [
        { name: '🌟 Motivation - Inspirational quotes', value: 'motivation' },
        { name: '💪 Fitness - Health & workout tips', value: 'fitness' },
        { name: '💻 Tech - Technology insights', value: 'tech' },
        { name: '📈 Business - Entrepreneurship tips', value: 'business' },
        { name: '✨ Default - General tips', value: 'default' }
      ]
    },
    {
      type: 'list',
      name: 'postLength',
      message: '3️⃣  What post length do you prefer?',
      choices: [
        { name: '📝 Short - Quick, punchy posts (1-2 lines)', value: 'short' },
        { name: '📄 Long - Detailed, engaging posts (multiple paragraphs)', value: 'long' }
      ]
    },
    {
      type: 'list',
      name: 'postsPerWeek',
      message: '4️⃣  How many posts per week?',
      choices: [
        { name: '1 post/week (Monday)', value: 1 },
        { name: '2 posts/week (Mon, Thu)', value: 2 },
        { name: '3 posts/week (Mon, Wed, Fri)', value: 3 },
        { name: '4 posts/week (Mon, Tue, Thu, Fri)', value: 4 },
        { name: '5 posts/week (Mon-Fri)', value: 5 }
      ]
    },
    {
      type: 'input',
      name: 'postingTime',
      message: '5️⃣  What time should posts go out? (e.g., "9:00 AM" or "14:30")',
      default: '9:00 AM',
      validate: (input) => {
        const pattern = /^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i;
        if (pattern.test(input.trim())) {
          return true;
        }
        return 'Please use format "9:00 AM" or "14:30"';
      }
    },
    {
      type: 'list',
      name: 'timezone',
      message: '6️⃣  What is your timezone?',
      choices: [
        { name: '🇺🇸 Eastern (New York)', value: 'America/New_York' },
        { name: '🇺🇸 Central (Chicago)', value: 'America/Chicago' },
        { name: '🇺🇸 Mountain (Denver)', value: 'America/Denver' },
        { name: '🇺🇸 Pacific (Los Angeles)', value: 'America/Los_Angeles' },
        { name: '🇬🇧 London (GMT)', value: 'Europe/London' },
        { name: '🇪🇺 Paris (CET)', value: 'Europe/Paris' },
        { name: '🇮🇳 India (IST)', value: 'Asia/Kolkata' },
        { name: '🇯🇵 Tokyo (JST)', value: 'Asia/Tokyo' },
        { name: '🇦🇺 Sydney (AEDT)', value: 'Australia/Sydney' }
      ]
    },
    {
      type: 'confirm',
      name: 'enableAIImages',
      message: '7️⃣  Do you want to add AI-generated images to your posts?',
      default: false
    }
  ]);

  // If AI images are enabled, ask for provider and API key
  if (answers.enableAIImages) {
    const imageSettings = await inquirer.prompt([
      {
        type: 'list',
        name: 'aiImageProvider',
        message: '   🎨 Which AI image provider?',
        choices: [
          { name: '🆓 Pollinations.ai (Free - No API key needed)', value: 'pollinations' },
          { name: '🤖 OpenAI DALL-E (Requires API key)', value: 'openai' },
          { name: '🎨 Stability AI (Requires API key)', value: 'stability' },
          { name: '🔄 Replicate (Requires API key)', value: 'replicate' }
        ],
        default: 'pollinations'
      }
    ]);

    answers.aiImageProvider = imageSettings.aiImageProvider;

    // Ask for API key if not using Pollinations
    if (imageSettings.aiImageProvider !== 'pollinations') {
      const apiKeyPrompt = await inquirer.prompt([
        {
          type: 'input',
          name: 'aiImageApiKey',
          message: `   🔑 Enter your ${imageSettings.aiImageProvider.toUpperCase()} API key (or leave blank to skip):`,
          default: ''
        }
      ]);

      answers.aiImageApiKey = apiKeyPrompt.aiImageApiKey;
      
      // If they skip the API key, disable AI images
      if (!apiKeyPrompt.aiImageApiKey) {
        console.log(chalk.yellow('   ⚠️  No API key provided. AI images will be disabled.'));
        answers.enableAIImages = false;
      }
    } else {
      answers.aiImageApiKey = ''; // Pollinations doesn't need API key
    }
  } else {
    answers.aiImageProvider = 'pollinations';
    answers.aiImageApiKey = '';
  }
  
  return answers;
}

/**
 * Show main menu
 */
async function showMainMenu() {
  const config = loadConfig();
  
  const choices = [
    { name: '▶️  Start Scheduler', value: 'start' },
    { name: '🧪 Test Post Now', value: 'test' },
    { name: '📊 View Status', value: 'status' },
    { name: '🔄 Reconfigure', value: 'reconfigure' },
    { name: '❌ Exit', value: 'exit' }
  ];
  
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices
    }
  ]);
  
  return action;
}

/**
 * Show current status
 */
function showStatus() {
  const config = loadConfig();
  
  if (!config) {
    console.log(chalk.yellow('\n⚠️  No configuration found. Please run setup.\n'));
    return;
  }
  
  const limit = checkLimit();
  const dailyLimit = checkDailyLimit();
  const schedulerCheck = checkSchedulerDays();
  
  console.log(chalk.cyan('\n📊 Current Status:\n'));
  console.log(chalk.gray(`   Platform: ${config.platform}`));
  console.log(chalk.gray(`   Topic: ${config.topic}`));
  console.log(chalk.gray(`   Post Length: ${config.postLength || 'short'}`));
  console.log(chalk.gray(`   Schedule: ${config.postsPerWeek} posts/week at ${config.postingTime}`));
  console.log(chalk.gray(`   Timezone: ${config.timezone}`));
  console.log(chalk.gray(`   AI Images: ${config.enableAIImages ? 'Enabled (' + (config.aiImageProvider || 'pollinations') + ')' : 'Disabled'}`));
  console.log(chalk.gray(`   Config: ${getConfigPath()}`));
  console.log('');
  console.log(chalk.cyan(`   📅 Scheduler Days: Day ${schedulerCheck.daysUsed + 1} of 5`));
  if (schedulerCheck.needsReconfigure) {
    console.log(chalk.red('   ⚠️  Scheduler reconfiguration needed!'));
  } else {
    console.log(chalk.gray(`   ${5 - schedulerCheck.daysUsed} days remaining`));
  }
  console.log('');
  console.log(chalk.cyan(`   📊 Daily Usage: ${dailyLimit.current}/${dailyLimit.total} post today`));
  console.log(chalk.gray(`   ${dailyLimit.remaining} post remaining today`));
  console.log('');
  console.log(chalk.cyan(`   📊 Monthly Usage: ${limit.current}/${limit.total} posts`));
  console.log(chalk.gray(`   ${limit.remaining} posts remaining`));
  
  if (!limit.allowed) {
    console.log(chalk.red('\n   ⚠️  Monthly limit reached!'));
    console.log(chalk.yellow('   Resets on the 1st of next month'));
  }
  
  console.log('');
}

/**
 * Main CLI entry point
 */
async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const command = args[0] || '';
  
  // Handle help command
  if (command === 'help' || command === '--help' || command === '-h') {
    showBanner();
    showHelp();
    return;
  }
  
  // Handle init command
  if (command === 'init') {
    showBanner();
    console.log(chalk.yellow('📝 Running setup wizard...\n'));
    
    // Check for platform flag
    const platformFlag = args.find(arg => arg.startsWith('--platform='));
    let presetPlatform = null;
    if (platformFlag) {
      presetPlatform = platformFlag.split('=')[1].toLowerCase();
      if (presetPlatform === 'x') presetPlatform = 'twitter';
    }
    
    const answers = await setupWizard();
    if (presetPlatform) {
      answers.platform = presetPlatform;
    }
    
    console.log(chalk.cyan('\n💾 Saving configuration...\n'));
    saveConfig(answers);
    
    console.log(chalk.green('✅ Setup complete!\n'));
    console.log(chalk.gray('Run "clawlaunch start" to begin scheduling\n'));
    return;
  }
  
  // Handle daemon command
  if (command === 'daemon') {
    // Delegate to daemon.js
    require('./daemon.js');
    return;
  }
  
  // Handle status command
  if (command === 'status') {
    showBanner();
    showStatus();
    return;
  }
  
  // Handle test command
  if (command === 'test') {
    showBanner();
    await testPost();
    return;
  }
  
  // Handle start command
  if (command === 'start') {
    showBanner();
    const config = loadConfig();
    if (!config) {
      console.log(chalk.red('❌ No configuration found.\n'));
      console.log(chalk.yellow('Run "clawlaunch init" to set up first.\n'));
      return;
    }
    
    // Check if scheduler needs reconfiguration
    const schedulerCheck = checkSchedulerDays();
    if (schedulerCheck.needsReconfigure) {
      console.log(chalk.red('\n⚠️  Your 5-day scheduler period has ended!'));
      console.log(chalk.yellow('You need to reconfigure the scheduler to continue.\n'));
      
      const { reconfigureNow } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'reconfigureNow',
          message: 'Reset scheduler for another 5 days?',
          default: true
        }
      ]);
      
      if (reconfigureNow) {
        resetSchedulerDays();
        console.log(chalk.green('✅ Scheduler reset! You can now use it for 5 more days.\n'));
      } else {
        console.log(chalk.yellow('⚠️  Cannot start scheduler without reconfiguration.\n'));
        process.exit(0);
      }
    }
    
    startScheduler(config);
    process.stdin.resume();
    return;
  }
  
  showBanner();
  showInstallTip();
  
  let config = loadConfig();
  
  // If no config exists, run setup wizard
  if (!config) {
    console.log(chalk.yellow('👋 First time setup - let\'s get you started!\n'));
    console.log(chalk.gray('💡 Tip: Use "clawlaunch help" to see all available commands\n'));
    
    const answers = await setupWizard();
    
    console.log(chalk.cyan('\n💾 Saving configuration...\n'));
    saveConfig(answers);
    
    console.log(chalk.green('✅ Setup complete!\n'));
    
    // Ask if they want to start scheduler
    const { startNow } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'startNow',
        message: 'Start the scheduler now?',
        default: true
      }
    ]);
    
    if (startNow) {
      const newConfig = loadConfig();
      startScheduler(newConfig);
      
      // Keep process alive
      process.stdin.resume();
    } else {
      console.log(chalk.gray('\nRun "clawlaunch start" anytime to start the scheduler.\n'));
    }
    
    return;
  }
  
  // Config exists - show menu
  let running = true;
  
  while (running) {
    // Check if scheduler needs reconfiguration before showing menu
    const schedulerCheck = checkSchedulerDays();
    if (schedulerCheck.needsReconfigure) {
      console.log(chalk.red('\n⚠️  Your 5-day scheduler period has ended!'));
      console.log(chalk.yellow('You need to reconfigure the scheduler to continue.\n'));
      
      const { reconfigureNow } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'reconfigureNow',
          message: 'Reset scheduler for another 5 days?',
          default: true
        }
      ]);
      
      if (reconfigureNow) {
        resetSchedulerDays();
        config = loadConfig(); // Reload after reset
        console.log(chalk.green('✅ Scheduler reset! You can now use it for 5 more days.\n'));
      } else {
        console.log(chalk.yellow('⚠️  Cannot start scheduler without reconfiguration.\n'));
        process.exit(0);
      }
    }
    
    const action = await showMainMenu();
    
    switch (action) {
      case 'start':
        console.log('');
        startScheduler(config);
        // Keep process alive
        process.stdin.resume();
        running = false; // Exit menu loop, keep scheduler running
        break;
        
      case 'test':
        console.log('');
        await testPost();
        console.log(chalk.gray('\nPress Enter to continue...'));
        await inquirer.prompt([{ type: 'input', name: 'continue', message: '' }]);
        break;
        
      case 'status':
        showStatus();
        console.log(chalk.gray('Press Enter to continue...'));
        await inquirer.prompt([{ type: 'input', name: 'continue', message: '' }]);
        break;
        
      case 'reconfigure':
        const { confirm } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'confirm',
            message: 'This will delete your current config. Continue?',
            default: false
          }
        ]);
        
        if (confirm) {
          deleteConfig();
          console.log(chalk.yellow('\n🔄 Configuration deleted. Restarting setup...\n'));
          const answers = await setupWizard();
          config = saveConfig(answers); // Update local config variable
          console.log(chalk.green('\n✅ Reconfiguration complete!\n'));
        }
        break;
        
      case 'exit':
        console.log(chalk.gray('\n👋 Goodbye!\n'));
        running = false;
        process.exit(0);
        break;
    }
  }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n\n⏸️  Scheduler stopped. Goodbye!\n'));
  process.exit(0);
});

// Run the CLI
main().catch(error => {
  console.error(chalk.red(`\n❌ Error: ${error.message}\n`));
  process.exit(1);
});
