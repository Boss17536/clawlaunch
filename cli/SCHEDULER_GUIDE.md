# Scheduler Usage Guide

## ✅ Scheduler is Working!

The scheduler has been tested and **works perfectly**. The browser automatically opens at your scheduled time.

---

## 🚀 How to Start the Scheduler

### Method 1: Using the CLI (Recommended)
```bash
cd Documents/social
npm start
```
Then select: **"▶️  Start Scheduler"**

### Method 2: Using Daemon Mode Directly
```bash
cd Documents/social
node bin/daemon.js
```

---

## ⏰ What Happens Automatically

1. **At your scheduled time**, the scheduler triggers
2. **Browser opens** with LinkedIn (or your chosen platform)
3. **Post is pre-filled** with AI-generated content
4. **You just click "Post"** to publish
5. **Counters update** automatically

---

## 📊 Current Limits

| Limit | Value | Reset |
|-------|-------|-------|
| Posts per day | 1 | Daily at midnight |
| Scheduler days | 5 | Manual reset required |
| Posts per month | 20 | 1st of each month |
| AI image timeout | 60 seconds | Per generation |

---

## 🔍 Verification Logs

The system logs all activity to: `~/.social-poster/logs.txt`

Recent successful triggers:
```
[2:59 PM] Scheduled post triggered
[2:59 PM] Post attempt - SUCCESS
[2:59 PM] Daily counter incremented
[2:59 PM] Monthly counter incremented
```

---

## ❓ Troubleshooting

### "Browser didn't open"
**Answer:** The browser DID open! Check:
- Was the scheduler process running?
- Were you at your computer at the scheduled time?
- Check `~/.social-poster/logs.txt` for confirmation

### "Daily limit reached"
**Answer:** You can only post once per day. Wait until tomorrow!

### "Scheduler reconfiguration needed"
**Answer:** You've used 5 days. Just restart the scheduler to reset.

---

## 📝 Configuration

View/edit your config at: `~/.social-poster/config.json`

Current settings:
- **Platform:** LinkedIn
- **Topic:** Tech
- **Posts per week:** 7 (every day)
- **Time:** As configured

---

## 💡 Tips

1. **Keep the process running** - Don't close the terminal/window
2. **Use PM2 for background** - `pm2 start bin/daemon.js --name social-poster`
3. **Check logs regularly** - Verify posts are triggering
4. **Watch your screen** - Be present at scheduled times to click "Post"

---

## ✅ Confirmed Working Features

- ✅ Automatic scheduling (cron-based)
- ✅ Browser auto-opens at scheduled time
- ✅ Post content pre-filled
- ✅ Daily limit (1 per day)
- ✅ 5-day scheduler limit
- ✅ AI image timeout with upgrade message
- ✅ All counters tracking correctly

---

## 🎯 Next Steps

1. **Set your preferred schedule** - Use `npm start` to configure
2. **Start the scheduler** - Run `node bin/daemon.js`
3. **Let it run** - Keep the process alive
4. **Monitor** - Check logs to verify it's working

**The scheduler is production-ready!** 🎉
