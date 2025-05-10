import React from 'react';
import { BingoCard as BingoCardType } from '../types/types';
import BingoCard from './BingoCard';

interface BingoCardsGalleryProps {
  cards: BingoCardType[];
  onToggleCell: (cardId: string, cellId: string) => void;
}

const BingoCardsGallery: React.FC<BingoCardsGalleryProps> = ({ cards, onToggleCell }) => {
  if (cards.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">No Bingo Cards Yet</h2>
          <p className="text-gray-600 mb-6">
            Create phrases and generate your first bingo card to get started!
          </p>
          <div className="max-w-sm mx-auto p-6 border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <p className="text-gray-500">
              Switch to the Phrases tab to add some phrases, then create your first Bingo card.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-6">All Bingo Cards</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <BingoCard 
              key={card.id} 
              card={card} 
              onToggleCell={onToggleCell}
              showPlayerInfo={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BingoCardsGallery;