/*
 * FORTNITENEXUS.SPACE — NAVIGATION-DESIGN
 * Hauptmenü-Struktur, Mega-Dropdowns, Mobile-Navigation, Sticky-Elemente
 * Masterplan 3 — Website-Architektur
 */

/* ═══════════════════════════════════════════
   [1] HAUPTMENÜ-STRUKTUR (DESKTOP)
   ═══════════════════════════════════════════ */

const desktopNavigation = [
    {
        id: 'guides',
        label: 'Guides',
        url: '/guides/',
        dropdown: true,
        items: [
            {
                label: 'Aim Guide',
                url: '/guides/fortnite-aim-verbessern-2026/'
            },
            {
                label: 'Building Guide',
                url: '/guides/fortnite-building-guide/'
            },
            {
                label: 'Best Settings 2026',
                url: '/guides/fortnite-best-settings-2026/'
            },
            {
                label: 'Weapon Tier List',
                url: '/guides/fortnite-weapon-tier-list/'
            },
            {
                label: 'Ranked Tipps',
                url: '/guides/fortnite-ranked-tipps/'
            },
            {
                label: 'Meta Strategie',
                url: '/guides/fortnite-meta-strategie/'
            }
        ]
    },
    {
        id: 'meta',
        label: 'Meta',
        url: '/meta/',
        dropdown: true,
        items: [
            {
                label: 'Waffen',
                url: '/meta/waffen/',
                sub_items: [
                    {
                        label: 'Assault Rifles',
                        url: '/meta/waffen/assault-rifles/'
                    },
                    {
                        label: 'Shotguns',
                        url: '/meta/waffen/shotguns/'
                    },
                    {
                        label: 'SMG',
                        url: '/meta/waffen/smg/'
                    },
                    {
                        label: 'Sniper',
                        url: '/meta/waffen/sniper/'
                    },
                    {
                        label: 'Best Loadouts',
                        url: '/meta/waffen/best-loadouts/'
                    }
                ]
            },
            {
                label: 'Karten',
                url: '/meta/karten/',
                sub_items: [
                    {
                        label: 'Chapter 6 Season 2',
                        url: '/meta/karten/chapter-6-season-2/'
                    },
                    {
                        label: 'Beste Landezonen',
                        url: '/meta/karten/beste-landezonen/'
                    },
                    {
                        label: 'POI Locations',
                        url: '/meta/karten/poi-locations/'
                    }
                ]
            },
            {
                label: 'Ranked',
                url: '/ranked/',
                sub_items: [
                    {
                        label: 'Tipps',
                        url: '/ranked/tipps/'
                    },
                    {
                        label: 'Strategie',
                        url: '/ranked/strategie/'
                    },
                    {
                        label: 'Zone Wars',
                        url: '/ranked/zone-wars/'
                    }
                ]
            }
        ]
    },
    {
        id: 'tools',
        label: 'Tools',
        url: '/tools/',
        dropdown: true,
        items: [
            {
                label: 'Waffen-Datenbank',
                url: '/tools/waffen-datenbank/'
            },
            {
                label: 'Loadout Builder',
                url: '/tools/loadout-builder/'
            },
            {
                label: 'Sensitivity Calculator',
                url: '/tools/sensitivity-calculator/'
            },
            {
                label: 'Map Tracker',
                url: '/tools/map-tracker/'
            },
            {
                label: 'Stats Checker',
                url: '/tools/stats-checker/'
            },
            {
                label: 'Item Shop Tracker',
                url: '/tools/item-shop-tracker/'
            }
        ]
    },
    {
        id: 'news',
        label: 'News',
        url: '/news/',
        dropdown: true,
        items: [
            {
                label: 'Patch Notes',
                url: '/news/patch-notes/'
            },
            {
                label: 'Item Shop',
                url: '/news/item-shop/'
            },
            {
                label: 'Events',
                url: '/news/events/'
            },
            {
                label: 'Leaks',
                url: '/news/leaks/'
            },
            {
                label: 'Competitive',
                url: '/news/competitive/'
            }
        ]
    },
    {
        id: 'ranked',
        label: 'Ranked',
        url: '/ranked/',
        dropdown: true,
        items: [
            {
                label: 'Ranked Tipps',
                url: '/ranked/tipps/'
            },
            {
                label: 'Ranked Strategie',
                url: '/ranked/strategie/'
            },
            {
                label: 'Zone Wars',
                url: '/ranked/zone-wars/'
            },
            {
                label: 'Ranked Loadouts',
                url: '/ranked/loadouts/'
            },
            {
                label: 'Pro Tipps',
                url: '/ranked/pro-tips/'
            }
        ]
    },
    {
        id: 'community',
        label: 'Community',
        url: '/community/',
        dropdown: true,
        items: [
            {
                label: 'Discord',
                url: '/community/discord/',
                external: true
            },
            {
                label: 'LFG',
                url: '/community/lfg/'
            },
            {
                label: 'Creators',
                url: '/community/creators/'
            }
        ]
    }
];

/* ═══════════════════════════════════════════
   [2] MOBILE-NAVIGATION (BOTTOM NAVIGATION)
   ═══════════════════════════════════════════ */

