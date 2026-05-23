import BottomNav from '../components/BottomNav';
import StatusBar from '../components/StatusBar';

interface Sword {
  id: number;
  name: string;
  rarity: 'legendary' | 'epic' | 'rare' | 'common';
  level: number;
  equipped?: boolean;
}

const rarityColors = {
  legendary: { border: 'var(--st-gold)', text: 'var(--st-gold)', bg: 'rgba(245,200,66,0.15)' },
  epic: { border: 'var(--st-gem)', text: 'var(--st-gem)', bg: 'rgba(123,92,245,0.15)' },
  rare: { border: '#6ba1ff', text: '#6ba1ff', bg: 'rgba(107,161,255,0.15)' },
  common: { border: 'var(--st-muted)', text: 'var(--st-muted)', bg: 'rgba(138,138,154,0.15)' }
};

const rarityClasses = {
  legendary: 'st-badge-legendary',
  epic: 'st-badge-epic',
  rare: 'st-badge-rare',
  common: 'st-badge-common'
};

export default function SwordVault({
  onNavigate,
  onSelectSword
}: {
  onNavigate: (screen: string) => void;
  onSelectSword: (id: number) => void;
}) {
  const swords: Sword[] = [
    { id: 1, name: 'Excalibur', rarity: 'legendary', level: 14, equipped: true },
    { id: 2, name: 'Shadowfang', rarity: 'epic', level: 9 },
    { id: 3, name: 'Stormpiercer', rarity: 'epic', level: 7 },
    { id: 4, name: 'Frostbite', rarity: 'rare', level: 5 },
    { id: 5, name: 'Aegis Edge', rarity: 'rare', level: 4 },
    { id: 6, name: 'Ironblade', rarity: 'common', level: 2 }
  ];

  return (
    <>
      <StatusBar />

      {/* Header */}
      <div className="px-4 py-3">
        <h1 className="text-[26px] font-bold mb-1 st-heading" style={{ color: 'var(--st-text)' }}>
          보관함
        </h1>
        <p className="st-label text-xs">VAULT · 보유 검 12</p>
      </div>

      {/* Filter chips */}
      <div className="px-4 pb-3 flex gap-1.5 overflow-x-auto">
        <button
          className="h-[30px] px-3 rounded-full text-[10px] font-semibold whitespace-nowrap flex-shrink-0"
          style={{
            background: 'var(--st-gold)',
            border: '1px solid var(--st-gold)',
            color: 'var(--st-bg)'
          }}
        >
          전체 12
        </button>
        <button
          className="h-[30px] px-3 rounded-full text-[10px] font-semibold whitespace-nowrap flex-shrink-0"
          style={{
            background: 'transparent',
            border: '1px solid var(--st-border)',
            color: 'var(--st-muted)'
          }}
        >
          Legendary 1
        </button>
        <button
          className="h-[30px] px-3 rounded-full text-[10px] font-semibold whitespace-nowrap flex-shrink-0"
          style={{
            background: 'transparent',
            border: '1px solid var(--st-border)',
            color: 'var(--st-muted)'
          }}
        >
          Epic 3
        </button>
        <button
          className="h-[30px] px-3 rounded-full text-[10px] font-semibold whitespace-nowrap flex-shrink-0"
          style={{
            background: 'transparent',
            border: '1px solid var(--st-border)',
            color: 'var(--st-muted)'
          }}
        >
          Rare 4
        </button>
        <button
          className="h-[30px] px-3 rounded-full text-[10px] font-semibold whitespace-nowrap flex-shrink-0"
          style={{
            background: 'transparent',
            border: '1px solid var(--st-border)',
            color: 'var(--st-muted)'
          }}
        >
          Common 4
        </button>
      </div>

      {/* Sword grid */}
      <div className="flex-1 overflow-auto px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {swords.map((sword) => {
            const colors = rarityColors[sword.rarity];
            return (
              <button
                key={sword.id}
                onClick={() => onSelectSword(sword.id)}
                className="h-[180px] p-3 relative"
                style={{
                  background: 'var(--st-surface)',
                  border: sword.equipped
                    ? `1px solid ${colors.border}`
                    : '1px solid var(--st-border)',
                  borderRadius: '18px',
                  boxShadow: 'var(--st-shadow-card)'
                }}
              >
                {sword.equipped && (
                  <p
                    className="text-[8px] font-bold tracking-[1.2px] uppercase text-center mb-2"
                    style={{ color: colors.text }}
                  >
                    장착 중
                  </p>
                )}

                <div
                  className="w-[100px] h-20 mx-auto mb-4 rounded-[50px] flex items-center justify-center"
                  style={{ background: colors.bg }}
                >
                  <span className="text-[56px]" style={{ color: colors.text }}>
                    ⚔
                  </span>
                </div>

                <p className="text-[13px] font-semibold mb-2" style={{ color: 'var(--st-text)' }}>
                  {sword.name}
                </p>

                <div className="flex items-center justify-between">
                  <span className={rarityClasses[sword.rarity]}>
                    {sword.rarity.toUpperCase()}
                  </span>
                  <span
                    className="text-[11px] font-bold"
                    style={{ color: 'var(--st-text)', fontFamily: 'var(--st-mono)' }}
                  >
                    Lv.{sword.level}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <BottomNav activeTab="vault" onTabChange={(tab) => onNavigate(tab)} />
    </>
  );
}
