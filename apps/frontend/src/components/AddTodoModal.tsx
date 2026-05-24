import { useState } from 'react';
import { todosApi } from '../api/todos';

export default function AddTodoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !scheduledTime) {
      setError('제목과 시간을 모두 입력해주세요.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await todosApi.createTodo({ title, scheduledTime });
      window.dispatchEvent(new Event('todo-added'));
      setTitle('');
      setScheduledTime('');
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('할 일 추가 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div className="st-card p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 st-heading" style={{ color: 'var(--st-gold)' }}>새로운 할 일</h2>
        
        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="할 일 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-12 px-4 rounded-xl text-sm outline-none"
            style={{ background: 'var(--st-bg)', border: '1px solid var(--st-border)', color: 'var(--st-text)' }}
          />
          <input
            type="time"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            className="w-full h-12 px-4 rounded-xl text-sm outline-none"
            style={{ background: 'var(--st-bg)', border: '1px solid var(--st-border)', color: 'var(--st-text)' }}
          />
          <div className="flex gap-2 mt-2">
            <button type="button" onClick={onClose} disabled={isLoading} className="flex-1 st-btn-dark py-3">취소</button>
            <button type="submit" disabled={isLoading} className="flex-1 st-btn-gold py-3">{isLoading ? '추가 중...' : '추가하기 ✦'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
