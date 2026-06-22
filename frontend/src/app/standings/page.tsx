import {
  getWorldCupStandings,
  mapApiStandingsToStandings,
} from "@/lib/worldcupApi";

import { getFlag } from "@/lib/flags";

export default async function StandingsPage() {
  const standingsData =
    await getWorldCupStandings();

  const standings =
    mapApiStandingsToStandings(
      standingsData
    );

  const groups = [
    ...new Set(
      standings.map(
        (team) => team.group
      )
    ),
  ];

  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "1000px",
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
          Standings
        </h1>

        {groups.map((group) => {
          const teams = standings
            .filter(
              (team) => team.group === group
            )
            .sort((a, b) => {
              // primary: points
              if (b.points !== a.points) {
                return b.points - a.points;
              }

              // secondary: alphabetical fallback
              return a.country.localeCompare(
                b.country
              );
            });

          return (
            <div
              key={group}
              style={{
                marginBottom: "32px",
              }}
            >
              <h2
                style={{
                  color: "gold",
                }}
              >
                {group}
              </h2>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px",
                        color: "gold",
                      }}
                    >
                      Team
                    </th>

                    <th
                      style={{
                        textAlign: "center",
                        padding: "12px",
                        color: "gold",
                      }}
                    >
                      Pts
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {teams.map((team, index) => (
                    <tr
                      key={team.country}
                      style={{
                        backgroundColor:
                          team.qualified
                            ? "rgba(255, 215, 0, 0.08)"
                            : index % 2 === 0
                            ? "#1a1a1a"
                            : "#181818",
                        borderLeft: team.qualified
                          ? "3px solid gold"
                          : "3px solid transparent",
                      }}
                    >
                      <td
                        style={{
                          padding: "12px",
                        }}
                      >
                        {getFlag(team.country)}{" "}
                        {team.country}
                      </td>

                      <td
                        style={{
                          padding: "12px",
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{
                            backgroundColor:
                              "#2a2100",
                            color: "gold",
                            padding: "4px 10px",
                            borderRadius: "999px",
                            fontWeight: "bold",
                            display: "inline-block",
                            minWidth: "32px",
                          }}
                        >
                          {team.points}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </main>
  );
}