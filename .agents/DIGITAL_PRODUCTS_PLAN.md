# Fortnite Nexus – Digital Products Monetization Plan
## Phase 15: Von Content zu Commerce – Der Produkt-Verkaufs-Motor

> **Mission:** Aufbau eines vollautomatischen Digital-Product-Shops mit 100% realer Auslieferung. Keine Affiliate-Links, keine Vermittlung – direkter Wert für die Community.

---

## 1. PRODUKT-STRATEGIE: Was verkaufen wir?

### 1.1 Digitale Produkte (Sofort-Delivery nach Zahlung)

| Produkt | Format | Preis | Auslieferung |
|---------|--------|-------|--------------|
| **Pro Settings Pack** | ZIP (Configs + Video) | €9.99 | Automatischer Download-Link per Email |
| **Creator Setup Guide** | PDF + Video-Kurs | €19.99 | Mitgliedschafts-Portal-Zugang |
| **Fortnite Season X Checklist** | Notion-Template / PDF | €4.99 | Sofort-Download |
| **Streaming Overlay Pack** | PNG/GIF/Animated | €14.99 | ZIP-Download |
| **Thumbnail Template Bundle** | PSD + Canva-Links | €12.99 | Download-Link |
| **Weekly Meta Report** | PDF + Video | €7.99/Monat | Email + Dashboard |
| **1-on-1 VOD Review** | Video-Datei | €29.99 | Upload + Email-Link (24h) |
| **Fortnite Mastery Course** | 10h Video-Kurs | €49.99 | Kurs-Plattform-Zugang |

### 1.2 Produkt-Validierungs-Check

Bevor ein Produkt entwickelt wird:

```
VALIDATION_CRITERIA = {
  demand: "Mindestens 10 Discord-DMs mit dieser Frage",
  uniqueness: "Nicht auf YouTube/TikTok kostenlos verfügbar",
  delivery: "100% automatisierbar (kein manueller Versand)",
  value: "Kunde spart >2h Zeit oder gewinnt konkreten Vorteil",
  quality: "Professionell produziert (nicht hastig zusammengeworfen)"
}
```

---

## 2. TECHNISCHE ARCHITEKTUR

### 2.1 Payment Stack

```
┌─────────────────────────────────────────────────────────┐
│                  PAYMENT FLOW                           │
├─────────────────────────────────────────────────────────┤
│  1. Produkt-Seite (Landing Page)                        │
│     ↓                                                   │
│  2. Stripe Checkout (One-Time oder Subscription)        │
│     ↓                                                   │
│  3. Stripe Webhook → Netlify Function                   │
│     ↓                                                   │
│  4. Order in Database (Supabase/Neon)                   │
│     ↓                                                   │
│  5. Email-Versand (Resend/Loops) mit Download-Link    │
│     ↓                                                   │
│  6. Customer Dashboard (Zugang zu allen Käufen)         │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Tech Stack

| Komponente | Tool | Kosten |
|------------|------|--------|
| Payment | Stripe | 1.5% + €0.25/Transaktion |
| Database | Supabase (Postgres) | Free Tier: 500MB |
| Email | Resend | Free: 3000/Tag |
| File Storage | Cloudflare R2 | €0.015/GB |
| Delivery | Eigene Netlify Function | Inklusive |

### 2.3 Automatisierungs-Regeln

**Kern-Prinzip:** Nach dem ersten Setup läuft alles 100% autonom.

```typescript
const AUTOMATION_RULES = {
  payment_success: {
    action: 'generate_download_link',
    expiry: '72_hours', // Link gültig für 72h
    retries: 3,         // Bei Email-Fehlschlag: 3x Retry
  },
  
  subscription_renewal: {
    action: 'send_renewal_email',
    content: 'weekly_meta_report', // Automatischer Content-Versand
  },
  
  failed_payment: {
    action: 'dunning_sequence',      // 3-Step Dunning
    grace_period: '3_days',
  },
  
  refund_request: {
    action: 'auto_approve_if_under_24h',
    manual_review_threshold: 14.99,  // >€15 = Manuelle Prüfung
  }
};
```

---

## 3. PRODUKT-DETAILS & AUSLIEFERUNG

### 3.1 Pro Settings Pack (€9.99)

**Inhalt:**
- `GameUserSettings.ini` (optimiert für 240 FPS)
- `Windows 11 Gaming Optimization Guide` (PDF)
- `NVIDIA Control Panel Screenshots` (Setup-Anleitung)
- `Video-Tutorial`: 15min Walkthrough der Settings

**Auslieferung:**
```
Trigger: Zahlungseingang bei Stripe
↓
Action: 
  1. Generate signed URL für ZIP (R2 Storage)
  2. Send Email via Resend mit Download-Link
  3. Log order in Supabase
  4. Add to customer dashboard
