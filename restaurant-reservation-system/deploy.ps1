# Quick Deployment Script
# This script helps you push your code to GitHub and trigger deployments

Write-Host "🚀 Restaurant Reservation System - Quick Deploy" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
$currentDir = Get-Location
if (-not ($currentDir.Path -like "*restaurant-reservation-system*")) {
    Write-Host "❌ Please run this script from the restaurant-reservation-system directory" -ForegroundColor Red
    exit 1
}

# Check git status
Write-Host "📊 Checking git status..." -ForegroundColor Yellow
git status

Write-Host ""
$continue = Read-Host "Do you want to commit and push changes? (y/n)"

if ($continue -ne "y") {
    Write-Host "❌ Deployment cancelled" -ForegroundColor Red
    exit 0
}

# Get commit message
Write-Host ""
$commitMessage = Read-Host "Enter commit message (or press Enter for 'Update application')"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Update application"
}

# Add all changes
Write-Host ""
Write-Host "📦 Adding files..." -ForegroundColor Yellow
git add .

# Commit
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m $commitMessage

# Push to GitHub
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Next steps:" -ForegroundColor Cyan
Write-Host "1. Vercel will automatically deploy your frontend (2-3 min)"
Write-Host "2. Render will automatically deploy your backend (3-5 min)"
Write-Host "3. Check deployment status:"
Write-Host "   - Vercel: https://vercel.com/dashboard"
Write-Host "   - Render: https://dashboard.render.com"
Write-Host ""
Write-Host "🌐 Your app will be live at:"
Write-Host "   Frontend: https://restaurant-reservation-system.vercel.app"
Write-Host "   Backend: https://restaurant-reservation-backend.onrender.com"
Write-Host ""
