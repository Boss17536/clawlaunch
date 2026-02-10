const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const CONFIG_DIR = path.join(os.homedir(), '.social-poster');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

// Encryption settings
const ALGORITHM = 'aes-256-cbc';
const ENCRYPTION_KEY = crypto.scryptSync(os.hostname() + os.userInfo().username, 'salt', 32);
const IV_LENGTH = 16;

/**
 * Encrypt sensitive data
 * @param {string} text - Text to encrypt
 * @returns {string} - Encrypted text with IV
 */
function encrypt(text) {
  if (!text) return '';
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

/**
 * Decrypt sensitive data
 * @param {string} text - Encrypted text with IV
 * @returns {string} - Decrypted text
 */
function decrypt(text) {
  if (!text) return '';
  try {
    const parts = text.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = parts.join(':');
    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    return '';
  }
}

/**
 * Ensure config directory exists
 */
function ensureConfigDir() {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
}

/**
 * Save user configuration
 * @param {Object} config - User configuration object
 */
function saveConfig(config) {
  ensureConfigDir();
  
  const configData = {
    ...config,
    createdAt: new Date().toISOString(),
    monthlyCounter: {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      count: 0
    },
    dailyCounter: {
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      count: 0
    },
    schedulerDays: {
      startDate: new Date().toISOString().split('T')[0],
      daysUsed: 0
    }
  };
  
  // Encrypt sensitive API key before saving
  if (configData.aiImageApiKey) {
    configData.aiImageApiKey = encrypt(configData.aiImageApiKey);
  }
  
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(configData, null, 2));
  return configData;
}

/**
 * Load user configuration
 * @returns {Object|null} - Configuration object or null if not exists
 */
function loadConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    return null;
  }
  
  try {
    const data = fs.readFileSync(CONFIG_FILE, 'utf8');
    const config = JSON.parse(data);
    
    // Decrypt sensitive API key
    if (config.aiImageApiKey) {
      config.aiImageApiKey = decrypt(config.aiImageApiKey);
    }
    
    // Initialize new fields if they don't exist
    if (!config.dailyCounter) {
      config.dailyCounter = {
        date: new Date().toISOString().split('T')[0],
        count: 0
      };
    }
    
    if (!config.schedulerDays) {
      config.schedulerDays = {
        startDate: new Date().toISOString().split('T')[0],
        daysUsed: 0
      };
    }
    
    // Auto-reset counter if new month
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    let needsSave = false;
    
    if (config.monthlyCounter.month !== now.getMonth() || 
        config.monthlyCounter.year !== now.getFullYear()) {
      config.monthlyCounter = {
        month: now.getMonth(),
        year: now.getFullYear(),
        count: 0
      };
      needsSave = true;
    }
    
    // Auto-reset daily counter if new day
    if (config.dailyCounter.date !== today) {
      config.dailyCounter = {
        date: today,
        count: 0
      };
      needsSave = true;
    }
    
    // Save if any resets occurred
    if (needsSave) {
      const configToSave = { ...config };
      if (configToSave.aiImageApiKey) {
        configToSave.aiImageApiKey = encrypt(configToSave.aiImageApiKey);
      }
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(configToSave, null, 2));
    }
    
    return config;
  } catch (error) {
    console.error('Error loading config:', error.message);
    return null;
  }
}

/**
 * Check if user has reached daily limit
 * @returns {Object} - { allowed: boolean, remaining: number, total: number }
 */
function checkDailyLimit() {
  const config = loadConfig();
  const DAILY_LIMIT = 1;
  
  if (!config || !config.dailyCounter) {
    return { allowed: true, remaining: DAILY_LIMIT, total: DAILY_LIMIT, current: 0 };
  }
  
  const count = config.dailyCounter.count || 0;
  const remaining = DAILY_LIMIT - count;
  
  return {
    allowed: count < DAILY_LIMIT,
    remaining: Math.max(0, remaining),
    total: DAILY_LIMIT,
    current: count
  };
}

/**
 * Check if user has reached monthly limit
 * @returns {Object} - { allowed: boolean, remaining: number, total: number }
 */
