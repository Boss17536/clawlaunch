# Fix npm Publish - Enable 2FA

## The Error
```
403 Forbidden - Two-factor authentication or granular access token with bypass 2fa enabled is required
```

## Solution: Enable 2FA on npm

### Step 1: Install Authenticator App
Download one of these on your phone:
- **Google Authenticator** (iOS/Android)
- **Authy** (iOS/Android)
- **Microsoft Authenticator** (iOS/Android)

### Step 2: Enable 2FA on npm

**Option A: Via Website (Easier)**
1. Go to https://www.npmjs.com/settings/~/profile
2. Login to your npm account
3. Click "Enable 2FA" or "Two-Factor Authentication"
4. Choose **"Authorization and Publishing"** (not just Authorization Only)
5. Scan the QR code with your authenticator app
6. Enter the 6-digit code from the app
7. Save the backup codes!

**Option B: Via Command Line**
```bash
npm profile enable-2fa auth-and-writes
```
Then follow the prompts to scan QR code.

### Step 3: Publish Again
After enabling 2FA, publish with:

```bash
cd C:\Users\Boss\Documents\clawlaunch\cli
npm publish
```

You'll be asked for a **One-Time Password (OTP)** - get it from your authenticator app.

---

## Alternative: Use Access Token (Advanced)

If you don't want to use 2FA every time:

### 1. Create Access Token
```bash
npm token create --cidr=0.0.0.0/0
```

Choose:
- **Automation** type
- Read and **Publish** permissions

### 2. Login with Token
```bash
npm login
```
When asked for password, paste the token instead.

### 3. Publish
```bash
npm publish
```

---

## Still Have Issues?

### "Invalid bin scripts" Warning
This is just a warning, ignore it. npm auto-corrected it.

### To fix the warning permanently:
```bash
cd C:\Users\Boss\Documents\clawlaunch\cli
npm pkg fix
```

This will update your package.json automatically.

---

## After Successful Publish 🎉

Your package will be live at:
```
https://www.npmjs.com/package/clawlaunch-cli
```

Users can install with:
```bash
npm install -g clawlaunch-cli
clawlaunch init
```

---

**Next Step:** Enable 2FA on npm and publish again! 🚀
