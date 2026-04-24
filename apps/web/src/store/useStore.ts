import { create } from 'zustand';
import type { Card, ChatMessage } from '@shared-types';

interface AppStore {
  userId: string;
  credits: number;
  coins: number;
  userEmail: string;
  musicEnabled: boolean;
  cards: Card[];
  chatMessages: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;
  setCards: (cards: Card[]) => void;
  setCredits: (credits: number) => void;
  setCoins: (coins: number) => void;
  setUserEmail: (email: string) => void;
  setMusicEnabled: (enabled: boolean) => void;
}

export const useStore = create<AppStore>((set) => ({
  userId: 'demo-user',
  credits: 100,
  coins: 0,
  userEmail: typeof window !== 'undefined' ? (localStorage.getItem('userEmail') || '') : '',
  musicEnabled: typeof window !== 'undefined' ? localStorage.getItem('musicEnabled') === 'true' : false,
  cards: [],
  chatMessages: [],
  addChatMessage: (msg) => set((state) => ({ chatMessages: [...state.chatMessages, msg] })),
  setCards: (cards) => set({ cards }),
  setCredits: (credits) => set({ credits }),
  setCoins: (coins) => set({ coins }),
  setUserEmail: (email) => {
    localStorage.setItem('userEmail', email);
    set({ userEmail: email });
  },
  setMusicEnabled: (enabled) => {
    localStorage.setItem('musicEnabled', String(enabled));
    set({ musicEnabled: enabled });
  },
}));
