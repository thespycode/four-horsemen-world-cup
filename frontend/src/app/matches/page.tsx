import { getFlag } from "@/lib/flags";

import {
  getWorldCupGames,
  mapApiGamesToMatches,
} from "@/lib/worldcupApi";

export default async function MatchesPage() {
  const games = await getWorldCupGames();

  const matches =
    mapApiGamesToMatches(games);

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
        <h1
          style={{
            color: "gold",
            marginTop: 0,
          }}
        >
          Matches
        </h1>

        <p
          style={{
            opacity: 0.8,
            marginBottom: "24px",
          }}
        >
          Live World Cup Match Results
        </p>

        {matches.map((match) => (
          <div
            key={match.id}
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: "10px",
              padding: "16px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                fontSize: "0.8rem",
                opacity: 0.7,
                marginBottom: "8px",
              }}
            >
              {match.stage.toUpperCase()}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginBottom: "8px",
              }}
            >
              <span>
                {getFlag(match.homeTeam)}{" "}
                {match.homeTeam}
              </span>

              <strong>
                {match.homeScore}
              </strong>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
              }}
            >
              <span>
                {getFlag(match.awayTeam)}{" "}
                {match.awayTeam}
              </span>

              <strong>
                {match.awayScore}
              </strong>
            </div>

            <div
              style={{
                marginTop: "8px",
                fontSize: "0.8rem",
                opacity: 0.7,
              }}
            >
              {match.completed
                ? "✅ Final"
                : "⏳ Upcoming"}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}