import { players } from "@/data/players";
import {
  getWorldCupGames,
  mapApiGamesToMatches,
  getWorldCupStandings,
  mapApiStandingsToStandings,
} from "@/lib/worldcupApi";
import { countryStatuses } from "@/data/countrystatuses";

import {
  calculateCountryPoints,
  calculatePlayerPoints,
} from "@/lib/scoring";

import {
  getCountriesAlive,
  getMaxPossiblePoints,
} from "@/lib/playerStats";

import { getFlag } from "@/lib/flags";

type Props = {
  params: Promise<{
    playerName: string;
  }>;
};

export default async function PlayerPage({
  params,
}: Props) {
  const { playerName } = await params;

  const player = players.find(
    (p) =>
      p.name.toLowerCase() ===
      playerName.toLowerCase()
  );

  const games = await getWorldCupGames();
  const matches = mapApiGamesToMatches(games);

  const standingsData =
    await getWorldCupStandings();

  const standings =
    mapApiStandingsToStandings(
      standingsData
    );

  const countryPoints =
    calculateCountryPoints(
      matches,
      standings
    );

  const playerPoints =
    calculatePlayerPoints(
      players,
      countryPoints
    );

  if (!player) {
    return (
      <main
        style={{
          padding: "2rem",
          color: "white",
        }}
      >
        <h1>Player Not Found</h1>
      </main>
    );
  }

  const currentPoints =
    playerPoints[player.name] ?? 0;

  const countriesAlive = getCountriesAlive(
    player,
    countryStatuses
  );

  const maxPossiblePoints =
    getMaxPossiblePoints(
      player,
      countryStatuses,
      currentPoints
    );

  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "900px",
        margin: "0 auto",
        color: "white",
      }}
    >
      <div
        style={{
          backgroundColor: "#111",
          border: "2px solid gold",
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        <h1
          style={{
            color: "gold",
            marginTop: 0,
          }}
        >
          {player.name}
        </h1>

        <div
          style={{
            display: "flex",
            gap: "32px",
            marginTop: "16px",
            marginBottom: "24px",
          }}
        >
          <div>
            <strong>Points</strong>
            <div>{currentPoints}</div>
          </div>

          <div>
            <strong>Alive</strong>
            <div>{countriesAlive}</div>
          </div>

          <div>
            <strong>Max Possible</strong>
            <div>{maxPossiblePoints}</div>
          </div>
        </div>

        <h2>Countries</h2>

        <ul>
          {player.countries.map((country) => (
            <li key={country}>
              {getFlag(country)} {country}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}