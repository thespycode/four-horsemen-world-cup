import { getFlag } from "@/lib/flags";
import { countries } from "@/data/countries";
import { players } from "@/data/players";
import { getCountryOwner } from "@/lib/ownership";

export default function CountriesPage() {
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
          Countries
        </h1>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "12px", textAlign: "left" }}>
                Country
              </th>

              <th style={{ padding: "12px", textAlign: "left" }}>
                Group
              </th>

              <th style={{ padding: "12px", textAlign: "left" }}>
                Owner
              </th>
            </tr>
          </thead>

          <tbody>
            {countries.map((country, index) => {
              const owner = getCountryOwner(
                country.name,
                players
              );

              console.log("COUNTRY:", country.name);

              return (
                <tr
                  key={country.name}
                  style={{
                    backgroundColor:
                      index % 2 === 0
                        ? "#1a1a1a"
                        : "#181818",
                  }}
                >
                  <td style={{ padding: "12px" }}>
                    {getFlag(country.name)} {country.name}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {country.group}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {owner}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}