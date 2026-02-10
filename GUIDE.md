# 📖 ClawLaunch: Step-by-Step Automation Guide

Welcome to the official guide for **ClawLaunch**. This document will walk you through setting up your social media automation from scratch.

---

## 🏁 Phase 1: Preparation

Before you begin, ensure you have the following:

1.  **Node.js (v14 or higher)** installed on your machine.
2.  Active accounts on **LinkedIn** and/or **X.com** (Twitter).
3.  Your browser logged into these accounts (ClawLaunch uses your active sessions).

---

## 🛠️ Phase 2: Installation

You don't need to install anything globally if you use this command. Just run:

```bash
npm install clawlaunch-cli && clawlaunch init
```

### What happens during Init?

1.  **Platform Selection**: Choose where you want to grow (LinkedIn or X).
2.  **Topic Focus**: Pick a niche (Tech, Motivation, Fitness, etc.) so the AI can generate relevant content.
3.  **Frequency**: Decide how many days a week you want to post.
4.  **Timing**: Set your preferred posting time (e.g., 9:00 AM).
5.  **AI Images**: Enable this if you want beautiful visuals generated automatically.

---

## 🤖 Phase 3: The Automation Loop

ClawLaunch works on a "Safety First" principle. It prepares the post for you, but **you** click the final "Post" button. This prevents accounts from being flagged as bots.

### 1. Start the Daemon

To keep the scheduler running in the background:

```bash
npx clawlaunch-cli daemon
```

You can also specify the platform directly:

```bash
npm install clawlaunch-cli && clawlaunch init --platform=linkedin
```

### 2. The Notification

When it's time to post, ClawLaunch will:

1.  Generate a high-quality post using its internal AI templates.
2.  Generate an AI image (if enabled).
3.  **Automatically open your browser** with the post content pre-filled.

### 3. One-Click Publish

Review the content in the browser and hit **"Post"**. You're done!

---

## 📊 Phase 4: Monitoring

Check your usage and limits anytime:

```bash
npx clawlaunch-cli status
```

- **Daily Limit**: 1 post per day.
- **Monthly Limit**: 20 posts per month (Free Tier).
- **Scheduler Life**: For security, the scheduler runs in 5-day periods. Every 6th day, just run `status` or `init` to refresh it.

---

## 💡 Pro Tips

- **Custom Templates**: You can add your own personality by editing `~/.social-poster/config.json`.
- **Niche Down**: The more specific your topic, the better the AI performs.
- **Consistency**: Posting 3 times a week consistently is better than 5 times once and then stopping.

---

## ❓ Troubleshooting

### Browser not opening?

Ensure you don't have a popup blocker preventing the CLI from launching the URL.

### AI Images taking long?

High-quality images can take up to 30 seconds to generate. Be patient!

---

<div align="center">
  <p>Ready to launch? Run <code>npx clawlaunch-cli init</code> now!</p>
</div>
