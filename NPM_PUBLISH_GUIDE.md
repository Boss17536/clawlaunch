# 📦 NPM Publishing Guide for ClawLaunch

## ✅ Pre-Publishing Checklist

Before publishing to npm, ensure you've completed all security and quality checks:

### 1. Security Audit ✅
- [x] API keys are encrypted using AES-256-CBC
- [x] No API keys stored in plain text
- [x] Prompt history encrypted (prompts only, no API keys)
- [x] `.gitignore` configured to exclude sensitive files
- [x] Config directory (`~/.social-poster/`) excluded from git
- [x] Environment files excluded

### 2. Code Quality ✅
- [x] All features tested and working
- [x] Scheduler validates time formats correctly (AM/PM support)
- [x] Custom API key feature implemented securely
- [x] Prompt history with auto-suggestions working
- [x] Error handling in place

### 3. Package Configuration

Review and update these files before publishing:

#### `cli/package.json`
```json
{
  "name": "clawlaunch-cli",
  "version": "1.1.0",
  "description": "Automate social media posts on LinkedIn and Twitter with AI-powered content",
  "main": "bin/cli.js",
  "bin": {
    "clawlaunch": "./bin/cli.js"
  },
  "keywords": [
    "social-media",
    "automation",
    "linkedin",
    "twitter",
    "scheduler",
    "ai",
    "cli"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/Boss17536/clawlaunch.git"
  },
  "bugs": {
    "url": "https://github.com/Boss17536/clawlaunch/issues"
  },
  "homepage": "https://github.com/Boss17536/clawlaunch#readme"
}
```

## 📝 Step-by-Step Publishing Process

### Step 1: Prepare Your Package

1. **Navigate to the CLI directory:**
   ```bash
   cd Documents/clawlaunch/cli
   ```

2. **Update version number** in `package.json`:
   ```bash
   npm version patch   # For bug fixes (1.0.0 → 1.0.1)
   npm version minor   # For new features (1.0.0 → 1.1.0)
   npm version major   # For breaking changes (1.0.0 → 2.0.0)
   ```

