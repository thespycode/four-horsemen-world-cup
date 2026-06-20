import {
  getWorldCupGames,
  mapApiGamesToMatches,
} from "@/lib/worldcupApi";

export default async function TestApiPage() {
  const games = await getWorldCupGames();

  const matches =
    mapApiGamesToMatches(games);

  return (
    <main
      style={{
        padding: "2rem",
        color: "white",
      }}
    >
      <h1>API Test</h1>

      <p>
        Loaded {matches.length} matches
      </p>

      <pre>
        {JSON.stringify(
          matches.slice(0, 3),
          null,
          2
        )}
      </pre>
    </main>
  );
}