type PlayerRowProps = {
  name: string;
  points: number;
};

export default function PlayerRow({ name, points }: PlayerRowProps) {
  return (
    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
      <span className="text-slate-800 font-medium">{name}</span>
      <span className="font-semibold text-slate-900">{points} pts</span>
    </div>
  );
}