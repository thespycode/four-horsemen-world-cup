export const countryFlags: Record<string, string> = {
  Mexico: "🇲🇽",
  "South Africa": "🇿🇦",
  "Korea Republic": "🇰🇷",
  Czechia: "🇨🇿",

  Canada: "🇨🇦",
  "Bosnia and Herzegovina": "🇧🇦",
  Qatar: "🇶🇦",
  Switzerland: "🇨🇭",

  Brazil: "🇧🇷",
  Morocco: "🇲🇦",
  Haiti: "🇭🇹",
  Scotland: "🏴",

  USA: "🇺🇸",
  Paraguay: "🇵🇾",
  Australia: "🇦🇺",
  Turkey: "🇹🇷",

  Germany: "🇩🇪",
  Ecuador: "🇪🇨",
  "Côte d’Ivoire": "🇨🇮",
  "Congo DR": "🇨🇩",

  Netherlands: "🇳🇱",
  Japan: "🇯🇵",
  Sweden: "🇸🇪",
  Tunisia: "🇹🇳",

  Belgium: "🇧🇪",
  Egypt: "🇪🇬",
  Iran: "🇮🇷",
  "New Zealand": "🇳🇿",

  Spain: "🇪🇸",
  Uruguay: "🇺🇾",
  "Saudi Arabia": "🇸🇦",
  "Cape Verde": "🇨🇻",

  France: "🇫🇷",
  Senegal: "🇸🇳",
  Iraq: "🇮🇶",
  Norway: "🇳🇴",

  Argentina: "🇦🇷",
  Algeria: "🇩🇿",
  Austria: "🇦🇹",
  Jordan: "🇯🇴",

  Portugal: "🇵🇹",
  Colombia: "🇨🇴",
  Uzbekistan: "🇺🇿",

  England: "🏴",
  Croatia: "🇭🇷",
  Ghana: "🇬🇭",
  Panama: "🇵🇦",
};

export function getFlag(country: string) {
  return countryFlags[country] ?? "🏳️";
}