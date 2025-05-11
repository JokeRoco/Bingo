import React, { useState } from 'react';
import { BingoCard as BingoCardType } from '../types/types';
import { checkWin } from '../utils/bingoUtils';
import { Clock, User, Trash2, X } from 'lucide-react';

interface BingoCardProps {
  card: BingoCardType;
  onToggleCell: (cardId: string, cellId: string) => void;
  onDelete: (cardId: string) => void;
  showPlayerInfo?: boolean;
}

const BingoCard: React.FC<BingoCardProps> = ({ 
  card, 
  onToggleCell, 
  onDelete,
  showPlayerInfo = true 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasWon = checkWin(card);
  const gridSize = Math.sqrt(card.cells.length);
  
  const formattedDate = new Date(card.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  const handleCardClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(card.id);
  };
  
  if (isExpanded) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
          <div className="p-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <User size={18} />
              <h3 className="font-bold text-lg">{card.playerName}</h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-purple-100">
                <Clock size={14} />
                <span>{formattedDate}</span>
              </div>
              <button onClick={handleClose} className="text-white hover:text-purple-200">
                <X size={20} />
              </button>
            </div>
          </div>
          
          {hasWon && (
            <div className="bg-green-500 text-white px-4 py-2 text-center font-bold">
              BINGO!
            </div>
          )}
          
          <div 
            className="grid gap-2 p-4"
            style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
          >
            {card.cells.map((cell) => (
              <div
                key={cell.id}
                onClick={() => onToggleCell(card.id, cell.id)}
                className={`
                  aspect-square p-2 flex items-center justify-center text-center
                  border rounded cursor-pointer transition-all duration-300
                  ${cell.marked 
                    ? 'bg-teal-600 text-white border-teal-700' 
                    : 'bg-white hover:bg-gray-100 border-gray-200'
                  }
                `}
              >
                <span className="text-sm">{cell.phrase.text}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t p-4 flex justify-end">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
              <span>Delete Card</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      onClick={handleCardClick}
      className={`
        relative bg-white rounded-lg shadow-md overflow-hidden transition-transform 
        transform hover:scale-[1.01] cursor-pointer
        ${hasWon ? 'ring-4 ring-green-500' : ''}
      `}
    >
      {showPlayerInfo && (
        <div className="p-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <User size={16} />
              <h3 className="font-bold text-sm truncate">{card.playerName}</h3>
            </div>
            <button
              onClick={handleDelete}
              className="text-purple-100 hover:text-white"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
      
      <div className="p-2 text-center text-sm text-gray-600">
        Click to view and play
      </div>
      
      {hasWon && (
        <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
          <div className="bg-green-500 text-white px-4 py-1 rounded-full font-bold text-sm transform rotate-[-35deg] shadow-lg">
            BINGO!
          </div>
        </div>
      )}
    </div>
  );
};

export default BingoCard;