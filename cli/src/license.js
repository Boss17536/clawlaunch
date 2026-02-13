const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const CONFIG_DIR = path.join(os.homedir(), '.social-poster');
const LICENSE_FILE = path.join(CONFIG_DIR, '.lic');
const USAGE_FILE = path.join(CONFIG_DIR, '.usage');
const MACHINE_FILE = path.join(CONFIG_DIR, '.machine');

// Contact info for upgrades
const CONTACT_INFO = {
  whatsapp: '+917982664789',
  email: 'boss.927262@gmail.com',
  whatsappLink: 'https://wa.me/917982664789?text=Hi%2C%20I%20want%20to%20upgrade%20to%20ClawLaunch%20Pro!'
};

// Free tier limits
const FREE_LIMITS = {
  dailyPosts: 1,
  monthlyPosts: 10,
  maxAccounts: 1,
  aiImageTimeout: 60000 // 1 minute in ms
};

/**
 * Generate machine fingerprint (hard to fake)
 */
function getMachineFingerprint() {
  const info = {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    cpus: os.cpus().length,
    totalmem: os.totalmem(),
    homedir: os.homedir(),
    username: os.userInfo().username
  };
  
  const hash = crypto.createHash('sha256');
  hash.update(JSON.stringify(info));
  return hash.digest('hex');
}

/**
 * Encrypt data with machine-specific key
 */
