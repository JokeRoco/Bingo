import React, { useState } from 'react';
import { User } from 'lucide-react';

interface BingoCardCreatorProps {
  phraseCount: number;
  onCreateCard: (playerName: string) => void;
}

const BingoCardCreator: React.FC<BingoCardCreatorProps> = ({ phraseCount, onCreateCard }) => {
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (phraseCount < 25) {
      setError(`Not enough phrases. You need at least 25 phrases to create a card.`);
      return;
    }
    
    onCreateCard(playerName);
    setPlayerName('');
    setError('');
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-6">Create Bingo Card</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="playerName" className="block text-gray-700 font-medium mb-2">
              Your Name
            </label>
            <div className="flex">
              <div className="bg-gray-100 flex items-center justify-center px-3 border border-r-0 border-gray-300 rounded-l-md">
                <User size={20} className="text-gray-500" />
              </div>
              <input
                type="text"
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={phraseCount < 25}
            className={`w-full py-3 rounded-md transition-colors ${
              phraseCount >= 25
                ? 'bg-teal-600 hover:bg-teal-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Generate Bingo Card
          </button>
          
          {phraseCount < 25 && (
            <p className="mt-2 text-amber-600 text-sm text-center">
              You need {25 - phraseCount} more phrases to create a bingo card.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default BingoCardCreator;