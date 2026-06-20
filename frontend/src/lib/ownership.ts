import { Player } from "@/types/worldcup";

export function getCountryOwner(
  countryName: string,
  players: Player[]
): string {
  for (const player of players) {
    if (player.countries.includes(countryName)) {
      return player.name;
    }
  }

  return "Unowned";
}