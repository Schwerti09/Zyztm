import { useEffect } from 'react';

interface SoftwareAppSchemaProps {
  name: string;
  description: string;
  url: string;
  /** e.g. "GameApplication", "UtilityApplication" */
  applicationCategory?: string;
  /** Number ratings */
  ratingValue?: number;
  ratingCount?: number;
  /** Optional feature list */
  featureList?: string[];
}

/**
 * Injektiert Schema.org SoftwareApplication JSON-LD in den <head>.
 * Wird beim Unmount automatisch entfernt.
 */
export default function SoftwareAppSchema({
  name,
  description,
  url,
  applicationCategory = 'GameApplication',
  ratingValue = 4.8,
  ratingCount = 127,
  featureList,
}: SoftwareAppSchemaProps) {
  useEffect(() => {
    const schemaId = `schema-${url.replace(/[^a-z0-9]/gi, '-')}`;

    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name,
      description,
      url,
      applicationCategory,
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue,
        ratingCount,
      },
      provider: {
        '@type': 'Organization',
        name: 'Fortnite Nexus',
        url: 'https://fortnitenexus.space',
      },
    };

    if (featureList && featureList.length > 0) {
      schema.featureList = featureList;
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = schemaId;
    script.textContent = JSON.stringify(schema);

    // Remove any existing schema with same ID
    const existing = document.getElementById(schemaId);
    if (existing) existing.remove();

    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(schemaId);
      if (el) el.remove();
    };
  }, [name, description, url, applicationCategory, ratingValue, ratingCount, featureList]);

  return null;
}
