import PlayerRow from "./PlayerRow";

type Player = {
  name: string;
  points: number;
};

type LeaderboardProps = {
  players: Player[];
};

export default function Leaderboard({ players }: LeaderboardProps) {
  return (
    <div className="mt-8 bg-white shadow-md rounded-xl p-6 border border-slate-200">
      
      <h2 className="text-xl font-semibold mb-4 text-slate-800">
        Leaderboard
      </h2>

      <div className="space-y-3">
        {players.map((p) => (
          <PlayerRow key={p.name} name={p.name} points={p.points} />
        ))}
      </div>

    </div>
  );
}