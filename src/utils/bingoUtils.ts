import { Phrase, BingoCard, BingoCell } from '../types/types';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const createBingoCard = (phrases: Phrase[], playerName: string, size = 5): BingoCard | null => {
  if (phrases.length < size * size) {
    return null;
  }

  const shuffledPhrases = shuffleArray(phrases).slice(0, size * size);
  
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

export const createCustomBingoCard = (selectedPhrases: Phrase[], playerName: string): BingoCard | null => {
  if (selectedPhrases.length !== 25) {
    return null;
  }

  const cells: BingoCell[] = selectedPhrases.map(phrase => ({
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