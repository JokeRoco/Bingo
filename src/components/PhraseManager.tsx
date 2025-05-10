import React, { useState } from 'react';
import { Phrase } from '../types/types';
import { Plus, Trash2 } from 'lucide-react';

interface PhraseManagerProps {
  phrases: Phrase[];
  onAddPhrase: (text: string) => void;
  onRemovePhrase: (id: string) => void;
}

const PhraseManager: React.FC<PhraseManagerProps> = ({ phrases, onAddPhrase, onRemovePhrase }) => {
  const [newPhrase, setNewPhrase] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPhrase.trim()) {
      onAddPhrase(newPhrase);
      setNewPhrase('');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-6">Phrase Management</h2>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={newPhrase}
              onChange={(e) => setNewPhrase(e.target.value)}
              placeholder="Enter a new phrase..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center gap-1"
            >
              <Plus size={18} />
              <span>Add</span>
            </button>
          </div>
        </form>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Available Phrases ({phrases.length})</h3>
          
          {phrases.length === 0 ? (
            <p className="text-gray-500 italic text-center py-4">No phrases added yet. Add some phrases above to start creating bingo cards.</p>
          ) : (
            <div className="border border-gray-200 rounded-md divide-y">
              {phrases.map((phrase) => (
                <div key={phrase.id} className="p-3 flex justify-between items-center hover:bg-gray-50">
                  <span className="text-gray-800">{phrase.text}</span>
                  <button
                    onClick={() => onRemovePhrase(phrase.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    aria-label="Remove phrase"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {phrases.length > 0 && phrases.length < 25 && (
            <p className="mt-4 text-amber-600 text-sm">
              You need at least 25 phrases to create a bingo card. Add {25 - phrases.length} more.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhraseManager;