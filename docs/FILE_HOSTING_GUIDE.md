# Produkt-Files Hosting Guide

## Optionen

### Option 1: Cloudflare R2 (Empfohlen - Kostenlos für 10GB/Monat)
**Vorteile:**
- Kostenlos bis 10GB/Monat Speicher
- Kostenlos bis 10M Anfragen/Monat
- S3-kompatible API
- Gute Performance in Europa

**Schritte:**
1. Cloudflare Dashboard → R2 → Create Bucket
2. Bucket Name: `fortnite-nexus-products`
3. Region: `eu-central-1` oder auto
4. API Token erstellen mit R2 Permissions
5. Environment Variables:
   - `R2_ACCOUNT_ID` - Von Cloudflare Dashboard
   - `R2_ACCESS_KEY_ID` - Von API Token
   - `R2_SECRET_ACCESS_KEY` - Von API Token
   - `R2_BUCKET_NAME` - `fortnite-nexus-products`
   - `R2_PUBLIC_URL` - `https://pub-xxx.r2.dev` (oder Custom Domain)

**Upload:**
```bash
# AWS CLI installieren
aws configure set aws_access_key_id {R2_ACCESS_KEY_ID}
aws configure set aws_secret_access_key {R2_SECRET_ACCESS_KEY}
aws configure set default.region auto
aws configure set default.output json

# Files hochladen
aws s3 cp products/ s3://fortnite-nexus-products/ --recursive --endpoint-url https://<R2_ACCOUNT_ID>.r2.cloudflarestorage.com
```

### Option 2: AWS S3 (Kostenpflichtig aber robust)
**Vorteile:**
- Extrem zuverlässig
- CDN via CloudFront
- Granulare Permissions

**Schritte:**
1. AWS Console → S3 → Create Bucket
2. Bucket Name: `fortnite-nexus-products-2026`
3. Region: `eu-central-1` (Frankfurt)
4. Block Public Access: AUS (für Downloads)
5. CORS Policy konfigurieren
6. Environment Variables:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   - `S3_BUCKET_NAME`

### Option 3: Netlify Blobs (Einfachste Option)
**Vorteile:**
- Integriert in Netlify
- Keine separate Konfiguration
- Automatisch CDN

**Nachteile:**
- Neues Feature, weniger dokumentiert
- Begrenzte Kontrolle

**Schritte:**
1. Netlify Dashboard → Site → Blobs
2. Files über UI oder CLI hochladen
3. Public URL automatisch generiert

### Option 4: GitHub Releases (Kostenlos, aber limitiert)
**Vorteile:**
- Kostenlos
- Versioniert
- Git-integriert

**Nachteile:**
- 100MB Limit pro File
- Langsamer für große Files

---

## Empfohlene Setup: Cloudflare R2

### 1. R2 Bucket erstellen

```bash
# Oder über Cloudflare Dashboard UI:
# R2 → Create Bucket → Name: fortnite-nexus-products
```

### 2. API Token erstellen

```bash
# Cloudflare Dashboard → My Profile → API Tokens → Create Token
# Template: Edit Cloudflare R2
# Permissions: Account → R2 → Edit
# Account Resources: Include → Your Account
```

### 3. Environment Variables in Netlify

```
R2_ACCOUNT_ID=your_account_id_here
R2_ACCESS_KEY_ID=your_access_key_id_here
R2_SECRET_ACCESS_KEY=your_secret_access_key_here
R2_BUCKET_NAME=fortnite-nexus-products
R2_PUBLIC_URL=https://pub-xxx.r2.dev
```

### 4. Upload Script erstellen

Erstelle `scripts/upload-products-to-r2.sh`:

```bash
#!/bin/bash
# Upload product files to Cloudflare R2

set -e

# Configuration
R2_ACCOUNT_ID="${R2_ACCOUNT_ID}"
R2_ACCESS_KEY_ID="${R2_ACCESS_KEY_ID}"
R2_SECRET_ACCESS_KEY="${R2_SECRET_ACCESS_KEY}"
R2_BUCKET_NAME="fortnite-nexus-products"
PRODUCTS_DIR="./products"

# Check if products directory exists
if [ ! -d "$PRODUCTS_DIR" ]; then
  echo "Error: $PRODUCTS_DIR directory not found"
  exit 1
fi

# Configure AWS CLI for R2
export AWS_ACCESS_KEY_ID="$R2_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="$R2_SECRET_ACCESS_KEY"
export AWS_DEFAULT_REGION="auto"

# Upload all files
echo "Uploading files to R2 bucket: $R2_BUCKET_NAME"
aws s3 cp "$PRODUCTS_DIR/" "s3://$R2_BUCKET_NAME/" \
  --recursive \
  --endpoint-url "https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com" \
  --acl public-read

echo "Upload complete!"
echo "Public URL: https://pub-$R2_ACCOUNT_ID.r2.dev"
```

### 5. Files hochladen

```bash
# Script ausführen (mit Environment Variables)
R2_ACCOUNT_ID=xxx R2_ACCESS_KEY_ID=xxx R2_SECRET_ACCESS_KEY=xxx bash scripts/upload-products-to-r2.sh
```

