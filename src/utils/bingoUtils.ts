import { Phrase, BingoCard, BingoCell } from '../types/types';

// Generate a unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Shuffle an array using Fisher-Yates algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Create a new bingo card with randomly selected phrases
export const createBingoCard = (phrases: Phrase[], playerName: string, size = 5): BingoCard | null => {
  // We need at least size^2 phrases to create a card
  if (phrases.length < size * size) {
    return null;
  }

  // Shuffle and select phrases
  const shuffledPhrases = shuffleArray(phrases).slice(0, size * size);
  
  // Create bingo cells
  const cells: BingoCell[] = shuffledPhrases.map(phrase => ({
    id: generateId(),
    phrase,
    marked: false
  }));

  return {
    id: generateId(),
    playerName,
    cells,
    createdAt: Date.now()
  };
};

// Check if a bingo card has a winning condition (row, column, or diagonal)
export const checkWin = (card: BingoCard, size = 5): boolean => {
  const cells = card.cells;
  
  // Check rows
  for (let i = 0; i < size; i++) {
    const rowWin = Array(size).fill(0).every((_, j) => 
      cells[i * size + j].marked
    );
    if (rowWin) return true;
  }
  
  // Check columns
  for (let i = 0; i < size; i++) {
    const colWin = Array(size).fill(0).every((_, j) => 
      cells[j * size + i].marked
    );
    if (colWin) return true;
  }
  
  // Check diagonal (top-left to bottom-right)
  const diag1Win = Array(size).fill(0).every((_, i) => 
    cells[i * size + i].marked
  );
  if (diag1Win) return true;
  
  // Check diagonal (top-right to bottom-left)
  const diag2Win = Array(size).fill(0).every((_, i) => 
    cells[i * size + (size - 1 - i)].marked
  );
  if (diag2Win) return true;
  
  return false;
};