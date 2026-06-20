export type Country = {
  name: string;
  group: string;
};


export type TournamentStage =
  | "group"
  | "round32"
  | "round16"
  | "quarterfinal"
  | "semifinal"
  | "final";


export type Match = {
  id: string;
  stage: TournamentStage;

  homeTeam: string;
  awayTeam: string;

  homeScore: number;
  awayScore: number;

  completed: boolean;
};


export type Player = {
  name: string;
  countries: string[];
};


export type LeaderboardEntry = {
  playerName: string;
  points: number;
  countriesAlive: number;
  maxPossiblePoints: number;
};


export type Standing = {
  country: string;
  group: string;
  points: number;
  position: number;
  qualified: boolean;
};


export type CountryStatus = {
  country: string;
  alive: boolean;
  maxRemainingPoints: number;
};