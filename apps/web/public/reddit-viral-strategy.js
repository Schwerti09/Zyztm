/*
 * FORTNITENEXUS.SPACE — REDDIT VIRAL STRATEGIE
 * 5 Post-Formate, Subreddit-Strategie, Cross-Posting
 * Masterplan 10 — Viral-Growth-Playbook
 */

/* ═══════════════════════════════════════════
   [1] REDDIT POST FORMAT GENERATORS
   ═══════════════════════════════════════════ */

// Format 1: Comprehensive Guide
function generateComprehensiveGuidePost(guide) {
    return {
        title: `[Guide] Wie du ${guide.goal} in ${guide.timeframe} erreichst (mit Daten)`,
        content: `Ich habe ${guide.hours_analyzed}+ Stunden ${guide.topic} analysiert und hier ist was funktioniert...\n\n${guide.content}\n\n${guide.faq}`,
        subreddit: guide.subreddit || 'FortniteCompetitive',
        flair: 'Guide'
    };
}

// Format 2: Data-Backed Analysis
function generateDataBackedAnalysisPost(analysis) {
    return {
        title: `[Analysis] Ich habe ${analysis.total} ${analysis.data_type} analysiert – hier sind die Ergebnisse`,
        content: `Methodologie: ${analysis.methodology}\nSample: ${analysis.sample}\n\nDaten:\n${analysis.data.map(d => `- ${d.key}: ${d.value}`).join('\n')}\n\nErkenntnisse:\n${analysis.insights.map(i => `- ${i}`).join('\n')}`,
        subreddit: analysis.subreddit || 'FortniteCompetitive',
        flair: 'Analysis'
    };
}

// Format 3: Meta-Update
function generateMetaUpdatePost(meta) {
    return {
        title: `[Meta] Der neue Patch hat alles verändert – hier ist was du wissen musst`,
        content: `Wichtigste Änderungen:\n${meta.changes.map(c => `- ${c}`).join('\n')}\n\nNeuer Meta: ${meta.new_meta}\nStrategie: ${meta.strategy}\n\nPro-Reaktionen:\n${meta.pro_reactions.map(r => `- ${r}`).join('\n')}`,
        subreddit: meta.subreddit || 'FortniteBR',
        flair: 'Meta'
    };
}

// Format 4: Tool-Recommendation
function generateToolRecommendationPost(tool) {
    return {
        title: `[Tool] Dieses Tool hat mein ${tool.skill} massiv verbessert`,
        content: `Problem: ${tool.problem}\nLösung: ${tool.solution}\n\nTutorial:\n${tool.tutorial.map(t => `- ${t}`).join('\n')}\n\nErgebnis: ${tool.result}`,
        subreddit: tool.subreddit || 'FortniteSettings',
        flair: 'Tool'
    };
}

// Format 5: Community-Discussion
function generateCommunityDiscussionPost(discussion) {
    return {
        title: `[Discussion] Was ist eure Meinung zu ${discussion.topic}?`,
        content: `${discussion.context}\n\nIch finde ${discussion.opinion}.\nStatistisch gesehen habe ich ${discussion.stats}.\n\nWas denkt ihr?`,
        subreddit: discussion.subreddit || 'FortniteBR',
        flair: 'Discussion'
    };
}

/* ═══════════════════════════════════════════
   [2] SUBREDDIT STRATEGY
   ═══════════════════════════════════════════ */

const subredditStrategy = {
    primary: {
        'FortniteBR': { frequency: '1x/Woche', audience: 'General Fortnite Players' },
        'FortniteCompetitive': { frequency: '1x/Woche', audience: 'Competitive Players' },
        'FortniteSettings': { frequency: '2x/Woche', audience: 'Settings Enthusiasts' },
        'FortniteCreative': { frequency: '1x/Woche', audience: 'Creative Players' },
        'fortnitede': { frequency: '1x/Woche', audience: 'German Players' }
    }
};

function getSubredditFrequency(subreddit) {
    return subredditStrategy.primary[subreddit]?.frequency || '1x/Woche';
}

function getOptimalSubredditForContent(contentType) {
    const contentToSubreddit = {
        'guide': 'FortniteCompetitive',
        'analysis': 'FortniteCompetitive',
        'meta': 'FortniteBR',
        'tool': 'FortniteSettings',
        'discussion': 'FortniteBR'
    };
    
    return contentToSubreddit[contentType] || 'FortniteBR';
}

/* ═══════════════════════════════════════════
   [3] CROSS-POSTING STRATEGY
   ═══════════════════════════════════════════ */

function generateCrossPost(originalPost, targetSubreddit) {
    const adaptedPost = {
        ...originalPost,
        subreddit: targetSubreddit,
        content: adaptContentForSubreddit(originalPost.content, targetSubreddit)
    };
    
    return adaptedPost;
}

function adaptContentForSubreddit(content, subreddit) {
    // Anpassung an jeweilige Community
    const adaptations = {
        'fortnitede': content + '\n\n[Deutsch]',
        'FortniteCompetitive': content + '\n\n[Competitive Focus]',
        'FortniteSettings': content + '\n\n[Settings Focus]'
    };
    
    return adaptations[subreddit] || content;
}

/* ═══════════════════════════════════════════
   [4] AUTOMATED POST GENERATION
   ═══════════════════════════════════════════ */