↓
Email enthält:
  - Danke-Message
  - Download-Link (72h gültig)
  - Discord-Support-Link
  - Upsell: "Upgrade auf Creator Setup Guide (€10 Rabatt)"
```

### 3.2 Weekly Meta Report (€7.99/Monat)

**Inhalt (wöchentlich automatisch):**
- Patch Notes Analysis
- Weapon Tier List (aktualisiert)
- Map Changes + Landing Spot Empfehlungen
- Pro Player Loadouts
- "Secret" Tipps aus Competitive Scene

**Produktions-Automatisierung:**
```
MCP Server Integration:
  - Fortnite API (Item Shop, Patch Notes)
  - Reddit Scraping (r/FortniteCompetitive)
  - Pro Player Social Monitoring
  - YouTube Transcript Analysis (Pro Guides)
↓
AI-Generierung:
  - GPT-4 strukturiert die Daten
  - Template-basierte PDF-Generierung
  - Video-Script für Voice-over
↓
Auslieferung:
  - Jeden Dienstag 18:00 CET
  - Email an Subscriber
  - Dashboard-Update
```

### 3.3 1-on-1 VOD Review (€29.99)

**Besonderheit:** Semi-automatisiert (human-in-the-loop)

```
Bestellung → Zahlungseingang
↓
Email an Kunde:
  "Danke! Lade dein Gameplay hier hoch: [Upload-Link]"
  "Turnaround: 24-48h"
↓
Upload erfolgt → Notification an Discord #vod-reviews
↓
Du (Rolf) erstellst Review-Video (30-45min Aufwand)
↓
Upload zu Cloudflare Stream → Automatische Email an Kunde
↓
Follow-up Email (7 Tage später):
  "Hast du die Tipps umsetzen können? Feedback?"
```

---

## 4. SALES FUNNEL & MARKETING

### 4.1 Free → Paid Journey

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   FREE      │ →  │  LEAD MAGNET│ →  │  TRIPWIRE   │ →  │  CORE OFFER │
│  CONTENT    │    │  (Email)    │    │  (€4-€10)   │    │  (€20-€50)  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
     │                   │                  │                  │
     ▼                   ▼                  ▼                  ▼
YouTube Guides    "5 Settings die     Fortnite           Creator Setup
TikTok Tips        Pros benutzen"    Checklist          Guide (€19.99)
Blog Posts        (Free PDF)         (€4.99)            oder
                                                            Mastery Course
                                                            (€49.99)
```

### 4.2 Lead Magnet: "5 Settings die jeder Fortnite Pro benutzt"

**Zweck:** Email-Liste aufbauen

**Ablauf:**
1. Landing Page mit Email-Form
2. Double-Opt-In (Compliance)
3. Sofortiger PDF-Download
4. Welcome Sequence (5 Emails über 10 Tage)
5. Soft Pitch: "Willst du ALLE Settings? Creator Setup Guide..."

### 4.3 SAC-Code Integration in Produkte

**Strategie:** Jedes Produkt enthält SAC-Code-Reminder

```
Pro Settings Pack PDF:
  Seite 3: "Support the Creator"
  "Nutze Code nexus im Item Shop – kostet dich nichts, 
   hilft uns neue Guides zu erstellen"
  
Creator Setup Guide Video:
  0:00-0:15 Intro mit SAC-Code
  8:30 Mid-Roll Reminder
  Outro: "Vergiss nicht: nexus"
```

---

## 5. IMPLEMENTIERUNGS-PLAN

