import { Match, Standing } from "@/types/worldcup";

/* --------------------------------
   TEAM NAME NORMALIZATION
-------------------------------- */
const TEAM_NAME_MAP: Record<string, string> = {
  "South Korea": "Korea Republic",
  "United States": "USA",
  "Czech Republic": "Czechia",
  "Turkey": "Türkiye",
  "Ivory Coast": "Côte d’Ivoire",
  "DR Congo": "Congo DR",
};

function normalizeTeamName(name: string): string {
  return TEAM_NAME_MAP[name] ?? name;
}

/* --------------------------------
   FETCH MATCHES
-------------------------------- */
export async function getWorldCupGames(): Promise<any[]> {
  try {
    console.log("Fetching games...");

    const res = await fetch(
      "https://worldcup26.ir/get/games",
      {
        next: {
          revalidate: 300,
        },
      }
    );

    console.log("Games status:", res.status);

    const data = await res.json();

    console.log(
      "Games loaded:",
      data?.games?.length ?? 0
    );

    return data?.games ?? [];
  } catch (error) {
    console.error("GAME FETCH FAILED:", error);
    return [];
  }
}

/* --------------------------------
   MAP API → MATCHES
-------------------------------- */
export function mapApiGamesToMatches(
  games: any[]
): Match[] {
  return games.map((game) => ({
    id: String(game.id),

    stage:
      game.type === "group"
        ? "group"
        : "round32",

    homeTeam: normalizeTeamName(
      game.home_team_name_en
    ),

    awayTeam: normalizeTeamName(
      game.away_team_name_en
    ),

    homeScore: Number(game.home_score ?? 0),
    awayScore: Number(game.away_score ?? 0),

    completed: game.finished === "TRUE",
  }));
}

/* --------------------------------
   FETCH STANDINGS
-------------------------------- */
export async function getWorldCupStandings(): Promise<any> {
  try {
    console.log("Fetching standings...");

    const res = await fetch(
      "https://worldcup26.ir/get/groups",
      {
        next: {
          revalidate: 300,
        },
      }
    );

    console.log("Standings status:", res.status);

    return await res.json();
  } catch (error) {
    console.error("STANDINGS FETCH FAILED:", error);
    return { groups: [] };
  }
}

/* --------------------------------
   MAP API → STANDINGS
-------------------------------- */
export function mapApiStandingsToStandings(
  apiData: any
): Standing[] {
  const standings: Standing[] = [];

  const groups = apiData?.groups ?? [];

  for (const group of groups) {
    const groupName = group?.name ?? "";
    const teams = group?.teams ?? [];

    for (const team of teams) {
      const points = Number(team?.pts ?? 0);

      standings.push({
        country:
          team.team_name_en ??
          team.team_name ??
          `Team ${team.team_id}`,

        group: `Group ${groupName}`,

        points: points,

        position: points,

        qualified: points > 0,
      });
    }
  }

  return standings;
}