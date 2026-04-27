# =============================================================================
# Pro Settings Pack v2.1 – Build Script
# =============================================================================
# Generiert das fertige Customer-ZIP aus den Source-Files
#
# Voraussetzungen:
# - PowerShell 5.0+
# - Optional: pandoc (für PDF-Generation aus Markdown)
#   Install: https://pandoc.org/installing.html
#
# Usage:
#   .\build.ps1
#   .\build.ps1 -SkipPDF  # nur ZIP, ohne PDF-Conversion
# =============================================================================

param(
    [switch]$SkipPDF = $false,
    [string]$OutputDir = "..\dist"
)

$ErrorActionPreference = "Stop"
$VERSION = "2.1.0"
$PRODUCT_NAME = "Fortnite-Nexus-Pro-Settings-Pack"
$BuildDate = Get-Date -Format "yyyy-MM-dd"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Pro Settings Pack v$VERSION Builder" -ForegroundColor Cyan
Write-Host "  Build Date: $BuildDate" -ForegroundColor Gray
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Setup directories
$ProductDir = $PSScriptRoot
$DistDir = Join-Path $ProductDir $OutputDir
$BuildDir = Join-Path $DistDir "$PRODUCT_NAME-v$VERSION"

if (Test-Path $BuildDir) {
    Write-Host "Cleaning previous build..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force $BuildDir
}

New-Item -ItemType Directory -Force -Path $BuildDir | Out-Null
New-Item -ItemType Directory -Force -Path "$BuildDir\01-Settings-Files" | Out-Null
New-Item -ItemType Directory -Force -Path "$BuildDir\02-Guides" | Out-Null
New-Item -ItemType Directory -Force -Path "$BuildDir\03-Tools" | Out-Null
New-Item -ItemType Directory -Force -Path "$BuildDir\04-Video-Resources" | Out-Null

Write-Host "[1/5] Copying Settings Files..." -ForegroundColor Green
Copy-Item "$ProductDir\GameUserSettings.ini" "$BuildDir\01-Settings-Files\"
Copy-Item "$ProductDir\GameUserSettings.Performance.ini" "$BuildDir\01-Settings-Files\"
Copy-Item "$ProductDir\Engine.ini" "$BuildDir\01-Settings-Files\"

# Setup-Anleitung kurz
@"
# Settings-Files – Quick Setup

1. Schließe Fortnite UND den Epic Launcher.

2. Öffne im Explorer:
   %LOCALAPPDATA%\FortniteGame\Saved\Config\WindowsClient\

3. Backup deiner aktuellen GameUserSettings.ini machen:
   Rechtsklick → Umbenennen zu "GameUserSettings.ini.backup"

4. Kopiere die passende Variante in den Ordner:
   - GameUserSettings.ini = Standard (240 FPS Target)
   - GameUserSettings.Performance.ini = umbenennen zu GameUserSettings.ini (144 FPS, Low-End)

5. Engine.ini auch reinkopieren (optional aber empfohlen).

6. WICHTIG: Beide Files auf "Schreibgeschützt" setzen!
   Rechtsklick → Eigenschaften → Schreibgeschützt anhaken.
   Sonst überschreibt Fortnite die Settings beim Start.

7. Fortnite starten, Settings checken:
   - Display Resolution: Native
   - Frame Rate Limit: 240 oder Unlimited
   - NVIDIA Reflex Low Latency: Ein + Boost
   - Visualizer for Sound Effects: AN

Fertig! Volle Anleitung im Ordner 02-Guides.
"@ | Out-File -Encoding UTF8 "$BuildDir\01-Settings-Files\INSTALLATION.txt"

Write-Host "[2/5] Copying Guides..." -ForegroundColor Green
Copy-Item "$ProductDir\Windows-Optimization-Guide.md" "$BuildDir\02-Guides\"
Copy-Item "$ProductDir\NVIDIA-Control-Panel-Setup.md" "$BuildDir\02-Guides\"

