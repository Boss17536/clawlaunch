# ClawLaunch - Easy Installation Guide for Users

## Quick Install (Recommended) ⚡

```bash
npm install -g clawlaunch-cli
```

That's it! Now you can use:
```bash
clawlaunch init
clawlaunch start
```

---

## Step-by-Step Installation

### 1. Install Node.js (if you don't have it)
- Download from: https://nodejs.org/
- Choose "LTS" version
- Run the installer

### 2. Install ClawLaunch
Open your terminal (Command Prompt on Windows, Terminal on Mac/Linux) and run:

```bash
npm install -g clawlaunch-cli
```

### 3. Run ClawLaunch
```bash
clawlaunch init
```

Follow the 7 simple questions, and you're done! 🎉

---

## Available Commands

After installation, use these simple commands:

```bash
clawlaunch init          # Setup wizard
clawlaunch start         # Start the scheduler
clawlaunch test          # Test a post immediately
clawlaunch status        # View your configuration
clawlaunch daemon        # Run in background
clawlaunch help          # Show all commands
```

---

## Troubleshooting

### "npm is not recognized"
- You need to install Node.js first: https://nodejs.org/

### "Permission denied" (Mac/Linux)
Try with sudo:
```bash
sudo npm install -g clawlaunch-cli
```

### "Command not found: clawlaunch"
1. Close and reopen your terminal
2. Or add npm global bin to your PATH

### Still having issues?
Open an issue: https://github.com/Boss17536/clawlaunch/issues

---

## Alternative: Use without Installation

Don't want to install? Use `npx`:

```bash
npx clawlaunch-cli init
npx clawlaunch-cli start
```

---

## What Happens After Setup?

1. **Browser opens** at your scheduled time
2. **Post is pre-filled** with content
3. **You click "Post"** manually (1 click!)
4. Done! 🎉

100% safe and compliant with platform ToS.

---

## Uninstall

If you want to remove ClawLaunch:

```bash
npm uninstall -g clawlaunch-cli
```

Your configuration is saved in `~/.social-poster/` and won't be deleted automatically.
