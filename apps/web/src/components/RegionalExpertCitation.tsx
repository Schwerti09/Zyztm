/**
 * RegionalExpertCitation Component
 * Displays AI-generated local expert citations with credibility indicators
 * This creates trust and authority for each region
 */
'use client';

import { useState, useEffect } from 'react';
import { 
  detectUserRegion, 
  generateDynamicExpertCitation,
  type Region
} from '../lib/geo-seo';
import { REGIONS } from '../lib/geo-seo';

interface RegionalExpertCitationProps {
  topic?: string;
  showAvatar?: boolean;
  showCredibility?: boolean;
  showSocialLink?: boolean;
}

export default function RegionalExpertCitation({
  topic = 'default',
  showAvatar = true,
  showCredibility = true,
  showSocialLink = true,
}: RegionalExpertCitationProps) {
  const [citation, setCitation] = useState<string>('');
  const [region, setRegion] = useState<Region>('unknown');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCitation() {
      try {
        const detectedRegion = await detectUserRegion();
        setRegion(detectedRegion);
        const generatedCitation = generateDynamicExpertCitation(detectedRegion, topic);
        setCitation(generatedCitation);
      } catch (error) {
        setCitation(generateDynamicExpertCitation('unknown', topic));
      } finally {
        setLoading(false);
      }
    }

    loadCitation();
  }, [topic]);

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  const regionData = REGIONS[region];
  const expert = regionData.localExpert;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-5 mb-4">
      <div className="flex items-start gap-4">
        {showAvatar && (
          <div className="flex-shrink-0">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
              {expert.name.charAt(0)}
            </div>
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-bold text-white">{expert.name}</h4>
            <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">
              {region.replace('-', ' ').toUpperCase()}
            </span>
          </div>
          
          <p className="text-sm text-gray-400 mb-2">{expert.title}</p>
          
          <blockquote className="text-gray-200 text-sm italic border-l-4 border-purple-500 pl-3 my-3">
            {citation}
          </blockquote>

          {showCredibility && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-green-400 text-xs">✓</span>
              <span className="text-xs text-gray-400">{expert.credibility}</span>
            </div>
          )}

          {showSocialLink && (
            <a 
              href={expert.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              <span>Follow on Social</span>
              <span>→</span>
            </a>
          )}
        </div>
      </div>

      {/* Hidden structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: expert.name,
          jobTitle: expert.title,
          description: expert.credibility,
          url: expert.socialLink,
          knowsAbout: 'Fortnite',
          worksFor: {
            '@type': 'Organization',
            name: `Fortnite ${regionData.name} Community`
          }
        })
      }} />
    </div>
  );
}
