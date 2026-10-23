'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/useTheme';

export function Header() {
  const { theme, toggle, mounted } = useTheme();
  return (
    <header className="sticky top-0 z-40 glass border-b border-black/5 dark:border-white/5">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-marvel-red flex items-center justify-center font-black text-white text-sm">
            M
          </div>
          <h1 className="text-base font-bold tracking-tight">Marvel Xronologiya</h1>
        </div>
        <button
          onClick={toggle}
          aria-label="Tema"
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition"
        >
          {mounted && (theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />)}
        </button>
      </div>
    </header>
  );
}
