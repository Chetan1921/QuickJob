export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      {Icon && (
        <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-gray-500" />
        </div>
      )}
      <h3 className="text-white font-semibold mb-1.5">{title}</h3>
      {description && <p className="text-gray-400 text-sm max-w-sm mb-5">{description}</p>}
      {action}
    </div>
  );
}
