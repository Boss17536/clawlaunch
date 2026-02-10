# 🚀 ClawLaunch - Quick Reference Guide

## 📍 Project Location
**Full Path:** `C:\Users\Boss\Documents\clawlaunch`

---

## 📁 Folder Structure

### Main Folders:
- **`app/`** - Next.js website code (deployed at clawlaunch.linkpc.net)
- **`cli/`** - Command-line interface tool
- **`components/`** - React components for the website
- **`public/`** - Static assets (images, icons, etc.)

### Important Files:
- **`package.json`** - Main project dependencies
- **`README.md`** - Full documentation
- **`GUIDE.md`** - User guide for ClawLaunch
- **`firebase.json`** - Firebase hosting configuration

---

## 🛠️ How to Use the CLI

### Step 1: Install Dependencies
```bash
cd C:\Users\Boss\Documents\clawlaunch
npm install
```

### Step 2: Link Globally (One-time setup)
```bash
npm link
```

### Step 3: Use ClawLaunch Commands
```bash
clawlaunch init              # Setup wizard
clawlaunch start             # Start scheduler
clawlaunch test              # Test post now
clawlaunch status            # View config
clawlaunch help              # Show all commands
```

---

## 🌐 Website Development

### Run Development Server:
```bash
cd C:\Users\Boss\Documents\clawlaunch
npm run dev
```
Then open: http://localhost:3000

### Build for Production:
```bash
npm run build
```

### Deploy to Firebase:
```bash
firebase deploy
```

---

## 📝 Quick Commands

### Work on CLI:
```bash
cd C:\Users\Boss\Documents\clawlaunch\cli
# Edit files in cli/bin/ or cli/src/
```

### Work on Website:
```bash
cd C:\Users\Boss\Documents\clawlaunch
# Edit app/page.tsx for homepage
# Edit components/ for React components
```

### Update GitHub:
```bash
git add .
git commit -m "your message"
git push origin main
```

---

## 🔗 Important Links

- **Website:** https://clawlaunch.linkpc.net
- **Firebase:** https://clawlaunch.web.app
- **GitHub:** https://github.com/Boss17536/clawlaunch
- **Firebase Console:** https://console.firebase.google.com/project/clawlaunch/overview

---

## 💡 Tips

1. After `npm link`, you can use `clawlaunch` from ANY directory
2. Your website auto-deploys when you push to GitHub (via GitHub Actions)
3. Keep this folder safe - it's your main project!

---

## 📞 Contact Info

- **WhatsApp:** https://wa.me/qr/S7LSJDGF4NFTC1
- **Email:** boss.927262@gmail.com

---

**Last Updated:** 2026-02-10
