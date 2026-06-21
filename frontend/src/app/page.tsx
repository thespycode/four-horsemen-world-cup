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

  const podiumPlayers = [
      leaderboard[1],
      leaderboard[0],
      leaderboard[2],
    ].filter(
      (player): player is (typeof leaderboard)[number] =>
        player !== undefined
    );

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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "24px",
            marginBottom: "32px",
          }}
        >
          {podiumPlayers.map((player, index) => {
            const podium = [2, 1, 3][index];

            return (
              <div
                key={player.playerName}
                style={{
                  flex: 1,
                  textAlign: "center",
                  backgroundColor:
                    podium === 1
                      ? "#3a2f00"
                      : podium === 2
                      ? "#2a2a2a"
                      : "#2b1d00",
                  borderRadius: "12px",
                  padding: "16px",
                  border:
                    podium === 1
                      ? "2px solid gold"
                      : "1px solid #444",
                }}
              >
                <div style={{ fontSize: "2rem" }}>
                  {podium === 1
                    ? "🥇"
                    : podium === 2
                    ? "🥈"
                    : "🥉"}
                </div>

                <div
                  style={{
                    fontWeight: "bold",
                    marginTop: "8px",
                  }}
                >
                  {player.playerName}
                </div>

                <div
                  style={{
                    color: "gold",
                    fontSize: "1.3rem",
                    marginTop: "6px",
                  }}
                >
                  {player.points}
                </div>

                <div
                  style={{
                    opacity: 0.7,
                    fontSize: "0.8rem",
                  }}
                >
                  points
                </div>
              </div>
            );
          })}
        </div>

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