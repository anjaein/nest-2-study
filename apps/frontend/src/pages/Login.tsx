import { useNavigate } from 'react-router';
import StatusBar from '../components/StatusBar';

export default function Login() {
  const navigate = useNavigate();

  return (
    <>
      <StatusBar />

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Gold glow */}
        <div
          className="absolute w-[260px] h-[260px] rounded-full top-[60px]"
          style={{ background: 'var(--st-glow-gold)' }}
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

        {/* Email field */}
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
        />

        {/* Password field */}
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
        />

        {/* Login button */}
        <button onClick={() => navigate('/dashboard')} className="w-full st-btn-gold mb-4">
          모험 시작하기 ✦
        </button>

        <p className="text-xs my-4" style={{ color: 'var(--st-muted)' }}>
          ───── 또는 ─────
        </p>

        {/* Register button */}
        <button className="w-full st-btn-dark mb-6">새 기사 등록하기</button>

        <p className="text-[13px] mb-8" style={{ color: 'var(--st-muted)' }}>
          게스트로 둘러보기
        </p>
      </div>

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
    </>
  );
}
