'use client';
import { List, PieChart, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  activeTab: string;
  setTab: (t: string) => void;
}

export function BottomNav({ activeTab, setTab }: Props) {
  const tabs = [
    { id: 'list', icon: List, label: 'Ro‘yxat' },
    { id: 'stats', icon: PieChart, label: 'Statistika' },
    { id: 'settings', icon: Settings, label: 'Sozlamalar' },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 pb-safe">
      <div className="glass rounded-full flex items-center p-1.5 gap-1 shadow-2xl">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300',
              activeTab === t.id ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-white'
            )}
          >
            <t.icon size={18} className={activeTab === t.id ? 'text-marvel-red' : ''} />
            {activeTab === t.id && <span className="text-xs font-semibold">{t.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
