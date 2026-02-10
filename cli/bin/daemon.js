#!/usr/bin/env node

/**
 * Daemon mode - Run scheduler in background without CLI interaction
 * Compatible with pm2, systemd, and other process managers
 * 
 * Usage:
 *   node bin/daemon.js
 *   pm2 start bin/daemon.js --name social-poster
 */

const chalk = require('chalk');
const { loadConfig, checkLimit } = require('../src/config');
const { startScheduler } = require('../src/scheduler');
const logger = require('../src/logger');

console.log(chalk.bold.cyan('\n╔════════════════════════════════════════╗'));
console.log(chalk.bold.cyan('║   📱 Social Poster - Daemon Mode      ║'));
console.log(chalk.bold.cyan('╚════════════════════════════════════════╝\n'));

// Load configuration
const config = loadConfig();

if (!config) {
  console.error(chalk.red('❌ No configuration found'));
  console.log(chalk.yellow('   Run "social-poster" first to set up your configuration\n'));
  logger.error('Daemon mode failed: No configuration');
  process.exit(1);
}

// Check limits
const limit = checkLimit();
console.log(chalk.cyan('📊 Monthly Usage:'));
console.log(chalk.gray(`   Posts used: ${limit.current}/${limit.total}`));
console.log(chalk.gray(`   Remaining: ${limit.remaining}\n`));

if (!limit.allowed) {
  console.log(chalk.red('⚠️  Monthly limit reached!'));
  console.log(chalk.yellow('   Scheduler will remain inactive until next month\n'));
}

// Start scheduler
const started = startScheduler(config);

if (started) {
  logger.info('Daemon mode started', { 
    platform: config.platform, 
    topic: config.topic,
    schedule: `${config.postsPerWeek} posts/week at ${config.postingTime}`
  });
  
  console.log(chalk.green('✅ Daemon mode active'));
  console.log(chalk.gray('   Process will run in background\n'));
  
  // Keep process alive
  process.stdin.resume();
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log(chalk.yellow('\n\n⏸️  Daemon mode stopped'));
    logger.info('Daemon mode stopped (SIGINT)');
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    console.log(chalk.yellow('\n\n⏸️  Daemon mode stopped'));
    logger.info('Daemon mode stopped (SIGTERM)');
    process.exit(0);
  });
} else {
  console.error(chalk.red('❌ Failed to start scheduler\n'));
  logger.error('Daemon mode failed: Scheduler start failed');
  process.exit(1);
}
