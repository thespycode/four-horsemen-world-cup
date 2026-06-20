import { players } from "@/data/players";
import { countryStatuses } from "@/data/countrystatuses";

import {
  calculateCountryPoints,
  calculatePlayerPoints,
  calculateLeaderboard,
} from "@/lib/scoring";

import {
  getWorldCupGames,
  mapApiGamesToMatches,
  getWorldCupStandings,
  mapApiStandingsToStandings,
} from "@/lib/worldcupApi";

export default async function Home() {
  /* ----------------------------
     FETCH LIVE DATA
  ---------------------------- */
  const games = await getWorldCupGames();
  const matches = mapApiGamesToMatches(games);

  const standingsData = await getWorldCupStandings();
  const standings =
    mapApiStandingsToStandings(standingsData);

  /* ----------------------------
     SCORING ENGINE
  ---------------------------- */
  const countryPoints = calculateCountryPoints(
    matches,
    standings
  );

  const playerPoints = calculatePlayerPoints(
    players,
    countryPoints
  );

  const leaderboard = calculateLeaderboard(
    players,
    playerPoints,
    countryStatuses
  );

  /* ----------------------------
     TIE-AWARE RANKING (FIXED)
  ---------------------------- */
  const ranks: number[] = [];

  let currentRank = 1;

  for (let i = 0; i < leaderboard.length; i++) {
    if (i === 0) {
      ranks.push(1);
      continue;
    }

    const prev = leaderboard[i - 1];
    const curr = leaderboard[i];

    if (curr.points === prev.points) {
      ranks.push(currentRank);
    } else {
      currentRank = i + 1;
      ranks.push(currentRank);
    }
  }

  /* ----------------------------
     UI
  ---------------------------- */
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
          borderRadius: "12px",
          padding: "24px",
          border: "2px solid gold",
        }}
      >
        <h1 style={{ margin: 0, color: "gold" }}>
          Four Horsemen Fantasy World Cup
        </h1>

        <div
          style={{
            display: "inline-block",
            marginTop: "12px",
            padding: "6px 12px",
            borderRadius: "999px",
            backgroundColor: "#0f5132",
            color: "#75ffb0",
            fontWeight: "bold",
            fontSize: "0.8rem",
          }}
        >
          ● LIVE
        </div>

        <p style={{ opacity: 0.8, marginTop: "8px" }}>
          Live Fantasy Leaderboard (API Powered)
        </p>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "24px",
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "12px" }}>
                Rank
              </th>
              <th style={{ textAlign: "left", padding: "12px" }}>
                Player
              </th>
              <th style={{ textAlign: "left", padding: "12px" }}>
                Points
              </th>
              <th style={{ textAlign: "left", padding: "12px" }}>
                Alive
              </th>
              <th style={{ textAlign: "left", padding: "12px" }}>
                Max Possible
              </th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.map((entry, index) => (
              <tr
                key={entry.playerName}
                style={{
                  backgroundColor:
                    index === 0
                      ? "#3a2f00"
                      : index === 1
                      ? "#2a2a2a"
                      : index === 2
                      ? "#2b1d00"
                      : index % 2 === 0
                      ? "#1a1a1a"
                      : "#181818",
                  }}
                >
                <td style={{ padding: "12px" }}>
                  {ranks[index] === 1
                    ? "🥇"
                    : ranks[index] === 2
                    ? "🥈"
                    : ranks[index] === 3
                    ? "🥉"
                    : ranks[index]}
                </td>

                <td
                  style={{
                    padding: "12px",
                    fontWeight: "bold",
                  }}
                >
                  <a
                    href={`/players/${entry.playerName.toLowerCase()}`}
                    style={{
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    {entry.playerName}
                  </a>
                </td>

                <td
                  style={{
                    padding: "12px",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: "gold",
                  }}
                >
                  {entry.points}
                </td>

                <td style={{ padding: "12px" }}>
                  {entry.countriesAlive}
                </td>

                <td style={{ padding: "12px" }}>
                  {entry.maxPossiblePoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}