# Quick Start Guide

Get started with Social Poster Free Tier in under 2 minutes!

## 🚀 Installation

### Option 1: Global Install (Recommended for production)

```bash
npm install -g social-poster-free
```

Then run anywhere:
```bash
social-poster
```

### Option 2: Local Development

```bash
cd C:\Users\Boss\Documents\social
npm install
npm start
```

## 📝 First Time Setup (5 Questions)

```bash
$ npm start

╔════════════════════════════════════════╗
║   📱 Social Poster Free Tier v1.0     ║
╚════════════════════════════════════════╝

👋 First time setup - let's get you started!

📝 Setup Wizard (5 questions)

1️⃣  Which platform do you want to use?
> 🐦 Twitter/X

2️⃣  What topic will you post about?
> 💻 Tech - Technology insights

3️⃣  How many posts per week?
> 3 posts/week (Mon, Wed, Fri)

4️⃣  What time should posts go out?
> 9:00 AM

5️⃣  What is your timezone?
> 🇺🇸 Eastern (New York)

💾 Saving configuration...

✅ Setup complete!

? Start the scheduler now? (Y/n)
```

## ⏰ Scheduler Running

```bash
⏰ Scheduler Configuration:
   Platform: twitter
   Topic: tech
   Schedule: 3 posts/week at 9:00 AM
   Cron: 0 9 * * 1,3,5

✅ Scheduler started successfully!
⚠️  Keep this terminal open for scheduler to run
   Press Ctrl+C to stop

📊 Monthly Usage: 0/20 posts used
   20 posts remaining
```

## 📱 When It's Time to Post

```bash
⏰ Scheduled post time reached!
   Posts used: 0/20

🌐 Opening browser with pre-filled post...
✅ Browser opened successfully!
   Post: "Code is poetry written in logic. Keep creating."

👆 Click "Post" in the browser to publish
   Remaining posts: 19/20
```

**Your browser will open automatically with the post pre-filled!**

Just click the "Post" button to publish. That's it! 🎉

## 🎯 Menu Options

When you run `npm start` after setup:

```
? What would you like to do?
> ▶️  Start Scheduler
  🧪 Test Post Now
  📊 View Status
  🔄 Reconfigure
  ❌ Exit
```

### ▶️ Start Scheduler
Starts the background scheduler. Keeps running until you press Ctrl+C.

### 🧪 Test Post Now
Opens a post immediately (doesn't count toward your 20-post limit).

### 📊 View Status
Shows your current configuration and usage stats:

```
📊 Current Status:

   Platform: twitter
   Topic: tech
   Schedule: 3 posts/week at 9:00 AM
   Timezone: America/New_York
   Config: C:\Users\Boss\.social-poster\config.json

   Monthly Usage: 5/20 posts
   Remaining: 15 posts
```

### 🔄 Reconfigure
Delete current config and run setup wizard again.

### ❌ Exit
Close the program.

## ✅ Success Checklist

Before your first scheduled post, make sure:

- [ ] You're logged into Twitter/X or LinkedIn in your default browser
- [ ] Terminal window is kept open
- [ ] Time and timezone are set correctly
- [ ] You understand you'll click "Post" manually

## 💡 Pro Tips

1. **Keep Terminal Open**: The scheduler only runs while the terminal is open
2. **Be Ready**: Make sure you're at your computer at posting time
3. **Customize Posts**: You can edit the text in the browser before clicking "Post"
4. **Skip Posts**: Close the browser window if you want to skip a post
5. **Check Status**: Run `npm start` → "View Status" to see remaining posts

## 🎨 Available Topics & Examples

### Motivation 🌟
"Small steps every day lead to big changes. Keep going!"

### Fitness 💪
"Consistency beats perfection. Just show up today."

### Tech 💻
"Code is poetry written in logic. Keep creating."

### Business 📈
"Business success = Great product + Customer obsession"

### Default ✨
"Make today count. You've got this!"

## 📊 Free Tier Limits

- ✅ 20 posts per month
- ✅ 1 platform (Twitter/X OR LinkedIn)
- ✅ Max 5 posts per week
- ✅ Pre-written templates
- ✅ 1 social account

Limit resets automatically on the 1st of each month.

## 🛟 Troubleshooting

### Browser doesn't open?
- Make sure you have a default browser set
- Try the "Test Post Now" option first

### Wrong time?
- Check your timezone setting
- Use "Reconfigure" to update

### Hit the limit?
- Wait until the 1st of next month
- Counter resets automatically

## 📖 Next Steps

- Read the full [USAGE.md](USAGE.md) for detailed information
- Check [README.md](README.md) for features and architecture
- Review your config at `~/.social-poster/config.json`

## 🎉 You're All Set!

Your social media posting is now automated (safely)!

Remember: You always click "Post" manually - this keeps you 100% ToS compliant.

Happy posting! 🚀
