import {
  Match,
  Standing,
  Player,
  CountryStatus,
  LeaderboardEntry,
} from "@/types/worldcup";

import {
  CountryPoints,
  PlayerPoints,
  Leaderboard,
} from "@/types/scoring";



export function calculateCountryPoints(
  matches: Match[],
  standings: Standing[]
): CountryPoints {
  const countryPoints: CountryPoints = {};

  // Group Stage + Knockout Match Points
  for (const match of matches) {
    if (!match.completed) continue;

    if (!countryPoints[match.homeTeam]) {
      countryPoints[match.homeTeam] = 0;
    }

    if (!countryPoints[match.awayTeam]) {
      countryPoints[match.awayTeam] = 0;
    }

    // Draw
    if (match.homeScore === match.awayScore) {
      countryPoints[match.homeTeam] += 1;
      countryPoints[match.awayTeam] += 1;
      continue;
    }

    const winner =
      match.homeScore > match.awayScore
        ? match.homeTeam
        : match.awayTeam;

    switch (match.stage) {
      case "group":
        countryPoints[winner] += 3;
        break;

      case "round32":
        countryPoints[winner] += 6;
        break;

      case "round16":
        countryPoints[winner] += 9;
        break;

      case "quarterfinal":
        countryPoints[winner] += 12;
        break;

      case "semifinal":
        countryPoints[winner] += 15;
        break;

      case "final":
        countryPoints[winner] += 18;
        break;
    }
  }

  // Qualification + Group Winner Bonuses
  for (const standing of standings) {
    if (!countryPoints[standing.country]) {
      countryPoints[standing.country] = 0;
    }

    if (standing.qualified) {
      countryPoints[standing.country] += 2;
    }

    if (standing.position === 1) {
      countryPoints[standing.country] += 3;
    }
  }

  return countryPoints;
}



export function calculatePlayerPoints(
  players: Player[],
  countryPoints: CountryPoints
): PlayerPoints {
  const playerPoints: PlayerPoints = {};

  for (const player of players) {
    let total = 0;

    for (const country of player.countries) {
      total += countryPoints[country] ?? 0;
    }

    playerPoints[player.name] = total;
  }

  return playerPoints;
}


export function calculateLeaderboard(
  players: Player[],
  playerPoints: PlayerPoints,
  countryStatuses: CountryStatus[]
): Leaderboard {
  const leaderboard: Leaderboard = [];

  for (const player of players) {
    let countriesAlive = 0;
    let remainingPoints = 0;

    for (const country of player.countries) {
      const status = countryStatuses.find(
        (s) => s.country === country
      );

      if (!status) continue;

      if (status.alive) {
        countriesAlive += 1;
      }

      remainingPoints += status.maxRemainingPoints;
    }

    const entry: LeaderboardEntry = {
      playerName: player.name,
      points: playerPoints[player.name] ?? 0,
      countriesAlive,
      maxPossiblePoints:
        (playerPoints[player.name] ?? 0) + remainingPoints,
    };

    leaderboard.push(entry);
  }

  leaderboard.sort((a, b) => b.points - a.points);
  
  return leaderboard;
}