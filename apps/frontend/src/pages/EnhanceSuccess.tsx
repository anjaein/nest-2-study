export default function EnhanceSuccess({ onContinue, onReturn }: { onContinue?: () => void; onReturn?: () => void }) {
  return (
    <div className="relative flex-1 z-10 flex flex-col px-6 py-10 items-center justify-center">
      {/* Green radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, var(--st-glow-success) 0%, rgba(13,13,15,0.95) 70%)'
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Label */}
        <div
          className="st-label text-[11px] tracking-[3px]"
          style={{ color: 'var(--st-success)' }}
        >
          ★ ENHANCE SUCCESS ★
        </div>

        {/* Sword hero */}
        <div className="relative w-80 h-60 flex items-center justify-center mt-4">
          {/* Burst rays */}
          <svg className="absolute" width="320" height="240" viewBox="0 0 320 240">
            <line x1="160" y1="120" x2="160" y2="0" stroke="var(--st-gold)" strokeWidth="1.2" opacity="0.5"/>
            <line x1="160" y1="120" x2="271" y2="50" stroke="var(--st-gold)" strokeWidth="1.2" opacity="0.25"/>
            <line x1="160" y1="120" x2="320" y2="120" stroke="var(--st-gold)" strokeWidth="1.2" opacity="0.5"/>
            <line x1="160" y1="120" x2="271" y2="190" stroke="var(--st-gold)" strokeWidth="1.2" opacity="0.25"/>
            <line x1="160" y1="120" x2="160" y2="240" stroke="var(--st-gold)" strokeWidth="1.2" opacity="0.5"/>
            <line x1="160" y1="120" x2="49" y2="190" stroke="var(--st-gold)" strokeWidth="1.2" opacity="0.25"/>
            <line x1="160" y1="120" x2="0" y2="120" stroke="var(--st-gold)" strokeWidth="1.2" opacity="0.5"/>
            <line x1="160" y1="120" x2="49" y2="50" stroke="var(--st-gold)" strokeWidth="1.2" opacity="0.25"/>
            <line x1="160" y1="120" x2="237" y2="43" stroke="var(--st-gold)" strokeWidth="0.8" opacity="0.3"/>
            <line x1="160" y1="120" x2="237" y2="197" stroke="var(--st-gold)" strokeWidth="0.8" opacity="0.3"/>
            <line x1="160" y1="120" x2="83" y2="197" stroke="var(--st-gold)" strokeWidth="0.8" opacity="0.3"/>
            <line x1="160" y1="120" x2="83" y2="43" stroke="var(--st-gold)" strokeWidth="0.8" opacity="0.3"/>
          </svg>

          {/* Shock ring */}
          <div
            className="absolute w-[220px] h-[220px] rounded-full border-2 opacity-40"
            style={{
              borderColor: 'var(--st-gold)',
              boxShadow: '0 0 60px var(--st-gold), inset 0 0 30px rgba(245,200,66,0.3)'
            }}
          />

          {/* Sword icon */}
          <div
            className="text-[130px] leading-none"
            style={{ filter: 'drop-shadow(0 0 20px rgba(245,200,66,0.7))' }}
          >
            ⚔
          </div>
        </div>

        {/* Level up */}
        <div
          className="text-[34px] font-bold tracking-[4px] mt-2 st-heading"
          style={{
            color: 'var(--st-gold)',
            textShadow: '0 0 24px rgba(245,200,66,0.6)'
          }}
        >
          +1 Lv
        </div>

        <div
          className="text-base font-bold mt-1.5"
          style={{
            fontFamily: 'var(--st-mono)',
            color: 'var(--st-text)'
          }}
        >
          Lv.14 → <span style={{ color: 'var(--st-success)' }}>Lv.15</span>
        </div>

        <div className="mt-3.5 flex gap-2 text-[11px]" style={{ color: 'var(--st-muted)' }}>
          <span>EXCALIBUR</span>
          <span>·</span>
          <span>LEGENDARY</span>
        </div>

        <div className="flex-1" />

        {/* Buttons */}
        <div className="w-full flex flex-col gap-2 mt-8">
          <button onClick={onContinue} className="w-full st-btn-gold">
            한번 더 강화
          </button>
          <button onClick={onReturn} className="w-full st-btn-dark">
            보관함으로
          </button>
        </div>
      </div>
    </div>
  );
}
