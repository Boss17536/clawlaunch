# 🚀 Daemon Mode Guide

Run Social Poster in the background without keeping a terminal open.

## Quick Start

### Option 1: PM2 (Recommended)

PM2 is a production-ready process manager for Node.js applications.

```bash
# Install PM2 globally
npm install -g pm2

# Start daemon mode
pm2 start ecosystem.config.js

# View status
pm2 status

# View logs
pm2 logs social-poster

# Stop daemon
pm2 stop social-poster

# Restart daemon
pm2 restart social-poster

# Auto-start on system boot
pm2 startup
pm2 save
```

### Option 2: Direct Node

Run the daemon script directly:

```bash
node bin/daemon.js
```

Keep the process running in background:

```bash
# Using nohup (Linux/Mac)
nohup node bin/daemon.js > ~/.social-poster/daemon.log 2>&1 &

# Using screen (Linux/Mac)
screen -S social-poster
node bin/daemon.js
# Press Ctrl+A then D to detach

# Reattach to screen
screen -r social-poster
```

### Option 3: Systemd (Linux)

Create a systemd service:

```bash
# Create service file
sudo nano /etc/systemd/system/social-poster.service
```

Add this content (replace `YOUR_USERNAME` and `/path/to/social-poster`):

```ini
[Unit]
Description=Social Poster Scheduler
After=network.target

[Service]
Type=simple
User=YOUR_USERNAME
WorkingDirectory=/path/to/social-poster
ExecStart=/usr/bin/node /path/to/social-poster/bin/daemon.js
Restart=always
RestartSec=10
StandardOutput=append:/home/YOUR_USERNAME/.social-poster/daemon.log
StandardError=append:/home/YOUR_USERNAME/.social-poster/daemon-error.log

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable social-poster
sudo systemctl start social-poster

# Check status
sudo systemctl status social-poster

# View logs
journalctl -u social-poster -f
```

## Monitoring

### PM2 Monitoring

```bash
# Real-time monitoring
pm2 monit

# Process list
pm2 list

# Detailed info
pm2 info social-poster
```

### Log Files

All activity is logged to:
- Main log: `~/.social-poster/logs.txt`
- PM2 logs: `~/.social-poster/pm2-out.log` and `~/.social-poster/pm2-error.log`

View recent activity:

```bash
# View main log
tail -f ~/.social-poster/logs.txt

# View PM2 logs
pm2 logs social-poster
```

## Troubleshooting

### Daemon won't start

1. Check configuration exists:
   ```bash
   cat ~/.social-poster/config.json
   ```

2. If not, run setup first:
   ```bash
   social-poster
   ```

3. Check logs for errors:
   ```bash
   pm2 logs social-poster --lines 50
   ```

### Posts not triggering

1. Verify scheduler is running:
   ```bash
   pm2 status
   ```

2. Check monthly limit:
   ```bash
   # View config and counter
   cat ~/.social-poster/config.json
   ```

3. Check timezone settings:
   - Ensure timezone in config matches your system

### High memory usage

```bash
# Restart to clear memory
pm2 restart social-poster

# Set memory limit in ecosystem.config.js
max_memory_restart: '200M'
```

## Best Practices

1. **Test First**: Always test with `social-poster` interactive mode before enabling daemon mode

2. **Monitor Logs**: Regularly check logs to ensure posts are triggering

3. **Check Limits**: Keep an eye on monthly usage (20 posts/month free tier)

4. **Browser Login**: Ensure you're logged into Twitter/LinkedIn in your default browser

5. **Auto-Start**: Use PM2's startup feature to auto-start on system boot

## Configuration Changes

If you need to change settings:

1. Stop daemon:
   ```bash
   pm2 stop social-poster
   ```

2. Run interactive setup:
   ```bash
   social-poster
   ```

3. Restart daemon:
   ```bash
   pm2 restart social-poster
   ```

## Uninstall

```bash
# Stop and delete from PM2
pm2 stop social-poster
pm2 delete social-poster

# Remove PM2 startup script
pm2 unstartup

# Remove config (optional)
rm -rf ~/.social-poster
```
