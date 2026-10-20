import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import LoginPage from '../src/pages/LoginPage';
import HomePage from './pages/HomePage';

import { studentData as initialStudentData } from './data/studentData';

// Biodata & Profil
import BiodataPage from './pages/profilAkun/BiodataPage';
import StatusAkademikPage from './pages/profilAkun/StatusAkademikPage';
import GantiPasswordPage from './pages/profilAkun/GantiPasswordPage';
import AccountSettingsPage from './pages/profilAkun/AccountSettingsPage';
import CetakBiodataPage from "./pages/profilAkun/CetakBiodataPage";

// KRS Registrasi
import StatusRegistrasiPage from './pages/krsRegistrasi/StatusRegistrasiPage';
import KrsPage from './pages/krsRegistrasi/KrsPage';
import CetakKrsPage from './pages/krsRegistrasi/CetakKrsPage';
import LihatPenawaranPage from './pages/krsRegistrasi/LihatPenawaranPage';

// KHS & Transkrip
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

// Informasi Layanan
import NewsInfoPage from './pages/informasiLayanan/NewsInfoPage';
import BeasiswaPage from './pages/informasiLayanan/BeasiswaPage';

// Helpdesk
import HelpdeskPage from './pages/helpdesk/HelpDeskPage';

// Not Found Page
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  // Sesi Login: Default membaca dari localStorage agar tidak langsung masuk dashboard
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('siakad_is_logged_in') === 'true';
  });

  const [activeTab, setActiveTab] = useState('beranda');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State Global Student Data dengan Penyimpanan LocalStorage
  const [studentData, setStudentData] = useState(() => {
    const saved = localStorage.getItem('siakad_student_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialStudentData;
      }
    }
    return initialStudentData;
  });

  // Handler Update Data Mahasiswa
  const handleUpdateStudentData = (newData) => {
    setStudentData((prev) => {
      const updated = { ...prev, ...newData };
      localStorage.setItem('siakad_student_data', JSON.stringify(updated));
      return updated;
    });
  };

  // Handler Login Berhasil
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('siakad_is_logged_in', 'true');
  };

  // Fungsi Logout Resmi
  const handleLogout = () => {
    const isConfirmed = window.confirm('Apakah Anda yakin ingin keluar dari sistem SIAKAD?');
    if (isConfirmed) {
      setIsLoggedIn(false);
      localStorage.removeItem('siakad_is_logged_in');
    }
  };

  // Jika belum login, tampilkan Halaman Login
  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

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
            studentData={studentData}
          />
        );
      
      // Modul Profil & Biodata
      case 'biodata-dikti':
      case 'biodata':
        return <BiodataPage setActiveTab={setActiveTab} studentData={studentData} />;

      case 'update-biodata':
        return (
          <UpdateBiodataPage
            studentData={studentData}
            onUpdateStudentData={handleUpdateStudentData}
            setActiveTab={setActiveTab}
          />
        );

      case 'cetak-biodata':
        return <CetakBiodataPage setActiveTab={setActiveTab} studentData={studentData} />; 

      case 'status-akademik':
        return <StatusAkademikPage setActiveTab={setActiveTab} studentData={studentData} />;
      
      case 'pengaturan-akun':
        return <AccountSettingsPage setActiveTab={setActiveTab} studentData={studentData} />;

      case 'ganti-password':
        return <GantiPasswordPage setActiveTab={setActiveTab} />;

      // Modul KRS & Registrasi
      case 'isi-krs':
      case 'input-penawaran':
        return <KrsPage />;
      
      case 'lihat-penawaran':
        return <LihatPenawaranPage setActiveTab={setActiveTab} />;

      case 'status-registrasi':
        return <StatusRegistrasiPage setActiveTab={setActiveTab} />;

      case 'cetak-krs':
        return <CetakKrsPage />;

      // Modul KHS & Transkrip
      case 'lihat-khs':
      case 'khs':
      case 'khs-mahasiswa':
        return <LihatKhsPage setActiveTab={setActiveTab} studentData={studentData} />;

      case 'transkrip-sementara':
      case 'transkrip':
      case 'transkrip-nilai':
        return <TranskripSementaraPage setActiveTab={setActiveTab} studentData={studentData} />;

      case 'sejarah-ip':
      case 'sejarah-ipk':
      case 'ipk-ips':
        return <SejarahIpPage setActiveTab={setActiveTab} studentData={studentData} />;

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
      case 'tagihan-ukt':
      case 'informasi-tagihan-ukt':
      case 'informasi-tagihan':
        return <TagihanUktPage setActiveTab={setActiveTab} />;
      
      case 'rekap-pembayaran':
        return <RekapPembayaranPage setActiveTab={setActiveTab} />;

      // Info Beasiswa & Layanan
      case 'news-info':
      case 'berita-kampus':
        return <NewsInfoPage setActiveTab={setActiveTab} />;
      
      case 'beasiswa-prestasi':
      case 'info-beasiswa':
      case 'informasi-beasiswa':
      case 'beasiswa':
        return <BeasiswaPage setActiveTab={setActiveTab} />;

      // Helpdesk
      case 'helpdesk':
        return <HelpdeskPage setActiveTab={setActiveTab} />;

      // Tampilkan NotFoundPage jika tab tidak dikenali
      default:
        return <NotFoundPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen min-h-screen bg-slate-100 font-sans text-slate-800">
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
          setActiveTab={setActiveTab}
          studentData={studentData}
        />

        {/* Dynamic Page Content */}
        <main className="p-3 sm:p-5 lg:p-6 flex-1 flex flex-col">
          {renderPageContent()}
        </main>
      </div>
    </div>
  );
}