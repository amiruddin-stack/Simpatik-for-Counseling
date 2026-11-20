import React, { useState } from 'react';
import { Home, Users, UserRound, HeartHandshake, ShieldCheck, FileText, Settings, Grid3X3, X, ClipboardList } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { HomeTopBar } from './components/layout/HomeTopBar';
import { PageBanner } from './components/layout/PageBanner';
import { NavTab, DesktopSidebar } from './components/layout/Sidebar';
import { OfflineIndicator } from './components/common/OfflineIndicator';
import { DashboardPage } from './pages/DashboardPage';
import { BehaviorPage } from './pages/BehaviorPage';
import { CounselingPage } from './pages/CounselingPage';
import { MasterDataPage } from './pages/MasterDataPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';

function AppContent() {
  const { currentUser, loading } = useAuth();
  const [activeTab, setActiveTabState] = useState<NavTab>(() => {
    const requested = new URLSearchParams(window.location.search).get('page') as NavTab | null;
    const allowed: NavTab[] = ['dashboard', 'counseling', 'behavior', 'master', 'classes', 'reports', 'settings'];
    return requested && allowed.includes(requested) ? requested : 'dashboard';
  });
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const appMenuItems: { tab: NavTab; label: string; icon: React.ElementType }[] = [
    { tab: 'dashboard', label: 'Beranda BK', icon: Home },
    { tab: 'master', label: 'Data Siswa & Guru', icon: Users },
    { tab: 'classes', label: 'Data Kelas', icon: ClipboardList },
    { tab: 'counseling', label: 'Layanan Konseling', icon: HeartHandshake },
    { tab: 'behavior', label: 'Perilaku & Pembinaan', icon: ShieldCheck },
    { tab: 'reports', label: 'Laporan BK', icon: FileText },
    { tab: 'settings', label: 'Profil & Pengaturan', icon: Settings },
  ];

  const setActiveTab = (tab: NavTab) => {
    const allowed: NavTab[] = ['dashboard', 'counseling', 'behavior', 'master', 'classes', 'reports', 'settings'];
    if (!allowed.includes(tab)) tab = 'dashboard';
    const url = new URL(window.location.href);
    url.searchParams.set('page', tab);
    window.history.pushState({ simpatikTab: tab }, '', url);
    setActiveTabState(tab);
    setMoreMenuOpen(false);
  };

  React.useEffect(() => {
    const restore = () => {
      const requested = (window.history.state?.simpatikTab || new URLSearchParams(window.location.search).get('page') || 'dashboard') as NavTab;
      const allowed: NavTab[] = ['dashboard', 'counseling', 'behavior', 'master', 'classes', 'reports', 'settings'];
      setActiveTabState(allowed.includes(requested) ? requested : 'dashboard');
      setMoreMenuOpen(false);
    };
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, []);

  if (loading) return <main className="flex min-h-screen items-center justify-center bg-[#f8fbf9]"><div className="text-center"><div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-700" /><p className="text-sm font-medium text-slate-500">SIMPATIK sedang dipersiapkan…</p></div></main>;
  if (!currentUser) return <LoginPage />;

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'counseling': return <CounselingPage />;
      case 'behavior': return <BehaviorPage />;
      case 'master': return <MasterDataPage initialSubTab="siswa" />;
      case 'classes': return <MasterDataPage initialSubTab="kelas" />;
      case 'reports': return <ReportsPage />;
      case 'settings': return <SettingsPage />;
      default: return <DashboardPage />;
    }
  };

  return <div className="min-h-screen w-full font-sans text-slate-800" style={{ backgroundColor: '#FFFFFF' }}>
    <div className="flex min-h-screen w-full">
      <DesktopSidebar activeTab={activeTab} onNavigate={setActiveTab} />
      <div className="min-w-0 flex-1">
        <HomeTopBar activeTab={activeTab} onNavigate={setActiveTab} />
        <main className="min-h-screen w-full p-0">
          <div className={activeTab === 'dashboard' ? 'w-full' : 'mx-auto w-full max-w-7xl px-4 pt-5 pb-24 md:px-6 md:py-6'}>
            {activeTab !== 'dashboard' && <PageBanner activeTab={activeTab} onBack={() => { if (window.history.state?.simpatikTab) window.history.back(); else setActiveTab('dashboard'); }} />}
            {renderCurrentPage()}
          </div>
        </main>
      </div>
    </div>
    {moreMenuOpen && <>
      <button type="button" aria-label="Tutup menu aplikasi" onClick={() => setMoreMenuOpen(false)} className="fixed inset-0 z-[110] bg-slate-900/25 md:hidden" />
      <section aria-label="Menu aplikasi" className="fixed inset-x-3 bottom-[78px] z-[120] max-h-[68vh] overflow-y-auto rounded-[24px] border border-[#D5EADB] bg-white p-4 shadow-[0_16px_48px_rgba(15,70,40,0.2)] md:hidden">
        <div className="mb-3 flex items-center justify-between"><div><h2 className="text-base font-extrabold text-slate-800">Menu SIMPATIK BK</h2><p className="text-[11px] text-slate-500">Layanan bimbingan dan konseling</p></div><button type="button" onClick={() => setMoreMenuOpen(false)} aria-label="Tutup" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600"><X size={18} /></button></div>
        <div className="grid grid-cols-3 gap-2.5">{appMenuItems.map(({ tab, label, icon: Icon }) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} aria-current={activeTab === tab ? 'page' : undefined} className={`flex min-h-[88px] min-w-0 flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-3 text-center transition-colors ${activeTab === tab ? 'border-[#8BD5AA] bg-[#E3F7EC] text-[#076B3A]' : 'border-slate-100 bg-slate-50 text-slate-600 active:bg-[#E3F7EC]'}`}><Icon size={21} strokeWidth={1.9} /><span className="text-[10px] font-bold leading-tight">{label}</span></button>)}</div>
      </section>
    </>}
    <nav aria-label="Navigasi bawah" className="fixed inset-x-0 bottom-0 z-[100] grid grid-cols-5 border-t border-[#D5EADB] bg-white/95 px-1 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 shadow-[0_-6px_20px_rgba(15,70,40,0.08)] backdrop-blur md:hidden">
      {[{tab:'dashboard' as NavTab,label:'Beranda',icon:Home},{tab:'counseling' as NavTab,label:'Konseling',icon:HeartHandshake},{tab:'behavior' as NavTab,label:'Pembinaan',icon:ShieldCheck},{tab:'master' as NavTab,label:'Siswa',icon:Users}].map(({tab,label,icon:Icon})=><button key={tab} type="button" onClick={()=>setActiveTab(tab)} aria-current={activeTab===tab?'page':undefined} className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-bold ${activeTab===tab?'text-[#087F49]':'text-slate-500'}`}><span className={`flex h-8 w-9 items-center justify-center rounded-xl ${activeTab===tab?'bg-[#E3F7EC]':''}`}><Icon size={19}/></span><span>{label}</span></button>)}
      <button type="button" onClick={()=>setMoreMenuOpen(open=>!open)} aria-expanded={moreMenuOpen} aria-label="Buka menu aplikasi" className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-bold ${moreMenuOpen?'text-[#087F49]':'text-slate-500'}`}><span className={`flex h-8 w-9 items-center justify-center rounded-xl ${moreMenuOpen?'bg-[#E3F7EC]':''}`}><Grid3X3 size={19}/></span><span>Menu</span></button>
    </nav>
    <OfflineIndicator />
  </div>;
}

export default function App() {
  return <AuthProvider><DataProvider><AppContent /></DataProvider></AuthProvider>;
}
