import { useState } from 'react';
import { useSearchParams } from 'react-router';
import BottomNav from '../components/BottomNav';
import Roulette from '../components/Roulette';
import StatusBar from '../components/StatusBar';
import AddTodoModal from '../components/AddTodoModal';
import TodoItemCard from '../components/TodoItemCard';

interface TodoItem {
  id: number;
  title: string;
  time: string;
  completed: boolean;
  reward?: string;
  type?: 'daily' | 'weekly';
  isQuest?: boolean;
}

export default function Quests() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') === 'todos' ? 'todos' : 'quests';
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 시스템 퀘스트 완료 시 룰렛 모달 표시
  const [showRoulette, setShowRoulette] = useState(false);

  const setActiveTab = (tab: 'quests' | 'todos') => {
    setSearchParams({ tab });
  };

  const [items, setItems] = useState<TodoItem[]>([
    // Quests
    { id: 101, title: '할일 3개 완료하기', time: '일일', completed: true, reward: '◈ +50 ◆ +5', type: 'daily', isQuest: true },
    { id: 102, title: '검 1회 강화 시도', time: '일일', completed: false, reward: '◈ +80 ◆ +8', type: 'daily', isQuest: true },
    { id: 103, title: '일찍 일어나기 (오전 7시 전)', time: '일일', completed: false, reward: '◈ +40 ◆ +3', type: 'daily', isQuest: true },
    { id: 104, title: '할일 25개 완료', time: '주간', completed: false, reward: '◈ +400 ◆ +40', type: 'weekly', isQuest: true },
    // Todos
    { id: 1, title: '물 2L 마시기', time: '06:00', completed: true, reward: '◈ +8', isQuest: false },
    { id: 2, title: '알고리즘 1문제 풀기', time: '08:15', completed: true, reward: '◈ +15', isQuest: false },
    { id: 3, title: '독서 20페이지', time: '12:00', completed: true, reward: '◈ +10', isQuest: false },
    { id: 4, title: '이메일 정리', time: '14:20', completed: true, reward: '◈ +6', isQuest: false },
    { id: 5, title: '아침 운동 30분', time: '07:00', completed: false, isQuest: false },
    { id: 6, title: '프로젝트 PR 리뷰 3건', time: '09:30', completed: false, isQuest: false },
    { id: 7, title: '저녁 산책 + 명상', time: '20:00', completed: false, isQuest: false }
  ]);

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const willComplete = !item.completed;
          // 시스템 퀘스트를 완료로 전환하면 룰렛 모달 오픈
          if (item.isQuest && willComplete) {
            setShowRoulette(true);
          }
          return { ...item, completed: willComplete };
        }
        return item;
      })
    );
  };

  const activeQuests = items.filter((t) => t.isQuest && !t.completed);
  const activeTodos = items.filter((t) => !t.isQuest && !t.completed);
  // 탭별로 완료 항목 분리 — 다른 탭 완료 항목이 섞여 길어지는 것 방지
  const completedItems = items.filter((t) =>
    activeTab === 'quests' ? t.isQuest && t.completed : !t.isQuest && t.completed
  );

  const renderActiveQuests = () => {
    if (activeQuests.length === 0) return null;
    return (
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2 px-1">
            <p
              className="text-[10px] tracking-[2px] uppercase"
              style={{ fontFamily: 'var(--st-display)', color: 'var(--st-muted)', fontWeight: 600 }}
            >
              진행 중 · {activeQuests.length}
            </p>
            <div
              className="text-[10px]"
              style={{ fontFamily: 'var(--st-mono)', color: 'var(--st-muted)' }}
            >
              23:14:05 남음
            </div>
          </div>
          <div className="space-y-2">
            {activeQuests.map((quest) => (
              <TodoItemCard key={quest.id} item={quest} onToggle={toggleItem} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderActiveTodos = () => {
    if (activeTodos.length === 0) return null;
    return (
      <div className="space-y-4">
        <div>
          <p
            className="text-[10px] tracking-[2px] uppercase mb-2 px-1"
            style={{ fontFamily: 'var(--st-display)', color: 'var(--st-muted)', fontWeight: 600 }}
          >
            진행 중 · {activeTodos.length}
          </p>
          <div className="space-y-2">
            {activeTodos.map((todo) => (
              <TodoItemCard key={todo.id} item={todo} onToggle={toggleItem} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <StatusBar />

      {/* Header */}
      <div className="px-4 py-3.5 flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold st-heading text-[var(--st-text)]">퀘스트</h1>
          <p className="st-label text-xs mt-0.5">QUEST BOARD</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-[34px] px-2.5 rounded-lg flex items-center text-xs font-bold" style={{ background: 'var(--st-elevated)', border: '1px solid var(--st-gold)', color: 'var(--st-gold)' }}>
              ◈ 2,840
            </div>
            <div className="h-[34px] px-2.5 rounded-lg flex items-center text-xs font-bold" style={{ background: 'var(--st-elevated)', border: '1px solid var(--st-gem)', color: 'var(--st-gem)' }}>
              ◆ 15
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={activeTab === 'quests'}
            className="w-[34px] h-[34px] rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0 disabled:opacity-50 disabled:grayscale transition-transform active:scale-95"
            style={{
              background: 'var(--st-gold)',
              boxShadow: activeTab === 'quests' ? 'none' : '0 0 16px rgba(245,200,66,0.4)',
              color: '#1A1100'
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="px-4 pb-3 flex gap-1">
        <button
          onClick={() => setActiveTab('quests')}
          className="flex-1 py-2.5 text-center rounded-xl text-[13px] font-bold transition-all"
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
          className="flex-1 py-2.5 text-center rounded-xl text-[13px] font-bold transition-all"
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
      <div className="flex-1 overflow-y-auto min-h-0 px-4 pb-4">
        
        {/* Active Items based on Tab */}
        {activeTab === 'quests' ? renderActiveQuests() : renderActiveTodos()}

        {/* Shared Completed Section */}
        {completedItems.length > 0 && (
          <div className="mt-6">
            <p
              className="text-[10px] tracking-[2px] uppercase mb-2 px-1"
              style={{ fontFamily: 'var(--st-display)', color: 'var(--st-muted)', fontWeight: 600 }}
            >
              완료 · {completedItems.length}
            </p>
            <div className="space-y-2">
              {completedItems.map((item) => (
                <TodoItemCard key={item.id} item={item} onToggle={toggleItem} />
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
      <AddTodoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* 시스템 퀘스트 완료 시 룰렛 모달 */}
      {showRoulette && <Roulette onClose={() => setShowRoulette(false)} />}
    </div>
  );
}
