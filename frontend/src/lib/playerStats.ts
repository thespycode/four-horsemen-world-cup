import {
  Player,
  CountryStatus,
} from "@/types/worldcup";

export function getCountriesAlive(
  player: Player,
  countryStatuses: CountryStatus[]
): number {
  let alive = 0;

  for (const country of player.countries) {
    const status = countryStatuses.find(
      (s) => s.country === country
    );

    if (status?.alive) {
      alive++;
    }
  }

  return alive;
}

export function getMaxPossiblePoints(
  player: Player,
  countryStatuses: CountryStatus[],
  currentPoints: number
): number {
  let remaining = 0;

  for (const country of player.countries) {
    const status = countryStatuses.find(
      (s) => s.country === country
    );

    remaining += status?.maxRemainingPoints ?? 0;
  }

  return currentPoints + remaining;
}