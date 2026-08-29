import React from 'react';

interface ShipmentSkeletonProps {
  theme: 'dark' | 'light';
}

export const ShipmentSkeleton: React.FC<ShipmentSkeletonProps> = ({ theme }) => {
  const isLight = theme === 'light';
  const rows = Array.from({ length: 8 });

  return (
    <div className="w-full space-y-3 animate-pulse my-4">
      {rows.map((_, i) => (
        <div 
          key={i} 
          className={`w-full h-16 rounded-xl border flex items-center justify-between px-6 ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-9 h-9 rounded-lg ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />
            <div className="space-y-2">
              <div className={`w-28 h-3.5 rounded ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />
              <div className={`w-20 h-2.5 rounded ${isLight ? 'bg-slate-100' : 'bg-slate-800/60'}`} />
            </div>
          </div>
          <div className={`w-24 h-6 rounded-full ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />
          <div className={`w-16 h-3.5 rounded ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />
        </div>
      ))}
    </div>
  );
};