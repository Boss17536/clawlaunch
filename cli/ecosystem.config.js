/**
 * PM2 Ecosystem Configuration
 * 
 * Usage:
 *   pm2 start ecosystem.config.js
 *   pm2 stop social-poster
 *   pm2 restart social-poster
 *   pm2 logs social-poster
 *   pm2 monit
 */

module.exports = {
  apps: [{
    name: 'social-poster',
    script: './bin/daemon.js',
    
    // Options
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '200M',
    
    // Logging
    error_file: '~/.social-poster/pm2-error.log',
    out_file: '~/.social-poster/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Environment
    env: {
      NODE_ENV: 'production'
    }
  }]
};
