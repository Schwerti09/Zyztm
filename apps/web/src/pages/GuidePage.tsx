import { Link, useParams } from 'wouter';
import { lazy, Suspense, useState, useEffect } from 'react';
import { getGuideBySlug } from '../data/guides';
import SEOHead from '../components/SEOHead';
import AuthorBox from '../components/AuthorBox';
import InternalLinks from '../components/InternalLinks';
import GeoContentInjector from '../components/GeoContentInjector';
import RegionalExpertCitation from '../components/RegionalExpertCitation';
import { detectUserRegion, type Region } from '../lib/geo-seo';
import { getLanguageFromPath, type Language } from '../lib/i18n';
import { getGuideTranslation } from '../data/guide-translations';

const Footer = lazy(() => import('../components/Footer'));

function NotFound() {
  return (
    <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center text-center px-6">
      <p className="font-cyber text-6xl text-neon-pink mb-4">404</p>
      <p className="font-body text-white/60 mb-8">Dieser Guide existiert nicht (mehr).</p>
      <Link href="/de/guides/fortnite">
        <a className="font-cyber text-neon-blue hover:text-white transition-colors border border-neon-blue/40 px-6 py-3 rounded-xl">
          Alle Guides ansehen
        </a>
      </Link>
    </div>
  );
}

/**
 * Runbook / Guide detail page.
 * Route: /{lang}/guide/:slug
 *
 * Features:
 * - Full JSON-LD schemas (HowTo + FAQPage + Speakable + Article + Breadcrumb)
 * - Direct answer in first 100 words (AEO / featured snippet optimised)
 * - Step-by-step HowTo section
 * - CLI commands with output
 * - Before/After data
 * - "Was andere Guides nicht sagen" section
 * - "Mein persönlicher Tipp" section
 * - Author box with E-E-A-T signals
 * - 8–12 contextual internal links
 * - FAQ accordion
 * - Multi-language support with translated content
 */
