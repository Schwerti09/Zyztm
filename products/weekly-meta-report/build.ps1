# =============================================================================
# Weekly Meta Report v1.0 – Build Script
# =============================================================================

param([switch]$SkipPDF = $false, [string]$OutputDir = "..\dist")

$ErrorActionPreference = "Stop"
$VERSION = "1.0"
$PRODUCT_NAME = "Fortnite-Nexus-Weekly-Meta-Report-Welcome-Pack"
$BuildDate = Get-Date -Format "yyyy-MM-dd"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Weekly Meta Report Welcome Pack" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$ProductDir = $PSScriptRoot
$DistDir = Join-Path $ProductDir $OutputDir
$BuildDir = Join-Path $DistDir "$PRODUCT_NAME-v$VERSION"

if (Test-Path $BuildDir) { Remove-Item -Recurse -Force $BuildDir }
New-Item -ItemType Directory -Force -Path $BuildDir | Out-Null

Write-Host "[1/2] Copying files..." -ForegroundColor Green
Copy-Item "$ProductDir\Subscription-Welcome.md" $BuildDir
Copy-Item "$ProductDir\Sample-Issue-001.md" $BuildDir
Copy-Item "$ProductDir\Email-Template.html" $BuildDir

@"
# Fortnite Nexus – Weekly Meta Report

Welcome! Dein Abo ist aktiv.

## Was ist im Pack?

- **Subscription-Welcome.md** - Onboarding-Anleitung
- **Sample-Issue-001.md** - Beispiel-Report (so siehst du was kommt)
- **Email-Template.html** - Wie der Report in deiner Email aussieht

## Naechster Report

**Dienstag, 28. April 2026, 18:00 Uhr**

Du bekommst ihn automatisch per Email.

## Discord-Beitritt

Premium-Channels nur fuer Subscriber:
1. discord.gg/fortnitenexus
2. In #welcome -> "Meta Report Subscriber"
3. Mit Bestellnummer
4. Mod gibt dir Premium-Rolle binnen 24h

## Subscription-Management

- Update Email: fortnitenexus.com/account
- Pause: 1-4 Wochen moeglich
- Kuendigen: jederzeit

## Bei Fragen

- Email: support@fortnitenexus.com
- Discord: discord.gg/fortnitenexus

(c) 2026 Fortnite Nexus
Code "nexus" 💜

Build: $BuildDate
"@ | Out-File -Encoding UTF8 "$BuildDir\README.txt"

Write-Host "[2/2] Creating ZIP..." -ForegroundColor Green
$ZipFile = Join-Path $DistDir "$PRODUCT_NAME-v$VERSION.zip"
if (Test-Path $ZipFile) { Remove-Item -Force $ZipFile }
Compress-Archive -Path "$BuildDir\*" -DestinationPath $ZipFile -CompressionLevel Optimal
Remove-Item -Recurse -Force $BuildDir

$ZipSize = [math]::Round((Get-Item $ZipFile).Length / 1024, 2)
Write-Host ""
Write-Host "Build complete!" -ForegroundColor Green
Write-Host "  Output: $ZipFile" -ForegroundColor White
Write-Host "  Size:   $ZipSize KB" -ForegroundColor White
