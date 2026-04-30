/**
 * web-search.mjs — Web Search Utility für SEO Research
 *
 * Nutzt DuckDuckGo oder andere kostenlose Web-Suche APIs.
 * Für Production: MCP Server (Brave Search, Exa) konfigurieren.
 */

/**
 * Führt eine Web-Suche durch und gibt Ergebnisse zurück
 * @param {string} query — Suchbegriff
 * @returns {Promise<Array>} Suchergebnisse
 */
export async function searchWeb(query) {
  try {
    // DuckDuckGo Instant Answer API (kostenlos, keine API Key nötig)
    const res = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);
    if (!res.ok) throw new Error(`Search API ${res.status}`);
    
    const data = await res.json();
    
    // Extrahiere relevante Ergebnisse aus DDG Response
    const results = [];
    
    if (data.RelatedTopics) {
      for (const topic of data.RelatedTopics) {
        if (topic.Text && topic.FirstURL) {
          results.push({
            title: topic.Text,
            url: topic.FirstURL,
            snippet: topic.Text
          });
        }
      }
    }
    
    return results.slice(0, 10); // Max 10 Ergebnisse
  } catch (err) {
    console.error('Web-Suche fehlgeschlagen:', err.message);
    return [];
  }
}

// Alias für Kompatibilität
export const search_web = searchWeb;
