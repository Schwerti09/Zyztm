import { create } from 'zustand';
import type { Card, ChatMessage } from '@zyztm/shared-types';

interface AppStore {
  userId: string;
  credits: number;
  cards: Card[];
  chatMessages: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;
  setCards: (cards: Card[]) => void;
  setCredits: (credits: number) => void;
}

export const useStore = create<AppStore>((set) => ({
  userId: 'demo-user',
  credits: 100,
  cards: [],
  chatMessages: [],
  addChatMessage: (msg) => set((state) => ({ chatMessages: [...state.chatMessages, msg] })),
  setCards: (cards) => set({ cards }),
  setCredits: (credits) => set({ credits }),
}));
