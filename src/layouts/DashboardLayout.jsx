import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function DashboardLayout({
  children,
  activeMenu,
  setActiveMenu,
  studentProfile,
  onLogout
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Peta judul halaman berdasarkan menu aktif
  const menuTitles = {
    home: 'Beranda Utama',
    'krs-simulasi': 'Simulasi Pengisian KRS Interactive',
    'krs-penawaran': 'Penawaran Mata Kuliah',
    'krs-cetak': 'Cetak Kartu Rencana Studi (KRS)',
    'khs-lihat': 'Kartu Hasil Studi (KHS)',
    'khs-sejarah': 'Sejarah Perkembangan IP',
    'khs-transkrip': 'Transkrip Nilai Sementara',
    'kuliah-jadwal': 'Jadwal Kuliah & Silabus',
    'kuliah-presensi': 'Informasi Kehadiran',
    'uang-tagihan': 'Informasi Tagihan UKT',
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        studentProfile={studentProfile}
        onLogout={onLogout}
      />

      {/* Main Content Wrapper (Margin Left di Desktop lg:pl-64) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activeTitle={menuTitles[activeMenu] || 'Portal Akademik'}
          studentProfile={studentProfile}
          onLogout={onLogout}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}