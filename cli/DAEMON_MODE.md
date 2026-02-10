# 🔄 Daemon Mode - Run Social Poster in Background

This guide explains how to run Social Poster as a background daemon process using **PM2**, so it keeps running even after you close your terminal.

---

## 📦 Install PM2

PM2 is a production process manager for Node.js applications.

```bash
npm install -g pm2
```

---

## 🚀 Start Social Poster as a Daemon

### 1. Start the scheduler in daemon mode:

```bash
pm2 start "social-poster" --name "social-poster-scheduler"
```

Or if running from the project directory:

```bash
pm2 start bin/cli.js --name "social-poster-scheduler" --no-autorestart
```

### 2. View running processes:

```bash
pm2 list
```

### 3. View logs in real-time:

```bash
pm2 logs social-poster-scheduler
```

### 4. Stop the daemon:

```bash
pm2 stop social-poster-scheduler
```

### 5. Restart the daemon:

```bash
pm2 restart social-poster-scheduler
```

### 6. Delete the process:

```bash
pm2 delete social-poster-scheduler
```

---

## 🔧 Advanced Configuration

### Make PM2 start on system boot:

```bash
pm2 startup
```

Follow the instructions shown in the terminal.

### Save current PM2 process list:

```bash
pm2 save
```

This ensures Social Poster automatically restarts after a system reboot.

---

## 📊 Monitoring

### View process details:

```bash
pm2 show social-poster-scheduler
```

### Monitor CPU and memory usage:

```bash
pm2 monit
```

---

## 🛠️ Troubleshooting

### Check if the scheduler is running:

```bash
pm2 list
```

Look for "social-poster-scheduler" in the list.

### View error logs:

```bash
pm2 logs social-poster-scheduler --err
```

### Restart if it crashes:

```bash
pm2 restart social-poster-scheduler
```

---

## 📝 Example PM2 Ecosystem File

Create a file called `ecosystem.config.js` in your project root:

```javascript
module.exports = {
  apps: [{
    name: 'social-poster-scheduler',
    script: './bin/cli.js',
    instances: 1,
    autorestart: false,
    watch: false,
    max_memory_restart: '200M',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

Then start with:

```bash
pm2 start ecosystem.config.js
```

---

## ✅ Best Practices

1. **Check logs regularly**: Monitor `~/.social-poster/logs.txt` or use `pm2 logs`
2. **Monitor monthly limit**: Run `social-poster` menu to check usage
3. **Update the scheduler**: Restart PM2 process after reconfiguration
4. **Backup config**: Your config is in `~/.social-poster/config.json`

---

## 🔒 Security Note

- PM2 runs as your user account
- Config file with encrypted API keys is stored in `~/.social-poster/`
- Images are cached in `~/.social-poster/images/`

---

## 📞 Quick Commands Cheatsheet

| Command | Description |
|---------|-------------|
| `pm2 start "social-poster" --name "social-poster-scheduler"` | Start daemon |
| `pm2 stop social-poster-scheduler` | Stop daemon |
| `pm2 restart social-poster-scheduler` | Restart daemon |
| `pm2 logs social-poster-scheduler` | View logs |
| `pm2 list` | List all processes |
| `pm2 delete social-poster-scheduler` | Remove process |
| `pm2 save` | Save process list |
| `pm2 startup` | Enable startup on boot |

---

**Happy automated posting! 🚀**
