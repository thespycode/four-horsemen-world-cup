import { players } from "@/data/players";
import { countryStatuses } from "@/data/countrystatuses";
import { getFlag } from "@/lib/flags";

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
            alignItems: "flex-end",
            gap: "16px",
            marginTop: "28px",
            marginBottom: "40px",
          }}
        >
          {podiumPlayers.map((player, index) => {
            const podium = [2, 1, 3][index];

            return (
              <div
                key={player.playerName}
                style={{
                  flex: podium === 1 ? 1.2 : 1,
                  textAlign: "center",
                  transform:
                    podium === 1
                      ? "translateY(-10px) scale(1.05)"
                      : "scale(0.95)",
                  transition: "all 0.2s ease",
                  zIndex: podium === 1 ? 3 : podium === 2 ? 2 : 1,
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
                  boxShadow:
                    podium === 1
                      ? "0px 0px 20px rgba(255, 215, 0, 0.4)"
                      : "none",
                }}
              >
                <div style={{ fontSize: "2rem" }}>
                  {podium === 1
                    ? "🥇"
                    : podium === 2
                    ? "🥈"
                    : "🥉"}
                </div>

                <a
                  href={`/players/${player.playerName.toLowerCase()}`}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "bold",
                    marginTop: "8px",
                    display: "block",
                  }}
                >
                  {player.playerName}
                </a>

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
              <th style={{
                textAlign: "left",
                padding: "12px",
                color: "gold",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "0.85rem",
              }}>
                Rank
              </th>
              <th style={{
                textAlign: "center",
                padding: "12px",
                color: "gold",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "0.85rem",
              }}>
                Player
              </th>
              <th style={{
                textAlign: "center",
                padding: "12px",
                color: "gold",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "0.85rem",
              }}>
                Points
              </th>
              <th style={{
                textAlign: "center",
                padding: "12px",
                color: "gold",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "0.85rem",
              }}>
                Alive
              </th>
              <th style={{
                textAlign: "center",
                padding: "12px",
                color: "gold",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "0.85rem",
              }}>
                Max
              </th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.map((entry, index) => (
              <tr
                key={entry.playerName}
                className="leaderboard-row"
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
                  cursor: "pointer",
                }}
              >
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    width: "60px",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  {ranks[index] === 1
                    ? "🥇"
                    : ranks[index] === 2
                    ? "🥈"
                    : ranks[index] === 3
                    ? "🥉"
                    : ranks[index] === 4
                    ? "L"
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
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>{entry.playerName}</span>
                  </a>
                </td>

                <td
                  style={{
                    padding: "12px",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    textAlign: "center",

                    color:
                      index === 0
                        ? "gold"
                        : index === 1
                        ? "#c0c0c0"
                        : index === 2
                        ? "#cd7f32"
                        : "white",

                    textShadow:
                      index === 0
                        ? "0 0 8px rgba(255,215,0,0.8)"
                        : index === 1
                        ? "0 0 6px rgba(192,192,192,0.7)"
                        : index === 2
                        ? "0 0 6px rgba(205,127,50,0.7)"
                        : "none",
                  }}
                >
                  {entry.points}
                </td>

                <td style={{ padding: "12px", textAlign: "center" }}>
                  {entry.countriesAlive}
                </td>

                <td style={{ padding: "12px", textAlign: "center" }}>
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