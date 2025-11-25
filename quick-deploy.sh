#!/bin/bash

# Quick deployment script for updates
# Use this after initial setup for quick deployments

set -e

echo "🔄 Quick Deploy Starting..."

# Pull latest changes
git pull origin main

# Install dependencies
npm ci

# Build application
npm run build

# Restart with PM2
pm2 restart aurevion-pharma

echo "✅ Deployment complete!"
pm2 status aurevion-pharma
