/*
 * FORTNITENEXUS.SPACE — DATA LOADER
 * Dynamisches Laden von JSON-Dateien für alle Seiten
 * Prompt 4 — Content Integration System
 */

/* ═══════════════════════════════════════════
   [1] META DATA LOADER
   ═══════════════════════════════════════════ */
async function loadMeta() {
    try {
        const response = await fetch('/data/meta.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler beim Laden von meta.json:', error);
        return null;
    }
}

/* ═══════════════════════════════════════════
   [2] NEWS DATA LOADER
   ═══════════════════════════════════════════ */
async function loadNews() {
    try {
        const response = await fetch('/data/news.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler beim Laden von news.json:', error);
        return null;
    }
}

/* ═══════════════════════════════════════════
   [3] CREATORS DATA LOADER
   ═══════════════════════════════════════════ */
async function loadCreators() {
    try {
        const response = await fetch('/data/creators.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler beim Laden von creators.json:', error);
        return null;
    }
}

/* ═══════════════════════════════════════════
   [4] PROFILES DATA LOADER
   ═══════════════════════════════════════════ */
async function loadProfiles() {
    try {
        const response = await fetch('/data/profiles.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler beim Laden von profiles.json:', error);
        return null;
    }
}

/* ═══════════════════════════════════════════
   [5] SEITEN-SPEZIFISCHE LOADER
   ═══════════════════════════════════════════ */

// Für Loadout God Seite
async function loadWeapons() {
    const meta = await loadMeta();
    if (meta && meta.weapons) {
        return meta.weapons;
    }
    return [];
}

// Für NEXUS IQ Seite
async function loadProfileTypes() {
    const profiles = await loadProfiles();
    if (profiles && profiles.profile_types) {
        return profiles.profile_types;
    }
    return [];
}

// Für Creators Seite
async function loadAllCreators() {
    const creators = await loadCreators();
    if (creators && creators.creators) {
        return creators.creators;
    }
    return [];
}

// Für Classic Seite (News)
async function loadPatchUpdates() {
    const news = await loadNews();
    if (news && news.patch_updates) {
        return news.patch_updates;
    }
    return [];
}

// Für Classic Seite (News Articles)
async function loadNewsArticles() {
    const news = await loadNews();
    if (news && news.news_articles) {
        return news.news_articles;
    }
    return [];
}

// Für Classic Seite (Meta)
async function loadTierLists() {
    const meta = await loadMeta();
    if (meta && meta.tier_lists) {
        return meta.tier_lists;
    }
    return {};
}

/* ═══════════════════════════════════════════
   [6] INTEGRATION-ANLEITUNG
   ═══════════════════════════════════════════ */

/*
Jede Seite kann data-loader.js importieren und die entsprechenden Funktionen nutzen:

Beispiel für Loadout God Seite:

<script src="/data-loader.js"></script>
<script>
    async function initLoadoutGod() {
        const weapons = await loadWeapons();
        // Waffen in UI laden
        weapons.forEach(weapon => {
            // Waffe zur UI hinzufügen
        });
    }
    
    initLoadoutGod();
</script>

Beispiel für NEXUS IQ Seite:

<script src="/data-loader.js"></script>
<script>
    async function initNexusIQ() {
        const profileTypes = await loadProfileTypes();
        // Profil-Typen in Quiz verwenden
        profileTypes.forEach(type => {
            // Profil-Typ zur UI hinzufügen
        });
    }
    
    initNexusIQ();
</script>

Beispiel für Creators Seite:

<script src="/data-loader.js"></script>
<script>
    async function initCreators() {
        const creators = await loadAllCreators();
        // Creators in Grid laden
        creators.forEach(creator => {
            // Creator zur UI hinzufügen
        });
    }
    
    initCreators();
</script>
*/

/* Claude × Rolle — fortnitenexus.space — Nr. 1 */
