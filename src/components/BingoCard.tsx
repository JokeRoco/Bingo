import React from 'react';
import { BingoCard as BingoCardType } from '../types/types';
import { checkWin } from '../utils/bingoUtils';
import { Clock, User } from 'lucide-react';

interface BingoCardProps {
  card: BingoCardType;
  onToggleCell: (cardId: string, cellId: string) => void;
  showPlayerInfo?: boolean;
}

const BingoCard: React.FC<BingoCardProps> = ({ card, onToggleCell, showPlayerInfo = true }) => {
  const hasWon = checkWin(card);
  const gridSize = Math.sqrt(card.cells.length);
  
  // Format creation date
  const formattedDate = new Date(card.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  return (
    <div className={`relative bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-[1.01] ${hasWon ? 'ring-4 ring-green-500' : ''}`}>
      {showPlayerInfo && (
        <div className="p-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <User size={18} />
              <h3 className="font-bold text-lg truncate">{card.playerName}</h3>
            </div>
            <div className="flex items-center gap-1 text-xs text-purple-100">
              <Clock size={14} />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      )}
      
      {hasWon && (
        <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center z-10 pointer-events-none">
          <div className="bg-green-500 text-white px-6 py-2 rounded-full font-bold text-lg transform rotate-[-35deg] shadow-lg">
            BINGO!
          </div>
        </div>
      )}
      
      <div 
        className="grid gap-1 p-2"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {card.cells.map((cell) => (
          <div
            key={cell.id}
            onClick={() => onToggleCell(card.id, cell.id)}
            className={`
              aspect-square p-1 flex items-center justify-center text-center text-sm
              border rounded cursor-pointer transition-all duration-300
              ${cell.marked 
                ? 'bg-teal-600 text-white border-teal-700' 
                : 'bg-white hover:bg-gray-100 border-gray-200'
              }
            `}
          >
            <span className="line-clamp-3 text-xs sm:text-sm">
              {cell.phrase.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BingoCard;