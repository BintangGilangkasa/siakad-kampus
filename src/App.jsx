import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

// Biodata
import BiodataPage from './pages/profilAkun/BiodataPage';
import CetakBiodataPage from "./pages/profilAkun/CetakBiodataPage";
import AccountSettingsPage from './pages/profilAkun/AccountSettingsPage';

// KRS Registrasi
import StatusRegistrasiPage from './pages/krsRegistrasi/StatusRegistrasiPage';
import KrsPage from './pages/krsRegistrasi/KrsPage';
import CetakKrsPage from './pages/krsRegistrasi/CetakKrsPage';
import LihatPenawaranPage from './pages/krsRegistrasi/LihatPenawaranPage';

//KHS & Transkrip
import SejarahIpPage from './pages/khsTranskrip/SejarahIpPage';
import LihatKhsPage from './pages/khsTranskrip/LihatKhsPage';
import TranskripSementaraPage from './pages/khsTranskrip/TranskripSementaraPage';

// Keuangan
import TagihanUktPage from './pages/keuangan/TagihanUktPage';
import RekapPembayaranPage from './pages/keuangan/RekapPembayaranPage';

// Perkuliahan
import InformasiKehadiran from './pages/perkuliahan/InformasiKehadiran';
import JadwalUjian from './pages/perkuliahan/JadwalUjian';
import InformasiRemidi from './pages/perkuliahan/InformasiRemidi';
import JadwalKuliah from './pages/perkuliahan/JadwalKuliah';

//Halaman tidak ditemukan
import NotFoundPage from './pages/NotFoundPage';


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
      
      // Modul Profil & Biodata
      case 'biodata':
        return <BiodataPage setActiveTab={setActiveTab} />;

      case 'cetak-biodata':
        return <CetakBiodataPage setActiveTab={setActiveTab} />;   
      
      // Modul KRS
      case 'isi-krs':
      case 'input-penawaran':
        return <KrsPage />;
      
      case 'lihat-penawaran':
        return <LihatPenawaranPage setActiveTab={setActiveTab} />

      case 'status-registrasi':
        return <StatusRegistrasiPage setActiveTab={setActiveTab} />

      case 'cetak-krs':
        return <CetakKrsPage />;

      //KHS & Transkrip
      case 'sejarah-ip':
        return <SejarahIpPage />;

      case 'lihat-khs':
        return <LihatKhsPage />;

      case 'transkrip-sementara':
        return <TranskripSementaraPage />;

      // Modul Pengaturan Akun
      case 'account':
        return <AccountSettingsPage />;

      // Modul Perkuliahan
      case 'informasi-kehadiran':
        return <InformasiKehadiran />;  

      case 'jadwal-ujian':
        return <JadwalUjian />;

      case 'remidi':
        return <InformasiRemidi />;

      case 'jadwal-silabus':
        return <JadwalKuliah />;

      // Modul Keuangan / UKT
      case  'tagihan-ukt':
        return <TagihanUktPage setActiveTab={setActiveTab} />
      
      case 'rekap-pembayaran':
        return <RekapPembayaranPage setActiveTab={setActiveTab} />

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