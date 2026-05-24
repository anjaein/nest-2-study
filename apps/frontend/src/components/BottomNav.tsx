import { useLocation, useNavigate } from 'react-router';

type Tab = 'dashboard' | 'quest' | 'vault';

const tabPaths: Record<Tab, string> = {
  dashboard: '/dashboard',
  quest: '/quest',
  vault: '/vault'
};

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const tabs = [
    { id: 'dashboard' as Tab, label: '대시보드', icon: '⚔' },
    { id: 'quest' as Tab, label: '퀘스트', icon: '📜' },
    { id: 'vault' as Tab, label: '보관함', icon: '🗄' }
  ];

  const activeTab = tabs.find((tab) => pathname.startsWith(tabPaths[tab.id]))?.id ?? 'dashboard';

  return (
    <div
      className="h-[56px] flex mt-auto"
      style={{
        borderTop: '1px solid var(--st-border)',
        background: 'rgba(13, 13, 15, 0.92)',
        backdropFilter: 'blur(12px)'
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => navigate(tabPaths[tab.id])}
          className="flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-semibold tracking-[0.3px]"
          style={{
            color: activeTab === tab.id ? 'var(--st-gold)' : 'var(--st-muted)',
            fontFamily: 'var(--st-body)'
          }}
        >
          <span className="text-xl">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