async function generateRedditPost() {
    const meta = await loadMeta();
    const news = await loadNews();
    
    if (!meta || !news) {
        console.error('Fehler beim Laden der Daten');
        return null;
    }
    
    // Zufälliges Post-Format wählen
    const formats = ['guide', 'analysis', 'meta', 'tool', 'discussion'];
    const selectedFormat = formats[Math.floor(Math.random() * formats.length)];
    
    let post;
    
    switch (selectedFormat) {
        case 'guide':
            post = generateComprehensiveGuidePost({
                goal: 'deinen Aim in 30 Tagen verbesserst',
                timeframe: '30 Tagen',
                hours_analyzed: 100,
                topic: 'Aim Training',
                content: `Tag 1-7: Aim Lab 30 Min täglich\nTag 8-14: Sensitivity auf 0.5 eDPI\nTag 15-21: Crosshair placement üben\nTag 22-30: Advanced Drills`,
                faq: `FAQ: Häufige Fragen zum Aim Training\nQ: Wie lange täglich? A: 30 Min\nQ: Welche Drills? A: Grid Shot, Spidershot, Tracking`,
                subreddit: 'FortniteCompetitive'
            });
            break;
            
        case 'analysis':
            post = generateDataBackedAnalysisPost({
                total: 1000,
                data_type: 'Ranked Matches',
                methodology: '1.000 Matches über 30 Tage',
                sample: 'Gold-Diamond Ranks',
                data: [
                    { key: 'Win Rate', value: '15%' },
                    { key: 'KD', value: '1.2' },
                    { key: 'Average Placement', value: '#25' }
                ],
                insights: [
                    'Mid-range combat dominiert',
                    'Shotgun überbewertet',
                    'AR+SMG Combo ist Meta'
                ],
                subreddit: 'FortniteCompetitive'
            });
            break;
            
        case 'meta':
            const latestPatch = news.patch_updates[0];
            post = generateMetaUpdatePost({
                changes: latestPatch.highlights,
                new_meta: 'Mid-range combat',
                strategy: 'AR+SMG statt AR+Shotgun',
                pro_reactions: [
                    'Pro-Spieler wechseln zu AR+SMG',
                    'Ranked Win Rate steigt'
                ],
                subreddit: 'FortniteBR'
            });
            break;
            
        case 'tool':
            post = generateToolRecommendationPost({
                skill: 'Aim',
                problem: 'Konstante Misses in Ranked',
                solution: 'Aim Lab 30 Min täglich',
                tutorial: [
                    'Grid Shot Ultimate',
                    'Spidershot',
                    'Tracking'
                ],
                result: '+25% Accuracy in 2 Wochen',
                subreddit: 'FortniteSettings'
            });
            break;
            
        case 'discussion':
            post = generateCommunityDiscussionPost({
                topic: 'dem neuen Meta',
                context: 'Der neue Patch hat AR bufft und Shotgun nerft.',
                opinion: 'AR+SMG ist besser als AR+Shotgun',
                stats: '35% Win Rate mit AR+SMG',
                subreddit: 'FortniteBR'
            });
            break;
    }
    
    return post;
}

/* ═══════════════════════════════════════════
   [5] REDDIT POSTING
   ═══════════════════════════════════════════ */

async function postReddit(post) {
    const config = await loadSocialMediaConfig();
    
    if (!config || !config.platforms.reddit.enabled) {
        console.log('Reddit ist nicht aktiviert');
        return;
    }
    
    // In echten Szenario: Reddit API verwenden
    // Für Demo: Console log
    console.log('=== REDDIT POST ===');
    console.log(`Subreddit: ${post.subreddit}`);
    console.log(`Title: ${post.title}`);
    console.log(`Flair: ${post.flair}`);
    console.log(`Content: ${post.content.substring(0, 200)}...`);
    console.log('==================');
    
    // Reddit API Example:
    /*
    const response = await fetch('https://oauth.reddit.com/api/submit', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${redditConfig.access_token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sr: post.subreddit,
            title: post.title,
            text: post.content,
            flair_id: post.flair
        })
    });
    */
}

/* ═══════════════════════════════════════════
   [6] WEEKLY REDDIT WORKFLOW
   ═══════════════════════════════════════════ */

async function runWeeklyRedditWorkflow() {
    console.log('Weekly Reddit Workflow gestartet...');
    
    // Post generieren
    const post = await generateRedditPost();
    
    if (!post) {
        console.error('Fehler beim Generieren des Reddit Posts');
        return;
    }
    
    // Post posten
    await postReddit(post);
    
    // Cross-Posting für andere Subreddits
    const targetSubreddits = ['FortniteCompetitive', 'FortniteBR', 'FortniteSettings'];
    
    for (const subreddit of targetSubreddits) {
        if (subreddit !== post.subreddit) {
            const crossPost = generateCrossPost(post, subreddit);
            console.log(`Cross-Post scheduled for ${subreddit}`);
        }
    }
    
    console.log('Weekly Reddit Workflow abgeschlossen');
}

/* ═══════════════════════════════════════════
   [7] INTEGRATION-ANLEITUNG
   ═══════════════════════════════════════════ */

/*
Auf jeder Seite kann reddit-viral-strategy.js importiert werden:

<script src="/reddit-viral-strategy.js"></script>
<script>
    // Manueller Post
    runWeeklyRedditWorkflow();
    
    // Spezieller Post
    const post = generateComprehensiveGuidePost({
        goal: 'deinen Aim verbesserst',
        timeframe: '30 Tagen',
        hours_analyzed: 100,
        topic: 'Aim Training',
        content: '...',
        faq: '...',
        subreddit: 'FortniteCompetitive'
    });
    postReddit(post);
</script>
*/

/* Claude × Rolle — fortnitenexus.space — Nr. 1 */
