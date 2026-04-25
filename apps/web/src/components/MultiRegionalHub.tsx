/**
 * MultiRegionalHub Component
 * Displays content for all Fortnite regions with quick navigation
 * This creates a massive internal linking structure for SEO
 */
'use client';

import { useState } from 'react';
import { REGIONS, type Region } from '../lib/geo-seo';

interface MultiRegionalHubProps {
  currentRegion?: Region;
  showAllRegions?: boolean;
}

export default function MultiRegionalHub({
  currentRegion = 'unknown',
  showAllRegions = true,
}: MultiRegionalHubProps) {
  const [selectedRegion, setSelectedRegion] = useState<Region>(currentRegion);
  const [showDetails, setShowDetails] = useState(false);

  const continentGroups = {
    'North America': ['na-east', 'na-west'],
    'Europe': ['eu-west', 'eu-central', 'eu-nordic'],
    'Asia': ['asia-east', 'asia-southeast'],
    'Oceania': ['oceania'],
    'South America': ['brazil'],
    'Middle East': ['middle-east'],
    'Africa': ['africa'],
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">🌍</span>
          Worldwide Fortnite Regional Hub
        </h2>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm bg-purple-500/20 text-purple-300 px-3 py-1 rounded hover:bg-purple-500/30 transition-colors"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      <p className="text-gray-400 text-sm mb-4">
        Access region-specific guides, meta analysis, and expert insights for every Fortnite region worldwide.
      </p>

      {Object.entries(continentGroups).map(([continent, regions]) => (
        <div key={continent} className="mb-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">{continent}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {regions.map((regionKey) => {
              const region = regionKey as Region;
              const regionData = REGIONS[region];
              const isSelected = selectedRegion === region;

              return (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`p-3 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-purple-500/20 border-purple-500 text-white'
                      : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300'
                  }`}
                >
                  <div className="text-xs font-semibold mb-1">
                    {regionData.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    Ping: {regionData.pingAvg}ms
                  </div>
                  {showDetails && (
                    <div className="mt-2 pt-2 border-t border-gray-700 text-xs">
                      <div className="text-gray-400">
                        Meta: {regionData.regionalMeta.slice(0, 30)}...
                      </div>
                      <div className="text-gray-500 mt-1">
                        {regionData.localExpert.name}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {showDetails && (
        <div className="mt-6 pt-4 border-t border-gray-700">
          <RegionDetailCard region={selectedRegion} />
        </div>
      )}

      {/* Hidden internal links for SEO */}
      <div className="hidden">
        {Object.values(REGIONS).map((regionData) => (
          <a key={regionData.id} href={`/guides/region/${regionData.id}`}>
            Fortnite Guide {regionData.name}
          </a>
        ))}
      </div>
    </div>
  );
}

function RegionDetailCard({ region }: { region: Region }) {
  const regionData = REGIONS[region];
  const expert = regionData.localExpert;

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h4 className="font-bold text-white text-lg mb-2">
            {regionData.name}
          </h4>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Server:</span>
              <span className="text-white ml-2">{regionData.serverLocation}</span>
            </div>
            <div>
              <span className="text-gray-400">Avg Ping:</span>
              <span className="text-white ml-2">{regionData.pingAvg}ms</span>
            </div>
            <div>
              <span className="text-gray-400">Language:</span>
              <span className="text-white ml-2">{regionData.primaryLanguage}</span>
            </div>
            <div>
              <span className="text-gray-400">Timezone:</span>
              <span className="text-white ml-2">{regionData.timezone}</span>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="text-sm font-semibold text-gray-300 mb-2">Regional Meta</h5>
            <p className="text-sm text-gray-400">{regionData.regionalMeta}</p>
          </div>

          <div className="mt-4">
            <h5 className="text-sm font-semibold text-gray-300 mb-2">Popular Weapons</h5>
            <div className="flex flex-wrap gap-2">
              {regionData.popularWeapons.map((weapon) => (
                <span key={weapon} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                  {weapon}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <h5 className="text-sm font-semibold text-gray-300 mb-2">Local Expert</h5>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {expert.name.charAt(0)}
              </div>
              <div>
                <p className="text-white font-semibold">{expert.name}</p>
                <p className="text-sm text-gray-400">{expert.title}</p>
                <p className="text-xs text-gray-500 mt-1 italic">"{expert.quote}"</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="text-sm font-semibold text-gray-300 mb-2">Top Players</h5>
            <div className="flex flex-wrap gap-2">
              {regionData.topPlayers.map((player) => (
                <span key={player} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                  {player}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h5 className="text-sm font-semibold text-gray-300 mb-2">Community</h5>
            <div className="flex flex-wrap gap-2">
              {regionData.discordServers.map((server) => (
                <span key={server} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                  {server}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500">
          <div className="bg-gray-900 rounded p-2">
            <div className="font-semibold mb-1">Coordinates</div>
            <div>Lat: {regionData.geoCoordinates.lat}</div>
            <div>Lng: {regionData.geoCoordinates.lng}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
