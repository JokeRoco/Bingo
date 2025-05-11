import { Phrase, BingoCard, LeaderboardEntry } from '../types/types';

const PHRASES_KEY = 'bingo_phrases';
const CARDS_KEY = 'bingo_cards';
const LEADERBOARD_KEY = 'bingo_leaderboard';

export const savePhrases = (phrases: Phrase[]): void => {
  localStorage.setItem(PHRASES_KEY, JSON.stringify(phrases));
};

export const loadPhrases = (): Phrase[] => {
  const storedPhrases = localStorage.getItem(PHRASES_KEY);
  return storedPhrases ? JSON.parse(storedPhrases) : [];
};

export const saveCards = (cards: BingoCard[]): void => {
  localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
};

export const loadCards = (): BingoCard[] => {
  const storedCards = localStorage.getItem(CARDS_KEY);
  return storedCards ? JSON.parse(storedCards) : [];
};

export const saveLeaderboard = (entries: LeaderboardEntry[]): void => {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
};

export const loadLeaderboard = (): LeaderboardEntry[] => {
  const storedEntries = localStorage.getItem(LEADERBOARD_KEY);
  return storedEntries ? JSON.parse(storedEntries) : [];
};