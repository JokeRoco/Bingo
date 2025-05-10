import React from 'react';
import { useBingoState } from './hooks/useBingoState';
import Navigation from './components/Navigation';
import PhraseManager from './components/PhraseManager';
import BingoCardCreator from './components/BingoCardCreator';
import BingoCardsGallery from './components/BingoCardsGallery';
import { AlertCircle } from 'lucide-react';

function App() {
  const {
    phrases,
    cards,
    activeTab,
    setActiveTab,
    addPhrase,
    removePhrase,
    generateCard,
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
        {activeTab === 'phrases' ? (
          <>
            <PhraseManager 
              phrases={phrases} 
              onAddPhrase={addPhrase} 
              onRemovePhrase={removePhrase} 
            />
            
            {phrases.length >= 25 && (
              <BingoCardCreator 
                phraseCount={phrases.length} 
                onCreateCard={generateCard} 
              />
            )}
            
            {phrases.length > 0 && phrases.length < 25 && (
              <div className="w-full max-w-3xl mx-auto mt-8">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="text-amber-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-800">Need more phrases</h3>
                    <p className="text-amber-700">
                      You need at least 25 phrases to create a Bingo card. 
                      Add {25 - phrases.length} more phrases to unlock card creation.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <BingoCardsGallery 
            cards={cards} 
            onToggleCell={toggleCellMark} 
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