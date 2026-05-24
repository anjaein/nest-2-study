import { useState } from 'react';
import { useNavigate } from 'react-router';
import StatusBar from '../components/StatusBar';
import { authApi } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isRegisterMode) {
        if (!email || !password || !nickname) {
          throw new Error('모든 필드를 입력해주세요.');
        }
        await authApi.register({ email, password, nickname });
        // After register, you could auto-login, but typically we might need to ask them to login,
        // or just login automatically. Let's auto login.
        const { accessToken } = await authApi.login({ email, password });
        await login(accessToken);
        navigate('/dashboard');
      } else {
        if (!email || !password) {
          throw new Error('이메일과 비밀번호를 입력해주세요.');
        }
        const { accessToken } = await authApi.login({ email, password });
        await login(accessToken);
        navigate('/dashboard');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || '요청 처리 중 오류가 발생했습니다.');
      } else {
        setError('요청 처리 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 relative">
      <StatusBar />

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Gold glow */}
        <div
          className="absolute w-[260px] h-[260px] rounded-full top-[60px]"
          style={{ background: 'var(--st-glow-gold)', pointerEvents: 'none' }}
        />

        {/* Sword icon */}
        <div
          className="relative w-20 h-20 rounded-[20px] flex items-center justify-center mb-8"
          style={{
            background: 'var(--st-elevated)',
            border: '1px solid var(--st-gold)'
          }}
        >
          <span className="text-[44px]" style={{ color: 'var(--st-gold)' }}>
            ⚔
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-[34px] font-bold mb-2 st-heading"
          style={{ color: 'var(--st-gold)' }}
        >
          SwordTask
        </h1>

        <p
          className="text-[11px] tracking-[2.5px] uppercase mb-6"
          style={{ color: 'var(--st-muted)' }}
        >
          DARK FANTASY QUEST MANAGER
        </p>

        <div
          className="w-20 h-[3px] rounded-full mb-8"
          style={{ background: 'var(--st-border)' }}
        />

        {error && (
          <div className="w-full text-red-500 text-sm mb-4 text-center bg-red-500/10 p-2 rounded">
            {error}
          </div>
        )}

        {isRegisterMode && (
          <input
            type="text"
            placeholder="⬡  기사 이름 (닉네임)"
            className="w-full h-[52px] px-4 rounded-[14px] text-sm mb-4 outline-none"
            style={{
              background: 'var(--st-surface)',
              border: '1px solid var(--st-border)',
              color: 'var(--st-text)',
              fontFamily: 'var(--st-body)'
            }}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="⬡  이메일 주소"
          className="w-full h-[52px] px-4 rounded-[14px] text-sm mb-4 outline-none"
          style={{
            background: 'var(--st-surface)',
            border: '1px solid var(--st-border)',
            color: 'var(--st-text)',
            fontFamily: 'var(--st-body)'
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="⬡  비밀번호"
          className="w-full h-[52px] px-4 rounded-[14px] text-sm mb-4 outline-none"
          style={{
            background: 'var(--st-surface)',
            border: '1px solid var(--st-border)',
            color: 'var(--st-text)',
            fontFamily: 'var(--st-body)'
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button 
          type="submit" 
          disabled={isLoading} 
          className="w-full st-btn-gold mb-4 disabled:opacity-50"
        >
          {isLoading ? '처리 중...' : isRegisterMode ? '기사 서약하기 ✦' : '모험 시작하기 ✦'}
        </button>

        <p className="text-xs my-4" style={{ color: 'var(--st-muted)' }}>
          ───── 또는 ─────
        </p>

        <button 
          type="button" 
          onClick={() => {
            setIsRegisterMode(!isRegisterMode);
            setError('');
          }} 
          className="w-full st-btn-dark mb-6"
        >
          {isRegisterMode ? '기존 계정으로 로그인' : '새 기사 등록하기'}
        </button>

        <p 
          className="text-[13px] mb-8 cursor-pointer hover:text-white transition-colors" 
          style={{ color: 'var(--st-muted)' }}
          onClick={() => navigate('/dashboard')}
        >
          게스트로 둘러보기
        </p>
      </form>

      {/* Guest avatar */}
      <div
        className="absolute bottom-6 right-4 w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg"
        style={{
          background: 'var(--st-elevated)',
          border: '1px solid var(--st-border)',
          color: 'var(--st-text)'
        }}
      >
        K
      </div>
    </div>
  );
}
