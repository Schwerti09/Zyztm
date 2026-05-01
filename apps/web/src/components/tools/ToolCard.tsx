/**
 * ToolCard - Reusable tool card with Nexus Design
 * Beautiful tool cards with icon, description, badges, and CTA
 * Nexus Design System: nexus-orange (#ff6b00), nexus-purple (#8b5cf6), nexus-green (#10b981)
 */

import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, Zap, CheckCircle2 } from 'lucide-react';

export interface ToolCardProps {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  status: 'live' | 'coming-soon';
  tier?: 'basic' | 'pro' | 'elite';
  badge?: 'new' | 'popular' | 'featured';
}

const BADGE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  new: { bg: 'bg-nexus-green/20', text: 'text-nexus-green', label: '✨ NEU' },
  popular: { bg: 'bg-nexus-orange/20', text: 'text-nexus-orange', label: '🔥 BELIEBT' },
  featured: { bg: 'bg-nexus-purple/20', text: 'text-nexus-purple', label: '⭐ EMPFOHLEN' },
};

const TIER_STYLES: Record<string, { icon: typeof Crown; color: string; label: string }> = {
  pro: { icon: Zap, color: 'text-nexus-orange', label: 'PRO' },
  elite: { icon: Crown, color: 'text-nexus-purple', label: 'ELITE' },
};

export default function ToolCard({ 
  slug, 
  name, 
  tagline, 
  description, 
  icon, 
  color, 
  status, 
  tier,
  badge 
}: ToolCardProps) {
  const TierIcon = tier ? TIER_STYLES[tier]?.icon : null;
  const tierStyle = tier ? TIER_STYLES[tier] : null;
  const badgeStyle = badge ? BADGE_STYLES[badge] : null;

  return (
    <Link href={`/tools/${slug}`}>
      <a className="block group">
        <motion.div
          className="relative glass rounded-3xl border border-zinc-800 bg-black/50 hover:border-nexus-orange/50 transition-all duration-300 h-full overflow-hidden"
          whileHover={{ 
            y: -8,
            boxShadow: '0 20px 40px rgba(255, 107, 0, 0.15), 0 10px 20px rgba(139, 92, 246, 0.1)'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          {/* Hover Glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-nexus-orange/5 via-nexus-purple/5 to-nexus-green/5 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Badge */}
          {badgeStyle && (
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full ${badgeStyle.bg} ${badgeStyle.text} text-xs font-bold`}>
              {badgeStyle.label}
            </div>
          )}

          {/* Tier Badge */}
          {tierStyle && TierIcon && (
            <div className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-zinc-700 ${tierStyle.color} text-xs font-bold`}>
              <TierIcon className="w-3.5 h-3.5" />
              {tierStyle.label}
            </div>
          )}

          {/* Content */}
          <div className="relative p-6">
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-4"
              style={{
                background: `${color}15`,
                border: `1px solid ${color}30`,
              }}
            >
              {icon}
            </div>

            {/* Tagline */}
            <div
              className="text-xs font-bold tracking-widest mb-2 uppercase"
              style={{ color }}
            >
              {tagline}
            </div>

            {/* Title */}
            <h3 className="text-xl font-black text-white mb-2 leading-tight">
              {name}
            </h3>

            {/* Description */}
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              {description}
            </p>

            {/* Features */}
            {tier && (
              <div className="space-y-1.5 mb-4">
                {tier === 'pro' && (
                  <>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-nexus-orange" />
                      <span>Advanced Features</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-nexus-orange" />
                      <span>Pro Analytics</span>
                    </div>
                  </>
                )}
                {tier === 'elite' && (
                  <>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-nexus-purple" />
                      <span>Elite Features</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-nexus-purple" />
                      <span>Premium Analytics</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-nexus-purple" />
                      <span>Priority Support</span>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Status */}
            {status === 'coming-soon' && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-zinc-500" />
                Coming Soon
              </div>
            )}

            {/* CTA */}
            {status === 'live' && (
              <div
                className="inline-flex items-center gap-2 font-bold text-sm transition-all group-hover:translate-x-1"
                style={{ color }}
              >
                JETZT TESTEN
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </div>
        </motion.div>
      </a>
    </Link>
  );
}
