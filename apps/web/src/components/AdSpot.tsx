import { motion } from 'framer-motion';

interface AdSpotProps {
  position: 'sidebar' | 'banner' | 'native';
  size?: 'small' | 'medium' | 'large';
}

const AD_PLACEHOLDERS = {
  sidebar: {
    small: { width: '300px', height: '250px' },
    medium: { width: '300px', height: '600px' },
    large: { width: '300px', height: '1050px' },
  },
  banner: {
    small: { width: '728px', height: '90px' },
    medium: { width: '970px', height: '250px' },
    large: { width: '100%', height: '120px' },
  },
  native: {
    small: { width: '300px', height: '250px' },
    medium: { width: '600px', height: '400px' },
    large: { width: '100%', height: '500px' },
  },
};

export default function AdSpot({ position, size = 'medium' }: AdSpotProps) {
  const dimensions = AD_PLACEHOLDERS[position][size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative rounded-lg overflow-hidden"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        background: 'linear-gradient(135deg, rgba(10,12,20,0.8) 0%, rgba(6,8,15,0.9) 100%)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="text-4xl">📢</div>
        <div>
          <div className="font-cyber text-xs tracking-widest text-white/40 mb-2">WERBUNG</div>
          <div className="font-cyber text-sm font-bold text-white/60">
            AD SPOT AVAILABLE
          </div>
        </div>
        <div className="text-white/30 text-xs max-w-[200px]">
          Platzieren Sie hier Ihre Werbung für maximale Reichweite in der deutschen Fortnite Community.
        </div>
        <motion.a
          href="mailto:ads@fortnitenexus.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-lg font-cyber text-xs tracking-widest font-bold transition-all"
          style={{
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            textDecoration: 'none',
          }}
        >
          KONTAKTIEREN
        </motion.a>
      </div>
    </motion.div>
  );
}