### Woche 1: Foundation

**Tag 1-2: Stripe Setup**
- [ ] Stripe Account erstellen (falls nicht vorhanden)
- [ ] Produkt-Katalog in Stripe anlegen
- [ ] Checkout-Sessions testen
- [ ] Webhook Endpoint vorbereiten

**Tag 3-4: Datenbank & Storage**
- [ ] Supabase Projekt erstellen
- [ ] Schema: `orders`, `customers`, `products`, `downloads`
- [ ] R2 Bucket für digitale Produkte
- [ ] Upload erster Produkte (Settings Pack)

**Tag 5-7: Email-Automatisierung**
- [ ] Resend Account + Domain-Verifizierung
- [ ] Email-Templates erstellen:
  - Order Confirmation + Download
  - Welcome Sequence (5 emails)
  - Abandoned Cart (optional)
  - Subscription Renewal

### Woche 2: Produkt-Entwicklung

**Tag 8-10: Erstes Produkt fertigstellen**
- [ ] "Pro Settings Pack" finalisieren
- [ ] ZIP erstellen: Configs + PDF + Video
- [ ] Landing Page designen
- [ ] Produkt-Fotos/Screenshots

**Tag 11-12: Lead Magnet**
- [ ] "5 Settings..." PDF erstellen
- [ ] Landing Page mit Email-Form
- [ ] Email-Sequence schreiben

**Tag 13-14: Testing**
- [ ] End-to-End Test: Kauf → Zahlung → Email → Download
- [ ] Mobile Checkout testen
- [ ] Fehlerfälle simulieren

### Woche 3: Launch

**Tag 15: Soft Launch**
- [ ] Discord Community informieren
- [ ] 50% Rabatt für erste 10 Käufer
- [ ] Feedback sammeln
- [ ] Bugfixes

**Tag 16-17: Content Marketing**
- [ ] YouTube Video: "Meine Settings für 240 FPS"
- [ ] Beschreibung: Link zu Produkt
- [ ] TikTok: "POV: Du kaufst meine Settings"

**Tag 18-21: Optimierung**
- [ ] Conversion Rate analysieren
- [ ] A/B Test: Preis €9.99 vs €7.99
- [ ] Email Open Rates optimieren
- [ ] Zweites Produkt planen

---

## 6. ERTRAGS-MODELL

### Projektion (konservativ)

**Annahmen:**
- 10.000 monatliche Website-Besucher
- 2% Conversion zu Lead (200 Emails/Monat)
- 5% Lead-to-Customer (10 Käufe/Monat)
- Durchschnittlicher Bestellwert: €15

**Rechnung:**
```
Monatliche Käufe:        10
× Durchschnittspreis:    €15
= Brutto-Umsatz:        €150
- Stripe Gebühren (3%):   €5
- Netto-Umsatz:          €145
```

**Skalierungspfad:**
- Monat 3: 50 Käufe/Monat = €725
- Monat 6: 200 Käufe/Monat = €2.900
- Monat 12: 500 Käufe/Monat = €7.250

### Break-Even-Analyse

**Fixkosten pro Monat:**
- Stripe: €0 (nur Transaktionsgebühren)
- Supabase: €0 (Free Tier)
- Resend: €0 (Free Tier bis 3000/Tag)
- R2 Storage: ~€0.50
- **Gesamt: <€1/Monat**

**Break-Even:** Ab dem ersten Verkauf profitabel.

---

## 7. COMPLIANCE & RECHTLICHES

### 7.1 Digitale Produkte – EU-Recht

**Widerrufsrecht:**
- Digitale Produkte: 14 Tage Widerrufsrecht
- ABER: Bei sofortiger Auslieferung kann verzichtet werden
- **Lösung:** Checkbox bei Checkout: 
  "Ich verzichte auf das Widerrufsrecht für digitale Güter"

**Steuern:**
- Kleinunternehmer-Regelung nutzen (falls <€22.000/Jahr)
- Reverse-Charge bei EU-Ausland
- Stripe rechnet automatisch MwSt. aus (Tax Settings)

### 7.2 Datenschutz (DSGVO)

