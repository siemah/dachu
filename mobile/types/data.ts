export type Article = {
  id: string;
  title: string;
  image: string;
  category?: string;
  preview?: string;
  date?: string;
  link?: string;
  provider?: {
    name?: string;
    origin?: string;
    image?: string;
    link?: string;
  }
};

export type Game = {
  id: string | number;
  uiKey: string | number;
  competition: {
    name: string;
    image: string;
  };
  homeTeam: {
    name: string;
    image: string;
    score: null | number;
  };
  awayTeam: {
    name: string;
    image: string;
    score: null | number;
  };
  kickoff: {
    global: number;
    formatted: string;
    timeFormatted: string;
  }
}