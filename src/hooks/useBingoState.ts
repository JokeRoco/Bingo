import { useState, useEffect } from 'react';
import { Phrase, BingoCard } from '../types/types';
import { loadPhrases, savePhrases, loadCards, saveCards } from '../utils/storage';
import { generateId, createBingoCard } from '../utils/bingoUtils';

export const useBingoState = () => {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [cards, setCards] = useState<BingoCard[]>([]);
  const [activeTab, setActiveTab] = useState<'phrases' | 'cards'>('phrases');

  // Load data from localStorage on initial render
  useEffect(() => {
    setPhrases(loadPhrases());
    setCards(loadCards());
  }, []);

  // Add a new phrase
  const addPhrase = (text: string) => {
    if (!text.trim()) return;
    
    const newPhrase: Phrase = {
      id: generateId(),
      text: text.trim()
    };
    
    const updatedPhrases = [...phrases, newPhrase];
    setPhrases(updatedPhrases);
    savePhrases(updatedPhrases);
  };

  // Remove a phrase
  const removePhrase = (id: string) => {
    const updatedPhrases = phrases.filter(phrase => phrase.id !== id);
    setPhrases(updatedPhrases);
    savePhrases(updatedPhrases);
  };

  // Generate a new bingo card
  const generateCard = (playerName: string) => {
    if (!playerName.trim() || phrases.length < 25) return null;
    
    const newCard = createBingoCard(phrases, playerName.trim());
    if (!newCard) return null;
    
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    saveCards(updatedCards);
    return newCard;
  };

  // Toggle mark on a bingo cell
  const toggleCellMark = (cardId: string, cellId: string) => {
    const updatedCards = cards.map(card => {
      if (card.id === cardId) {
        const updatedCells = card.cells.map(cell => 
          cell.id === cellId ? { ...cell, marked: !cell.marked } : cell
        );
        return { ...card, cells: updatedCells };
      }
      return card;
    });
    
    setCards(updatedCards);
    saveCards(updatedCards);
  };

  return {
    phrases,
    cards,
    activeTab,
    setActiveTab,
    addPhrase,
    removePhrase,
    generateCard,
    toggleCellMark
  };
};