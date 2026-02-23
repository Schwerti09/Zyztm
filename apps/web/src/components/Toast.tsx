import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export function Toast({ toasts, onRemove }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            className="flex items-center gap-3 px-4 py-3 rounded font-cyber text-xs tracking-widest cursor-pointer"
            style={{
              background: 'rgba(10,12,21,0.95)',
              border: `1px solid ${toast.type === 'success' ? '#00f2ff' : toast.type === 'error' ? '#ff0055' : '#ffd700'}`,
              boxShadow: `0 0 20px ${toast.type === 'success' ? 'rgba(0,242,255,0.3)' : toast.type === 'error' ? 'rgba(255,0,85,0.3)' : 'rgba(255,215,0,0.3)'}`,
              color: toast.type === 'success' ? '#00f2ff' : toast.type === 'error' ? '#ff0055' : '#ffd700',
            }}
            onClick={() => onRemove(toast.id)}
          >
            <span>{toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : '💰'}</span>
            <span>{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

let _addToast: ((msg: Omit<ToastMessage, 'id'>) => void) | null = null;

export function useToastController() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    _addToast = (msg) => {
  const id = (typeof crypto !== 'undefined' && crypto.randomUUID)
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { ...msg, id }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
    };
    return () => { _addToast = null; };
  }, []);

  const remove = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return { toasts, remove };
}

export function showToast(msg: Omit<ToastMessage, 'id'>) {
  _addToast?.(msg);
}
