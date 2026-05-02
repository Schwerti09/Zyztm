# =============================================================================
# Season Checklist v2.1 – Build Script
# =============================================================================

param(
    [switch]$SkipPDF = $false,
    [string]$OutputDir = "..\dist"
)

$ErrorActionPreference = "Stop"
$VERSION = "S2.1"
$PRODUCT_NAME = "Fortnite-Nexus-Season-Checklist"
$BuildDate = Get-Date -Format "yyyy-MM-dd"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Season Checklist $VERSION Builder" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$ProductDir = $PSScriptRoot
$DistDir = Join-Path $ProductDir $OutputDir
$BuildDir = Join-Path $DistDir "$PRODUCT_NAME-$VERSION"

if (Test-Path $BuildDir) {
    Remove-Item -Recurse -Force $BuildDir
}

New-Item -ItemType Directory -Force -Path $BuildDir | Out-Null

Write-Host "[1/3] Copying files..." -ForegroundColor Green

Copy-Item "$ProductDir\Season-Checklist.md" $BuildDir
Copy-Item "$ProductDir\XP-Optimization-Guide.md" $BuildDir
Copy-Item "$ProductDir\Secret-Missions-Map.md" $BuildDir
Copy-Item "$ProductDir\Notion-Template-Link.txt" $BuildDir
Copy-Item "$ProductDir\Weekly-Quest-Tracker.csv" $BuildDir

# README
@"
# Fortnite Nexus – Season Checklist v$VERSION

Vielen Dank fuer deinen Kauf!

## Was ist drin?

- **Season-Checklist.md** - Alle Battle Pass Tiers + Missions
- **XP-Optimization-Guide.md** - Wie du Level 200 in halber Zeit erreichst
- **Secret-Missions-Map.md** - Alle Hidden-Mission Lokationen
- **Notion-Template-Link.txt** - Link zum interaktiven Notion-Template
- **Weekly-Quest-Tracker.csv** - Excel/Google-Sheets-Tracker

## Quick Start

1. Oeffne **Season-Checklist.md** und drucke sie ggf. aus
2. Lies **XP-Optimization-Guide.md** fuer den optimalen Tagesplan
3. Klicke den **Notion-Template-Link.txt** und dupliziere das Template
4. Oeffne **Weekly-Quest-Tracker.csv** in Excel oder Google Sheets

## Lifetime-Updates

Du bekommst automatisch jede Season die neue Version per Email.
Falls du keine Email erhaelst: support@fortnitenexus.com

## Code "nexus" im Item Shop = Support den Channel!

(c) 2026 Fortnite Nexus
"@ | Out-File -Encoding UTF8 "$BuildDir\README.txt"

# License
@"
# Lizenz - Season Checklist v$VERSION

(c) 2026 Fortnite Nexus

Personal Use Only.
Not affiliated with Epic Games.

Erlaubt: Persoenliche Nutzung, Backup
Nicht erlaubt: Weiterverkauf, Public Hosting

Bei Verstoessen: rechtliche Schritte.

Build: $BuildDate
"@ | Out-File -Encoding UTF8 "$BuildDir\LICENSE.txt"

# PDF
if (-not $SkipPDF -and (Get-Command pandoc -ErrorAction SilentlyContinue)) {
    Write-Host "[2/3] Generating PDFs..." -ForegroundColor Green
    pandoc "$ProductDir\Season-Checklist.md" -o "$BuildDir\Season-Checklist.pdf" --pdf-engine=xelatex --toc 2>$null
    pandoc "$ProductDir\XP-Optimization-Guide.md" -o "$BuildDir\XP-Optimization-Guide.pdf" --pdf-engine=xelatex --toc 2>$null
    pandoc "$ProductDir\Secret-Missions-Map.md" -o "$BuildDir\Secret-Missions-Map.pdf" --pdf-engine=xelatex 2>$null
} else {
    Write-Host "[2/3] PDF skipped (pandoc not available or -SkipPDF flag)" -ForegroundColor Yellow
}

Write-Host "[3/3] Creating ZIP..." -ForegroundColor Green
$ZipFile = Join-Path $DistDir "$PRODUCT_NAME-$VERSION.zip"

if (Test-Path $ZipFile) {
    Remove-Item -Force $ZipFile
}

Compress-Archive -Path "$BuildDir\*" -DestinationPath $ZipFile -CompressionLevel Optimal
Remove-Item -Recurse -Force $BuildDir

$ZipSize = [math]::Round((Get-Item $ZipFile).Length / 1024, 2)

Write-Host ""
Write-Host "Build complete!" -ForegroundColor Green
Write-Host "  Output: $ZipFile" -ForegroundColor White
Write-Host "  Size:   $ZipSize KB" -ForegroundColor White
