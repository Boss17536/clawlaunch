const fs = require('fs');
const path = require('path');
const os = require('os');

const LOG_DIR = path.join(os.homedir(), '.social-poster');
const LOG_FILE = path.join(LOG_DIR, 'logs.txt');
const MAX_LOG_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Ensure log directory exists
 */
function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

/**
 * Rotate log file if it's too large
 */
function rotateLogIfNeeded() {
  if (fs.existsSync(LOG_FILE)) {
    const stats = fs.statSync(LOG_FILE);
    if (stats.size > MAX_LOG_SIZE) {
      const backupFile = path.join(LOG_DIR, `logs.txt.${Date.now()}.bak`);
      fs.renameSync(LOG_FILE, backupFile);
      
      // Keep only last 3 backup files
      const backups = fs.readdirSync(LOG_DIR)
        .filter(f => f.startsWith('logs.txt.') && f.endsWith('.bak'))
        .sort()
        .reverse();
      
      backups.slice(3).forEach(backup => {
        fs.unlinkSync(path.join(LOG_DIR, backup));
      });
    }
  }
}

/**
 * Log a message to the log file
 * @param {string} level - Log level (INFO, WARN, ERROR, SUCCESS)
 * @param {string} message - Log message
 * @param {Object} data - Additional data to log
 */
function log(level, message, data = {}) {
  ensureLogDir();
  rotateLogIfNeeded();
  
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...data
  };
  
  const logLine = JSON.stringify(logEntry) + '\n';
  
  try {
    fs.appendFileSync(LOG_FILE, logLine);
  } catch (error) {
    console.error('Failed to write to log file:', error.message);
  }
}

/**
 * Convenience methods for different log levels
 */
const logger = {
  info: (message, data) => log('INFO', message, data),
  warn: (message, data) => log('WARN', message, data),
  error: (message, data) => log('ERROR', message, data),
  success: (message, data) => log('SUCCESS', message, data),
  
  /**
   * Log a post event
   */
  logPost: (platform, topic, postText, imageUrl, success, error = null) => {
    log(success ? 'SUCCESS' : 'ERROR', 'Post attempt', {
      platform,
      topic,
      postText: postText.substring(0, 100) + (postText.length > 100 ? '...' : ''),
      hasImage: !!imageUrl,
      imageUrl,
      success,
      error
    });
  },
  
  /**
   * Get log file path
   */
  getLogPath: () => LOG_FILE,
  
  /**
   * Read recent logs
   * @param {number} lines - Number of lines to read
   */
  readRecentLogs: (lines = 50) => {
    if (!fs.existsSync(LOG_FILE)) {
      return [];
    }
    
    try {
      const content = fs.readFileSync(LOG_FILE, 'utf8');
      const allLines = content.trim().split('\n').filter(l => l);
      const recentLines = allLines.slice(-lines);
      
      return recentLines.map(line => {
        try {
          return JSON.parse(line);
        } catch {
          return { raw: line };
        }
      });
    } catch (error) {
      console.error('Failed to read log file:', error.message);
      return [];
    }
  }
};

module.exports = logger;
