/*
 * FORTNITENEXUS.SPACE — ITEM SHOP TRACKER
 * Täglicher Fetch, Vergleich mit historischen Daten, Discord Alerts
 * Prompt 4 — Content Integration System
 */

/* ═══════════════════════════════════════════
   [1] ITEM SHOP DATA LOADER
   ═══════════════════════════════════════════ */
async function loadItemShop() {
    try {
        const response = await fetch('/data/item-shop.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler beim Laden von item-shop.json:', error);
        return null;
    }
}

/* ═══════════════════════════════════════════
   [2] HISTORICAL DATA COMPARISON
   ═══════════════════════════════════════════ */
async function loadHistoricalItemShop() {
    try {
        const response = await fetch('/data/item-shop-historical.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler beim Laden von item-shop-historical.json:', error);
        return null;
    }
}

async function saveHistoricalItemShop(data) {
    try {
        // In echten Szenario: Send to backend via API
        // Für Demo: Lokal speichern oder Console log
        console.log('Historical Item Shop saved:', data);
    } catch (error) {
        console.error('Fehler beim Speichern von historical data:', error);
    }
}

/* ═══════════════════════════════════════════
   [3] RARE ITEM DETECTION
   ═══════════════════════════════════════════ */
function detectRareItems(currentShop, historicalData) {
    const rareItems = [];
    
    if (!historicalData || !historicalData.last_seen) {
        return rareItems;
    }
    
    const allItems = [...currentShop.featured, ...currentShop.daily];
    
    allItems.forEach(item => {
        const lastSeen = historicalData.last_seen[item.id];
        
        // Wenn Item nie gesehen wurde oder länger als 30 Tage nicht im Shop
        if (!lastSeen || daysSince(lastSeen) > 30) {
            rareItems.push({
                ...item,
                rarity_score: calculateRarityScore(item, lastSeen)
            });
        }
    });
    
    return rareItems.sort((a, b) => b.rarity_score - a.rarity_score);
}

function daysSince(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function calculateRarityScore(item, lastSeen) {
    let score = 0;
    
    // Rarity base score
    const rarityScores = {
        'legendary': 100,
        'epic': 75,
        'rare': 50,
        'uncommon': 25,
        'common': 10
    };
    
    score += rarityScores[item.rarity] || 10;
    
    // Time since last seen bonus
    if (!lastSeen) {
        score += 50; // Never seen
    } else {
        const days = daysSince(lastSeen);
        score += Math.min(days * 2, 50); // Max 50 bonus points
    }
    
    return score;
}

/* ═══════════════════════════════════════════
   [4] DISCORD ALERTS
   ═══════════════════════════════════════════ */
async function sendDiscordAlert(rareItems) {
    if (rareItems.length === 0) {
        return;
    }
    
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    
    if (!webhookUrl) {
        console.log('Discord Webhook URL nicht konfiguriert');
        return;
    }
    
    const embed = {
        title: '🔥 RARE ITEMS IM ITEM SHOP!',
        description: 'Die folgenden seltenen Items sind heute im Shop:',
        color: 0xFFC300,
        fields: rareItems.slice(0, 5).map(item => ({
            name: `${item.name} (${item.rarity})`,
            value: `Rarity Score: ${item.rarity_score}\nPrice: ${item.price} V-Bucks`,
            inline: false
        })),
        timestamp: new Date().toISOString(),
        footer: {
            text: 'Fortnite Nexus Item Shop Tracker'
        }
    };
    
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ embeds: [embed] })
        });
        
        if (response.ok) {
            console.log('Discord Alert gesendet');
        } else {
            console.error('Fehler beim Senden des Discord Alerts');
        }
    } catch (error) {
        console.error('Fehler beim Senden des Discord Alerts:', error);
    }
}

/* ═══════════════════════════════════════════
   [5] ITEM SHOP UPDATE
   ═══════════════════════════════════════════ */
async function updateItemShop() {
    console.log('Item Shop Update gestartet...');
    
    // Load current item shop
    const currentShop = await loadItemShop();
    
    if (!currentShop) {
        console.error('Fehler beim Laden des aktuellen Item Shop');
        return;
    }
    
    // Load historical data
    const historicalData = await loadHistoricalItemShop();
    
    // Detect rare items
    const rareItems = detectRareItems(currentShop, historicalData);
    
    if (rareItems.length > 0) {
        console.log('Seltene Items gefunden:', rareItems);
        
        // Send Discord alert
        await sendDiscordAlert(rareItems);
        
        // Update historical data with rare items
        if (historicalData) {
            historicalData.rare_items = rareItems;
            await saveHistoricalItemShop(historicalData);
        }
    } else {
        console.log('Keine seltenen Items gefunden');
    }
    
    // Update historical data with current items
    const newHistoricalData = {
        last_seen: {},
        rare_items: rareItems,
        trending_items: []
    };
    
    const allItems = [...currentShop.featured, ...currentShop.daily];
    allItems.forEach(item => {
        newHistoricalData.last_seen[item.id] = new Date().toISOString();
    });
    
    await saveHistoricalItemShop(newHistoricalData);
    
    console.log('Item Shop Update abgeschlossen');
}

/* ═══════════════════════════════════════════
   [6] SCHEDULING
   ═══════════════════════════════════════════ */
// Daily fetch at 00:00 UTC
function scheduleItemShopUpdate() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setUTCHours(0, 0, 0, 0);
    
    const delay = tomorrow - now;
    
    setTimeout(() => {
        updateItemShop();
        scheduleItemShopUpdate(); // Reschedule for next day
    }, delay);
    
    console.log(`Item Shop Update geplant für: ${tomorrow.toISOString()}`);
}

/* ═══════════════════════════════════════════
   [7] INTEGRATION-ANLEITUNG
   ═══════════════════════════════════════════ */

/*
Auf jeder Seite kann item-shop-tracker.js importiert werden:

<script src="/item-shop-tracker.js"></script>
<script>
    // Manueller Update
    updateItemShop();
    
    // Automatischer Schedule
    scheduleItemShopUpdate();
</script>

Für Discord Alerts:
- DISCORD_WEBHOOK_URL Environment Variable setzen
- Webhook URL in Discord Server erstellen
*/

/* Claude × Rolle — fortnitenexus.space — Nr. 1 */
