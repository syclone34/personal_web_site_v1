# Portfolio Update Script
# Run this after deploying to automatically update your portfolio website

param(
    [Parameter(Mandatory=$true)]
    [string]$FrontendUrl,
    
    [Parameter(Mandatory=$false)]
    [string]$GithubRepo = "https://github.com/syclone34/restaurant-reservation-system"
)

Write-Host "🎨 Updating Portfolio Website" -ForegroundColor Cyan
Write-Host ""

# Validate URL
if (-not ($FrontendUrl -match "^https?://")) {
    Write-Host "❌ Error: Please provide a valid URL starting with http:// or https://" -ForegroundColor Red
    Write-Host "Example: .\update-portfolio.ps1 -FrontendUrl 'https://restaurant-reservation-system.vercel.app'" -ForegroundColor Yellow
    exit 1
}

# Path to index.html
$indexPath = "..\index.html"

if (-not (Test-Path $indexPath)) {
    Write-Host "❌ Error: Could not find index.html at $indexPath" -ForegroundColor Red
    exit 1
}

# Read the file
$content = Get-Content $indexPath -Raw

# Create the new project links HTML
$newLinks = @"
                        <div class="project-links">
                            <a href="$FrontendUrl" target="_blank" rel="noopener noreferrer" class="project-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                            <a href="$GithubRepo" target="_blank" rel="noopener noreferrer" class="project-link"><i class="fab fa-github"></i> View Code</a>
                        </div>
"@

# Find and replace the Restaurant Reservation System project links
$pattern = '(?s)(<h3>Restaurant Reservation System</h3>.*?)<div class="project-links">.*?</div>'
$replacement = "`$1$newLinks"

if ($content -match $pattern) {
    $content = $content -replace $pattern, $replacement
    
    # Write back to file
    Set-Content -Path $indexPath -Value $content -NoNewline
    
    Write-Host "✅ Successfully updated portfolio!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Changes made:" -ForegroundColor Yellow
    Write-Host "   - Live Demo: $FrontendUrl" -ForegroundColor White
    Write-Host "   - GitHub: $GithubRepo" -ForegroundColor White
    Write-Host ""
    Write-Host "🚀 Next steps:" -ForegroundColor Cyan
    Write-Host "   1. Review the changes in index.html"
    Write-Host "   2. Test your portfolio website locally"
    Write-Host "   3. Commit and push to GitHub:"
    Write-Host "      cd .."
    Write-Host "      git add index.html"
    Write-Host "      git commit -m 'Add live demo link for restaurant reservation system'"
    Write-Host "      git push origin main"
    Write-Host ""
} else {
    Write-Host "⚠️  Warning: Could not find the Restaurant Reservation System section" -ForegroundColor Yellow
    Write-Host "   Please update index.html manually with these links:" -ForegroundColor White
    Write-Host ""
    Write-Host "   Live Demo: $FrontendUrl" -ForegroundColor Cyan
    Write-Host "   GitHub: $GithubRepo" -ForegroundColor Cyan
    Write-Host ""
}
