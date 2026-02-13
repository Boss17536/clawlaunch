# Publishing ClawLaunch to npm

## Prerequisites

1. **Create an npm account**: https://www.npmjs.com/signup
2. **Login to npm** on your terminal:
   ```bash
   npm login
   ```

## Publishing Steps

### Option 1: Publish the CLI Package Separately (Recommended)

This publishes just the CLI tool as `clawlaunch-cli`:

```bash
cd Documents/clawlaunch/cli
npm publish
```

**Users install with:**
```bash
npm install -g clawlaunch-cli
clawlaunch init
clawlaunch start
```

### Option 2: Publish the Full Package

This publishes everything including the Next.js website:

```bash
cd Documents/clawlaunch
npm publish
```

**Users install with:**
```bash
npm install -g clawlaunch
clawlaunch init
clawlaunch start
```

## Updating the Package

When you make changes:

1. **Update version** in `package.json`:
   ```json
   "version": "1.0.1"  // Increment this
   ```

2. **Publish the update**:
   ```bash
   npm publish
   ```

## Version Guidelines

- **Patch** (1.0.0 → 1.0.1): Bug fixes
- **Minor** (1.0.0 → 1.1.0): New features (backward compatible)
- **Major** (1.0.0 → 2.0.0): Breaking changes

## Troubleshooting

### "Package name already exists"
If `clawlaunch-cli` is taken, choose a different name:
```json
"name": "@yourusername/clawlaunch"
```

Then publish with:
```bash
npm publish --access public
```

### "You must verify your email"
Check your npm account email and verify it.

### "402 Payment Required"
This means the package name is reserved. Choose a different name.

## Recommended: Use Scoped Package

To avoid name conflicts, use your npm username:

```json
{
  "name": "@boss17536/clawlaunch",
  "version": "1.0.0"
}
```

**Users install with:**
```bash
npm install -g @boss17536/clawlaunch
clawlaunch init
```

## What Gets Published

Only files **not** in `.npmignore` are published:
- ✅ `bin/` folder (CLI executables)
- ✅ `src/` folder (source code)
- ✅ `scripts/` folder
- ✅ `README.md`
- ✅ `package.json`
- ❌ Test files
- ❌ Documentation (except README)
- ❌ `.env` files
- ❌ `node_modules/`

## After Publishing

1. **Test the installation**:
   ```bash
   npm install -g clawlaunch-cli
   clawlaunch --version
   ```

2. **Update your GitHub README** with the new installation command

3. **Announce it** to your audience! 🎉
