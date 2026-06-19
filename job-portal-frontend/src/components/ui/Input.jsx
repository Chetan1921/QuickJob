import { forwardRef } from 'react';

const Input = forwardRef(function Input({ label, error, icon: Icon, className = '', ...props }, ref) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-[13px] font-medium text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-500 pointer-events-none" />
        )}
        <input
          ref={ref}
          {...props}
          className={`w-full ${Icon ? 'pl-10.5' : 'pl-4'} pr-4 py-2.5 rounded-xl bg-black/20 border ${
            error ? 'border-red-500/70 focus:ring-red-500/20' : 'border-white/10 focus:ring-primary/30'
          } text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-[3px] focus:border-primary/60 hover:border-white/20 transition-all ${className}`}
        />
      </div>
      {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
    </div>
  );
});

export default Input;
