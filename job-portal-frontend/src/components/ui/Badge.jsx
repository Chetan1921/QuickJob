const TONES = {
  default: 'bg-white/10 text-gray-300 border-white/10',
  primary: 'bg-primary/15 text-indigo-300 border-primary/30',
  success: 'bg-green-500/15 text-green-400 border-green-500/30',
  warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  danger: 'bg-red-500/15 text-red-400 border-red-500/30',
};

export default function Badge({ children, tone = 'default', className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${TONES[tone]} ${className}`}>
      {children}
    </span>
  );
}