function checkLimit() {
  const config = loadConfig();
  const FREE_TIER_LIMIT = 20;
  
  if (!config) {
    return { allowed: true, remaining: FREE_TIER_LIMIT, total: FREE_TIER_LIMIT };
  }
  
  const count = config.monthlyCounter.count || 0;
  const remaining = FREE_TIER_LIMIT - count;
  
  return {
    allowed: count < FREE_TIER_LIMIT,
    remaining: Math.max(0, remaining),
    total: FREE_TIER_LIMIT,
    current: count
  };
}

/**
 * Check scheduler days limit (5 days max)
 * @returns {Object} - { allowed: boolean, daysUsed: number, needsReconfigure: boolean }
 */
function checkSchedulerDays() {
  const config = loadConfig();
  const MAX_SCHEDULER_DAYS = 5;
  
  if (!config || !config.schedulerDays) {
    return { allowed: true, daysUsed: 0, needsReconfigure: false };
  }
  
  const today = new Date().toISOString().split('T')[0];
  const startDate = new Date(config.schedulerDays.startDate);
  const currentDate = new Date(today);
  
  // Calculate days since start
  const daysDiff = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
  
  // If 6 or more days have passed, needs reconfiguration
  if (daysDiff >= 6) {
    return { allowed: false, daysUsed: daysDiff, needsReconfigure: true };
  }
  
  return { allowed: true, daysUsed: daysDiff, needsReconfigure: false };
}

/**
 * Increment the daily post counter
 * @returns {boolean} - Success status
 */
function incrementDailyCounter() {
  const config = loadConfig();
  
  if (!config) {
    console.error('No configuration found');
    return false;
  }
  
  const limit = checkDailyLimit();
  if (!limit.allowed) {
    console.error('Daily limit reached');
    return false;
  }
  
  config.dailyCounter.count += 1;
  
  // Re-encrypt API key before saving
  const configToSave = { ...config };
  if (configToSave.aiImageApiKey) {
    configToSave.aiImageApiKey = encrypt(configToSave.aiImageApiKey);
  }
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(configToSave, null, 2));
  
  return true;
}

/**
 * Increment the monthly post counter
 * @returns {boolean} - Success status
 */
function incrementCounter() {
  const config = loadConfig();
  
  if (!config) {
    console.error('No configuration found');
    return false;
  }
  
  const limit = checkLimit();
  if (!limit.allowed) {
    console.error('Monthly limit reached');
    return false;
  }
  
  config.monthlyCounter.count += 1;
  
  // Re-encrypt API key before saving
  const configToSave = { ...config };
  if (configToSave.aiImageApiKey) {
    configToSave.aiImageApiKey = encrypt(configToSave.aiImageApiKey);
  }
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(configToSave, null, 2));
  
  return true;
}

/**
 * Reset scheduler days counter (for reconfiguration)
 * @returns {boolean} - Success status
 */
function resetSchedulerDays() {
  const config = loadConfig();
  
  if (!config) {
    return false;
  }
  
  config.schedulerDays = {
    startDate: new Date().toISOString().split('T')[0],
    daysUsed: 0
  };
  
  // Re-encrypt API key before saving
  const configToSave = { ...config };
  if (configToSave.aiImageApiKey) {
    configToSave.aiImageApiKey = encrypt(configToSave.aiImageApiKey);
  }
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(configToSave, null, 2));
  
  return true;
}

/**
 * Delete configuration (reset)
 */
function deleteConfig() {
  if (fs.existsSync(CONFIG_FILE)) {
    fs.unlinkSync(CONFIG_FILE);
    return true;
  }
  return false;
}

/**
 * Get config file path
 */
function getConfigPath() {
  return CONFIG_FILE;
}

module.exports = {
  saveConfig,
  loadConfig,
  checkLimit,
  checkDailyLimit,
  checkSchedulerDays,
  incrementCounter,
  incrementDailyCounter,
  resetSchedulerDays,
  deleteConfig,
  getConfigPath
};
