import React from 'react';
import { LeaderboardEntry } from '../types/types';
import { Trophy, Calendar, User } from 'lucide-react';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  const sortedEntries = [...entries].sort((a, b) => b.completedAt - a.completedAt);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="text-yellow-500" size={24} />
        <h2 className="text-2xl font-bold text-purple-800">Leaderboard</h2>
      </div>

      {entries.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No bingo winners yet. Be the first one to complete a card!
        </p>
      ) : (
        <div className="space-y-3">
          {sortedEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <User size={18} className="text-purple-600" />
                <span className="font-medium">{entry.playerName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={14} />
                <span>
                  {new Date(entry.completedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;