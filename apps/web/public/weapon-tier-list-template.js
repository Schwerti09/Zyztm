/*
 * FORTNITENEXUS.SPACE — WAFFEN-TIER-LIST-VORLAGE
 * Formatierung für Google Featured Snippet
 * Masterplan 2 — Patch-Seismograph
 */

/* ═══════════════════════════════════════════
   [1] TIER-LIST GENERATOR
   ═══════════════════════════════════════════ */

function generateTierList(weapons) {
    return {
        s_tier: weapons.filter(w => w.tier === 'S').map(w => ({
            name: w.name,
            reason: w.reason
        })),
        a_tier: weapons.filter(w => w.tier === 'A').map(w => ({
            name: w.name,
            reason: w.reason
        })),
        b_tier: weapons.filter(w => w.tier === 'B').map(w => ({
            name: w.name,
            reason: w.reason
        })),
        c_tier: weapons.filter(w => w.tier === 'C').map(w => ({
            name: w.name,
            reason: w.reason
        }))
    };
}

/* ═══════════════════════════════════════════
   [2] BEWERTUNGSKRITERIEN
   ═══════════════════════════════════════════ */

const evaluationCriteria = {
    dps_basis: 'Reiner Schaden pro Sekunde',
    handling: 'Reload-Time, Mag-Size, Fire Rate',
    range: 'Effektive Distanz',
    meta_relevance: 'Passt zum aktuellen Meta?',
    skill_cap: 'Wie schwer ist die Waffe zu meistern?'
};

const credibilityBoosters = [
    'Basierend auf Pro-Player Daten',
    'Analysiert von 1.000+ Matches',
    'Getestet von unserem Team',
    'Meta-basiert auf competitive data'
];

/* ═══════════════════════════════════════════
   [3] SURPRISE PICK MECHANIK
   ═══════════════════════════════════════════ */

function generateSurprisePick(weapon) {
    return {
        weapon: weapon.name,
        tier: 'A-Tier',
        reason: `Alle denken diese Waffe ist C-Tier, aber mit dem neuen ${weapon.buff_nerf} ist sie überraschend stark. Pro-Spieler wie ${weapon.pro_player} nutzen sie bereits im Ranked.`
    };
}

function generateDiscussionTrigger() {
    return {
        question: 'Was denkst du?',
        text: 'Stimmt unser Tier-List oder haben wir [Waffe X] falsch eingeschätzt? Diskutiere mit uns auf Discord!'
    };
}

/* ═══════════════════════════════════════════
   [4] FEATURED SNIPPET FORMAT
   ═══════════════════════════════════════════ */

function generateTierListFeaturedSnippet(tierList) {
    let snippet = '### S-Tier (Must-Have)\n';
    tierList.s_tier.forEach(w => {
        snippet += `- ${w.name} – ${w.reason}\n`;
    });
    
    snippet += '\n### A-Tier (Sehr gut)\n';
    tierList.a_tier.forEach(w => {
        snippet += `- ${w.name} – ${w.reason}\n`;
    });
    
    snippet += '\n### B-Tier (Gut)\n';
    tierList.b_tier.forEach(w => {
        snippet += `- ${w.name} – ${w.reason}\n`;
    });
    
    snippet += '\n### C-Tier (Mittel)\n';
    tierList.c_tier.forEach(w => {
        snippet += `- ${w.name} – ${w.reason}\n`;
    });
    
    return snippet;
}

/* ═══════════════════════════════════════════
   [5] WAFFEN-BEWERTUNG
   ═══════════════════════════════════════════ */

function evaluateWeapon(weapon) {
    const score = {
        dps: calculateDPS(weapon),
        handling: calculateHandling(weapon),
        range: calculateRange(weapon),
        meta_relevance: calculateMetaRelevance(weapon),
        skill_cap: calculateSkillCap(weapon)
    };
    
    const totalScore = Object.values(score).reduce((a, b) => a + b, 0) / 5;
    
    let tier;
    if (totalScore >= 4.5) tier = 'S';
    else if (totalScore >= 3.5) tier = 'A';
    else if (totalScore >= 2.5) tier = 'B';
    else tier = 'C';
    
    return {
        name: weapon.name,
        tier: tier,
        score: score,
        total_score: totalScore,
        reason: generateReason(tier, score)
    };
}

function calculateDPS(weapon) {
    // DPS-Basis berechnen
    return weapon.damage * weapon.fire_rate / 60;
}

function calculateHandling(weapon) {
    // Handling berechnen (Reload-Time, Mag-Size, Fire Rate)
    const reloadScore = (10 - weapon.reload_time) / 10;
    const magScore = weapon.mag_size / 30;
    const fireRateScore = weapon.fire_rate / 15;
    return (reloadScore + magScore + fireRateScore) / 3;
}

function calculateRange(weapon) {
    // Range berechnen
    return weapon.range / 100;
}

function calculateMetaRelevance(weapon) {
    // Meta-Relevanz berechnen
    return weapon.meta_relevance || 0.5;
}

function calculateSkillCap(weapon) {
    // Skill-Cap berechnen
    return weapon.skill_cap || 0.5;
}

function generateReason(tier, score) {
    if (tier === 'S') {
        return `Exzellenter DPS (${score.dps.toFixed(1)}), Handling (${score.handling.toFixed(1)}) und Meta-Relevanz (${score.meta_relevance.toFixed(1)}).`;
    } else if (tier === 'A') {
        return `Guter Balance aus DPS und Handling. Solide Meta-Relevanz.`;
    } else if (tier === 'B') {
        return `Mittelmäßige Performance, aber in bestimmten Situationen nützlich.`;
    } else {
        return `Unter dem Durchschnitt. Nur als Fallback empfohlen.`;
    }
}

/* ═══════════════════════════════════════════
   [6] INTEGRATION-ANLEITUNG
   ═══════════════════════════════════════════ */

/*
Auf jeder Seite kann weapon-tier-list-template.js importiert werden:

<script src="/weapon-tier-list-template.js"></script>
<script>
    // Waffen-Daten
    const weapons = [
        {
            name: 'Assault Rifle',
            damage: 35,
            fire_rate: 8.5,
            reload_time: 2.5,
            mag_size: 30,
            range: 80,
            meta_relevance: 0.9,
            skill_cap: 0.7
        },
        {
            name: 'Shotgun',
            damage: 90,
            fire_rate: 1.2,
            reload_time: 3.0,
            mag_size: 8,
            range: 20,
            meta_relevance: 0.8,
            skill_cap: 0.6
        }
        // ... weitere Waffen
    ];
    
    // Waffen bewerten
    const evaluatedWeapons = weapons.map(w => evaluateWeapon(w));
    
    // Tier-List generieren
    const tierList = generateTierList(evaluatedWeapons);
    
    // Featured Snippet generieren
    const featuredSnippet = generateTierListFeaturedSnippet(tierList);
    
    // Surprise Pick generieren
    const surprisePick = generateSurprisePick(evaluatedWeapons[0]);
    
    // Diskussion-Trigger generieren
    const discussionTrigger = generateDiscussionTrigger();
    
    // Tier-List rendern
    renderTierList(tierList, featuredSnippet, surprisePick, discussionTrigger);
</script>
*/

/* Claude × Rolle — fortnitenexus.space — Nr. 1 */
