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
  legendary: { border: 'var(--st-gold)', text: 'var(--st-gold)', bg: 'var(--st-glow-gold-strong)' },
  epic: { border: 'var(--st-gem)', text: 'var(--st-gem)', bg: 'var(--st-glow-gem)' },
  rare: { border: 'var(--st-rare)', text: 'var(--st-rare)', bg: 'var(--st-glow-rare)' },
  common: { border: 'var(--st-muted)', text: 'var(--st-muted)', bg: 'var(--st-glow-common)' }
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
    <div className="flex flex-col flex-1 min-h-0">
      <StatusBar />

      {/* Header */}
      <div className="px-4 py-3.5 flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold st-heading text-[var(--st-text)]">
            보관함
          </h1>
          <p className="st-label text-xs mt-0.5">VAULT · 보유 검 12</p>
        </div>
        <div className="flex gap-1.5">
          <div className="h-[34px] px-2.5 rounded-lg flex items-center text-xs font-bold" style={{ background: 'var(--st-elevated)', border: '1px solid var(--st-gold)', color: 'var(--st-gold)' }}>
            ◈ 2,840
          </div>
          <div className="h-[34px] px-2.5 rounded-lg flex items-center text-xs font-bold" style={{ background: 'var(--st-elevated)', border: '1px solid var(--st-gem)', color: 'var(--st-gem)' }}>
            ◆ 15
          </div>
        </div>
      </div>

      {/* Sword grid */}
      <div className="flex-1 overflow-y-auto min-h-0 px-4 pb-4">
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
                    className="text-[10px] font-bold tracking-[1.2px] uppercase text-center mb-2"
                    style={{ color: colors.text }}
                  >
                    장착 중
                  </p>
                )}

                <div
                  className="w-[100px] h-20 mx-auto mb-4 rounded-[50px] flex items-center justify-center"
                  style={{ background: colors.bg }}
                >
                  <span className="text-5xl" style={{ color: colors.text }}>
                    ⚔
                  </span>
                </div>

                <p className="text-sm font-semibold mb-2" style={{ color: 'var(--st-text)' }}>
                  {sword.name}
                </p>

                <div className="flex items-center justify-between">
                  <span className={rarityClasses[sword.rarity]}>
                    {sword.rarity.toUpperCase()}
                  </span>
                  <span
                    className="text-xs font-bold"
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

      <BottomNav />
    </div>
  );
}
