# Changelog - Enhanced Version

## Version 2.0.0 - Enhanced Features (2026-02-09)

### 🆕 New Features

#### 1. Post Length Options
- Added **SHORT** and **LONG** post formats for all topics
- Short posts: Quick, punchy 1-2 line messages perfect for engagement
- Long posts: Detailed, multi-paragraph content with depth and value
- 5 variations per length per topic (50 new templates total)
- Configurable during setup

**Impact:** Users can now choose the post style that best fits their platform and audience.

#### 2. AI Image Generation Support
- Optional AI-generated images for social media posts
- Multiple provider support:
  - **Pollinations.ai** (FREE - no API key needed) ✅
  - OpenAI DALL-E (premium quality, requires API key)
  - Stability AI (professional quality, requires API key)
  - Replicate (flexible models, requires API key)
- Topic-specific image prompts
- Image URLs displayed in console for easy copying

**Impact:** Posts can now include eye-catching visuals without manual design work.

#### 3. Optional API Key Configuration
- Users can skip API keys entirely (use free option)
- Secure storage in config file
- Easy reconfiguration via CLI menu
- No API key required for Pollinations.ai

**Impact:** Complete flexibility - users can start free and upgrade to paid options later.

### 🔧 Technical Changes

#### Modified Files:
1. **src/templates.js**
   - Restructured templates from flat arrays to nested objects (short/long)
   - Updated `getRandomTemplate()` to accept length parameter
   - Updated `getTopicTemplates()` to support length filtering
   - Backward compatible with default 'short' parameter

2. **src/browser.js**
   - Added AI image generation integration
   - Updated `openPostInBrowser()` to accept config object
   - Added image URL to return object
   - Updated platform URL builders to accept imageUrl parameter

3. **src/scheduler.js**
   - Updated to pass full config to `openPostInBrowser()`
   - Added image URL display in console output
   - Enhanced user instructions for image attachment

4. **bin/cli.js**
   - Expanded setup wizard from 5 to 7 questions
   - Added post length selection
   - Added AI image enable/disable option
   - Added conditional API provider and key prompts
   - Updated status display to show new settings

#### New Files:
1. **src/aiImage.js** - New module
   - `generateAIImage()` - Main image generation function
   - `getImagePrompt()` - Topic-specific prompt generator
   - Provider-specific functions (Pollinations, OpenAI, Stability, Replicate)
   - Modular design for easy extension

2. **FEATURES.md** - New documentation
   - Comprehensive feature guide
   - Usage examples
   - FAQ section
   - Comparison tables

3. **CHANGELOG_ENHANCED.md** - This file
   - Complete changelog
   - Technical details
   - Migration guide

### 📊 Statistics

- **Total Templates**: 50 (from 25)
- **Configuration Options**: 7 (from 5)
- **AI Providers Supported**: 4
- **Free Options**: 1 (Pollinations.ai)
- **Lines of Code Added**: ~350
- **New Files**: 3
- **Modified Files**: 4

### 🔄 Migration Guide

**For Existing Users:**

Your existing configuration will continue to work! The app automatically:
- Defaults to 'short' posts if `postLength` is not set
- Disables AI images if not configured
- Maintains backward compatibility

To use new features:
1. Run the app: `npm start`
2. Select "Reconfigure" from the menu
3. Answer the updated wizard questions
4. Your new preferences will be saved

**For New Users:**

Just run `npm start` and follow the 7-question setup wizard!

### 🐛 Bug Fixes

- None (this is a feature enhancement release)

### ⚠️ Breaking Changes

- None (fully backward compatible)

### 📝 Notes

- No additional npm dependencies required
- All AI providers use native Node.js HTTPS module
- Free tier limits remain unchanged (20 posts/month)
- Configuration file schema extended (not breaking)

### 🚀 Future Enhancements

Potential features for future versions:
- Custom template support
- Image upload to posts (auto-download and attach)
- More AI providers (Midjourney, etc.)
- Scheduling calendar view
- Post analytics tracking
- Multi-platform support in free tier

### 👏 Credits

Enhanced with user feedback in mind. Thanks for testing!

---

**Full Documentation**: See [FEATURES.md](FEATURES.md) for complete feature guide.
**Quick Start**: See [README.md](README.md) for installation and usage.
