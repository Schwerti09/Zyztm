# Fortnite Nexus Discord Bot

Community-Bot für den Fortnite Nexus Discord-Server.

## Features

| Command | Beschreibung |
|---------|-------------|
| `/shop` | Zeigt den aktuellen Fortnite Item Shop als Embed |
| `/wishlist add <item>` | Item zur persönlichen Wishlist hinzufügen |
| `/wishlist remove <item>` | Item von der Wishlist entfernen |
| `/wishlist show` | Eigene Wishlist anzeigen |
| `/challenge current` | Aktuelle Weekly Challenge anzeigen |
| `/challenge submit <score>` | Score einreichen |
| `/challenge leaderboard` | Top 10 Leaderboard |

### Auto-Features
- **Täglicher Shop-Alert:** Automatischer Embed um 00:10 UTC im konfigurierten Channel
- **Wishlist-DM-Alerts:** Automatische DM wenn ein Wishlist-Item im Shop erscheint

## Setup

### 1. Discord Application erstellen
1. Gehe zu https://discord.com/developers/applications
2. Erstelle eine neue Application
3. Unter "Bot" → Token kopieren
4. Unter "OAuth2" → Client ID kopieren
5. Bot-Invite-Link generieren mit Scopes: `bot`, `applications.commands`
6. Permissions: `Send Messages`, `Embed Links`, `Use Slash Commands`

### 2. Environment Variables
```bash
cp .env.example .env
# Dann die Werte eintragen
```

### 3. Dependencies installieren
```bash
pnpm install
```

### 4. Bot starten
```bash
# Development (mit Auto-Restart)
pnpm dev

# Production
pnpm start
```

### 5. Bot auf Server einladen
Nutze den OAuth2-URL-Generator im Discord Developer Portal:
- Scopes: `bot`, `applications.commands`
- Permissions: `Send Messages`, `Embed Links`

## Architektur

```
src/
  index.mjs              — Bot Entry, Event Router, Auto-Alerts
  commands/
    shop.mjs             — /shop Slash-Command
    wishlist.mjs         — /wishlist Slash-Command
    challenge.mjs        — /challenge Slash-Command
  lib/
    fortnite-api.mjs     — Fortnite API Client
    wishlist-store.mjs   — JSON-basierte Wishlist-Persistenz
data/
  wishlists.json         — User-Wishlists (auto-generated)
  challenges.json        — Challenge-State (auto-generated)
```

## Hosting

Empfohlen: Railway, Fly.io, oder ein VPS mit PM2:

```bash
# PM2
pm2 start src/index.mjs --name fortnite-nexus-bot

# Docker (TODO)
```
