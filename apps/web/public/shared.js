/*
 * FORTNITENEXUS.SPACE — SHARED JAVASCRIPT
 * Global Routing & Interaction System für alle Seiten
 * Prompt 1 — Shared Foundation System
 */

/* ═══════════════════════════════════════════
   [1] ROUTING-SYSTEM
   ═══════════════════════════════════════════ */

// Erkenne aktuelle URL und setze aktiven Nav-Link
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Entferne aktive Klasse
        link.classList.remove('active');
        
        // Prüfe ob der Link zur aktuellen Seite passt
        if (linkPath === currentPath || 
            (currentPath === '/' && linkPath === '/index.html') ||
            (linkPath !== '/' && currentPath.startsWith(linkPath))) {
            link.classList.add('active');
        }
    });
}

// Smooth Scroll für Anker-Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Page-Transition Animation beim Wechsel
function initPageTransition() {
    document.body.classList.add('page-transition');
    
    setTimeout(() => {
        document.body.classList.remove('page-transition');
    }, 500);
}

/* ═══════════════════════════════════════════
   [2] STICKY NAVIGATION
   ═══════════════════════════════════════════ */
function initStickyNav() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ═══════════════════════════════════════════
   [3] MOBILE MENU
   ═══════════════════════════════════════════ */
function initMobileMenu() {
    const menuBtn = document.querySelector('.navbar-menu-btn');
    const mobileMenu = document.querySelector('.navbar-mobile-menu');
    const closeBtn = document.querySelector('.navbar-mobile-close');
    const mobileLinks = document.querySelectorAll('.navbar-mobile-link');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('open');
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
            });
        }
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
            });
        });
    }
}

/* ═══════════════════════════════════════════
   [4] CUSTOM CURSOR
   ═══════════════════════════════════════════ */
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const ring = document.querySelector('.custom-cursor-ring');
    
    if (!cursor || !ring) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Ring folgt mit Verzögerung
        setTimeout(() => {
            ring.style.left = e.clientX + 'px';
            ring.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Cursor-Vergrößerung bei Hover über Links und Buttons
    document.querySelectorAll('a, button, .card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            ring.style.transform = 'scale(1)';
        });
    });
}

/* ═══════════════════════════════════════════
   [5] BLITZ EFFECT
   ═══════════════════════════════════════════ */
function initBlitzEffect() {
    function triggerBlitz() {
        const blitz = document.createElement('div');
        blitz.className = 'blitz-effect';
        document.body.appendChild(blitz);
        
        setTimeout(() => {
            blitz.remove();
        }, 300);
    }
    
    // Blitz alle 10-20 Sekunden
    setInterval(() => {
        triggerBlitz();
    }, Math.random() * 10000 + 10000);
}

/* ═══════════════════════════════════════════
   [6] LIVE COUNTER (für Homepage)
   ═══════════════════════════════════════════ */
function initLiveCounter() {
    const counter = document.querySelector('.live-counter');
    if (!counter) return;
    
    const targetNumber = 18247;
    const duration = 2000;
    const steps = 60;
    const increment = targetNumber / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
            counter.textContent = targetNumber.toLocaleString('de-DE');
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current).toLocaleString('de-DE');
        }
    }, duration / steps);
}

/* ═══════════════════════════════════════════
   [7] COUNTUP ANIMATION (für Stats)
   ═══════════════════════════════════════════ */
function initCountUp() {
    const counters = document.querySelectorAll('.countup');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target.toLocaleString('de-DE');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString('de-DE');
            }
        }, duration / steps);
    });
}

/* ═══════════════════════════════════════════
   [8] 3D CARD TILT EFFECT
   ═══════════════════════════════════════════ */
function initCardTilt() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/* ═══════════════════════════════════════════
   [9] INIT ALLE SYSTEME
   ═══════════════════════════════════════════ */
function initSharedFoundation() {
    setActiveNavLink();
    initSmoothScroll();
    initPageTransition();
    initStickyNav();
    initMobileMenu();
    initCustomCursor();
    initBlitzEffect();
    initLiveCounter();
    initCountUp();
    initCardTilt();
}

// DOM Loaded Event
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSharedFoundation);
} else {
    initSharedFoundation();
}

/* ═══════════════════════════════════════════
   [10] INTEGRATION-ANLEITUNG
   ═══════════════════════════════════════════ */

/*
Jede Seite muss diese zwei Tags im <head> haben:

<link rel="stylesheet" href="/shared.css">
<script src="/shared.js" defer></script>

Beispiel für index.html:

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fortnite Nexus — Die Nr. 1 Fortnite-Kommandozentrale</title>
    <link rel="stylesheet" href="/shared.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="navbar-container">
            <a href="/" class="navbar-logo">NEXUS</a>
            <div class="navbar-links">
                <a href="/" class="navbar-link">Home</a>
                <a href="/nexus-iq" class="navbar-link">NEXUS IQ</a>
                <a href="/loadout-god" class="navbar-link">Loadout God</a>
                <a href="/creators" class="navbar-link">Creators</a>
                <a href="/classic" class="navbar-link">Classic</a>
                <a href="#" class="navbar-discord">Discord</a>
            </div>
            <button class="navbar-menu-btn">☰</button>
        </div>
    </nav>

    <!-- Mobile Menu -->
    <div class="navbar-mobile-menu">
        <button class="navbar-mobile-close">×</button>
        <a href="/" class="navbar-mobile-link">Home</a>
        <a href="/nexus-iq" class="navbar-mobile-link">NEXUS IQ</a>
        <a href="/loadout-god" class="navbar-mobile-link">Loadout God</a>
        <a href="/creators" class="navbar-mobile-link">Creators</a>
        <a href="/classic" class="navbar-mobile-link">Classic</a>
    </div>

    <!-- Custom Cursor -->
    <div class="custom-cursor"></div>
    <div class="custom-cursor-ring"></div>

    <!-- Page Content -->
    <main>
        <!-- Dein Content hier -->
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>NEXUS</h3>
                    <p>Die Nr. 1 Fortnite-Kommandozentrale auf Deutsch.</p>
                </div>
                <!-- Weitere Footer-Sektionen -->
            </div>
            <div class="footer-bottom">
                <p>© 2026 Fortnite Nexus. Alle Rechte vorbehalten.</p>
                <p>Nicht mit Epic Games verbunden.</p>
            </div>
        </div>
    </footer>

    <script src="/shared.js"></script>
</body>
</html>
*/

/* Claude × Rolle — fortnitenexus.space — Nr. 1 */
