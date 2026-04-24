import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Plan {
  id: number;
  name: string;
  plan_type: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  is_active: boolean;
}

const NEON_GREEN = '#39FF14';
const GOLD = '#FFD700';
const PINK = '#FF2D78';

function PlanCard({ plan, index, onSelect, isYearly }: { plan: Plan; index: number; onSelect: (planType: string) => void; isYearly: boolean }) {
  const [hovered, setHovered] = useState(false);
  const isElite = plan.plan_type.includes('elite');
  const price = isYearly ? plan.price_yearly : plan.price_monthly;
  const savings = isYearly && plan.plan_type.includes('yearly') ? `Save €${(plan.price_monthly * 12 - plan.price_yearly).toFixed(2)}` : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${isElite ? PINK : NEON_GREEN}20 0%, rgba(6,8,15,0.95) 100%)`
          : 'linear-gradient(135deg, rgba(10,12,20,0.92) 0%, rgba(6,8,15,0.96) 100%)',
        border: `1.5px solid ${hovered ? (isElite ? PINK : NEON_GREEN) : (isElite ? PINK : NEON_GREEN) + '30'}`,
        boxShadow: hovered
          ? `0 0 50px ${isElite ? PINK : NEON_GREEN}35, 0 10px 50px rgba(0,0,0,0.7)`
          : `0 4px 24px rgba(0,0,0,0.55)`,
        backdropFilter: 'blur(18px)',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
      }}
      onClick={() => onSelect(plan.plan_type)}
    >
      {isElite && (
        <div className="absolute top-3 right-3 z-10">
          <span className="font-cyber text-[9px] tracking-widest px-2 py-0.5 rounded"
            style={{ background: GOLD, color: '#000', fontWeight: 800 }}>⭐ ELITE</span>
        </div>
      )}

      <div className="relative z-10 p-6 flex flex-col gap-4">
        <div>
          <h3 className="font-cyber text-xl font-bold text-white mb-1">{plan.name}</h3>
          {savings && (
            <div className="font-cyber text-xs" style={{ color: GOLD }}>{savings}</div>
          )}
        </div>

        <div className="flex items-baseline gap-1">
          <span className="font-cyber text-4xl font-black" style={{ color: isElite ? PINK : NEON_GREEN }}>
            €{price.toFixed(2)}
          </span>
          <span className="text-white/50 text-sm">/{isYearly ? 'year' : 'month'}</span>
        </div>

        <div className="space-y-2">
          {plan.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-white/70 text-sm">
              <span style={{ color: isElite ? PINK : NEON_GREEN }}>✓</span>
              {feature}
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl font-cyber text-xs tracking-widest font-black transition-all duration-200"
          style={{
            background: hovered
              ? `linear-gradient(90deg, ${isElite ? PINK : NEON_GREEN}, ${isElite ? '#cc0055' : '#22cc08'})`
              : `${isElite ? PINK : NEON_GREEN}15`,
            border: `1.5px solid ${isElite ? PINK : NEON_GREEN}`,
            color: hovered ? '#000' : (isElite ? PINK : NEON_GREEN),
            boxShadow: hovered ? `0 0 24px ${isElite ? PINK : NEON_GREEN}55` : 'none',
          }}
        >
          {isElite ? '⚡ BECOME ELITE' : '🚀 GO PRO'}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await fetch('/api/subscriptions/plans');
      const data = await res.json();
      if (data.plans) {
        setPlans(data.plans);
      }
    } catch (err) {
      console.error('Error fetching plans:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = async (planType: string) => {
    try {
      const successUrl = `${window.location.origin}/success?subscription=true`;
      const cancelUrl = `${window.location.origin}/#pricing`;
      
      const res = await fetch('/api/subscriptions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planType,
          successUrl,
          cancelUrl,
        }),
      });
      
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
      }
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  return (
    <section id="pricing" className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${GOLD}05 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 80% 100%, ${NEON_GREEN}04 0%, transparent 50%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border font-cyber text-xs tracking-widest"
            style={{ borderColor: `${GOLD}45`, background: `${GOLD}0a`, color: GOLD }}>
            💎 PREMIUM MEMBERSHIP
          </div>
          <h2 className="font-cyber text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            WÄHLE DEINEN{' '}
            <span style={{ color: GOLD, textShadow: `0 0 20px ${GOLD}, 0 0 50px ${GOLD}60` }}>
              PLAN
            </span>
          </h2>
          <p className="text-white/50 text-sm tracking-wide max-w-2xl mx-auto mb-8">
            Schalte exklusive Features frei und unterstütze die deutsche Fortnite Community.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full font-cyber text-xs tracking-widest transition-all ${
                !isYearly ? 'bg-neon-green text-black' : 'bg-white/10 text-white/60'
              }`}
              style={{
                border: `1px solid ${!isYearly ? NEON_GREEN : 'rgba(255,255,255,0.2)'}`,
              }}
            >
              MONATLICH
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full font-cyber text-xs tracking-widest transition-all ${
                isYearly ? 'bg-neon-green text-black' : 'bg-white/10 text-white/60'
              }`}
              style={{
                border: `1px solid ${isYearly ? NEON_GREEN : 'rgba(255,255,255,0.2)'}`,
              }}
            >
              JÄHRLICH (2 MONATE GRATIS)
            </button>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="font-cyber text-neon-green animate-pulse">LADE PLANS...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                index={index}
                isYearly={isYearly}
                onSelect={handleSelectPlan}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4">
            <p className="font-cyber text-xs tracking-[0.3em] text-white/30">ALLE PLANS INKLUDIEREN</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-3 py-1 border border-white/20 rounded text-white/60">🚀 Ad-free</span>
              <span className="px-3 py-1 border border-white/20 rounded text-white/60">📱 Discord Role</span>
              <span className="px-3 py-1 border border-white/20 rounded text-white/60">📚 Exclusive Guides</span>
              <span className="px-3 py-1 border border-white/20 rounded text-white/60">⭐ Early Access</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
