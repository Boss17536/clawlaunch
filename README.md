<div align="center">

# 🚀 ClawLaunch

### The Ultimate Social Media Automation for Developers

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://npmjs.org/package/clawlaunch-cli)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-checked.svg)](https://nodejs.org)

[Features](#-features) • [Quick Start](#-quick-start) • [Configuration](#-configuration) • [Documentation](#-documentation)

</div>

---

## 🔥 Why ClawLaunch?

ClawLaunch isn't just another scheduler. It's a **developer-first CLI tool** designed to automate your presence on **LinkedIn** and **X.com** without leaving your terminal.

- **Zero API Keys Required**: Uses browser automation to post safely.
- **AI Powered**: Generate engaging posts and images on the fly.
- **Local & Secure**: Your data lives on your machine, not in the cloud.
- **Premium UI**: Comes with a beautiful dashboard to manage configs.

## ✨ Features

- 🤖 **Automated Scheduler**: Set it and forget it with intelligent cron jobs.
- 📝 **AI Content Generation**: Create viral hooks and threads automatically.
- 🎨 **Image Generation**: Attach AI-generated visuals to your posts.
- 🔒 **Safe Mode**: Respects platform limits to keep your account safe.
- 📊 **Analytics (Coming Soon)**: Track your growth directly from the CLI.

## 🚀 Quick Start

### 1. Initialize

You don't need to install anything globally. Just run this one-liner:

```bash
npx -y clawlaunch-cli init
```

You can also specify the platform directly:

```bash
npx -y clawlaunch-cli init --platform=linkedin
```

### 2. Start Scheduling

Once configured, start the background daemon to handle posting.

```bash
npx clawlaunch-cli daemon
```

### 3. One-Off Post

Want to post immediately?

```bash
npx clawlaunch-cli post "Just shipped a new feature! 🚀 #coding #startup"
```

## 🛠️ Configuration

Your configuration is stored locally at `~/.social-poster/config.json`. You can edit it manually or use the `init` command.

```json
{
  "platform": "linkedin",
  "topic": "web development",
  "postsPerWeek": 3,
  "postingTime": "09:00 AM",
  "enableAIImages": true
}
```

## 📦 Installation (From Source)

If you want to contribute or run the latest dev version:

1.  **Clone the repo**

    ```bash
    git clone https://github.com/Boss17536/clawlaunch.git
    cd clawlaunch
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Run the CLI**
    ```bash
    node cli/bin/cli.js
    ```

## 🤝 Contributing

We love builders! Feel free to open issues or PRs.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

<div align="center">
  <p>Built with ❤️ by the ClawLaunch Team</p>
</div>
