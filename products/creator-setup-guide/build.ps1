# =============================================================================
# Creator Setup Guide v1.0 – Build Script
# =============================================================================

param([switch]$SkipPDF = $false, [string]$OutputDir = "..\dist")

$ErrorActionPreference = "Stop"
$VERSION = "1.0"
$PRODUCT_NAME = "Fortnite-Nexus-Creator-Setup-Guide"
$BuildDate = Get-Date -Format "yyyy-MM-dd"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Creator Setup Guide v$VERSION Builder" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$ProductDir = $PSScriptRoot
$DistDir = Join-Path $ProductDir $OutputDir
$BuildDir = Join-Path $DistDir "$PRODUCT_NAME-v$VERSION"

if (Test-Path $BuildDir) { Remove-Item -Recurse -Force $BuildDir }
New-Item -ItemType Directory -Force -Path $BuildDir | Out-Null
New-Item -ItemType Directory -Force -Path "$BuildDir\01-Main-Guide" | Out-Null
New-Item -ItemType Directory -Force -Path "$BuildDir\02-OBS-Profile" | Out-Null
New-Item -ItemType Directory -Force -Path "$BuildDir\03-Templates" | Out-Null
New-Item -ItemType Directory -Force -Path "$BuildDir\04-Video-Modules" | Out-Null

Write-Host "[1/4] Copying Main Guide..." -ForegroundColor Green
Copy-Item "$ProductDir\Creator-Setup-Guide.md" "$BuildDir\01-Main-Guide\"
Copy-Item "$ProductDir\Monetarisierung-Strategien.md" "$BuildDir\01-Main-Guide\"

Write-Host "[2/4] Copying OBS Profile..." -ForegroundColor Green
Copy-Item -Recurse "$ProductDir\OBS-Profile\*" "$BuildDir\02-OBS-Profile\"
Copy-Item "$ProductDir\OBS-Scene-Collection.json" "$BuildDir\02-OBS-Profile\"

@"
# OBS Profile Setup

## Profile Import

1. Schliesse OBS Studio
2. Kopiere den kompletten "Fortnite-Nexus-Pro" Ordner nach:
   %APPDATA%\obs-studio\basic\profiles\
   (Pfad in den Datei-Explorer-Adressleiste eingeben)
3. Oeffne OBS
4. "Profile" Menue oben -> "Fortnite-Nexus-Pro" auswaehlen

## Scene Collection Import

1. OBS oeffnen
2. "Scene Collection" Menue oben -> "Import"
3. OBS-Scene-Collection.json auswaehlen
4. "Fortnite-Nexus-Pro" als aktive Collection setzen

## Stream-Key

Nach Import: Einstellungen -> Stream -> Stream-Key eintragen
- Twitch: dashboard.twitch.tv -> Stream Key
- YouTube: studio.youtube.com -> Live -> Stream Key

## Anpassungen

- Webcam: Source -> Eigenschaften -> Geraet auswaehlen
- Game Capture: Source -> Eigenschaften -> Fortnite auswaehlen
- Logo: ersetze "logo.png" mit deinem eigenen Logo

Bei Problemen: support@fortnitenexus.com
"@ | Out-File -Encoding UTF8 "$BuildDir\02-OBS-Profile\README.txt"

Write-Host "[3/4] Copying Templates..." -ForegroundColor Green
Copy-Item "$ProductDir\Content-Calendar.csv" "$BuildDir\03-Templates\"

@"
# Content-Templates

## Content-Calendar.csv

12-Wochen Content-Plan als CSV. 
Oeffne in Excel oder Google Sheets.

## Thumbnail-Templates (Cloud-Links in Email!)

Photoshop:
  https://fortnitenexus.com/dl/psd-thumbnail-template.psd
  
Canva (5 Templates):
  https://canva.com/template/fortnite-nexus-thumbnail-1
  https://canva.com/template/fortnite-nexus-thumbnail-2
  https://canva.com/template/fortnite-nexus-thumbnail-3
  https://canva.com/template/fortnite-nexus-thumbnail-4
  https://canva.com/template/fortnite-nexus-thumbnail-5

Diese Links bekommst du nach Kauf separat per Email,
da sie nur fuer Kaeufer verfuegbar sind.

## Discord-Server-Template

Cloud-Link in Email!
"@ | Out-File -Encoding UTF8 "$BuildDir\03-Templates\README.txt"

@"
# Video-Module (10 Module, 3h total)

Die Video-Module werden via privaten YouTube-Links bereitgestellt.

