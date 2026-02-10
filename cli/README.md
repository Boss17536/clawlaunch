# ClawLaunch CLI

A Node.js CLI tool that safely schedules social media posts by opening a browser window with pre-filled content. **You manually click "Post"** — zero automation of the actual posting action.

## 🚀 Features

- ✅ **100% ToS Compliant** - Never automates the "Post" button
- 🔒 **Encrypted API Keys** - Secure AES-256-CBC encryption
- 📅 **Smart Scheduling** - Posts open automatically at your chosen times
- 🤖 **Daemon Mode** - Run in background with PM2 support
- 🎨 **AI Image Generation** - Optional AI-generated images with local caching

## 📦 Installation

```bash
# From within the repository
cd cli
npm install
npm link
```

## 🎯 Quick Start

1. Run the CLI:
```bash
clawlaunch
```

2. Answer 7 simple questions:
   - Platform (Twitter/X or LinkedIn)
   - Topic (motivation, fitness, tech, business, or default)
   - **Post Length** (short or long) ⭐ NEW
   - Posts per week (1-5)
   - Posting time (e.g., "9:00 AM")
   - Timezone (e.g., "America/New_York")
   - **AI Images** (enable/disable, optional API key) ⭐ NEW

3. Keep the terminal open - scheduler runs in background

4. At scheduled time:
   - Browser opens with pre-filled post
   - **If AI images enabled**: Image URL displayed in console
   - Click "Post" manually (1 click)
   - Done! 🎉

📖 **Documentation:**
- [FEATURES.md](FEATURES.md) - Detailed feature guide
- [EXAMPLES.md](EXAMPLES.md) - Usage examples and pro tips
- [CHANGELOG_ENHANCED.md](CHANGELOG_ENHANCED.md) - What's new

## 🎨 Available Topics & Post Lengths

Each topic now supports **SHORT** and **LONG** formats:

- **Motivation** - Inspirational quotes and tips
  - Short: Quick motivational quotes
  - Long: Detailed inspiration with actionable questions
- **Fitness** - Health and workout motivation
  - Short: Punchy fitness mantras
  - Long: In-depth workout philosophy and tips
- **Tech** - Technology insights and tips
  - Short: Quick tech wisdom
  - Long: Thoughtful tech insights and advice
- **Business** - Entrepreneurship and productivity
  - Short: Business one-liners
  - Long: Comprehensive business advice and strategies
- **Default** - General tips and quotes
  - Short: Quick life tips
  - Long: Detailed personal development content

## 🎨 AI Image Providers

- **Pollinations.ai** - FREE, no API key needed ✅ Recommended
- **OpenAI DALL-E** - Premium quality (requires API key)
- **Stability AI** - Professional quality (requires API key)
- **Replicate** - Flexible models (requires API key)

## 📊 Free Tier Limits

- 20 posts per month (resets on 1st)
- 1 platform only (Twitter/X OR LinkedIn)
- Max 5 posts per week
- Pre-written templates (no AI)
- 1 social account

## 🔧 How It Works

1. **Setup** - Saves config to `~/.social-poster/config.json`
2. **Scheduling** - Uses cron to schedule posts
3. **Posting** - Opens browser with pre-filled content via intent URLs
4. **Safety** - You always click "Post" manually

### Platform URLs
- **Twitter/X**: `https://twitter.com/intent/tweet?text=...`
- **LinkedIn**: `https://www.linkedin.com/share/update/?text=...`

## 📁 File Locations

- Config: `~/.social-poster/config.json` (API keys encrypted)
- Logs: `~/.social-poster/logs.txt`
- Images: `~/.social-poster/images/`
- Counter: Automatically tracked and reset monthly

## ⚠️ Important Notes

- Keep terminal open for scheduler to run
- Must be logged into platform in your default browser
- Manual click required for each post (ToS compliance)

## 🛠️ Usage Modes

### Interactive Mode (Default)
```bash
npm start
# or
social-poster
```

### Daemon Mode (Background)
```bash
# Direct
npm run daemon

# PM2 (Recommended for production)
pm2 start ecosystem.config.js
pm2 logs social-poster
pm2 stop social-poster
```

See [DAEMON_MODE_GUIDE.md](DAEMON_MODE_GUIDE.md) for detailed daemon setup.

## 🛠️ Development

```bash
# Clone and install
git clone <repo>
cd social-poster-free
npm install

# Run locally
npm start
```

## 📝 License

MIT
