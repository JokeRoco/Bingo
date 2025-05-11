import React from 'react';
import { useBingoState } from './hooks/useBingoState';
import Navigation from './components/Navigation';
import PhraseManager from './components/PhraseManager';
import CustomBingoCreator from './components/CustomBingoCreator';
import BingoCardsGallery from './components/BingoCardsGallery';

function App() {
  const {
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
  } = useBingoState();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-purple-700 to-purple-900 text-white py-6 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Interactive Bingo Game</h1>
        </div>
      </header>
      
      <Navigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        phraseCount={phrases.length}
        cardCount={cards.length}
      />
      
      <main className="max-w-6xl mx-auto px-4 py-4">
        {activeTab === 'create' && (
          <CustomBingoCreator 
            phrases={phrases}
            onCreateCard={createCustomCard}
            onAutoGenerate={generateCard}
          />
        )}
        
        {activeTab === 'cards' && (
          <BingoCardsGallery 
            cards={cards} 
            onToggleCell={toggleCellMark}
            onDeleteCard={deleteCard}
          />
        )}
        
        {activeTab === 'phrases' && (
          <PhraseManager 
            phrases={phrases} 
            onAddPhrase={addPhrase} 
            onRemovePhrase={removePhrase} 
          />
        )}
      </main>
      
      <footer className="mt-12 py-6 bg-gray-800 text-gray-300">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>Interactive Bingo Game &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;