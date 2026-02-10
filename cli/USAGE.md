# Usage Guide

## Quick Start

### 1. Installation (Local Development)

```bash
cd C:\Users\Boss\Documents\social
npm install
```

### 2. Run the CLI

```bash
npm start
# or
node bin/cli.js
```

### 3. Setup Wizard

Answer 5 simple questions:

1. **Platform**: Choose Twitter/X or LinkedIn
2. **Topic**: Choose your content theme (motivation, fitness, tech, business, default)
3. **Posts per week**: 1-5 posts (determines which days)
4. **Posting time**: When to post (e.g., "9:00 AM" or "14:30")
5. **Timezone**: Your local timezone

### 4. Start Posting!

The scheduler will:
- Run in the background
- Open your browser at scheduled times
- Pre-fill the post content
- Wait for you to click "Post" manually

## Command Options

When you run `social-poster`, you'll see a menu:

- **▶️ Start Scheduler** - Begin scheduled posting
- **🧪 Test Post Now** - Test immediately without waiting
- **📊 View Status** - See config and usage stats
- **🔄 Reconfigure** - Change settings (deletes current config)
- **❌ Exit** - Close the program

## Posting Schedule Examples

### 1 Post/Week
- Posts on: **Monday**

### 2 Posts/Week
- Posts on: **Monday, Thursday**

### 3 Posts/Week
- Posts on: **Monday, Wednesday, Friday**

### 4 Posts/Week
- Posts on: **Monday, Tuesday, Thursday, Friday**

### 5 Posts/Week
- Posts on: **Monday through Friday**

## Sample Post Templates

### Motivation 🌟
- "Your only limit is you. Push past your comfort zone today."
- "Small steps every day lead to big changes. Keep going!"
- And 3 more variations...

### Fitness 💪
- "Consistency beats perfection. Just show up today."
- "Your body achieves what your mind believes. Let's go!"
- And 3 more variations...

### Tech 💻
- "Code is poetry written in logic. Keep creating."
- "Innovation starts with curiosity. What will you build today?"
- And 3 more variations...

### Business 📈
- "Business success = Great product + Customer obsession"
- "Your network is your net worth. Build genuine connections."
- And 3 more variations...

### Default ✨
- "Make today count. You've got this!"
- "Learning something new every day keeps life interesting."
- And 3 more variations...

## How It Works Under the Hood

### 1. Configuration Storage
- Location: `~/.social-poster/config.json`
- Contains: Platform, topic, schedule, timezone
- Counter: Tracks monthly posts automatically

### 2. Scheduling
- Uses `node-cron` for reliable scheduling
- Runs continuously in terminal
- Timezone-aware (respects your local time)

### 3. Browser Opening
- **Twitter/X**: `https://twitter.com/intent/tweet?text=...`
- **LinkedIn**: `https://www.linkedin.com/share/update/?text=...`
- Opens in your default browser
- Pre-fills the post text

### 4. Safety Features
- No automation of "Post" button (100% ToS compliant)
- No credentials stored
- Manual user action required
- 20 posts/month limit enforced
- Auto-resets on 1st of month

## Tips for Best Results

### ✅ DO:
- Keep the terminal window open while scheduler runs
- Be logged into your platform in your default browser
- Review the post before clicking "Post"
- Edit the text if needed before posting

### ❌ DON'T:
- Close the terminal (stops scheduler)
- Expect automatic posting (you must click "Post")
- Try to exceed 20 posts/month
- Use multiple platforms (free tier = 1 platform)

## Troubleshooting

### Browser doesn't open
- Check if default browser is set
- Try running `npm start` again
- Verify you're logged into the platform

### Wrong timezone
- Reconfigure and select correct timezone
- Check system clock is accurate

### Hit 20-post limit
- Wait until 1st of next month
- Counter resets automatically
- Check status with "View Status" option

### Scheduler not triggering
- Verify terminal is still open
- Check schedule with "View Status"
- Ensure time format is correct

## Example Workflow

```bash
# Day 1: Setup
$ npm start
> Choose Twitter
> Choose Tech topic
> Select 3 posts/week
> Set time to 9:00 AM
> Choose America/New_York timezone
> Start scheduler

# Terminal shows:
✅ Scheduler started successfully!
⚠️  Keep this terminal open for scheduler to run
📊 Monthly Usage: 0/20 posts used

# Monday 9:00 AM: First post
⏰ Scheduled post time reached!
🌐 Opening browser with pre-filled post...
✅ Browser opened successfully!
   Post: "Code is poetry written in logic. Keep creating."

👆 Click "Post" in the browser to publish
   Remaining posts: 19/20

# You click "Post" in browser
# Post is published! 🎉
```

## Customization (For Developers)

### Add More Templates
Edit `src/templates.js`:

```javascript
const templates = {
  yourTopic: [
    "Your template 1",
    "Your template 2",
    // ... 3 more
  ]
};
```

### Add More Platforms
Edit `src/browser.js`:

```javascript
const platformUrls = {
  yourPlatform: (text) => {
    return `https://platform.com/share?text=${encodeURIComponent(text)}`;
  }
};
```

### Change Free Tier Limit
Edit `src/config.js`:

```javascript
const FREE_TIER_LIMIT = 20; // Change to desired limit
```

## FAQ

**Q: Is this safe to use?**  
A: Yes! It never automates the "Post" button, so it's 100% ToS compliant.

**Q: Does it store my password?**  
A: No. You must be logged in manually in your browser.

**Q: Can I use it for multiple accounts?**  
A: Free tier supports 1 account. Log into whichever account you want to post from.

**Q: What if I want to skip a scheduled post?**  
A: Just close the browser window that opens. The counter won't increment.

**Q: Can I edit the post before publishing?**  
A: Yes! Edit the text in the browser before clicking "Post".

**Q: Does it work on mobile?**  
A: No, this is a desktop CLI tool for Windows/Mac/Linux.

## Support

For issues or questions:
1. Check this usage guide
2. Review the README.md
3. Check config at `~/.social-poster/config.json`
