# =============================================================================
# Master Build Script – Alle 5 Produkte gleichzeitig bauen
# =============================================================================
#
# Usage:
#   .\build-all.ps1             # Alle Produkte mit PDFs (wenn pandoc da)
#   .\build-all.ps1 -SkipPDF    # Schneller Build ohne PDFs
# =============================================================================

param([switch]$SkipPDF = $false)

$ErrorActionPreference = "Continue"
$ProductsDir = $PSScriptRoot
$DistDir = Join-Path $ProductsDir "dist"

# Cleanup old builds
if (Test-Path $DistDir) {
    Remove-Item -Recurse -Force $DistDir
}
New-Item -ItemType Directory -Force -Path $DistDir | Out-Null

$Products = @(
    @{ Name = "Pro Settings Pack"; Path = "pro-settings-pack" },
    @{ Name = "Season Checklist"; Path = "season-checklist" },
    @{ Name = "Creator Setup Guide"; Path = "creator-setup-guide" },
    @{ Name = "VOD Review Service"; Path = "vod-review" },
    @{ Name = "Weekly Meta Report"; Path = "weekly-meta-report" }
)

$Results = @()

foreach ($p in $Products) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Magenta
    Write-Host "  Building: $($p.Name)" -ForegroundColor Magenta
    Write-Host "========================================" -ForegroundColor Magenta
    
    $BuildScript = Join-Path (Join-Path $ProductsDir $p.Path) "build.ps1"
    
    if (-not (Test-Path $BuildScript)) {
        Write-Host "  [SKIP] Build script not found" -ForegroundColor Yellow
        $Results += [PSCustomObject]@{
            Product = $p.Name
            Status = "SKIPPED"
            Size = "-"
        }
        continue
    }
    
    try {
        if ($SkipPDF) {
            & $BuildScript -SkipPDF
        } else {
            & $BuildScript
        }
        
        # Check output
        $ProductFiles = Get-ChildItem $DistDir -Filter "*.zip" | Where-Object { 
            $_.Name -like "*$($p.Path -replace '-', '*')*" 
        }
        
        if ($ProductFiles.Count -gt 0) {
            $latestFile = $ProductFiles | Sort-Object LastWriteTime -Descending | Select-Object -First 1
            $size = [math]::Round($latestFile.Length / 1024, 2)
            $Results += [PSCustomObject]@{
                Product = $p.Name
                Status = "✅ SUCCESS"
                Size = "$size KB"
            }
        } else {
            $Results += [PSCustomObject]@{
                Product = $p.Name
                Status = "⚠️ NO OUTPUT"
                Size = "-"
            }
        }
    }
    catch {
        $Results += [PSCustomObject]@{
            Product = $p.Name
            Status = "❌ ERROR: $_"
            Size = "-"
        }
    }
}

# Final Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BUILD-SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$Results | Format-Table -AutoSize

Write-Host ""
Write-Host "Output-Verzeichnis: $DistDir" -ForegroundColor Gray
Write-Host ""

# List all ZIPs
$AllZips = Get-ChildItem $DistDir -Filter "*.zip"
if ($AllZips.Count -gt 0) {
    Write-Host "Erstellte ZIP-Files:" -ForegroundColor Green
    foreach ($zip in $AllZips) {
        $size = [math]::Round($zip.Length / 1024, 2)
        Write-Host "  - $($zip.Name) ($size KB)" -ForegroundColor White
    }
    
    $totalSize = [math]::Round(($AllZips | Measure-Object Length -Sum).Sum / 1024 / 1024, 2)
    Write-Host ""
    Write-Host "Total Size: $totalSize MB" -ForegroundColor Cyan
} else {
    Write-Host "Keine ZIP-Files erstellt!" -ForegroundColor Red
}

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. ZIPs zu Supabase Storage hochladen (Bucket: 'products')" -ForegroundColor Gray
Write-Host "  2. file_path in Supabase products-Tabelle setzen" -ForegroundColor Gray
Write-Host "  3. Stripe-Produkte erstellen (Dashboard)" -ForegroundColor Gray
Write-Host "  4. Stripe-Price-IDs in Supabase eintragen" -ForegroundColor Gray
Write-Host "  5. Test-Kauf mit Stripe Test-Mode" -ForegroundColor Gray
Write-Host ""
