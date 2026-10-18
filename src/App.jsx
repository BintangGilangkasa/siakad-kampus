import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import KrsPage from './pages/krsRegistrasi/KrsPage';
import CetakKrsPage from './pages/krsRegistrasi/CetakKrsPage';
import { CetakBiodataPage } from "./pages/krsRegistrasi/CetakBiodataPage";
import AccountSettingsPage from './pages/profilAkun/AccountSettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import InformasiKehadiran from './pages/perkuliahan/InformasiKehadiran';

export default function App() {
  const [activeTab, setActiveTab] = useState('beranda');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    alert('Logout berhasil!');
  };

  const handleOpenKrsModal = () => {
    setActiveTab('input-penawaran');
  };

  // Switch Render Halaman Berdasarkan Tab yang Aktif
  const renderPageContent = () => {
    switch (activeTab) {
      case 'beranda':
        return (
          <HomePage
            onOpenKrsModal={handleOpenKrsModal}
            setActiveTab={setActiveTab}
          />
        );

      // Modul KRS
      case 'isi-krs':
      case 'input-penawaran':
      case 'lihat-penawaran':
        return <KrsPage />;

      case 'cetak-krs':
        return <CetakKrsPage />;

      // Modul Profil & Biodata
      case 'biodata':
        return <BiodataPage setActiveTab={setActiveTab} />;

      case 'cetak-biodata':
        return <CetakBiodataPage setActiveTab={setActiveTab} />;

      // Modul Pengaturan Akun
      case 'account':
        return <AccountSettingsPage />;

      // Modul Perkuliahan
      case 'informasi-kehadiran':
        return <InformasiKehadiran />;  

      // Tampilkan NotFoundPage jika tab tidak dikenali
      default:
        return <NotFoundPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-800">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Navbar */}
        <Navbar
          onLogout={handleLogout}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Dynamic Page Content */}
        <main className="p-3 sm:p-5 lg:p-6 flex-1 flex flex-col">
          {renderPageContent()}
        </main>
      </div>
    </div>
  );
}