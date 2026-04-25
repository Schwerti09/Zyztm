/**
 * GeoContentInjector Component
 * Dynamically injects location-based content into guides
 * Shows regional expert citations, server ping info, and local community links
 * 
 * This is the BRUTAL GENIALE part - automatic geo-content that no one else has
 */
'use client';

import { useState, useEffect } from 'react';
import { 
  detectUserRegion, 
  generateGeoContent, 
  generateDynamicExpertCitation,
  type Region,
  type GeoContentInjection
} from '../lib/geo-seo';

interface GeoContentInjectorProps {
  guideTopic?: string;
  showPing?: boolean;
  showExpertCitation?: boolean;
  showCommunityLink?: boolean;
  compact?: boolean;
}

export default function GeoContentInjector({
  guideTopic = 'default',
  showPing = true,
  showExpertCitation = true,
  showCommunityLink = true,
  compact = false,
}: GeoContentInjectorProps) {
  const [geoContent, setGeoContent] = useState<GeoContentInjection | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRegion, setUserRegion] = useState<Region>('unknown');

  useEffect(() => {
    async function loadGeoContent() {
      try {
        const detectedRegion = await detectUserRegion();
        setUserRegion(detectedRegion);
        const content = generateGeoContent(detectedRegion);
        setGeoContent(content);
      } catch (error) {
        // Fallback to unknown region
        const content = generateGeoContent('unknown');
        setGeoContent(content);
      } finally {
        setLoading(false);
      }
    }

    loadGeoContent();
  }, []);

  if (loading) {
    return compact ? null : (
      <div className="animate-pulse bg-gray-800 rounded-lg p-4 mb-4">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  if (!geoContent) return null;

  if (compact) {
    return (
      <div className="text-xs text-gray-400 mb-2">
        <span className="text-green-400">🌍 {geoContent.region.toUpperCase()}</span>
        {' '}| {geoContent.serverPing}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🌍</span>
        <h3 className="text-lg font-bold text-white">
          Optimized for {geoContent.region.replace('-', ' ').toUpperCase()}
        </h3>
        <span className="ml-auto text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
          Geo-Targeted Content
        </span>
      </div>

      {showPing && (
        <div className="flex items-center gap-2 mb-3 text-sm">
          <span className="text-green-400">⚡</span>
          <span className="text-gray-300">{geoContent.serverPing}</span>
        </div>
      )}

      <div className="space-y-3">
        {showExpertCitation && (
          <div className="bg-black/30 rounded-lg p-3 border-l-4 border-purple-500">
            <div className="flex items-start gap-2">
              <span className="text-xl">💬</span>
              <div>
                <p className="text-gray-200 text-sm italic">"{geoContent.expertCitation}"</p>
                <p className="text-xs text-gray-400 mt-1">Local Expert Insight</p>
              </div>
            </div>
          </div>
        )}

        <div className="text-sm text-gray-300">
          <span className="text-yellow-400">💡</span>
          <span className="ml-1">{geoContent.localProTip}</span>
        </div>

        {showCommunityLink && (
          <div className="text-sm text-gray-300">
            <span className="text-blue-400">👥</span>
            <span className="ml-1">{geoContent.localCommunityLink}</span>
          </div>
        )}

        <div className="text-xs text-gray-500 border-t border-gray-700 pt-2 mt-2">
          <span className="text-purple-400">Regional Meta:</span> {geoContent.regionalMetaAnalysis}
        </div>
      </div>

      {/* Hidden SEO keywords for indexing */}
      <div className="hidden">
        {geoContent.regionalKeywordVariation}
      </div>
    </div>
  );
}

// Compact version for inline usage
export function CompactGeoIndicator() {
  return (
    <GeoContentInjector 
      compact={true}
      showPing={false}
      showExpertCitation={false}
      showCommunityLink={false}
    />
  );
}
