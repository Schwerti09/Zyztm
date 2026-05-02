/**
 * AI Coaching via Claude API
 * 
 * Analyzes player stats and provides personalized coaching recommendations
 * using Anthropic Claude API
 */

import { Handler } from '@netlify/functions';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { stats } = JSON.parse(event.body || '{}');

    if (!stats) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Stats data required' }),
      };
    }

    // Build the prompt for Claude
    const prompt = `Du bist ein professioneller Fortnite Coach. Analysiere die folgenden Spieler-Stats und gib personalisierte Empfehlungen:

Spieler-Stats:
- K/D: ${stats.kd}
- Winrate: ${stats.winRate}%
- Matches: ${stats.matchesPlayed}
- Avg Damage: ${stats.avgDamage}
- Nexus Score: ${stats.nexusScore}

Weak Spots:
${stats.weakSpots?.map((ws: any) => `- ${ws.category}: ${ws.recommendation}`).join('\n') || 'Keine Weak Spots verfügbar'}

Gib mir 3-5 konkrete, handlungsorientierte Empfehlungen auf Deutsch. Jede Empfehlung soll:
1. Kurz und präzise sein (max 2 Sätze)
2. Direkt auf die Stats eingehen
3. Praktische Übungen oder Änderungen vorschlagen

Formatiere die Antwort als JSON mit folgender Struktur:
{
  "recommendations": [
    {
      "category": "Aim/Building/Game Sense/etc",
      "title": "Kurze Überschrift",
      "description": "Detaillierte Empfehlung",
      "priority": "high/medium/low"
    }
  ],
  "summary": "Zusammenfassung des Coaching in 2-3 Sätzen"
}`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = response.content[0];
    const text = typeof content === 'string' ? content : content.text;

    // Try to parse JSON from response
    let coachingData;
    try {
      // Extract JSON from response (Claude might wrap it in markdown)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        coachingData = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: create structured response from plain text
        coachingData = {
          recommendations: [
            {
              category: 'General',
              title: 'Training empfohlen',
              description: text.substring(0, 200),
              priority: 'medium',
            },
          ],
          summary: text.substring(0, 150),
        };
      }
    } catch (parseError) {
      // Fallback if JSON parsing fails
      coachingData = {
        recommendations: [
          {
            category: 'General',
            title: 'Training empfohlen',
            description: text.substring(0, 200),
            priority: 'medium',
          },
        ],
        summary: text.substring(0, 150),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coachingData),
    };
  } catch (error) {
    console.error('AI Coaching Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to generate AI coaching',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