**Was speichern wir:**
- Email (für Auslieferung)
- Stripe Customer ID (für Zuordnung)
- Kauf-Datum + Produkt
- Download-History (für Betrugserkennung)

**Was speichern wir NICHT:**
- Keine Zahlungsdaten (Stripe speichert diese)
- Keine IP-Adressen (unnötig)
- Keine Tracking-Daten ohne Consent

---

## 8. TECHNISCHE SPEZIFIKATION

### 8.1 Datenbank-Schema

```sql
-- Orders Tabelle
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_checkout_session_id TEXT UNIQUE,
  customer_email TEXT NOT NULL,
  product_id TEXT NOT NULL,
  amount_total INTEGER, -- in cents
  status TEXT CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  download_url TEXT,
  download_expires_at TIMESTAMP,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Products Tabelle
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER, -- in cents
  file_path TEXT, -- R2 Storage path
  stripe_price_id TEXT,
  is_subscription BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE
);

-- Download Logs (für Betrugserkennung)
CREATE TABLE download_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  ip_address TEXT, -- optional, hashed
  user_agent TEXT,
  downloaded_at TIMESTAMP DEFAULT NOW()
);
```

### 8.2 Stripe Webhook Handler

```typescript
// netlify/functions/stripe-webhook.ts
export const handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  const stripeEvent = stripe.webhooks.constructEvent(
    event.body, 
    sig, 
    process.env.STRIPE_WEBHOOK_SECRET
  );

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    
    // 1. Order in DB erstellen
    const order = await createOrder(session);
    
    // 2. Download-Link generieren (72h gültig)
    const downloadUrl = await generateSignedUrl(order.product_id, 72);
    
    // 3. Email senden
    await sendOrderConfirmationEmail({
      to: session.customer_email,
      downloadUrl,
      orderId: order.id,
      productName: order.product_name
    });
    
    // 4. Dashboard updaten (optional)
    await notifyDashboard(order);
  }

  return { statusCode: 200 };
};
```

### 8.3 Email-Templates

**Order Confirmation:**
```html
Subject: Dein Fortnite Pro Settings Pack ist bereit! ⚡

Hey {{firstName}},

Danke für deinen Kauf! Hier ist dein Download:

⬇️ DOWNLOAD: {{downloadUrl}}
(Gültig für 72 Stunden)

Was du bekommst:
✅ Optimierte GameUserSettings.ini
✅ Windows 11 Gaming Guide (PDF)
✅ NVIDIA Setup Screenshots
✅ 15-Min Video-Tutorial

Fragen? Antworte einfach auf diese Email.

Support the Creator:
Nutze Code nexus im Item Shop! 💙

- Das Fortnite Nexus Team
```

---

## 9. RISIKEN & MITIGATION

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| **Chargebacks** | Mittel | Hoch | Klare Produktbeschreibung, 72h Support-Response |
| **Piraterie** | Hoch | Mittel | Personalisierte Downloads, Download-Limit (3x) |
| **Technische Ausfälle** | Niedrig | Hoch | Redundante Storage, Fallback-Email-Queue |
| **Zahlungsausfälle** | Niedrig | Hoch | Dunning-Sequence, Grace Period |
| **Epic Games TOS** | Niedrig | Sehr Hoch | Keine Verkauf von "V-Bucks", nur Guides/Settings |

---

## 10. NÄCHSTE SCHRITTE (TODO)

### Sofort (heute):
- [ ] Entscheidung: Welches Produkt zuerst? (Empfehlung: Pro Settings Pack)
- [ ] Stripe-Account checken (vorhanden?)
- [ ] Supabase-Projekt anlegen

### Diese Woche:
- [ ] Erstes Produkt finalisieren
- [ ] Landing Page erstellen
- [ ] Zahlungsflow implementieren
- [ ] Test-Kauf durchführen

### Nächste Woche:
- [ ] Lead Magnet erstellen
- [ ] Email-Sequence schreiben
- [ ] Soft Launch in Discord

---

*Document Version: 1.0*
*Created: April 26, 2026*
*Focus: Digital Products with 100% Automated Delivery*
*Status: 📋 PLAN COMPLETE – READY FOR IMPLEMENTATION*
