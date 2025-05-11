import React, { useState } from 'react';
import { Phrase } from '../types/types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { User, Shuffle } from 'lucide-react';

interface CustomBingoCreatorProps {
  phrases: Phrase[];
  onCreateCard: (playerName: string, selectedPhrases: Phrase[]) => void;
  onAutoGenerate: (playerName: string) => void;
}

const CustomBingoCreator: React.FC<CustomBingoCreatorProps> = ({
  phrases,
  onCreateCard,
  onAutoGenerate
}) => {
  const [playerName, setPlayerName] = useState('');
  const [selectedPhrases, setSelectedPhrases] = useState<Phrase[]>([]);
  const [error, setError] = useState('');

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(selectedPhrases);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedPhrases(items);
  };

  const handlePhraseClick = (phrase: Phrase) => {
    if (selectedPhrases.length >= 25) {
      setError('You can only select 25 phrases');
      return;
    }
    if (selectedPhrases.find(p => p.id === phrase.id)) {
      setSelectedPhrases(selectedPhrases.filter(p => p.id !== phrase.id));
    } else {
      setSelectedPhrases([...selectedPhrases, phrase]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }
    if (selectedPhrases.length !== 25) {
      setError('Please select exactly 25 phrases');
      return;
    }
    onCreateCard(playerName, selectedPhrases);
    setPlayerName('');
    setSelectedPhrases([]);
    setError('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-6">Create Custom Bingo Card</h2>
        
        <div className="mb-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Available Phrases</h3>
            <div className="border border-gray-200 rounded-md p-2 h-[400px] overflow-y-auto">
              {phrases.map((phrase) => (
                <div
                  key={phrase.id}
                  onClick={() => handlePhraseClick(phrase)}
                  className={`
                    p-2 mb-2 rounded cursor-pointer transition-colors
                    ${selectedPhrases.find(p => p.id === phrase.id)
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-gray-50 hover:bg-gray-100'
                    }
                  `}
                >
                  {phrase.text}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Selected Phrases ({selectedPhrases.length}/25)
            </h3>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="selected">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="border border-gray-200 rounded-md p-2 h-[400px] overflow-y-auto"
                  >
                    {selectedPhrases.map((phrase, index) => (
                      <Draggable key={phrase.id} draggableId={phrase.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-2 mb-2 bg-purple-100 text-purple-800 rounded cursor-move"
                          >
                            {phrase.text}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md">
            {error}
          </div>
        )}

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleSubmit}
            disabled={selectedPhrases.length !== 25 || !playerName.trim()}
            className={`flex-1 py-3 rounded-md transition-colors ${
              selectedPhrases.length === 25 && playerName.trim()
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Create Custom Card
          </button>
          
          <button
            onClick={() => onAutoGenerate(playerName)}
            disabled={!playerName.trim() || phrases.length < 25}
            className={`flex items-center justify-center gap-2 py-3 px-6 rounded-md transition-colors ${
              playerName.trim() && phrases.length >= 25
                ? 'bg-teal-600 hover:bg-teal-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Shuffle size={18} />
            <span>Auto Generate</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomBingoCreator;