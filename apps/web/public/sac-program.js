/*
 * FORTNITENEXUS.SPACE — SAC-PROGRAMM
 * Support-A-Creator Programm mit Display Logic und Tracking
 * Masterplan 7 — Mega-Monetarisierung
 */

/* ═══════════════════════════════════════════
   [1] SAC DISPLAY CONTEXTS
   ═══════════════════════════════════════════ */

const sacDisplayContexts = [
    {
        id: 'hero',
        position: 'Direkt unter CTA-Buttons',
        display: 'Prominent, animiert',
        dismiss: false,
        text: 'Nutze Creator Code: NEXUS im Item Shop'
    },
    {
        id: 'guide',
        position: 'Nach Direct Answer Sektion',
        display: 'Compact, inline',
        dismiss: true,
        dismiss_duration: 86400000, // 24 hours
        text: 'Support uns mit Creator Code: NEXUS'
    },
    {
        id: 'shop',
        position: 'Neben Item Shop Display',
        display: 'Highlighted, prominent',
        dismiss: false,
        text: 'Nutze Code: NEXUS für Support'
    },
    {
        id: 'checkout',
        position: 'Vor finaler Kaufbestätigung',
        display: 'Final CTA',
        dismiss: false,
        text: 'Vergiss nicht: NEXUS im Item Shop'
    },
    {
        id: 'footer',
        position: 'Vor Footer-Links',
        display: 'Subtle, persistent',
        dismiss: true,
        dismiss_duration: 86400000, // 24 hours
        text: 'Creator Code: NEXUS'
    }
];

/* ═══════════════════════════════════════════
   [2] SMART DISPLAY LOGIC
   ═══════════════════════════════════════════ */

const SAC_CONFIG = {
    maxFrequency: 3, // Max 3 reminders per session
    minInterval: 300000, // 5 minutes between reminders
    dismissDuration: 86400000, // 24 hours after dismiss
    contexts: ['hero', 'shop', 'guide', 'checkout', 'footer']
};

function shouldDisplaySACReminder(context, sessionData) {
    // Check if context is valid
    if (!SAC_CONFIG.contexts.includes(context)) return false;

    // Check if dismissed
    if (sessionData.dismissedUntil > Date.now()) return false;

    // Check max frequency
    if (sessionData.displayCount >= SAC_CONFIG.maxFrequency) return false;

    // Check min interval
    if (sessionData.lastDisplay && 
        (Date.now() - sessionData.lastDisplay) < SAC_CONFIG.minInterval) {
        return false;
    }

    return true;
}

/* ═══════════════════════════════════════════
   [3] CONVERSION TRACKING
   ═══════════════════════════════════════════ */

function trackSACCodeCopy(context) {
    // Demo-Logik
    console.log(`SAC Code Copy tracked - Context: ${context}, Timestamp: ${Date.now()}`);
    
    // In Production: Google Analytics
    // window.gtag?.('event', 'sac_code_copy', {
    //   context: context,
    //   timestamp: Date.now()
    // });
}

function trackSACCodeDismiss(context) {
    // Demo-Logik
    console.log(`SAC Code Dismiss tracked - Context: ${context}, Timestamp: ${Date.now()}`);
    
    // In Production: Google Analytics
    // window.gtag?.('event', 'sac_code_dismiss', {
    //   context: context,
    //   timestamp: Date.now()
    // });
}

function trackSACCodeConversion(context) {
    // Demo-Logik
    console.log(`SAC Code Conversion tracked - Context: ${context}, Timestamp: ${Date.now()}`);
    
    // In Production: Google Analytics
    // window.gtag?.('event', 'sac_code_conversion', {
    //   context: context,
    //   timestamp: Date.now()
    // });
}

/* ═══════════════════════════════════════════
   [4] REVENUE PROJEKTION
   ═══════════════════════════════════════════ */

const sacRevenueProjection = {
    conservative: {
        active_users: 10000,
        average_spending: 50, // €50/Monat
        sac_commission: 0.05, // 5%
        revenue: 500 // €500/Monat
    },
    aggressive: {
        active_users: 50000,
        average_spending: 50, // €50/Monat
        sac_commission: 0.05, // 5%
        revenue: 2500 // €2.500/Monat
    }
};

/* ═══════════════════════════════════════════
   [5] INTEGRATION-ANLEITUNG
   ═══════════════════════════════════════════ */

/*
Auf jeder Seite kann sac-program.js importiert werden:

<script src="/sac-program.js"></script>
<script>
    // Session Data initialisieren
    const sessionData = {
        displayCount: 0,
        lastDisplay: null,
        dismissedUntil: 0
    };
    
    // SAC Reminder anzeigen
    if (shouldDisplaySACReminder('hero', sessionData)) {
        renderSACReminder('hero');
        sessionData.displayCount++;
        sessionData.lastDisplay = Date.now();
    }
    
    // Tracking
    document.getElementById('sac-copy-button').addEventListener('click', () => {
        trackSACCodeCopy('hero');
    });
    
    document.getElementById('sac-dismiss-button').addEventListener('click', () => {
        trackSACCodeDismiss('hero');
        sessionData.dismissedUntil = Date.now() + SAC_CONFIG.dismissDuration;
    });
</script>
*/

/* Claude × Rolle — fortnitenexus.space — Nr. 1 */
