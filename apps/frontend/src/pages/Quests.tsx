import { useState } from 'react';
import BottomNav from '../components/BottomNav';
import StatusBar from '../components/StatusBar';

interface TodoItem {
  id: number;
  title: string;
  time: string;
  completed: boolean;
  reward?: string;
}

export default function Quests({ onOpenRoulette, onNavigate }: { onOpenRoulette?: () => void; onNavigate?: (screen: string) => void }) {
  const [activeTab, setActiveTab] = useState<'quests' | 'todos'>('quests');
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, title: '물 2L 마시기', time: '06:00', completed: true, reward: '◈ +8' },
    { id: 2, title: '알고리즘 1문제 풀기', time: '08:15', completed: true, reward: '◈ +15' },
    { id: 3, title: '독서 20페이지', time: '12:00', completed: true, reward: '◈ +10' },
    { id: 4, title: '이메일 정리', time: '14:20', completed: true, reward: '◈ +6' },
    { id: 5, title: '아침 운동 30분', time: '07:00', completed: false },
    { id: 6, title: '프로젝트 PR 리뷰 3건', time: '09:30', completed: false },
    { id: 7, title: '저녁 산책 + 명상', time: '20:00', completed: false }
  ]);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <>
      <StatusBar />

      {/* Header */}
      <div className="px-4 py-3.5 flex items-end justify-between gap-3">
        <div>
          <h1 className="text-[26px] font-semibold st-heading">퀘스트</h1>
          <p className="st-label text-xs mt-0.5">QUEST BOARD</p>
        </div>
        <div
          className="w-[38px] h-[38px] rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0 cursor-pointer"
          style={{
            background: 'var(--st-gold)',
            boxShadow: '0 0 16px rgba(245,200,66,0.4)',
            color: 'var(--st-bg)'
          }}
        >
          +
        </div>
      </div>

      {/* Tab bar */}
      <div className="px-4 pb-3 flex gap-1">
        <button
          onClick={() => setActiveTab('quests')}
          className="flex-1 py-2.5 text-center rounded-xl text-[13px] font-bold"
          style={{
            background: activeTab === 'quests' ? 'var(--st-surface)' : 'transparent',
            border: activeTab === 'quests' ? '1px solid rgba(245,200,66,0.35)' : '1px solid transparent',
            color: activeTab === 'quests' ? 'var(--st-gold)' : 'var(--st-muted)',
            boxShadow: activeTab === 'quests' ? 'inset 0 1px 0 rgba(245,200,66,0.15)' : 'none'
          }}
        >
          시스템 퀘스트
        </button>
        <button
          onClick={() => setActiveTab('todos')}
          className="flex-1 py-2.5 text-center rounded-xl text-[13px] font-bold"
          style={{
            background: activeTab === 'todos' ? 'var(--st-surface)' : 'transparent',
            border: activeTab === 'todos' ? '1px solid rgba(245,200,66,0.35)' : '1px solid transparent',
            color: activeTab === 'todos' ? 'var(--st-gold)' : 'var(--st-muted)',
            boxShadow: activeTab === 'todos' ? 'inset 0 1px 0 rgba(245,200,66,0.15)' : 'none'
          }}
        >
          내 할일
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 pb-4">
        {activeTab === 'quests' ? (
          <div className="flex flex-col gap-2">
            {/* Daily section */}
            <div className="flex justify-between items-center px-1 py-1">
              <div
                className="text-[10px] font-semibold tracking-[2.4px] uppercase"
                style={{
                  fontFamily: 'var(--st-display)',
                  color: 'var(--st-muted)'
                }}
              >
                일일 · 5월 23일
              </div>
              <div
                className="text-[10px]"
                style={{
                  fontFamily: 'var(--st-mono)',
                  color: 'var(--st-muted)'
                }}
              >
                23:14:05 남음
              </div>
            </div>

            {/* Quest 1 - done */}
            <div className="st-card p-3.5 opacity-60">
              <div className="flex justify-between items-start gap-2.5">
                <div className="flex-1">
                  <div className="flex gap-1.5 items-center mb-1.5">
                    <div
                      className="text-[9px] font-bold tracking-[0.5px] px-[7px] py-[3px] rounded"
                      style={{
                        fontFamily: 'var(--st-mono)',
                        color: 'var(--st-gold)',
                        background: 'rgba(245,200,66,0.1)',
                        border: '1px solid rgba(245,200,66,0.3)'
                      }}
                    >
                      일일
                    </div>
                    <div
                      className="text-[10px]"
                      style={{
                        fontFamily: 'var(--st-mono)',
                        color: 'var(--st-muted)'
                      }}
                    >
                      ⏱ 완료됨
                    </div>
                  </div>
                  <div
                    className="text-sm font-semibold line-through"
                    style={{ color: 'var(--st-muted)' }}
                  >
                    할일 3개 완료하기
                  </div>
                  <div className="flex gap-2.5 mt-2 items-center">
                    <div
                      className="flex items-center gap-1 text-[11px] font-bold"
                      style={{
                        fontFamily: 'var(--st-mono)',
                        color: 'var(--st-gold)'
                      }}
                    >
                      ◈ +50
                    </div>
                    <div
                      className="flex items-center gap-1 text-[11px] font-bold"
                      style={{
                        fontFamily: 'var(--st-mono)',
                        color: '#B49CFF'
                      }}
                    >
                      ◆ +5
                    </div>
                    <div
                      className="ml-auto text-[10px] cursor-pointer"
                      style={{ color: 'var(--st-muted)' }}
                      onClick={onOpenRoulette}
                    >
                      🎰 룰렛
                    </div>
                  </div>
                </div>
                <div
                  className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-1 whitespace-nowrap"
                  style={{
                    background: 'var(--st-elevated)',
                    border: '1px solid var(--st-border)',
                    color: 'var(--st-success)'
                  }}
                >
                  ✓ 완료
                </div>
              </div>
            </div>

            {/* Quest 2 - active */}
            <div
              className="p-3.5 rounded-[18px]"
              style={{
                background: 'var(--st-surface)',
                border: '1px solid var(--st-border)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)'
              }}
            >
              <div className="flex justify-between items-start gap-2.5">
                <div className="flex-1">
                  <div className="flex gap-1.5 items-center mb-1.5">
                    <div
                      className="text-[9px] font-bold tracking-[0.5px] px-[7px] py-[3px] rounded"
                      style={{
                        fontFamily: 'var(--st-mono)',
                        color: 'var(--st-gold)',
                        background: 'rgba(245,200,66,0.1)',
                        border: '1px solid rgba(245,200,66,0.3)'
                      }}
                    >
                      일일
                    </div>
                  </div>
                  <div className="text-sm font-semibold">검 1회 강화 시도</div>
                  <div className="flex gap-2.5 mt-2 items-center">
                    <div
                      className="text-[11px] font-bold"
                      style={{
                        fontFamily: 'var(--st-mono)',
                        color: 'var(--st-gold)'
                      }}
                    >
                      ◈ +80
                    </div>
                    <div
                      className="text-[11px] font-bold"
                      style={{
                        fontFamily: 'var(--st-mono)',
                        color: '#B49CFF'
                      }}
                    >
                      ◆ +8
                    </div>
                    <div
                      className="ml-auto text-[10px] cursor-pointer"
                      style={{ color: 'var(--st-muted)' }}
                      onClick={onOpenRoulette}
                    >
                      🎰 룰렛
                    </div>
                  </div>
                </div>
                <div
                  className="px-3.5 py-2.5 rounded-[10px] text-xs font-bold cursor-pointer whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(180deg, #FBD66A 0%, #F5C842 50%, #D9A91D 100%)',
                    color: '#1A1100'
                  }}
                >
                  완료
                </div>
              </div>
            </div>

            {/* Quest 3 - active */}
            <div
              className="p-3.5 rounded-[18px]"
              style={{
                background: 'var(--st-surface)',
                border: '1px solid var(--st-border)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)'
              }}
            >
              <div className="flex justify-between items-start gap-2.5">
                <div className="flex-1">
                  <div className="flex gap-1.5 items-center mb-1.5">
                    <div
                      className="text-[9px] font-bold tracking-[0.5px] px-[7px] py-[3px] rounded"
                      style={{
                        fontFamily: 'var(--st-mono)',
                        color: 'var(--st-gold)',
                        background: 'rgba(245,200,66,0.1)',
                        border: '1px solid rgba(245,200,66,0.3)'
                      }}
                    >
                      일일
                    </div>
                  </div>
                  <div className="text-sm font-semibold">일찍 일어나기 (오전 7시 전)</div>
                  <div className="flex gap-2.5 mt-2 items-center">
                    <div
                      className="text-[11px] font-bold"
                      style={{
                        fontFamily: 'var(--st-mono)',
                        color: 'var(--st-gold)'
                      }}
                    >
                      ◈ +40
                    </div>
                    <div
                      className="text-[11px] font-bold"
                      style={{
                        fontFamily: 'var(--st-mono)',
                        color: '#B49CFF'
                      }}
                    >
                      ◆ +3
                    </div>
                    <div
                      className="ml-auto text-[10px] cursor-pointer"
                      style={{ color: 'var(--st-muted)' }}
                      onClick={onOpenRoulette}
                    >
                      🎰 룰렛
                    </div>
                  </div>
                </div>
                <div
                  className="px-3.5 py-2.5 rounded-[10px] text-xs font-bold cursor-pointer whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(180deg, #FBD66A 0%, #F5C842 50%, #D9A91D 100%)',
                    color: '#1A1100'
                  }}
                >
                  완료
                </div>
              </div>
            </div>

            {/* Weekly section */}
            <div className="px-1 py-2">
              <div
                className="text-[10px] font-semibold tracking-[2.4px] uppercase"
                style={{
                  fontFamily: 'var(--st-display)',
                  color: 'var(--st-muted)'
                }}
              >
                주간 · 4일 남음
              </div>
            </div>

            {/* Weekly quest */}
            <div
              className="p-3.5 rounded-[18px]"
              style={{
                background: 'var(--st-surface)',
                border: '1px solid var(--st-border)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)'
              }}
            >
              <div className="flex justify-between items-start gap-2.5">
                <div className="flex-1">
                  <div className="flex gap-1.5 items-center mb-1.5">
                    <div
                      className="text-[9px] font-bold tracking-[0.5px] px-[7px] py-[3px] rounded"
                      style={{
                        fontFamily: 'var(--st-mono)',
                        color: 'var(--st-gem)',
                        background: 'rgba(123,92,245,0.1)',
                        border: '1px solid rgba(123,92,245,0.3)'
                      }}
                    >
                      주간
                    </div>
                  </div>
                  <div className="text-sm font-semibold">할일 25개 완료</div>
                  <div className="flex gap-2.5 mt-2 items-center">
                    <div
                      className="text-[11px] font-bold"
                      style={{
                        fontFamily: 'var(--st-mono)',
                        color: 'var(--st-gold)'
                      }}
                    >
                      ◈ +400
                    </div>
                    <div
                      className="text-[11px] font-bold"
                      style={{
                        fontFamily: 'var(--st-mono)',
                        color: '#B49CFF'
                      }}
                    >
                      ◆ +40
                    </div>
                    <div
                      className="ml-auto text-[10px] cursor-pointer"
                      style={{ color: 'var(--st-muted)' }}
                      onClick={onOpenRoulette}
                    >
                      🎰 룰렛
                    </div>
                  </div>
                </div>
                <div
                  className="px-3.5 py-2.5 rounded-[10px] text-xs font-bold cursor-pointer whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(180deg, #FBD66A 0%, #F5C842 50%, #D9A91D 100%)',
                    color: '#1A1100'
                  }}
                >
                  완료
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Todos tab content
          <div className="space-y-4">
            {/* Active section */}
            <div>
              <p
                className="text-[10px] tracking-[2px] uppercase mb-2 px-1"
                style={{
                  fontFamily: 'var(--st-display)',
                  color: 'var(--st-muted)',
                  fontWeight: 600
                }}
              >
                진행 중 · {activeTodos.length}
              </p>
              <div className="space-y-2">
                {activeTodos.map((todo) => (
                  <button
                    key={todo.id}
                    onClick={() => toggleTodo(todo.id)}
                    className="w-full p-3.5 rounded-[14px] flex items-start gap-3 text-left"
                    style={{
                      background: 'var(--st-surface)',
                      border: '1px solid var(--st-border)'
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex-shrink-0 mt-0.5"
                      style={{
                        border: '1.5px solid var(--st-border)'
                      }}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1" style={{ color: 'var(--st-text)' }}>
                        {todo.title}
                      </p>
                      <p className="text-[10px]" style={{ color: 'var(--st-muted)' }}>
                        {todo.time}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Completed section */}
            {completedTodos.length > 0 && (
              <div>
                <p
                  className="text-[10px] tracking-[2px] uppercase mb-2 px-1"
                  style={{
                    fontFamily: 'var(--st-display)',
                    color: 'var(--st-muted)',
                    fontWeight: 600
                  }}
                >
                  완료 · {completedTodos.length}
                </p>
                <div className="space-y-2">
                  {completedTodos.map((todo) => (
                    <button
                      key={todo.id}
                      onClick={() => toggleTodo(todo.id)}
                      className="w-full p-3.5 rounded-[14px] flex items-start gap-3 text-left opacity-55"
                      style={{
                        background: 'var(--st-surface)',
                        border: '1px solid var(--st-border)'
                      }}
                    >
                      <div
                        className="w-6 h-6 rounded-lg flex-shrink-0 mt-0.5 flex items-center justify-center text-sm font-bold"
                        style={{
                          background: 'var(--st-gold)',
                          border: '1.5px solid var(--st-gold)',
                          color: 'var(--st-bg)'
                        }}
                      >
                        ✓
                      </div>
                      <div className="flex-1">
                        <p
                          className="text-sm font-medium mb-1"
                          style={{ color: 'var(--st-muted)' }}
                        >
                          {todo.title}
                        </p>
                        <p className="text-[10px]" style={{ color: 'var(--st-muted)' }}>
                          {todo.time} {todo.reward}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNav activeTab="quest" onTabChange={(tab) => onNavigate?.(tab)} />
    </>
  );
}
