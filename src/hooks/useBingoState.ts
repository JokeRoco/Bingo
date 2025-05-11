import { useState, useEffect } from 'react';
import { Phrase, BingoCard } from '../types/types';
import { loadPhrases, savePhrases, loadCards, saveCards } from '../utils/storage';
import { generateId, createBingoCard, createCustomBingoCard } from '../utils/bingoUtils';

export const useBingoState = () => {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [cards, setCards] = useState<BingoCard[]>([]);
  const [activeTab, setActiveTab] = useState<'create' | 'cards' | 'phrases'>('create');

  useEffect(() => {
    setPhrases(loadPhrases());
    setCards(loadCards());
  }, []);

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

  const removePhrase = (id: string) => {
    const updatedPhrases = phrases.filter(phrase => phrase.id !== id);
    setPhrases(updatedPhrases);
    savePhrases(updatedPhrases);
  };

  const generateCard = (playerName: string) => {
    if (!playerName.trim() || phrases.length < 25) return null;
    
    const newCard = createBingoCard(phrases, playerName.trim());
    if (!newCard) return null;
    
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    saveCards(updatedCards);
    setActiveTab('cards');
    return newCard;
  };

  const createCustomCard = (playerName: string, selectedPhrases: Phrase[]) => {
    if (!playerName.trim() || selectedPhrases.length !== 25) return null;
    
    const newCard = createCustomBingoCard(selectedPhrases, playerName.trim());
    if (!newCard) return null;
    
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    saveCards(updatedCards);
    setActiveTab('cards');
    return newCard;
  };

  const deleteCard = (cardId: string) => {
    const updatedCards = cards.filter(card => card.id !== cardId);
    setCards(updatedCards);
    saveCards(updatedCards);
  };

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
    createCustomCard,
    deleteCard,
    toggleCellMark
  };
};