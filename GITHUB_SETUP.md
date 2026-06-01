# Setup Instructions for GitHub

## Prerequisites
- Git installed on your system
- GitHub account with SSH or HTTPS credentials configured

## Step 1: Initialize Git Repository Locally

Run these commands in `C:\Users\hamdy\Madak_DSE_Automation`:

```bash
cd C:\Users\hamdy\Madak_DSE_Automation
git init
git add .
git commit -m "chore: initial project scaffold for Madark DSE API automation"
```

## Step 2: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `Madark_DSE_Automation`
3. Description: `Madark DSE API Automation Tests`
4. Choose Public or Private
5. Click "Create repository"

## Step 3: Link and Push to GitHub

After creating the repo on GitHub, run one of these commands:

**Using HTTPS:**
```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/Madark_DSE_Automation.git
git branch -M main
git push -u origin main
```

**Using SSH (recommended):**
```bash
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/Madark_DSE_Automation.git
git branch -M main
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

## Notes
- If you see a "fatal: branch rename failed" error, run: `git branch -m main` instead
- For the first push, you may be prompted to authenticate
- Make sure your git config is set:
  ```bash
  git config --global user.email "hamdymohamed3111@gmail.com"
  git config --global user.name "hamdymohamed3111@gmail.com"
  ```
