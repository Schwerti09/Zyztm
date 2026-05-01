/**
 * SubscriptionPage - Nexus Pro & Elite Subscription Plans
 * Premium subscription page with pricing tables and Stripe checkout
 * Nexus Design System: nexus-orange (#ff6b00), nexus-purple (#8b5cf6), nexus-green (#10b981)
 */

import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Check, Crown, Zap, ArrowRight, Shield } from 'lucide-react';
import VisualEffectsLayer from '../components/visuals/VisualEffectsLayer';

const plans = [
  {
    name: "Nexus Pro",
    price: "14,99",
    interval: "/Monat",
    badge: "MOST POPULAR",
    badgeColor: "nexus-orange",
    features: [
      "Alle 8 Tools unlimited",
      "Wöchentlicher Meta Report",
      "10% Rabatt auf alle Digital-Produkte",
      "Priorisierter Support",
      "Early Access zu neuen Tools",
      "Keine täglichen Limits",
    ],
    ctaText: "JETZT PRO WERDEN",
    popular: true,
    icon: Zap,
  },
  {
    name: "Nexus Elite",
    price: "29,99",
    interval: "/Monat",
    badge: "VIP",
    badgeColor: "nexus-purple",
    features: [
      "Alles aus Pro",
      "1-on-1 VOD Review pro Monat",
      "Persönliche Keybind & Loadout Coaching",
      "Exklusive Discord-Rolle",
      "Custom Meta Alerts",
      "Priority Support (24/7)",
    ],
    ctaText: "ELITE WERDEN",
    popular: false,
    icon: Crown,
  },
];

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSubscribe = (planName: string) => {
    setSelectedPlan(planName);
    // TODO: Integrate Stripe Checkout Session for Subscription
    // window.location.href = `/checkout/subscription?plan=${planName.toLowerCase()}`;
    console.log(`Subscribe to ${planName}`);
  };

  return (
    <div className="min-h-screen bg-bg-dark text-white relative overflow-hidden">
      {/* Visual Effects Layer */}
      <VisualEffectsLayer enabled effects={{
        chaosBus: true,
        floatingSkins: true,
        thumbnailSnake: false,
        midScrollStorm: true,
        neonCursorTrail: true,
      }} />

      {/* Background Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #ff6b00 0%, #8b5cf6 50%, transparent 80%)',
        }}
      />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20">
        {/* HERO */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-6 px-4 py-2 rounded-full border border-nexus-orange/30 bg-nexus-orange/5">
            <span className="font-cyber text-xs tracking-widest text-nexus-orange">
              FORTNITE NEXUS · SUBSCRIPTIONS
            </span>
          </div>

          <h1 className="font-cyber text-5xl sm:text-7xl font-black text-white mb-4 leading-none">
            NEXUS{' '}
            <span className="bg-gradient-to-r from-nexus-orange via-nexus-purple to-nexus-green bg-clip-text text-transparent">
              PRO
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-nexus-orange font-cyber font-bold mb-6">
            Die ultimative Waffe für Fortnite Pros
          </p>

          <p className="text-white/60 font-body max-w-2xl mx-auto leading-relaxed">
            Entsperre das volle Potenzial aller 8 Tools mit Nexus Pro oder Elite.
            Unlimited Access, exklusive Features und persönliche Unterstützung.
          </p>
        </motion.div>

        {/* PRICING CARDS */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`glass rounded-3xl p-8 relative overflow-hidden ${
                plan.popular ? 'border-2 border-nexus-orange scale-105 shadow-2xl shadow-nexus-orange/20' : 'border border-zinc-800'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-nexus-orange to-orange-500 text-black text-xs font-bold px-6 py-2 rounded-full shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  {plan.badge}
                </motion.div>
              )}

              {/* Plan Icon */}
              <div className="flex justify-center mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: plan.badgeColor === 'nexus-orange' ? 'rgba(255, 107, 0, 0.15)' : 'rgba(139, 92, 246, 0.15)',
                    border: `1px solid ${plan.badgeColor === 'nexus-orange' ? 'rgba(255, 107, 0, 0.3)' : 'rgba(139, 92, 246, 0.3)'}`,
                  }}
                >
                  <plan.icon className="w-8 h-8" style={{ color: plan.badgeColor === 'nexus-orange' ? '#ff6b00' : '#8b5cf6' }} />
                </div>
              </div>

              {/* Plan Name */}
              <h3 className="text-3xl font-black text-white mb-2 text-center">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-6xl font-black text-white">€{plan.price}</span>
                  <span className="text-xl text-white/60 font-body">{plan.interval}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
                      style={{
                        background: plan.badgeColor === 'nexus-orange' ? 'rgba(255, 107, 0, 0.2)' : 'rgba(139, 92, 246, 0.2)',
                      }}
                    >
                      <Check className="w-3 h-3" style={{ color: plan.badgeColor === 'nexus-orange' ? '#ff6b00' : '#8b5cf6' }} />
                    </div>
                    <span className="text-white/80 font-body text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleSubscribe(plan.name)}
                className={`w-full py-4 text-lg font-bold rounded-2xl transition-all hover:scale-105 flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-nexus-orange to-orange-500 text-black'
                    : 'bg-gradient-to-r from-nexus-purple to-purple-500 text-white'
                }`}
              >
                {plan.ctaText}
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* TRUST SIGNALS */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 text-white/60">
              <Shield className="w-5 h-5 text-nexus-green" />
              <span className="text-sm font-body">Jederzeit kündbar</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Check className="w-5 h-5 text-nexus-green" />
              <span className="text-sm font-body">Sofortiger Zugriff</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Check className="w-5 h-5 text-nexus-green" />
              <span className="text-sm font-body">14 Tage Geld-zurück-Garantie</span>
            </div>
          </div>

          <p className="text-white/40 text-sm font-body">
            Alle Preise inkl. MwSt. Zahlung über Stripe sicher verschlüsselt.
          </p>
        </motion.div>

        {/* FAQ SECTION */}
        <motion.div
          className="mt-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="font-cyber text-2xl font-black text-white mb-8 text-center">
            HÄUFIG GESTELLTE FRAGEN
          </h2>

          <div className="space-y-4">
            <div className="glass rounded-2xl p-6 border border-zinc-800">
              <h3 className="font-bold text-white mb-2">Kann ich jederzeit kündigen?</h3>
              <p className="text-white/60 text-sm font-body">
                Ja, du kannst dein Abo jederzeit kündigen. Der Zugriff bleibt bis zum Ende des Abrechnungszeitraums erhalten.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 border border-zinc-800">
              <h3 className="font-bold text-white mb-2">Was ist der Unterschied zwischen Pro und Elite?</h3>
              <p className="text-white/60 text-sm font-body">
                Pro beinhaltet unlimited Access zu allen Tools und wöchentliche Meta Reports. Elite zusätzlich 1-on-1 Coaching und exklusive Discord-Rolle.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 border border-zinc-800">
              <h3 className="font-bold text-white mb-2">Wie funktioniert die Geld-zurück-Garantie?</h3>
              <p className="text-white/60 text-sm font-body">
                Wenn du innerhalb von 14 Tagen nicht zufrieden bist, kontaktiere uns über Discord oder E-Mail und du erhältst eine volle Rückerstattung.
              </p>
            </div>
          </div>
        </motion.div>

        {/* BACK TO TOOLS */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link href="/tools">
            <a className="inline-flex items-center gap-2 text-white/60 hover:text-nexus-orange transition-colors text-sm font-body">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Zurück zu den Tools
            </a>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
