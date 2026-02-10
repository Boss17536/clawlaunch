#!/usr/bin/env node

const chalk = require('chalk');
const { execSync } = require('child_process');
const path = require('path');

console.log(chalk.cyan('\n🚀 ClawLaunch installed successfully!\n'));

console.log(chalk.white('To use the ') + chalk.bold.green('clawlaunch') + chalk.white(' command globally, run:\n'));
console.log(chalk.yellow('  npm link\n'));

console.log(chalk.gray('Or use npx directly:'));
console.log(chalk.gray('  npx github:Boss17536/clawlaunch init\n'));

console.log(chalk.green('✨ Happy posting!\n'));
