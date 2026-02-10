# New Features Documentation

## Overview
Three new features have been added to the Social Poster system to enhance user experience and manage free tier limitations.

---

## 🎨 Feature 1: AI Image Generation Timeout (1 Minute)

### Description
If AI image generation takes more than 1 minute, the system will timeout and display an upgrade message.

### Behavior
- **Timeout Duration**: 60 seconds (1 minute)
- **Message Displayed**: "You need to buy paid Clawlaunch, that's just 1-2 dollar"
- **Fallback**: Post continues without image if timeout occurs

### Technical Implementation
- Uses `Promise.race()` to compete image generation against a 60-second timer
- Returns `{ timedOut: true }` when timeout occurs
- Browser module checks for timeout and displays upgrade message

### User Experience
```
⠋ Generating AI image...
✖ AI image generation timed out (>1 minute)

⚠️  You need to buy paid Clawlaunch, that's just 1-2 dollar
   Faster image generation and premium features available!
```

---

## 📊 Feature 2: One Post Per Day Limit

### Description
Users can only post once per day. The limit automatically resets at midnight.

### Behavior
- **Daily Limit**: 1 post per day
- **Reset Time**: Automatically resets every day at midnight (local time)
- **Tracking**: Stored in config.json with date stamp

### Technical Implementation
- Tracked via `dailyCounter` in config:
  ```json
  "dailyCounter": {
    "date": "2026-02-09",
    "count": 0
  }
  ```
- Auto-resets when `loadConfig()` detects new day
- Checked before every scheduled post

### User Experience
```
⏰ Scheduled post time reached!
   Daily posts used: 1/1
❌ Daily limit reached (1 post per day)
   Try again tomorrow!
```

---

## 📅 Feature 3: 5-Day Scheduler with Reconfiguration

### Description
The scheduler can only run for 5 days. On the 6th day, users must reconfigure to continue.

### Behavior
- **Maximum Days**: 5 days of scheduling
- **Day 6 Action**: Requires reconfiguration
- **Reset Process**: Simple one-click reset in CLI

### Technical Implementation
- Tracked via `schedulerDays` in config:
  ```json
  "schedulerDays": {
    "startDate": "2026-02-09",
    "daysUsed": 0
  }
  ```
- Calculates days elapsed from start date
- Blocks scheduler execution on day 6+

### User Experience

**During Scheduler Run:**
```
📅 Scheduler Days: Day 3 of 5
   2 days remaining before reconfiguration needed
```

**On Day 6:**
```
⚠️  Your 5-day scheduler period has ended!
You need to reconfigure the scheduler to continue.

? Reset scheduler for another 5 days? (Y/n)
✅ Scheduler reset! You can now use it for 5 more days.
```

**When Attempting to Post on Day 6+:**
```
❌ Scheduler period ended (5 days used)
⚠️  You need to reconfigure the scheduler for the next 5 days
   Run the setup again to continue posting
```

---

## 🔧 Configuration Storage

All features are tracked in `~/.social-poster/config.json`:

```json
{
  "platform": "twitter",
  "topic": "motivation",
  "monthlyCounter": {
    "month": 1,
    "year": 2026,
    "count": 5
  },
  "dailyCounter": {
    "date": "2026-02-09",
    "count": 0
  },
  "schedulerDays": {
    "startDate": "2026-02-09",
    "daysUsed": 0
  }
}
```

---

## 📋 Status Display

View all limits with the **View Status** option:

```
📊 Current Status:

   Platform: twitter
   Topic: motivation
   Schedule: 3 posts/week at 9:00 AM

   📅 Scheduler Days: Day 2 of 5
   3 days remaining

   📊 Daily Usage: 0/1 post today
   1 post remaining today

   📊 Monthly Usage: 5/20 posts
   15 posts remaining this month
```

---

## 🚀 How to Use

### Initial Setup
```bash
cd Documents/social
npm start
# Follow the setup wizard
```

### Check Status
```bash
npm start
# Select "📊 View Status"
```

### Reset Scheduler (Day 6+)
```bash
npm start
# System will prompt automatically if reconfiguration needed
# Or select "🔄 Reconfigure"
```

---

## 🔒 Free Tier Limits Summary

| Limit Type | Amount | Reset Period |
|------------|--------|--------------|
| Daily Posts | 1 post | Every day (midnight) |
| Scheduler Days | 5 days | Manual reset required |
| Monthly Posts | 20 posts | 1st of each month |
| AI Image Timeout | 60 seconds | Per generation |

---

## 💡 Tips

1. **Daily Limit**: Plan your post time carefully - you only get 1 per day!
2. **Scheduler Days**: Set up your 5-day schedule strategically for maximum engagement
3. **AI Images**: Use Pollinations.ai (free) for faster generation under 1 minute
4. **Monitoring**: Check status regularly to track your usage

---

## 🛠️ Technical Notes

### Auto-Reset Mechanism
- Daily counter: Resets automatically when date changes
- Monthly counter: Resets automatically on 1st of month
- Scheduler days: Requires manual reset for user awareness

### Counter Increment
- Counters only increment on **successful** post attempts
- Failed posts don't consume your daily/monthly quota
- Ensures fair usage even with technical issues

---

## 📞 Upgrade to Paid Clawlaunch

For faster AI image generation and unlimited posting:
- **Price**: Just 1-2 dollars
- **Benefits**: 
  - No timeout on AI image generation
  - Unlimited daily posts
  - Unlimited scheduler days
  - Premium AI image providers
  
Contact your administrator for upgrade details.