const mobileNavigation = [
    {
        id: 'home',
        label: 'Home',
        icon: 'home',
        url: '/'
    },
    {
        id: 'guides',
        label: 'Guides',
        icon: 'book',
        url: '/guides/'
    },
    {
        id: 'meta',
        label: 'Meta',
        icon: 'trending-up',
        url: '/meta/'
    },
    {
        id: 'tools',
        label: 'Tools',
        icon: 'wrench',
        url: '/tools/'
    },
    {
        id: 'profile',
        label: 'Profile',
        icon: 'user',
        url: '/profile/'
    }
];

/* ═══════════════════════════════════════════
   [3] STICKY-ELEMENTE
   ═══════════════════════════════════════════ */

const stickyElements = {
    header: {
        id: 'sticky-header',
        position: 'top',
        content: ['logo', 'navigation', 'search'],
        always_visible: true
    },
    sac_reminder: {
        id: 'sticky-sac',
        position: 'top',
        content: 'Nutze Creator Code: nexus',
        trigger: 'after_30s',
        dismissible: true
    },
    cta: {
        id: 'sticky-cta',
        position: 'bottom',
        content: 'Guide lesen',
        trigger: 'after_scroll',
        dismissible: false
    },
    toc: {
        id: 'sticky-toc',
        position: 'right',
        content: 'Inhaltsverzeichnis',
        trigger: 'on_guide_page',
        dismissible: false
    },
    related_content: {
        id: 'sticky-related',
        position: 'bottom',
        content: 'Verwandte Artikel',
        trigger: 'at_article_end',
        dismissible: false
    }
};

/* ═══════════════════════════════════════════
   [4] FOOTER-ARCHITEKTUR
   ═══════════════════════════════════════════ */

const footerArchitecture = [
    {
        title: 'Fortnite Nexus',
        links: [
            {
                label: 'Über uns',
                url: '/about/'
            },
            {
                label: 'Kontakt',
                url: '/contact/'
            },
            {
                label: 'Karriere',
                url: '/careers/'
            }
        ]
    },
    {
        title: 'Guides',
        links: [
            {
                label: 'Aim Guide',
                url: '/guides/fortnite-aim-verbessern-2026/'
            },
            {
                label: 'Building Guide',
                url: '/guides/fortnite-building-guide/'
            },
            {
                label: 'Settings',
                url: '/guides/fortnite-best-settings-2026/'
            }
        ]
    },
    {
        title: 'Meta',
        links: [
            {
                label: 'Waffen',
                url: '/meta/waffen/'
            },
            {
                label: 'Karten',
                url: '/meta/karten/'
            },
            {
                label: 'Ranked',
                url: '/ranked/'
            }
        ]
    },
    {
        title: 'Tools',
        links: [
            {
                label: 'Waffen-Datenbank',
                url: '/tools/waffen-datenbank/'
            },
            {
                label: 'Loadout Builder',
                url: '/tools/loadout-builder/'
            },
            {
                label: 'Stats Checker',
                url: '/tools/stats-checker/'
            }
        ]
    },
    {
        title: 'Legal',
        links: [
            {
                label: 'Datenschutz',
                url: '/privacy/'
            },
            {
                label: 'Impressum',
                url: '/impressum/'
            },
            {
                label: 'AGB',
                url: '/terms/'
            }
        ]
    },
    {
        title: 'Social',
        links: [
            {
                label: 'Discord',
                url: '/community/discord/',
                external: true
            },
            {
                label: 'Twitter',
                url: 'https://twitter.com/fortnitenexus',
                external: true
            },
            {
                label: 'YouTube',
                url: 'https://youtube.com/fortnitenexus',
                external: true
            },
            {
                label: 'TikTok',
                url: 'https://tiktok.com/@fortnitenexus',
                external: true
            }
        ]
    }
];

/* ═══════════════════════════════════════════
   [5] NAVIGATION GENERATORS
   ═══════════════════════════════════════════ */

function generateDesktopNavigation() {
    return desktopNavigation;
}

function generateMobileNavigation() {
    return mobileNavigation;
}

function generateStickyElements() {
    return stickyElements;
}

function generateFooter() {
    return footerArchitecture;
}

function generateMegaDropdown(menuId) {
    const menuItem = desktopNavigation.find(item => item.id === menuId);
    return menuItem ? menuItem.items : [];
}

/* ═══════════════════════════════════════════
   [6] INTEGRATION-ANLEITUNG
   ═══════════════════════════════════════════ */

/*
Auf jeder Seite kann navigation-config.js importiert werden:

<script src="/navigation-config.js"></script>
<script>
    // Desktop Navigation rendern
    const desktopNav = generateDesktopNavigation();
    renderDesktopNavigation(desktopNav);
    
    // Mobile Navigation rendern
    const mobileNav = generateMobileNavigation();
    renderMobileNavigation(mobileNav);
    
    // Sticky Elements rendern
    const stickyElements = generateStickyElements();
    renderStickyElements(stickyElements);
    
    // Footer rendern
    const footer = generateFooter();
    renderFooter(footer);
    
    // Mega Dropdown rendern
    const megaDropdown = generateMegaDropdown('meta');
    renderMegaDropdown(megaDropdown);
</script>
*/

/* Claude × Rolle — fortnitenexus.space — Nr. 1 */
