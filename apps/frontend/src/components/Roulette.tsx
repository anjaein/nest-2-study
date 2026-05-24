import { useState } from 'react';
import { X } from 'lucide-react';
import gemIcon from '../assets/rewards/gem.svg';
import goldIcon from '../assets/rewards/gold.svg';

const rewards = [
  { label: '골드', value: '+120', color: '#F5C842', icon: goldIcon },
  { label: '보석', value: '+15', color: '#7B5CF5', icon: gemIcon },
  { label: '골드', value: '+60', color: '#D9A91D', icon: goldIcon },
  { label: '보석', value: '+5', color: '#B49CFF', icon: gemIcon },
  { label: '골드', value: '+200', color: '#FBD66A', icon: goldIcon },
  { label: '보석', value: '+30', color: '#6E4EF2', icon: gemIcon },
  { label: '골드', value: '+80', color: '#C99020', icon: goldIcon },
  { label: '보석', value: '+10', color: '#9E82FF', icon: gemIcon },
];

const segmentAngle = 360 / rewards.length;
const iconRadius = 78;
const spinDurationMs = 1300;

export default function Roulette({ onClose }: { onClose?: () => void }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false); // 한 번이라도 돌렸는지
  const [rotation, setRotation] = useState(22);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);

  const selectedReward = rewards[selectedIndex];

  const spin = () => {
    if (isSpinning) return;

    const nextIndex = (selectedIndex + 3) % rewards.length;
    const targetAngle = 360 - (nextIndex * segmentAngle + segmentAngle / 2);

    setIsSpinning(true);
    setPendingIndex(nextIndex);
    setRotation((current) => current + 1440 + targetAngle);

    window.setTimeout(() => {
      setSelectedIndex(nextIndex);
      setPendingIndex(null);
      setIsSpinning(false);
      setHasSpun(true); // 스핀 완료 → 보상 받기 버튼으로 전환
    }, spinDurationMs);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center px-5 py-8">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-md"
        aria-label="룰렛 닫기"
        onClick={onClose}
      />

      <section className="relative z-10 flex w-full max-w-[420px] flex-col overflow-hidden rounded-[28px] border border-[rgba(245,200,66,0.28)] bg-[var(--st-surface)] shadow-[0_24px_80px_rgba(0,0,0,0.58)]">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--st-border)] px-5 py-4">
          <div>
            <p className="st-label text-[9px] text-[var(--st-gold)]">FORTUNE WHEEL</p>
            <h2 className="st-heading mt-1 text-xl text-[var(--st-text)]">운명의 룰렛</h2>
          </div>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-xl border border-[var(--st-border)] bg-[var(--st-elevated)] text-[var(--st-muted)] transition hover:text-[var(--st-text)]"
            aria-label="닫기"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col items-center px-5 pb-5 pt-6">
          <div className="relative flex size-[292px] items-center justify-center">
            <div className="absolute -inset-5 rounded-full bg-[radial-gradient(circle,rgba(245,200,66,0.22),transparent_66%)]" />

            <div className="absolute -top-1 left-1/2 z-20 h-9 w-8 -translate-x-1/2">
              <div className="mx-auto h-0 w-0 border-x-[16px] border-t-[30px] border-x-transparent border-t-[var(--st-gold)] drop-shadow-[0_5px_10px_rgba(0,0,0,0.55)]" />
            </div>

            <div
              className="relative size-[260px] rounded-full border-[10px] border-[#1F2026] shadow-[inset_0_0_0_2px_rgba(245,200,66,0.8),0_18px_55px_rgba(0,0,0,0.45)] transition-transform duration-[1300ms] ease-out"
              style={{
                transform: `rotate(${rotation}deg)`,
                background:
                  'conic-gradient(from -90deg, #F5C842 0deg 45deg, #7B5CF5 45deg 90deg, #D9A91D 90deg 135deg, #B49CFF 135deg 180deg, #FBD66A 180deg 225deg, #6E4EF2 225deg 270deg, #C99020 270deg 315deg, #9E82FF 315deg 360deg)',
              }}
            >
              <div className="absolute inset-[12px] rounded-full border border-black/30" />
              {rewards.map((reward, index) => {
                const angle = -90 + index * segmentAngle + segmentAngle / 2;
                const radian = (angle * Math.PI) / 180;
                const x = Math.cos(radian) * iconRadius;
                const y = Math.sin(radian) * iconRadius;

                return (
                  <div
                    key={`${reward.label}-${index}`}
                    className="absolute flex size-12 items-center justify-center rounded-2xl bg-black/20 p-1.5 shadow-[0_8px_18px_rgba(0,0,0,0.32)]"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                    }}
                  >
                    <img src={reward.icon} alt="" className="size-full" />
                  </div>
                );
              })}

              <div className="absolute left-1/2 top-1/2 flex size-[78px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#1B1510] bg-[var(--st-gradient-gold)] shadow-[0_0_24px_rgba(245,200,66,0.45)]">
                <span className="st-heading text-lg text-[#1A1100]">ST</span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid w-full grid-cols-[auto_1fr] items-center gap-3 rounded-2xl border border-[rgba(245,200,66,0.32)] bg-[#17171C] p-4">
            {pendingIndex === null ? (
              <img
                src={selectedReward.icon}
                alt=""
                className="size-16 rounded-2xl bg-black/20 p-2 shadow-[0_10px_24px_rgba(0,0,0,0.32)]"
              />
            ) : (
              <div className="size-16 animate-pulse rounded-2xl border border-[var(--st-border)] bg-black/20" />
            )}
            <div>
              <p className="st-label text-[8px]">이번 보상</p>
              <p className="mt-1 text-2xl font-black text-[var(--st-text)]">
                {pendingIndex === null ? (
                  <>
                    {selectedReward.label}{' '}
                    <span style={{ color: selectedReward.color }}>{selectedReward.value}</span>
                  </>
                ) : (
                  <span className="text-lg text-[var(--st-muted)]">결과 확인 중</span>
                )}
              </p>
            </div>
          </div>

          <div className="mt-4 grid w-full grid-cols-2 gap-2">
            <button
              type="button"
              className="st-btn-dark"
              onClick={onClose}
            >
              닫기
            </button>
            {/* 돌린 후에는 보상 ���기 버튼으로 교체 */}
            {hasSpun && !isSpinning ? (
              <button
                type="button"
                className="st-btn-gold"
                onClick={onClose}
              >
                보상 받기 ✦
              </button>
            ) : (
              <button
                type="button"
                className="st-btn-gold disabled:cursor-wait disabled:opacity-70"
                disabled={isSpinning}
                onClick={spin}
              >
                {isSpinning ? '진행 중' : '돌리기'}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