function encryptData(data) {
  const fingerprint = getMachineFingerprint();
  const key = crypto.scryptSync(fingerprint, 'clawlaunch-salt', 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return iv.toString('hex') + ':' + encrypted;
}

/**
 * Decrypt data with machine-specific key
 */
function decryptData(encryptedData) {
  try {
    const fingerprint = getMachineFingerprint();
    const key = crypto.scryptSync(fingerprint, 'clawlaunch-salt', 32);
    
    const parts = encryptedData.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return JSON.parse(decrypted);
  } catch (error) {
    return null;
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
 * Initialize license (first time setup)
 */
function initializeLicense() {
  ensureConfigDir();
  
  const licenseData = {
    type: 'FREE',
    machineId: getMachineFingerprint(),
    createdAt: Date.now(),
    version: '1.0.0'
  };
  
  const encrypted = encryptData(licenseData);
  fs.writeFileSync(LICENSE_FILE, encrypted, { mode: 0o600 });
  
  // Initialize usage tracking
  const usageData = {
    daily: {},
    monthly: {},
    totalPosts: 0,
    lastReset: Date.now()
  };
  
  const encryptedUsage = encryptData(usageData);
  fs.writeFileSync(USAGE_FILE, encryptedUsage, { mode: 0o600 });
  
  // Store machine fingerprint separately (extra verification)
  const machineData = {
    id: getMachineFingerprint(),
    created: Date.now(),
    hash: crypto.createHash('sha256').update(getMachineFingerprint() + Date.now()).digest('hex')
  };
  fs.writeFileSync(MACHINE_FILE, encryptData(machineData), { mode: 0o600 });
}

/**
 * Verify license integrity
 */
function verifyLicense() {
  try {
    if (!fs.existsSync(LICENSE_FILE)) {
      return { valid: false, reason: 'NO_LICENSE' };
    }
    
    const encryptedLicense = fs.readFileSync(LICENSE_FILE, 'utf8');
    const license = decryptData(encryptedLicense);
    
    if (!license) {
      return { valid: false, reason: 'CORRUPTED' };
    }
    
    // Verify machine fingerprint matches
    const currentFingerprint = getMachineFingerprint();
    if (license.machineId !== currentFingerprint) {
      return { valid: false, reason: 'MACHINE_MISMATCH' };
    }
    
    // Verify machine file
    if (fs.existsSync(MACHINE_FILE)) {
      const machineData = decryptData(fs.readFileSync(MACHINE_FILE, 'utf8'));
      if (machineData && machineData.id !== currentFingerprint) {
        return { valid: false, reason: 'TAMPERED' };
      }
    }
    
    return { valid: true, license };
  } catch (error) {
    return { valid: false, reason: 'ERROR' };
  }
}

/**
 * Get current usage stats
 */
function getUsageStats() {
  try {
    if (!fs.existsSync(USAGE_FILE)) {
      initializeLicense();
    }
    
    const encryptedUsage = fs.readFileSync(USAGE_FILE, 'utf8');
    const usage = decryptData(encryptedUsage);
    
    if (!usage) {
      // File corrupted, reset
      initializeLicense();
      return getUsageStats();
    }
    
    const today = new Date().toISOString().split('T')[0];
    const currentMonth = new Date().toISOString().substring(0, 7);
    
    return {
      dailyCount: usage.daily[today] || 0,
      monthlyCount: usage.monthly[currentMonth] || 0,
      totalPosts: usage.totalPosts || 0,
      lastReset: usage.lastReset
    };
  } catch (error) {
    initializeLicense();
    return getUsageStats();
  }
}

/**
 * Check if user can post (enforce limits)
 */
function canPost() {
  const verification = verifyLicense();
  
  if (!verification.valid) {
    initializeLicense();
    return canPost();
  }
  
  const license = verification.license;
  
  // PRO users have no limits
  if (license.type === 'PRO' || license.type === 'LIFETIME') {
    return { allowed: true, isPro: true };
  }
  
  // FREE users - check limits
  const stats = getUsageStats();
  
  if (stats.dailyCount >= FREE_LIMITS.dailyPosts) {
    return {
      allowed: false,
      reason: 'DAILY_LIMIT',
      message: `Daily limit reached (${stats.dailyCount}/${FREE_LIMITS.dailyPosts} posts today)`,
      stats
    };
  }
  
  if (stats.monthlyCount >= FREE_LIMITS.monthlyPosts) {
    return {
      allowed: false,
      reason: 'MONTHLY_LIMIT',
      message: `Monthly limit reached (${stats.monthlyCount}/${FREE_LIMITS.monthlyPosts} posts this month)`,
      stats
    };
  }
  
  return { allowed: true, isPro: false, stats };
}

/**
 * Increment post counter
 */
function recordPost() {
  try {
    const encryptedUsage = fs.readFileSync(USAGE_FILE, 'utf8');
    const usage = decryptData(encryptedUsage);
    
    if (!usage) {
      throw new Error('Usage data corrupted');
    }
    
    const today = new Date().toISOString().split('T')[0];
    const currentMonth = new Date().toISOString().substring(0, 7);
    
    // Increment counters
    usage.daily[today] = (usage.daily[today] || 0) + 1;
    usage.monthly[currentMonth] = (usage.monthly[currentMonth] || 0) + 1;
    usage.totalPosts = (usage.totalPosts || 0) + 1;
    
    // Cleanup old data (keep only last 60 days)
    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    Object.keys(usage.daily).forEach(date => {
      if (date < sixtyDaysAgo) {
        delete usage.daily[date];
      }
    });
    
    // Save
    const encrypted = encryptData(usage);
    fs.writeFileSync(USAGE_FILE, encrypted, { mode: 0o600 });
    
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Upgrade to PRO (requires license key)
 */
function upgradeToPro(licenseKey) {
  try {
    // Verify license key format (you'll provide these to buyers)
    const keyPattern = /^CL-PRO-[A-Z0-9]{16}$/;
    if (!keyPattern.test(licenseKey)) {
      return { success: false, error: 'Invalid license key format' };
    }
    
    const encryptedLicense = fs.readFileSync(LICENSE_FILE, 'utf8');
    const license = decryptData(encryptedLicense);
    
    if (!license) {
      return { success: false, error: 'License file corrupted' };
    }
    
    // Update license type
    license.type = 'PRO';
    license.licenseKey = licenseKey;
    license.upgradedAt = Date.now();
    
    const encrypted = encryptData(license);
    fs.writeFileSync(LICENSE_FILE, encrypted, { mode: 0o600 });
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get upgrade information
 */
function getUpgradeInfo() {
  return {
    contact: CONTACT_INFO,
    limits: FREE_LIMITS,
    features: {
      free: [
        `${FREE_LIMITS.dailyPosts} post per day`,
        `${FREE_LIMITS.monthlyPosts} posts per month`,
        `${FREE_LIMITS.maxAccounts} social account`,
        'Basic scheduling',
        'Community support'
      ],
      pro: [
        'Unlimited daily posts',
        'Unlimited monthly posts',
        'Unlimited social accounts',
        'Fast AI image generation',
        'Priority support',
        'Full source code access',
        'Lifetime updates'
      ]
    }
  };
}

/**
 * Check if license is PRO
 */
function isPro() {
  const verification = verifyLicense();
  if (!verification.valid) {
    return false;
  }
  return verification.license.type === 'PRO' || verification.license.type === 'LIFETIME';
}

module.exports = {
  initializeLicense,
  verifyLicense,
  canPost,
  recordPost,
  upgradeToPro,
  getUpgradeInfo,
  getUsageStats,
  isPro,
  FREE_LIMITS,
  CONTACT_INFO
};
