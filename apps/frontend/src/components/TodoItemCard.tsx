import React from 'react';

export interface TodoItemData {
  id: number;
  title: string;
  time: string;
  completed: boolean;
  reward?: string;
  type?: 'daily' | 'weekly';
  isQuest?: boolean;
}

interface TodoItemCardProps {
  item: TodoItemData;
  onToggle: (id: number) => void;
}

export default function TodoItemCard({ item, onToggle }: TodoItemCardProps) {
  return (
    <button
      onClick={() => onToggle(item.id)}
      className={`w-full p-3.5 rounded-[14px] flex items-start gap-3 text-left transition-transform active:scale-[0.98] ${
        item.completed ? 'opacity-55' : ''
      }`}
      style={{
        background: 'var(--st-surface)',
        border: '1px solid var(--st-border)'
      }}
    >
      <div
        className="w-6 h-6 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center text-sm font-bold transition-colors"
        style={
          item.completed
            ? { background: 'var(--st-gold)', border: '1.5px solid var(--st-gold)', color: 'var(--st-bg)' }
            : { border: '1.5px solid var(--st-border)', background: 'transparent' }
        }
      >
        {item.completed && '✓'}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          {item.isQuest && item.type && (
            <span
              className="text-[9px] font-bold tracking-[0.5px] px-[5px] py-[2px] rounded uppercase flex-shrink-0"
              style={{
                fontFamily: 'var(--st-mono)',
                color: item.type === 'weekly' ? 'var(--st-gem)' : 'var(--st-gold)',
                background: item.type === 'weekly' ? 'var(--st-glow-gem)' : 'var(--st-glow-gold-strong)',
              }}
            >
              {item.type === 'weekly' ? '주간' : '일일'}
            </span>
          )}
          <p
            className={`text-sm font-medium ${item.completed ? 'line-through' : ''}`}
            style={{ color: item.completed ? 'var(--st-muted)' : 'var(--st-text)' }}
          >
            {item.title}
          </p>
        </div>
        <p className="text-xs" style={{ color: 'var(--st-muted)' }}>
          {item.time}
          {item.reward && (
            <span
              className="ml-2 font-mono font-bold text-[11px]"
              style={{ color: item.completed ? 'var(--st-muted)' : 'var(--st-gold)' }}
            >
              {item.reward}
            </span>
          )}
        </p>
      </div>
    </button>
  );
}
