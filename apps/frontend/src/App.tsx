import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Dashboard from './pages/Dashboard';
import EnhanceSuccess from './pages/EnhanceSuccess';
import Login from './pages/Login';
import Quests from './pages/Quests';
import SwordDetail from './pages/SwordDetail';
import SwordVault from './pages/SwordVault';

export default function App() {
  return (
    <BrowserRouter>
      <main
        className="min-h-screen w-full overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at top, rgba(245,200,66,0.04), transparent 50%),
            radial-gradient(ellipse at bottom, rgba(123,92,245,0.03), transparent 50%),
            var(--st-bg)
          `
        }}
      >
        <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col overflow-hidden bg-[var(--st-bg)] md:border-x md:border-[var(--st-border)]">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vault" element={<SwordVault />} />
            <Route path="/vault/:id" element={<SwordDetail />} />
            <Route path="/enhance-success" element={<EnhanceSuccess />} />
            <Route path="/quest" element={<Quests />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}
