import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

export default function SuccessPage() {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="cyber-card rounded-xl p-12 text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6 }}
          className="text-8xl mb-6"
        >
          🏆
        </motion.div>
        <h1 className="font-cyber text-3xl font-bold text-neon-gold mb-4">ZAHLUNG ERFOLGREICH!</h1>
        <p className="text-white/70 mb-8">
          Krass Diggah! Dein Kauf war erfolgreich. Deine digitalen Produkte werden in Kürze aktiviert.
        </p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary rounded w-full mb-3">
          ZUM DASHBOARD
        </button>
        <button onClick={() => navigate('/')} className="btn-secondary rounded w-full">
          ZURÜCK ZUM NEXUS
        </button>
      </motion.div>
    </div>
  );
}