3. **Review `.npmignore`** (create if it doesn't exist):
   ```
   test/
   *.test.js
   .env*
   .DS_Store
   *.log
   coverage/
   .nyc_output/
   ```

### Step 2: Test Installation Locally

Before publishing, test that your package installs correctly:

```bash
# Link locally to test
npm link

# Test the CLI
clawlaunch --help
clawlaunch init

# If everything works, unlink
npm unlink -g clawlaunch-cli
```

### Step 3: Login to NPM

```bash
npm login
```

You'll be prompted for:
- Username
- Password
- Email
- One-Time Password (if 2FA is enabled)

### Step 4: Publish to NPM

```bash
# Dry run first (see what will be published)
npm publish --dry-run

# If everything looks good, publish for real
npm publish
```

**Note:** If the package name is already taken, you'll need to:
- Choose a different name, or
- Publish as a scoped package: `@yourusername/clawlaunch-cli`

### Step 5: Verify Publication

1. **Check on npmjs.com:**
   - Go to https://www.npmjs.com/package/clawlaunch-cli
   - Verify version, description, and README display correctly

2. **Test installation:**
   ```bash
   # In a different directory
   npm install -g clawlaunch-cli
   clawlaunch --help
   ```

## 🔒 Security Best Practices

### ✅ What's Safe to Publish
- Source code (JavaScript files)
- Documentation (README, guides)
- Package metadata (package.json)
- Example configurations (.env.example)

### ❌ What to NEVER Publish
- API keys (encrypted or not)
- User configurations
- `.env` files
- Test credentials
- Personal data
- The `~/.social-poster/` directory

### 🛡️ How We Protect Users

1. **Encryption at Rest:**
   - All API keys encrypted with AES-256-CBC
   - Machine-specific encryption key (hostname + username)
   - Encrypted data stored locally only

2. **No Server Storage:**
   - Everything stored locally on user's machine
   - No cloud sync, no external servers
   - User has full control over their data

3. **Prompt History:**
   - Only prompts stored (encrypted)
   - NO API keys in history
   - Max 10 prompts to limit data

4. **Input Masking:**
   - Password fields for API keys
   - Masked input (asterisks shown)
   - Keys never logged to console

## 🚀 Post-Publishing Steps

### 1. Update GitHub Repository

```bash
# Tag the release
git tag -a v1.1.0 -m "Release v1.1.0 - Custom API key feature"
git push origin v1.1.0

# Update main branch
git push origin main
```

### 2. Create GitHub Release

1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Select your tag (v1.1.0)
4. Add release notes:

```markdown
## 🎉 Version 1.1.0 - Custom AI Content

### ✨ New Features
- 🔑 Custom API key support for OpenAI content generation
- 📝 Prompt history with auto-suggestions
- 🕐 Improved time format validation (AM/PM case-insensitive)
- 🔒 Enhanced security with encrypted prompt storage

### 🔒 Security Improvements
- All API keys encrypted with AES-256-CBC
- Prompt history encrypted (prompts only, no API keys)
- Machine-specific encryption keys
- Updated .gitignore for sensitive files

### 🐛 Bug Fixes
- Fixed time parsing for various AM/PM formats
- Improved error handling for API failures

### 📦 Installation
\`\`\`bash
npm install -g clawlaunch-cli
\`\`\`
```

### 3. Update Documentation

Update your main README.md with:
- New features
- Installation instructions
- Security information
- Changelog link

## 🔧 Troubleshooting

### "Package name already exists"
```bash
# Option 1: Use a scoped package
npm publish --access public --scope=@yourusername

# Option 2: Choose a different name
# Update "name" in package.json
```

### "You must verify your email"
- Check your email and click the verification link
- Or verify manually: https://www.npmjs.com/settings/profile

### "You need a paid account to publish scoped packages"
- Use `npm publish --access public` for free scoped packages

### "Missing required files"
- Ensure `package.json` has all required fields
- Check that `bin/cli.js` has the shebang: `#!/usr/bin/env node`
- Verify file permissions: `chmod +x bin/cli.js`

## 📊 Monitoring Your Package

### Track Downloads
- View stats: https://www.npmjs.com/package/clawlaunch-cli
- Use npm-stat: https://npm-stat.com/charts.html?package=clawlaunch-cli

### User Feedback
- Monitor GitHub Issues
- Check npm package comments
- Watch for security vulnerability reports

## 🔄 Publishing Updates

When you need to publish a new version:

```bash
cd Documents/clawlaunch/cli

# 1. Make your changes
# 2. Test thoroughly
# 3. Update version
npm version patch  # or minor/major

# 4. Publish
npm publish

# 5. Update git
git push origin main --tags
```

## 📋 Version Guidelines

Follow Semantic Versioning (semver):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
  - Removing features
  - Changing CLI commands
  - Incompatible API changes

- **MINOR** (1.0.0 → 1.1.0): New features
  - Adding new commands
  - New optional features
  - Backwards-compatible changes

- **PATCH** (1.0.0 → 1.0.1): Bug fixes
  - Security patches
  - Performance improvements
  - Bug fixes only

## ✅ Final Security Checklist

Before publishing ANY version:

- [ ] Run security audit: `npm audit`
- [ ] Check for secrets: `git secrets --scan` (if installed)
- [ ] Review `.npmignore` / `.gitignore`
- [ ] Verify no hardcoded credentials
- [ ] Test encryption/decryption
- [ ] Verify API keys never logged
- [ ] Test with fresh install
- [ ] Review all file permissions

## 🎉 You're Ready!

Once you've completed all steps:

1. ✅ Code is secure and tested
2. ✅ Package.json is configured
3. ✅ Logged into npm
4. ✅ Published successfully
5. ✅ Documented on GitHub
6. ✅ Users can install with `npm install -g clawlaunch-cli`

**Congratulations! Your package is live on npm! 🚀**

---

## 📞 Support

For help with publishing:
- NPM Docs: https://docs.npmjs.com/cli/v9/commands/npm-publish
- Package Support: https://www.npmjs.com/support

For security concerns:
- Report to: npm-security@npmjs.com
- Or open a GitHub Security Advisory