Du erhaelst direkt nach Kauf eine Email mit:
- 10 private YouTube-Links
- Login-Daten fuer den Member-Bereich
- Discord-Channel-Zugang fuer Q&A

## Module-Inhalt

01 - OBS Installation (15 Min)
02 - Audio Setup mit VoiceMeeter (20 Min)
03 - Scene-Design fuer Fortnite (25 Min)
04 - Thumbnail-Workflow (15 Min)
05 - Content-Strategie (15 Min)
06 - Erste Einnahmen (Monetarisierung) (20 Min)
07 - Pre-Stream Checklist (10 Min)
08 - Streaming-Psychologie (Tilt-Management) (20 Min)
09 - Multistream auf YouTube + Twitch + Kick (15 Min)
10 - Sponsorship-Akquise (25 Min)

Total: ~3 Stunden Content

Bei Problemen mit den Links: support@fortnitenexus.com
"@ | Out-File -Encoding UTF8 "$BuildDir\04-Video-Modules\README.txt"

# Main README
@"
# Fortnite Nexus – Creator Setup Guide v$VERSION

Vielen Dank fuer deinen Kauf!

## Was ist drin?

01-Main-Guide/
   - Creator-Setup-Guide.md (45 Seiten Hauptguide)
   - Monetarisierung-Strategien.md

02-OBS-Profile/
   - basic.ini (OBS Profile)
   - OBS-Scene-Collection.json (Importable)
   - README.txt (Setup-Anleitung)

03-Templates/
   - Content-Calendar.csv (12-Wochen Plan)
   - README.txt (Cloud-Links fuer Templates)

04-Video-Modules/
   - README.txt (YouTube-Links zu 10 Video-Modulen)

## Quick Start

1. Lese 01-Main-Guide/Creator-Setup-Guide.md
2. Importiere 02-OBS-Profile (OBS-Setup)
3. Schaue Video-Module 1-3 (erste 60 Min)
4. Plane Stream-Schedule mit Content-Calendar
5. Lies Monetarisierung-Strategien zum Verstaendnis

## 7-Tage Onboarding

Tag 1: OBS-Setup + Audio
Tag 2: Scene-Design
Tag 3: Thumbnail-Workflow
Tag 4: Content-Planung
Tag 5: Monetarisierung-Setup
Tag 6: Test-Stream
Tag 7: First Stream!

## Support

- Email: support@fortnitenexus.com
- Discord: discord.gg/fortnitenexus -> #creator-support

## Lifetime Updates

Jede neue OBS-Version, Plattform-Aenderung etc. wird per Email gesendet.

(c) 2026 Fortnite Nexus
Code "nexus" im Item Shop = Support 💜

Build: $BuildDate
"@ | Out-File -Encoding UTF8 "$BuildDir\README.txt"

# License
@"
# Lizenz - Creator Setup Guide v$VERSION

(c) 2026 Fortnite Nexus
Personal Use Only.

Erlaubt: Persoenliche Nutzung, eigene Streams
Nicht erlaubt: Weiterverkauf, Public Hosting, Plagiat

Bei Verstoessen: rechtliche Schritte.
Kontakt: legal@fortnitenexus.com

Build-Date: $BuildDate
"@ | Out-File -Encoding UTF8 "$BuildDir\LICENSE.txt"

# PDF
if (-not $SkipPDF -and (Get-Command pandoc -ErrorAction SilentlyContinue)) {
    Write-Host "  -> PDF gen..." -ForegroundColor Gray
    pandoc "$ProductDir\Creator-Setup-Guide.md" -o "$BuildDir\01-Main-Guide\Creator-Setup-Guide.pdf" --pdf-engine=xelatex --toc 2>$null
    pandoc "$ProductDir\Monetarisierung-Strategien.md" -o "$BuildDir\01-Main-Guide\Monetarisierung-Strategien.pdf" --pdf-engine=xelatex --toc 2>$null
}

Write-Host "[4/4] Creating ZIP..." -ForegroundColor Green
$ZipFile = Join-Path $DistDir "$PRODUCT_NAME-v$VERSION.zip"
if (Test-Path $ZipFile) { Remove-Item -Force $ZipFile }
Compress-Archive -Path "$BuildDir\*" -DestinationPath $ZipFile -CompressionLevel Optimal
Remove-Item -Recurse -Force $BuildDir

$ZipSize = [math]::Round((Get-Item $ZipFile).Length / 1024, 2)
Write-Host ""
Write-Host "Build complete!" -ForegroundColor Green
Write-Host "  Output: $ZipFile" -ForegroundColor White
Write-Host "  Size:   $ZipSize KB" -ForegroundColor White
