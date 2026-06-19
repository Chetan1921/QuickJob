export default function StatCard({ icon: Icon, label, value, tone = 'primary' }) {
  const tones = {
    primary: 'bg-primary/15 text-indigo-300 border-primary/20',
    success: 'bg-green-500/15 text-green-400 border-green-500/20',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  };
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex items-center gap-4">
      <div className={`h-11 w-11 rounded-xl border flex items-center justify-center shrink-0 ${tones[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xl font-bold text-white leading-none">{value}</p>
        <p className="text-xs text-gray-500 mt-1.5">{label}</p>
      </div>
    </div>
  );
}
