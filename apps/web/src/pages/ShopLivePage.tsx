import { lazy, Suspense, useEffect } from 'react';
import { Link } from 'wouter';
import LiveItemShop from '../components/shop/LiveItemShop';

const Footer = lazy(() => import('../components/Footer'));

export default function ShopLivePage() {
  useEffect(() => {
    document.title =
      'Fortnite Item Shop heute — Live mit Rarity-Rating | Fortnite Nexus';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'Aktueller Fortnite Item Shop live mit Rarity-Rating, Shop-History und Creator-Code ZYZTM. Täglich rotierender Shop. Alle Items auf deutsch.',
    );

    // Schema.org
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Fortnite Item Shop heute',
      description: 'Aktueller Fortnite Shop mit Rarity-Rating',
      url: 'https://fortnitenexus.space/item-shop',
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'schema-item-shop';
    script.textContent = JSON.stringify(schema);
    const existing = document.getElementById('schema-item-shop');
    if (existing) existing.remove();
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('schema-item-shop');
      if (el) el.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      <main>
        <nav
          aria-label="Breadcrumb"
          className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 text-xs font-body text-white/40 flex gap-2 flex-wrap"
        >
          <Link href="/">
            <a className="hover:text-neon-pink transition-colors">Home</a>
          </Link>
          <span>/</span>
          <span className="text-white/60">Item Shop</span>
        </nav>

        <LiveItemShop />

        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h2 className="font-cyber text-2xl text-neon-pink mb-4">
            Fortnite Item Shop — Was ist heute im Shop?
          </h2>
          <p className="text-white/70 font-body leading-relaxed mb-4">
            Der Fortnite Item Shop rotiert täglich um <strong>00:00 UTC (01:00/02:00
            MEZ/MESZ)</strong>. Epic Games bietet Skins, Pickaxes, Gleiter, Emotes und
            Bundles zum Kauf mit V-Bucks. Wir zeigen dir nicht nur was im Shop ist —
            sondern auch <strong>wie rar es ist</strong>.
          </p>

          <h3 className="font-cyber text-xl text-white mb-3 mt-6">
            Unsere Rarity-Ratings
          </h3>
          <ul className="space-y-2 text-white/70 font-body">
            <li>
              <strong className="text-amber-400">🔥 Legendary Return:</strong> Item war
              seit über 180 Tagen nicht im Shop. Pflicht-Kauf für Sammler.
            </li>
            <li>
              <strong className="text-purple-400">⭐ Rarer Return:</strong> 90+ Tage
              nicht gesehen. Guter Zeitpunkt zum Zugreifen.
            </li>
            <li>
              <strong className="text-blue-400">Solid Pick:</strong> 30+ Tage nicht im
              Shop. Kommt wahrscheinlich bald wieder.
            </li>
            <li>
              <strong className="text-white/60">Häufig:</strong> Regelmäßig im Shop. Kein
              Zeitdruck.
            </li>
          </ul>

          <h3 className="font-cyber text-xl text-white mb-3 mt-6">
            Creator-Code beim Kauf
          </h3>
          <p className="text-white/70 font-body leading-relaxed mb-4">
            Wenn du Items kaufst, nutze den Creator-Code{' '}
            <strong className="text-neon-pink">ZYZTM</strong> — das kostet dich{' '}
            <strong>nichts extra</strong>, aber unterstützt Fortnite Nexus. Dadurch
            können wir diese Seite und alle{' '}
            <Link href="/tools">
              <a className="text-neon-blue hover:underline">Pro Tools</a>
            </Link>{' '}
            kostenlos anbieten.
          </p>

          <h3 className="font-cyber text-xl text-white mb-3 mt-6">FAQ</h3>
          <details className="mb-3 p-4 rounded-xl border border-white/10 bg-white/5">
            <summary className="font-cyber text-sm text-neon-pink cursor-pointer">
              Wann rotiert der Shop?
            </summary>
            <p className="text-sm text-white/70 mt-2">
              Täglich um 00:00 UTC (in Deutschland 01:00 MEZ / 02:00 MESZ). Featured-Items
              bleiben oft mehrere Tage, Daily-Items rotieren öfter.
            </p>
          </details>
          <details className="mb-3 p-4 rounded-xl border border-white/10 bg-white/5">
            <summary className="font-cyber text-sm text-neon-pink cursor-pointer">
              Woher kommen die Daten?
            </summary>
            <p className="text-sm text-white/70 mt-2">
              Wir nutzen die offizielle fortnite-api.com Schnittstelle, die den Shop
              direkt von Epic Games zieht. Cache: 30 Minuten.
            </p>
          </details>
          <details className="mb-3 p-4 rounded-xl border border-white/10 bg-white/5">
            <summary className="font-cyber text-sm text-neon-pink cursor-pointer">
              Was bringt mir der Creator-Code?
            </summary>
            <p className="text-sm text-white/70 mt-2">
              Nichts direkt — aber du unterstützt die Plattform, die du gerade nutzt. Der
              Code muss vor dem Kauf in den Epic-Games-Einstellungen gesetzt werden
              (bleibt 14 Tage aktiv, dann re-applyen).
            </p>
          </details>
        </article>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
