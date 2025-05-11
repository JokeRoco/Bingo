import React from 'react';
import { FileText, Grid, PlusCircle } from 'lucide-react';

interface NavigationProps {
  activeTab: 'create' | 'cards' | 'phrases';
  onTabChange: (tab: 'create' | 'cards' | 'phrases') => void;
  phraseCount: number;
  cardCount: number;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeTab, 
  onTabChange,
  phraseCount,
  cardCount
}) => {
  return (
    <div className="bg-white shadow-sm mb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex border-b">
          <button
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'create'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
            }`}
            onClick={() => onTabChange('create')}
          >
            <PlusCircle size={18} />
            <span>Create Card</span>
          </button>
          
          <button
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'cards'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
            }`}
            onClick={() => onTabChange('cards')}
          >
            <Grid size={18} />
            <span>Bingo Cards</span>
            <span className="ml-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
              {cardCount}
            </span>
          </button>
          
          <button
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'phrases'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
            }`}
            onClick={() => onTabChange('phrases')}
          >
            <FileText size={18} />
            <span>Phrases</span>
            <span className="ml-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
              {phraseCount}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;