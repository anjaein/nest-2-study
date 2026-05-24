import BottomNav from '../components/BottomNav';
import StatusBar from '../components/StatusBar';

export default function Dashboard({ onNavigate }: { onNavigate: (screen: string) => void }) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <StatusBar />

      {/* Header */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-[22px]"
            style={{
              background: 'var(--st-elevated)',
              border: '1px solid var(--st-border)',
              color: 'var(--st-gold)'
            }}
          >
            ⚔
          </div>
          <div className="flex-1">
            <p className="text-xs tracking-wide" style={{ color: 'var(--st-muted)' }}>
              환영합니다
            </p>
            <p className="text-sm font-bold" style={{ color: 'var(--st-text)' }}>
              김기사
            </p>
          </div>
        </div>

        {/* Currency pills */}
        <div className="flex gap-2">
          <div
            className="h-[34px] px-2.5 rounded-full flex items-center text-xs font-bold"
            style={{
              background: 'var(--st-elevated)',
              border: '1px solid var(--st-gold)',
              color: 'var(--st-gold)',
              fontFamily: 'var(--st-mono)'
            }}
          >
            ◈ 2,840
          </div>
          <div
            className="h-[34px] px-2.5 rounded-full flex items-center text-xs font-bold"
            style={{
              background: 'var(--st-elevated)',
              border: '1px solid var(--st-gem)',
              color: 'var(--st-gem)',
              fontFamily: 'var(--st-mono)'
            }}
          >
            ◆ 127
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto min-h-0 px-4 pb-4 space-y-4">
        {/* Daily reward */}
        <div className="st-card p-4 relative overflow-hidden">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{ background: 'rgba(245,200,66,0.07)' }}
          />
          <div className="relative">
            <p className="st-label mb-1.5">DAILY REWARD</p>
            <p className="text-sm font-bold mb-1" style={{ color: 'var(--st-text)' }}>
              오늘의 보상
            </p>
            <p className="text-xs mb-3" style={{ color: 'var(--st-muted)' }}>
              출석 7일째 · 룰렛 1회
            </p>
            <button
              className="absolute top-0 right-0 h-[46px] px-4 rounded-xl text-sm font-bold"
              style={{
                background: 'var(--st-gradient-gold)',
                color: '#1A1100'
              }}
            >
              받기 ✦
            </button>
          </div>
        </div>

        {/* Today's quest progress */}
        <div className="st-card p-4">
          <p className="st-label mb-1.5">TODAY'S QUEST</p>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-3xl font-bold leading-none" style={{ color: 'var(--st-text)' }}>
              4
            </span>
            <span className="text-sm pb-1" style={{ color: 'var(--st-muted)' }}>
              / 7 완료
            </span>
            <span className="text-xs font-semibold ml-auto pb-1" style={{ color: 'var(--st-success)' }}>
              57%
            </span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{
              background: 'var(--st-bg)',
              border: '1px solid var(--st-border)'
            }}
          >
            <div
              className="h-full rounded-full"
              style={{
                background: 'var(--st-gold)',
                width: '57%'
              }}
            />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="st-card p-2.5">
            <p className="st-label mb-1">검 수</p>
            <p className="text-2xl font-bold mb-1" style={{ color: 'var(--st-gold)' }}>
              12
            </p>
            <p className="text-[10px]" style={{ color: 'var(--st-muted)' }}>
              +1 이번주
            </p>
          </div>

          <div className="st-card p-2.5">
            <p className="st-label mb-1">완료 퀘스트</p>
            <p className="text-2xl font-bold mb-1" style={{ color: 'var(--st-gold)' }}>
              184
            </p>
            <p className="text-[10px]" style={{ color: 'var(--st-muted)' }}>
              all-time
            </p>
          </div>

          <div className="st-card p-2.5">
            <p className="st-label mb-1">연속 출석</p>
            <p className="text-2xl font-bold mb-1" style={{ color: 'var(--st-success)' }}>
              7
            </p>
            <p className="text-[10px]" style={{ color: 'var(--st-muted)' }}>
              🔥 days
            </p>
          </div>
        </div>

        {/* Equipped sword */}
        <button onClick={() => onNavigate('sword-detail')} className="w-full st-card p-4 flex items-center gap-4">
          <div
            className="relative w-[62px] h-[62px] rounded-[14px] flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--st-bg)' }}
          >
            <div
              className="absolute inset-0 rounded-[14px]"
              style={{ background: 'var(--st-glow-gold-strong)' }}
            />
            <span className="relative text-[36px]" style={{ color: 'var(--st-gold)' }}>
              ⚔
            </span>
          </div>
          <div className="flex-1 text-left">
            <p className="st-label mb-1" style={{ color: 'var(--st-gold)' }}>
              EQUIPPED
            </p>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--st-text)' }}>
              Excalibur
            </p>
            <div className="flex items-center gap-2">
              <span className="st-badge-legendary">LEGENDARY</span>
              <span className="text-xs font-bold" style={{ color: 'var(--st-text)' }}>
                Lv.14
              </span>
            </div>
          </div>
        </button>

        {/* Delete account */}
        <button
          onClick={() => {
            if (confirm('정말 탈퇴하시겠습니까? 모든 데이터가 삭제됩니다.')) {
              alert('탈퇴가 완료되었습니다.');
            }
          }}
          className="w-full py-3 text-xs font-medium tracking-wide"
          style={{
            color: 'var(--st-muted)',
            textDecoration: 'underline'
          }}
        >
          회원 탈퇴
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
