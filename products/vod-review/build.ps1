# =============================================================================
# VOD Review Service v1.0 – Build Script
# =============================================================================

param([switch]$SkipPDF = $false, [string]$OutputDir = "..\dist")

$ErrorActionPreference = "Stop"
$VERSION = "1.0"
$PRODUCT_NAME = "Fortnite-Nexus-VOD-Review-Service"
$BuildDate = Get-Date -Format "yyyy-MM-dd"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VOD Review Service v$VERSION Builder" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$ProductDir = $PSScriptRoot
$DistDir = Join-Path $ProductDir $OutputDir
$BuildDir = Join-Path $DistDir "$PRODUCT_NAME-v$VERSION"

if (Test-Path $BuildDir) { Remove-Item -Recurse -Force $BuildDir }
New-Item -ItemType Directory -Force -Path $BuildDir | Out-Null

Write-Host "[1/2] Copying files..." -ForegroundColor Green
Copy-Item "$ProductDir\VOD-Review-Service.md" $BuildDir
Copy-Item "$ProductDir\Briefing-Fragebogen.md" $BuildDir

@"
# Fortnite Nexus – VOD Review Service v$VERSION

Vielen Dank fuer den Kauf!

Du hast ein 1-on-1 VOD Review gebucht. So geht's weiter:

## Schritt 1: Briefing ausfuellen
Oeffne 'Briefing-Fragebogen.md' und beantworte die Fragen.
Geschaetzte Zeit: 5-10 Minuten.

## Schritt 2: VOD aufnehmen / hochladen
Anforderungen:
- Format: MP4 (H.264)
- Aufloesung: 1080p oder 1440p
- Laenge: 1-3 Matches komplett
- Maximum: 5 GB pro Upload

Upload via:
- Google Drive
- WeTransfer
- OneDrive
- Discord (kleine Files)

## Schritt 3: Briefing + VOD an mich

EMAIL: vod-review@fortnitenexus.com
Subject: "VOD Briefing - Bestellnummer #XXXXX"

Oder DISCORD (schneller):
1. discord.gg/fortnitenexus beitreten
2. DM an @TimoZyztm

## Schritt 4: Warten (24-48h)
Du bekommst eine Email wenn dein Review bereit ist.

## Schritt 5: Lieferung
- Privates YouTube-Review-Video (30-45 Min)
- PDF-Zusammenfassung (5-8 Seiten)
- 14-Tage Trainings-Plan
- Discord-Channel-Zugang (1 Woche aktive Q&A)

## Bei Fragen
Email: support@fortnitenexus.com
Discord: discord.gg/fortnitenexus

(c) 2026 Fortnite Nexus
Code "ZYZTM" im Item Shop = Support 💜

Build: $BuildDate
"@ | Out-File -Encoding UTF8 "$BuildDir\README.txt"

@"
# VERTRAULICHKEITSVEREINBARUNG

(c) 2026 Fortnite Nexus

Mit dem Kauf des VOD Review Service vereinbaren beide Parteien:

## Was wir geheim halten

1. Dein VOD wird NICHT oeffentlich geteilt
2. Dein VOD wird NICHT an Dritte weitergegeben
3. Dein VOD wird NACH Lieferung geloescht (binnen 30 Tagen)
4. Persoenliche Infos im Briefing bleiben vertraulich

## Was du erlaubst (optional)

- Verwendung anonymisierter Snippets fuer Marketing (NUR mit deiner Erlaubnis)
- Aggregierte Stats (z.B. "Top 3 Schwaechen unserer Reviews")

## Refund-Policy

- 14-Tage Geld-zurueck-Garantie
- Bei Unzufriedenheit: kostenloser Re-Review

## Kontakt bei Datenschutz-Fragen

datenschutz@fortnitenexus.com

Build: $BuildDate
"@ | Out-File -Encoding UTF8 "$BuildDir\NDA-Vertraulichkeit.txt"

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
