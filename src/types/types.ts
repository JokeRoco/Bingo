export interface Phrase {
  id: string;
  text: string;
}

export interface BingoCell {
  id: string;
  phrase: Phrase;
  marked: boolean;
}

export interface BingoCard {
  id: string;
  playerName: string;
  cells: BingoCell[];
  createdAt: number;
}