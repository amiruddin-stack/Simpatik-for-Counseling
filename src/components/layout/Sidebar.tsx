import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Home, UserRound, GraduationCap, Users, HeartHandshake, ShieldCheck, FileText, Settings, LogOut, ClipboardList } from 'lucide-react';

export type NavTab = 'dashboard' | 'attendance' | 'journal' | 'behavior' | 'counseling' | 'assessment' | 'exams' | 'grades' | 'master' | 'reports' | 'settings' | 'classes' | 'subjects' | 'ils' | 'homeroom' | 'schedule' | 'more' | 'google-form-exams';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}
interface DesktopSidebarProps { activeTab: NavTab; onNavigate: (tab: NavTab) => void; }

const items: {tab:NavTab;label:string;icon:React.ElementType}[] = [
  {tab:'dashboard',label:'Beranda BK',icon:Home},
  {tab:'master',label:'Data Siswa & Guru',icon:Users},
  {tab:'classes',label:'Data Kelas',icon:GraduationCap},
  {tab:'counseling',label:'Layanan Konseling',icon:HeartHandshake},
  {tab:'behavior',label:'Perilaku & Pembinaan',icon:ShieldCheck},
  {tab:'reports',label:'Laporan BK',icon:FileText},
  {tab:'settings',label:'Profil & Pengaturan',icon:Settings},
];

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({activeTab,onNavigate}) => {
  const {currentUser,firebaseUser,logout}=useAuth();
  const itemClass=(tab:NavTab)=>`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold transition-colors ${activeTab===tab?'bg-gradient-to-br from-[#A78BFA] via-[#7652B8] to-[#7652B8] text-white shadow-sm':'text-slate-600 hover:bg-[#F7F3FC] hover:text-[#5B3A9E]'}`;
  return <aside className="sticky top-0 hidden h-screen w-[258px] shrink-0 flex-col border-r border-[#E5D9F5] bg-white px-4 py-5 md:flex">
    <div className="mb-7 border-b border-slate-100 px-2 pb-5"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">SIMPATIK FOR COUNSELING</p><p className="mt-1 truncate text-base font-extrabold tracking-tight text-slate-900">{currentUser?.displayName||currentUser?.email||'Pengguna'}</p><p className="mt-0.5 text-[10px] font-semibold text-slate-400">{currentUser?.role==='super_admin'?'Admin Utama':'Pengguna SIMPATIK'}</p></div>
    <nav aria-label="Navigasi utama" className="min-h-0 flex-1 space-y-1 overflow-y-auto">{items.map(({tab,label,icon:Icon})=><button key={tab} type="button" onClick={()=>onNavigate(tab)} className={itemClass(tab)}><Icon size={18} strokeWidth={1.9}/>{label}</button>)}</nav>
    <div className="mt-4 border-t border-slate-100 pt-4">{firebaseUser&&!firebaseUser.isAnonymous&&currentUser&&<button type="button" onClick={()=>void logout()} className="mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-red-600"><LogOut size={15}/>Keluar</button>}<p className="mt-3 px-2 text-[10px] leading-5 text-slate-400">Qurani, Ramah Anak dan Berkarakter</p></div>
  </aside>;
};
export const Sidebar: React.FC<SidebarProps> = () => null;