# PDF-Conversion (falls pandoc verfügbar)
if (-not $SkipPDF) {
    if (Get-Command pandoc -ErrorAction SilentlyContinue) {
        Write-Host "  -> Generating PDFs via pandoc..." -ForegroundColor Gray
        try {
            pandoc "$ProductDir\Windows-Optimization-Guide.md" `
                -o "$BuildDir\02-Guides\Windows-Optimization-Guide.pdf" `
                --pdf-engine=xelatex `
                -V geometry:margin=2cm `
                -V mainfont="Calibri" `
                -V fontsize=11pt `
                --toc 2>$null
            
            pandoc "$ProductDir\NVIDIA-Control-Panel-Setup.md" `
                -o "$BuildDir\02-Guides\NVIDIA-Control-Panel-Setup.pdf" `
                --pdf-engine=xelatex `
                -V geometry:margin=2cm `
                -V mainfont="Calibri" `
                -V fontsize=11pt 2>$null
                
            Write-Host "  -> PDFs generated successfully" -ForegroundColor Green
        }
        catch {
            Write-Host "  -> PDF generation failed (LaTeX not installed?)" -ForegroundColor Yellow
            Write-Host "     MD files included as fallback" -ForegroundColor Gray
        }
    } else {
        Write-Host "  -> Pandoc not found, skipping PDF generation" -ForegroundColor Yellow
        Write-Host "     Install: https://pandoc.org/installing.html" -ForegroundColor Gray
    }
}

Write-Host "[3/5] Copying Tools..." -ForegroundColor Green
Copy-Item "$ProductDir\Sensitivity-Calculator.html" "$BuildDir\03-Tools\"

@"
# Tools im Pack

## Sensitivity-Calculator.html

Doppelklick zum Öffnen im Browser (Chrome/Edge/Firefox).

Features:
- Pro-Presets (Bugha, Mongraal, Clix, etc.)
- cm/360° Berechnung
- eDPI Anzeige
- Sens-Empfehlung nach Spielstil

Funktioniert offline ohne Internet.
"@ | Out-File -Encoding UTF8 "$BuildDir\03-Tools\README.txt"

Write-Host "[4/5] Copying Video Resources..." -ForegroundColor Green
Copy-Item "$ProductDir\Walkthrough-Video-Script.md" "$BuildDir\04-Video-Resources\"

@"
# Video Walkthrough

Das offizielle 15-Minuten Walkthrough-Video findest du auf YouTube:

🎥 **YouTube Link (privat, nur für Käufer):**
https://youtu.be/DUMMY_PRIVATE_LINK_REPLACE_BEFORE_RELEASE

⚠️ Bitte den Link nicht weitergeben – das Video ist nur für Käufer des Packs.

## Inhalt des Videos

00:00 – Intro
00:45 – Vorbereitung & Backup
02:00 – Settings-Files installieren
04:00 – Windows Power Plan (Ultimate Performance)
06:30 – NVIDIA Control Panel Setup
09:00 – Hintergrund-Apps deaktivieren
10:30 – In-Fortnite Settings
12:00 – Benchmarking & Verifizierung
13:30 – Outro & Bonus

## Untertitel

Verfügbar in Deutsch und Englisch.

## Bei Problemen

Falls der YouTube-Link abgelaufen oder defekt ist:
- Email an support@fortnitenexus.com
- Wir senden dir den aktuellen Link binnen 24h

Das beigefügte 'Walkthrough-Video-Script.md' ist die schriftliche Version
des Video-Inhalts – nützlich, falls du nicht zuhören kannst oder kein
Internet hast.
"@ | Out-File -Encoding UTF8 "$BuildDir\04-Video-Resources\VIDEO-LINK.txt"

# Hauptebene Files
Copy-Item "$ProductDir\README.md" "$BuildDir\"
Copy-Item "$ProductDir\CHANGELOG.md" "$BuildDir\"

# Lizenz
@"
# Lizenzvereinbarung – Pro Settings Pack v$VERSION

(C) $(Get-Date -Format "yyyy") Fortnite Nexus. Alle Rechte vorbehalten.

## Erlaubt

- Personliche Nutzung auf deinen privaten Geraten
- Backup-Kopien fur deinen eigenen Gebrauch
- Anpassung der Settings an deine Bedurfnisse

## Nicht erlaubt

- Weiterverkauf des Packs (kommerziell oder kostenlos)
- Weitergabe an Dritte (Freunde, Reddit, GitHub etc.)
- Reverse Engineering oder Modifikation der Pack-Struktur zum Wiederverkauf
- Inhalte als eigene Werke ausgeben
- Public Hosting (Mediafire, Mega etc.)

## Garantie & Haftung

Das Pack wird "wie es ist" geliefert. Wir uebernehmen keine Haftung fur:
- Hardware-Schaden durch falsche Anwendung der Tweaks
- FPS-Verlust statt Gewinn (bei nicht kompatibler Hardware)
- Fortnite-Updates die das Pack inkompatibel machen

Bei Problemen: 14 Tage Geld-zurueck-Garantie.
Email an: support@fortnitenexus.com

## Trademark

Fortnite ist ein Trademark von Epic Games, Inc.
Fortnite Nexus ist nicht mit Epic Games verbunden, gesponsert oder unterstuetzt.

---

Build-Date: $BuildDate
Version: $VERSION
"@ | Out-File -Encoding UTF8 "$BuildDir\LICENSE.txt"

Write-Host "[5/5] Creating ZIP archive..." -ForegroundColor Green
$ZipFile = Join-Path $DistDir "$PRODUCT_NAME-v$VERSION.zip"

if (Test-Path $ZipFile) {
    Remove-Item -Force $ZipFile
}

Compress-Archive -Path "$BuildDir\*" -DestinationPath $ZipFile -CompressionLevel Optimal

# Cleanup
Remove-Item -Recurse -Force $BuildDir

# Final Summary
$ZipSize = (Get-Item $ZipFile).Length
$ZipSizeKB = [math]::Round($ZipSize / 1024, 2)
$ZipSizeMB = [math]::Round($ZipSize / 1024 / 1024, 2)

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Build erfolgreich!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Output: $ZipFile" -ForegroundColor White
Write-Host "  Size:   $ZipSizeKB KB ($ZipSizeMB MB)" -ForegroundColor White
Write-Host "  Date:   $BuildDate" -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Test-Install: ZIP entpacken, README lesen" -ForegroundColor Gray
Write-Host "  2. Upload: Datei hochladen zu Supabase Storage Bucket 'products'" -ForegroundColor Gray
Write-Host "  3. DB-Update: file_path in Supabase products-Tabelle setzen" -ForegroundColor Gray
Write-Host ""
