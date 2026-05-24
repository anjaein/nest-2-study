import BottomNav from '../components/BottomNav';
import StatusBar from '../components/StatusBar';

export default function SwordDetail({
  onNavigate,
  onEnhance
}: {
  onNavigate: (screen: string) => void;
  onEnhance: () => void;
}) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <StatusBar />

      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => onNavigate('vault')}
          className="w-[38px] h-[38px] rounded-xl flex items-center justify-center text-[22px] font-bold"
          style={{
            background: 'var(--st-elevated)',
            border: '1px solid var(--st-border)',
            color: 'var(--st-text)'
          }}
        >
          ‹
        </button>

        <p className="st-label">SWORD · DETAIL</p>

        <button
          className="w-[38px] h-[38px] rounded-xl flex items-center justify-center text-base font-bold"
          style={{
            background: 'var(--st-elevated)',
            border: '1px solid var(--st-border)',
            color: 'var(--st-text)'
          }}
        >
          ···
        </button>
      </div>

      {/* Sword display */}
      <div className="flex-1 overflow-y-auto min-h-0 px-4 pb-4 space-y-4">
        <div className="flex flex-col items-center py-8">
          <div
            className="relative w-[200px] h-[200px] rounded-full flex items-center justify-center mb-6"
            style={{ background: 'var(--st-glow-gold-strong)' }}
          >
            <span className="text-[130px]" style={{ color: 'var(--st-gold)' }}>
              ⚔
            </span>
          </div>

          <h1
            className="text-2xl font-bold tracking-[2px] mb-2 st-heading"
            style={{ color: 'var(--st-text)' }}
          >
            EXCALIBUR
          </h1>

          <div className="flex items-center gap-2">
            <span className="st-badge-legendary">LEGENDARY</span>
            <span
              className="text-xs font-bold"
              style={{ color: 'var(--st-gold)', fontFamily: 'var(--st-mono)' }}
            >
              Lv.14 / 30
            </span>
          </div>
        </div>

        {/* Stats card */}
        <div className="st-card p-4">
          <div className="flex items-start justify-between mb-3">
            <p className="st-label">강화 정보</p>
            <p
              className="text-[11px] font-bold"
              style={{ color: 'var(--st-success)', fontFamily: 'var(--st-mono)' }}
            >
              + Lv.15
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <p className="text-[10px] mb-2" style={{ color: 'var(--st-muted)' }}>
                성공률
              </p>
              <p
                className="text-[22px] font-bold mb-2"
                style={{ color: 'var(--st-success)', fontFamily: 'var(--st-mono)' }}
              >
                72%
              </p>
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
                    background: 'var(--st-success)',
                    width: '72%'
                  }}
                />
              </div>
            </div>

            <div className="w-px" style={{ background: 'var(--st-border)' }} />

            <div className="flex-1">
              <p className="text-[10px] mb-2" style={{ color: 'var(--st-muted)' }}>
                실패 시 손실
              </p>
              <p
                className="text-sm font-bold mb-2"
                style={{ color: 'var(--st-danger)', fontFamily: 'var(--st-mono)' }}
              >
                −1 Lv
              </p>
              <p className="text-[10px]" style={{ color: 'var(--st-muted)' }}>
                비용은 반환되지 않음
              </p>
            </div>
          </div>
        </div>

        {/* Cost card */}
        <div className="st-card p-4 flex items-center justify-between">
          <p className="st-label">강화 비용</p>
          <div className="flex items-center gap-3">
            <span
              className="text-[13px] font-bold"
              style={{ color: 'var(--st-gold)', fontFamily: 'var(--st-mono)' }}
            >
              ◈ 480
            </span>
            <span
              className="text-[13px] font-bold"
              style={{ color: 'var(--st-gem)', fontFamily: 'var(--st-mono)' }}
            >
              ◆ 12
            </span>
          </div>
        </div>

        {/* Enhance button */}
        <button onClick={onEnhance} className="w-full st-btn-gold">
          강화하기 ⚔
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
