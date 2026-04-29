/*
 * FORTNITENEXUS.SPACE — AFFILIATE MARKETING
 * 3 Produkt-Kategorien mit konkreten Partnern
 * Masterplan 7 — Mega-Monetarisierung
 */

/* ═══════════════════════════════════════════
   [1] GAMING HARDWARE
   ═══════════════════════════════════════════ */

const gamingHardware = [
    {
        partner: 'Razer',
        commission: 0.20, // 20%
        products: ['Keyboards', 'Mice', 'Headsets'],
        link_path: '/hardware/razer'
    },
    {
        partner: 'Logitech G',
        commission: 0.15, // 15%
        products: ['Gaming Mäuse', 'Keyboards', 'Webcams'],
        link_path: '/hardware/logitech'
    },
    {
        partner: 'Amazon Associates',
        commission: 0.04, // 4%
        products: ['Alle Gaming-Hardware'],
        link_path: '/hardware/amazon'
    }
];

/* ═══════════════════════════════════════════
   [2] DIGITALE KEYS
   ═══════════════════════════════════════════ */

const digitalKeys = [
    {
        partner: 'Kinguin',
        commission: 0.10, // 10%
        products: ['Game Keys', 'V-Bucks'],
        link_path: '/keys/kinguin'
    },
    {
        partner: 'G2A',
        commission: 0.05, // 5%
        products: ['Game Keys', 'Software'],
        link_path: '/keys/g2a'
    },
    {
        partner: 'Humble Bundle',
        commission: 0.10, // 10%
        products: ['Game Bundles', 'Software'],
        link_path: '/keys/humble'
    }
];

/* ═══════════════════════════════════════════
   [3] VPN SERVICES
   ═══════════════════════════════════════════ */

const vpnServices = [
    {
        partner: 'NordVPN',
        commission: 0.30, // 30%
        products: ['VPN-Abos'],
        link_path: '/vpn/nordvpn'
    },
    {
        partner: 'ExpressVPN',
        commission: 0.25, // 25%
        products: ['VPN-Abos'],
        link_path: '/vpn/expressvpn'
    },
    {
        partner: 'CyberGhost',
        commission: 0.20, // 20%
        products: ['VPN-Abos'],
        link_path: '/vpn/cyberghost'
    }
];

/* ═══════════════════════════════════════════
   [4] STRATEGISCHE PLACEMENTS
   ═══════════════════════════════════════════ */

const strategicPlacements = [
    {
        id: 'guide_pages_hardware',
        position: 'Sidebar oder nach Content',
        context: 'Settings-Optimierung Guides',
        text: 'Besserer Aim mit Razer DeathAdder',
        link_type: 'hardware'
    },
    {
        id: 'item_shop_keys',
        position: 'Neben Item Shop Display',
        context: 'V-Bucks Käufe',
        text: 'Günstigere V-Bucks bei Kinguin',
        link_type: 'keys'
    },
    {
        id: 'competitive_guides_vpn',
        position: 'Nach Ranked-Tipps',
        context: 'Lag-Free Gaming',
        text: 'Kein Lag mit NordVPN',
        link_type: 'vpn'
    }
];

/* ═══════════════════════════════════════════
   [5] FTC COMPLIANCE
   ═══════════════════════════════════════════ */

const affiliateDisclaimer = {
    badge: 'Werbung',
    text: 'Dieser Link ist ein Affiliate-Link. Wenn du über diesen Link kaufst, erhalten wir eine kleine Provision.'
};

function renderAffiliateDisclaimer() {
    return `
        <div class="affiliate-disclaimer">
            <span class="affiliate-badge">${affiliateDisclaimer.badge}</span>
            <p>${affiliateDisclaimer.text}</p>
        </div>
    `;
}

/* ═══════════════════════════════════════════
   [6] AFFILIATE TRACKING
   ═══════════════════════════════════════════ */

function trackAffiliateClick(partner, linkType, context) {
    // Demo-Logik
    console.log(`Affiliate Click tracked - Partner: ${partner}, Type: ${linkType}, Context: ${context}, Timestamp: ${Date.now()}`);
    
    // In Production: Google Analytics
    // window.gtag?.('event', 'affiliate_click', {
    //   partner: partner,
    //   link_type: linkType,
    //   context: context,
    //   timestamp: Date.now()
    // });
}

function trackAffiliateConversion(partner, linkType, amount) {
    // Demo-Logik
    console.log(`Affiliate Conversion tracked - Partner: ${partner}, Type: ${linkType}, Amount: €${amount}, Timestamp: ${Date.now()}`);
    
    // In Production: Google Analytics
    // window.gtag?.('event', 'affiliate_conversion', {
    //   partner: partner,
    //   link_type: linkType,
    //   amount: amount,
    //   timestamp: Date.now()
    // });
}

/* ═══════════════════════════════════════════
   [7] REVENUE PROJEKTION
   ═══════════════════════════════════════════ */

const affiliateRevenueProjection = {
    conservative: {
        hardware: 200,
        keys: 150,
        vpn: 150,
        total: 500 // €500/Monat
    },
    aggressive: {
        hardware: 3000,
        keys: 2500,
        vpn: 2500,
        total: 8000 // €8.000/Monat
    }
};

/* ═══════════════════════════════════════════
   [8] INTEGRATION-ANLEITUNG
   ═══════════════════════════════════════════ */

/*
Auf jeder Seite kann affiliate-marketing.js importiert werden:

<script src="/affiliate-marketing.js"></script>
<script>
    // Affiliate Links rendern mit Disclaimer
    function renderAffiliateLink(partner, linkType, context) {
        const link = document.createElement('a');
        link.href = '/affiliate/' + partner;
        link.textContent = 'Jetzt kaufen';
        link.addEventListener('click', () => {
            trackAffiliateClick(partner, linkType, context);
        });
        
        const disclaimer = renderAffiliateDisclaimer();
        
        return { link, disclaimer };
    }
</script>
*/

/* Claude × Rolle — fortnitenexus.space — Nr. 1 */