### 6. Database Update

Nach Upload, URL in DB eintragen:

```sql
-- Pro Settings Pack
UPDATE products 
SET file_url = 'https://pub-xxx.r2.dev/pro-settings-pack.zip' 
WHERE id = 'pro-settings-pack';

-- Season Checklist
UPDATE products 
SET file_url = 'https://pub-xxx.r2.dev/fortnite-checklist.zip' 
WHERE id = 'fortnite-checklist';

-- Creator Setup Guide
UPDATE products 
SET file_url = 'https://pub-xxx.r2.dev/creator-setup-guide.zip' 
WHERE id = 'creator-setup-guide';

-- VOD Review (wird manuell erstellt, keine Datei)
UPDATE products 
SET file_url = NULL 
WHERE id = 'vod-review';

-- Weekly Meta Report (Email-basiert, keine Datei)
UPDATE products 
SET file_url = NULL 
WHERE id = 'weekly-meta-report';
```

---

## Alternative: Token-basierte Downloads (Bereits implementiert)

Die Anwendung hat bereits ein token-basiertes Download-System:

### Wie es funktioniert:
1. Nach erfolgreicher Zahlung → Order wird in DB erstellt
2. `download_token` wird generiert
3. `download_url` wird gesetzt: `https://fortnitenexus.space/dashboard/orders/{order_id}`
4. User klickt auf Download-Link
5. `process-download.ts` Function verifiziert Token
6. Bei Erfolg → Signed URL generiert (z.B. von R2 mit Presigned URL)
7. User kann File downloaden

### Vorteile:
- Keine öffentlichen URLs nötig
- Download-Limit enforcement
- Expiry enforcement
- Fraud Detection via IP/User-Agent Tracking

### Implementierung in `process-download.ts`:

```typescript
// Token validieren
const order = await sql`
  SELECT * FROM orders 
  WHERE download_token = ${token} 
  AND download_expires_at > NOW()
  LIMIT 1
`;

if (!order) {
  return { statusCode: 403, body: 'Invalid or expired token' };
}

// Download-Limit prüfen
if (order.download_count >= order.download_limit) {
  return { statusCode: 403, body: 'Download limit exceeded' };
}

// R2 Presigned URL generieren
const signedUrl = await generateR2PresignedUrl(order.file_path);

// Download-Log schreiben
await sql`
  INSERT INTO download_logs (order_id, ip_address, user_agent, success)
  VALUES (${order.id}, ${ip}, ${userAgent}, true)
`;

// Download-Count erhöhen
await sql`
  UPDATE orders 
  SET download_count = download_count + 1 
  WHERE id = ${order.id}
`;

return { statusCode: 302, headers: { Location: signedUrl } };
```

---

## Empfehlung

**Für MVP:** Cloudflare R2 mit öffentlichen URLs
- Einfachste Setup
- Schnellste Implementierung
- Kostenlos bis 10GB/Monat

**Für Produktion:** R2 + Token-basierte Downloads
- Bessere Sicherheit
- Download-Limit enforcement
- Fraud Detection
- Professionaleres Setup

---

## Quick Start (Empfohlener Weg)

### 1. Cloudflare R2 Setup (5 Min)
- Account erstellen (kostenlos)
- R2 Bucket erstellen
- API Token generieren

### 2. Files hochladen (2 Min)
```bash
# AWS CLI installieren
npm install -g aws-cli

# Konfigurieren
aws configure set aws_access_key_id {R2_ACCESS_KEY_ID}
aws configure set aws_secret_access_key {R2_SECRET_ACCESS_KEY}
aws configure set default.region auto

# Upload
aws s3 cp products/ s3://fortnite-nexus-products/ --recursive --endpoint-url https://{R2_ACCOUNT_ID}.r2.cloudflarestorage.com
```

### 3. URLs in DB eintragen (2 Min)
```sql
UPDATE products SET file_url = 'https://pub-xxx.r2.dev/xxx' WHERE id = 'xxx';
```

### 4. Testen (1 Min)
- Checkout testen
- Download testen

**Gesamtzeit:** ~10 Minuten

---

## File Struktur

```
products/
├── pro-settings-pack/
│   ├── GameUserSettings.ini
│   ├── Engine.ini
│   ├── Windows-Optimization.pdf
│   ├── NVIDIA-Setup-Screenshots.zip
│   ├── Sensitivity-Calculator.xlsx
│   └── Walkthrough-Video.mp4
├── fortnite-checklist/
│   ├── Season-Checklist.pdf
│   ├── XP-Optimization-Guide.pdf
│   └── Notion-Template.link
├── creator-setup-guide/
│   ├── Video-Module-1.mp4
│   ├── Video-Module-2.mp4
│   ├── ...
│   ├── Creator-Guide.pdf
│   ├── OBS-Profile.zip
│   ├── Thumbnail-Templates.zip
│   └── Content-Calendar.xlsx
└── vod-review/
    └── (wird manuell erstellt)
```

---

*Created: April 27, 2026*
<tool_call>CodeContent</arg_key><arg_value>
