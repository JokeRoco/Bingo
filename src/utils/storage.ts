import { Phrase, BingoCard } from '../types/types';

// Local storage keys
const PHRASES_KEY = 'bingo_phrases';
const CARDS_KEY = 'bingo_cards';

// Phrases
export const savePhrases = (phrases: Phrase[]): void => {
  localStorage.setItem(PHRASES_KEY, JSON.stringify(phrases));
};

export const loadPhrases = (): Phrase[] => {
  const storedPhrases = localStorage.getItem(PHRASES_KEY);
  return storedPhrases ? JSON.parse(storedPhrases) : [];
};

// Bingo Cards
export const saveCards = (cards: BingoCard[]): void => {
  localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
};

export const loadCards = (): BingoCard[] => {
  const storedCards = localStorage.getItem(CARDS_KEY);
  return storedCards ? JSON.parse(storedCards) : [];
};