export default function GuidePage() {
  const params = useParams<{ slug: string; region?: string }>();
  const guide = getGuideBySlug(params.slug ?? '');
  const [userRegion, setUserRegion] = useState<Region>('unknown');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    async function loadRegion() {
      const region = params.region as Region || await detectUserRegion();
      setUserRegion(region);
    }
    loadRegion();
  }, [params.region]);

  useEffect(() => {
    // Detect language from URL on mount
    const lang = getLanguageFromPath(window.location.pathname);
    setCurrentLanguage(lang);
  }, []);

  if (!guide) return <NotFound />;

  const pageUrl = `https://fortnitenexus.netlify.app/de/guide/${guide.slug}${params.region ? `?region=${params.region}` : ''}`;

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      <SEOHead guide={guide} language={currentLanguage} />

      {/* ── Breadcrumb ── */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-4xl mx-auto px-6 pt-8 pb-2 text-xs font-body text-white/40 flex gap-2 flex-wrap"
      >
        <Link href="/"><a className="hover:text-neon-blue transition-colors">Home</a></Link>
        <span>/</span>
        <Link href={`/${currentLanguage}/guides/${guide.category}`}>
          <a className="hover:text-neon-blue transition-colors capitalize">{guide.category}</a>
        </Link>
        <span>/</span>
        <span className="text-white/60 truncate">{displayTitle}</span>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-8" itemScope itemType="https://schema.org/TechArticle">

        {/* ── Category tag + Reading time ── */}
        <div className="flex flex-wrap gap-3 mb-4">
          <Link href={`/${currentLanguage}/guides/${guide.category}`}>
            <a className="text-xs font-cyber text-neon-pink/80 bg-neon-pink/10 border border-neon-pink/20 px-3 py-1 rounded-full hover:bg-neon-pink/20 transition-colors capitalize">
              {guide.category}
            </a>
          </Link>
          <span className="text-xs font-body text-white/30 self-center">
            ⏱ {guide.readingTimeMin} Min. Lesezeit
          </span>
          <span className="text-xs font-body text-white/30 self-center">
            📅 Aktualisiert: {new Date(guide.lastUpdated).toLocaleDateString(currentLanguage === 'de' ? 'de-DE' : 'en-US')}
          </span>
        </div>

        {/* ── Geo-Targeted Content Injection ── */}
        <GeoContentInjector guideTopic={guide.category} showPing={true} showExpertCitation={true} showCommunityLink={true} />

        {/* ── Regional Expert Citation ── */}
        <RegionalExpertCitation topic={guide.category} showAvatar={true} showCredibility={true} showSocialLink={true} />

        {/* ── Headline ── */}
        <h1
          className="font-cyber text-3xl sm:text-4xl font-bold text-white leading-tight mb-4"
          itemProp="headline"
          data-speakable
        >
          {guide.title}
        </h1>

        {/* ── Direct Answer (AEO / Featured Snippet) ── */}
        <div
          className="guide-direct-answer p-5 rounded-2xl border border-neon-blue/30 bg-neon-blue/5 mb-8"
          data-speakable
        >
          <p className="text-xs font-cyber text-neon-blue tracking-widest mb-2">💡 KURZ ERKLÄRT</p>
          <p className="font-body text-white/90 leading-relaxed text-base" itemProp="description">
            {guide.directAnswer}
          </p>
        </div>

        {/* ── Before / After ── */}
        {guide.beforeAfter && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/5">
              <p className="text-xs font-cyber text-red-400 tracking-widest mb-2">❌ VORHER</p>
              <p className="font-body text-white/70 text-sm">{guide.beforeAfter.before}</p>
            </div>
            <div className="p-4 rounded-xl border border-green-500/30 bg-green-500/5">
              <p className="text-xs font-cyber text-green-400 tracking-widest mb-2">✅ NACHHER</p>
              <p className="font-body text-white/70 text-sm">{guide.beforeAfter.after}</p>
            </div>
            {guide.beforeAfter.metric && (
              <p className="sm:col-span-2 text-xs font-body text-white/30 italic text-center">
                Metrik: {guide.beforeAfter.metric}
              </p>
            )}
          </div>
        )}

        {/* ── Main Content Sections ── */}
        {guide.content.map((section) => (
          <section key={section.heading} className="mb-8">
            <h2 className="font-cyber text-xl font-bold text-neon-blue mb-3">{section.heading}</h2>
            <p className="font-body text-white/75 leading-relaxed text-base">{section.body}</p>
          </section>
        ))}

        {/* ── HowTo Steps ── */}
        {guide.steps.length > 0 && (
          <section className="mb-10">
            <h2 className="font-cyber text-xl font-bold text-neon-pink mb-5">
              📋 SCHRITT-FÜR-SCHRITT ANLEITUNG
            </h2>
            <ol className="space-y-4">
              {guide.steps.map((step, i) => (
                <li key={step.name} className="flex gap-4">
                  <span className="font-cyber text-2xl text-neon-pink/50 font-bold w-8 shrink-0 pt-0.5">
                    {i + 1}.
                  </span>
                  <div>
                    <h3 className="font-cyber text-base text-white mb-1">{step.name}</h3>
                    <p className="font-body text-white/70 text-sm leading-relaxed">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* ── CLI Commands ── */}
        {guide.cliCommands && guide.cliCommands.length > 0 && (
          <section className="mb-10">
            <h2 className="font-cyber text-xl font-bold text-neon-gold mb-5">
              💻 BEFEHLE & BEISPIELE
            </h2>
            <div className="space-y-6">
              {guide.cliCommands.map((cmd) => (
                <div key={cmd.description} className="rounded-xl overflow-hidden border border-white/10">
                  <div className="bg-bg-darker px-4 py-2">
                    <p className="text-xs font-body text-white/50">{cmd.description}</p>
                  </div>
                  <pre className="bg-black/60 px-4 py-3 overflow-x-auto text-sm font-mono text-neon-blue/90 leading-relaxed">
                    <code>{cmd.command}</code>
                  </pre>
                  {cmd.output && (
                    <>
                      <div className="bg-bg-darker px-4 py-1">
                        <p className="text-xs font-body text-white/30">Output</p>
                      </div>
                      <pre className="bg-black/40 px-4 py-3 overflow-x-auto text-xs font-mono text-green-400/80 leading-relaxed">
                        <code>{cmd.output}</code>
                      </pre>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── "Was andere Guides nicht sagen" ── */}
        <section className="mb-8 p-6 rounded-2xl border border-neon-gold/30 bg-neon-gold/5">
          <h2 className="font-cyber text-base font-bold text-neon-gold mb-3 tracking-wider">
            🔍 WAS ANDERE GUIDES NICHT SAGEN
          </h2>
          <p className="font-body text-white/75 leading-relaxed text-sm">{guide.hiddenInsight}</p>
        </section>

        {/* ── "Mein persönlicher Tipp" ── */}
        <section className="mb-10 p-6 rounded-2xl border border-neon-pink/30 bg-neon-pink/5">
          <h2 className="font-cyber text-base font-bold text-neon-pink mb-3 tracking-wider">
            ⚡ MEIN PERSÖNLICHER TIPP ALS FORTNITE-PROFI
          </h2>
          <p className="font-body text-white/75 leading-relaxed text-sm">{guide.expertTip}</p>
        </section>

        {/* ── FAQ Section ── */}
        {guide.faqs.length > 0 && (
          <section className="mb-10">
            <h2 className="font-cyber text-xl font-bold text-white mb-5">❓ HÄUFIGE FRAGEN</h2>
            <dl className="space-y-4">
              {guide.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="p-5 rounded-xl border border-white/10 bg-bg-card/50"
                >
                  <dt className="font-cyber text-base text-neon-blue mb-2">{faq.question}</dt>
                  <dd className="font-body text-white/70 text-sm leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* ── Internal Links ── */}
        <InternalLinks guide={guide} />

        {/* ── Author Box (E-E-A-T) ── */}
        <AuthorBox lastUpdated={guide.lastUpdated} />

        {/* ── Share prompt ── */}
        <div className="mt-8 text-center">
          <p className="text-xs font-body text-white/30">
            War dieser Guide hilfreich?{' '}
            <a
              href={`https://discord.gg/fortnitenexus`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-blue hover:text-white transition-colors"
            >
              Teile ihn in unserem Discord
            </a>{' '}
            oder{' '}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(displayTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-pink hover:text-white transition-colors"
            >
              auf Twitter/X
            </a>
            .
          </p>
        </div>
      </article>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
