import React from 'react';
import { useData } from '../context/DataContext';
import { Users, HeartHandshake, ShieldCheck, ClipboardList } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {students,classes,counselings,behaviors,teachers,isSyncing}=useData();
  const activeStudents=students.filter(s=>s.status==='Aktif');
  const activeCounselings=counselings.filter(c=>c.followUpStatus==='Proses');
  const needsFollowUp=behaviors.filter(b=>b.status==='Dalam Pembinaan'||b.status==='Perlu Perhatian');
  const stats=[
    {label:'Siswa Aktif',value:activeStudents.length,icon:Users,detail:'Data siswa sekolah'},
    {label:'Data Kelas',value:classes.length,icon:ClipboardList,detail:'Rombongan belajar'},
    {label:'Catatan Konseling',value:counselings.length,icon:HeartHandshake,detail:'Seluruh layanan tercatat'},
    {label:'Perlu Tindak Lanjut',value:activeCounselings.length+needsFollowUp.length,icon:ShieldCheck,detail:'Konseling dan pembinaan'},
  ];
  return <div className="min-h-screen w-full bg-white font-sans text-slate-800">
    <section className="px-4 pt-5 md:px-8"><div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#5B3A9E] via-[#7652B8] to-[#A78BFA] px-6 py-7 text-white shadow-[0_12px_30px_rgba(91,58,158,0.18)]"><p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">SIMPATIK</p><h1 className="mt-2 text-2xl font-black sm:text-3xl">Layanan Bimbingan dan Konseling</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-white/90">Ruang kerja BK untuk mendampingi perkembangan pribadi, sosial, belajar, dan karir peserta didik.</p><p className="mt-4 text-[11px] text-white/75">{isSyncing?'Menyinkronkan data…':'Data sekolah terhubung'}</p></div></section>
    <section className="space-y-4 px-4 py-6 md:px-8"><div className="grid grid-cols-2 gap-3 xl:grid-cols-4">{stats.map(({label,value,icon:Icon,detail})=><article key={label} className="rounded-2xl border border-[#E5D9F5] bg-white p-4 shadow-xs"><div className="flex items-center justify-between"><p className="text-xs font-bold text-slate-500">{label}</p><span className="rounded-xl bg-[#F1EBFA] p-2 text-[#5B3A9E]"><Icon size={18}/></span></div><p className="mt-3 text-3xl font-black text-slate-800">{value}</p><p className="mt-1 text-[11px] text-slate-400">{detail}</p></article>)}</div>
      <div className="grid gap-4 lg:grid-cols-2"><article className="rounded-2xl border border-[#E5D9F5] bg-white p-5"><h2 className="font-extrabold text-slate-800">Ringkasan Layanan BK</h2><p className="mt-1 text-xs text-slate-500">Jumlah sesi berdasarkan bidang layanan</p><div className="mt-4 space-y-3">{['Pribadi','Sosial','Belajar','Karir'].map(type=>{const count=counselings.filter(c=>c.serviceType===type).length;return <div key={type}><div className="mb-1 flex justify-between text-xs"><span className="font-semibold text-slate-600">{type}</span><strong>{count}</strong></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#7652B8]" style={{width:counselings.length?`${count/counselings.length*100}%`:'0%'}}/></div></div>})}</div></article>
      <article className="rounded-2xl border border-[#E5D9F5] bg-white p-5"><h2 className="font-extrabold text-slate-800">Data Pendukung</h2><p className="mt-1 text-xs text-slate-500">Data sekolah yang tersedia untuk layanan BK</p><div className="mt-4 divide-y divide-slate-100">{[{label:'Siswa aktif',value:activeStudents.length},{label:'Guru terdaftar',value:teachers.length},{label:'Kelas',value:classes.length},{label:'Kasus pembinaan perlu tindak lanjut',value:needsFollowUp.length}].map(item=><div key={item.label} className="flex items-center justify-between py-3 text-sm"><span className="text-slate-600">{item.label}</span><strong className="text-slate-800">{item.value}</strong></div>)}</div></article></div>
    </section>
  </div>;
};
