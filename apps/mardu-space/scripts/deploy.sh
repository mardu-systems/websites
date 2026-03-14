#!/bin/bash

# Deployment Helper Script for Hostinger VPS (Ubuntu/Debian)
# Usage: ./scripts/deploy.sh

echo "🚀 Starting Deployment..."

# 1. Pull latest changes
echo "📥 Pulling latest code from git..."
git pull origin main

# 2. Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# 3. Generate Prisma Client
echo "🗄️ Generating Prisma Client..."
npx prisma generate

# 4. Migrate Database (Production)
echo "🔄 Running Database Migrations..."
# Ensure DATABASE_URL is set in .env
npx prisma migrate deploy

# 5. Build Next.js App
echo "🏗️ Building Application..."
npm run build

# 6. Restart PM2 Process
echo "🔁 Restarting App..."
# Assuming app is managed by PM2 with name "mardu"
# If not started yet, run: pm2 start npm --name "mardu" -- start
pm2 restart mardu || pm2 start npm --name "mardu" -- start

echo "✅ Deployment Complete!"
