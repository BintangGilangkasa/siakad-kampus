import React, { useState, useRef } from 'react';
import { studentData } from '../data/studentData';
import {
  LayoutDashboard,
  User,
  BookOpen,
  GraduationCap,
  Calendar,
  Wallet,
  ChevronDown,
  ChevronRight,
  Camera,
  FileText,
  Search,
  Award,
  Clock,
  HelpCircle,
  CreditCard,
  FileSpreadsheet,
  Megaphone,
  X
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isOpen, onClose }) {
  const fileInputRef = useRef(null);
  const [avatarSrc, setAvatarSrc] = useState(studentData?.avatar || null);

  // State Accordion Menu
  const [openMenus, setOpenMenus] = useState({
    profil: false,
    krs: false,
    khs: false,
    perkuliahan: false,
    keuangan: false,
    layanan: false,
  });

  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  // Trigger Upload Foto dari Avatar
  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarSrc(imageUrl);
      alert('Foto profil berhasil diperbarui!');
    }
  };

  // Struktur Menu Terstruktur & Minimalis
  const menuGroups = [
    {
      key: 'profil',
      title: 'Profil & Akun',
      icon: User,
      items: [
        { id: 'biodata', label: 'Biodata & Data Dikti', icon: FileText },
        { id: 'account', label: 'Pengaturan Akun', icon: User },
      ],
    },
    {
      key: 'krs',
      title: 'KRS & Registrasi',
      icon: BookOpen,
      items: [
        { id: 'status-registrasi', label: 'Status Registrasi Ulang', icon: FileText },
        { id: 'input-penawaran', label: 'Input Penawaran Matkul', icon: BookOpen },
        { id: 'lihat-penawaran', label: 'Lihat Penawaran Matkul', icon: Search },
        { id: 'cetak-krs', label: 'Lihat / Cetak KRS', icon: FileText },
      ],
    },
    {
      key: 'khs',
      title: 'KHS & Transkrip',
      icon: GraduationCap,
      items: [
        { id: 'sejarah-ip', label: 'Sejarah IP', icon: Clock },
        { id: 'lihat-khs', label: 'Lihat KHS / Kartu Studi', icon: Award },
        { id: 'transkrip-sementara', label: 'Transkrip Sementara', icon: FileSpreadsheet },
      ],
    },
    {
      key: 'perkuliahan',
      title: 'Perkuliahan',
      icon: Calendar,
      items: [
        { id: 'jadwal-silabus', label: 'Jadwal Kuliah & Silabus', icon: Calendar },
        { id: 'informasi-kehadiran', label: 'Informasi Kehadiran', icon: Clock },
        { id: 'jadwal-ujian', label: 'Jadwal Ujian', icon: FileText },
        { id: 'remidi', label: 'Informasi Remidi', icon: HelpCircle },
      ],
    },
    {
      key: 'keuangan',
      title: 'Keuangan & UKT',
      icon: Wallet,
      items: [
        { id: 'rekap-pembayaran', label: 'Rekap Pembayaran', icon: CreditCard },
        { id: 'tagihan-ukt', label: 'Informasi Tagihan UKT', icon: FileText },
      ],
    },
    {
      key: 'layanan',
      title: 'Informasi & Layanan',
      icon: Megaphone,
      items: [
        { id: 'news-info', label: 'News & Info Kampus', icon: Megaphone },
        { id: 'cari-mahasiswa', label: 'Direktori Mahasiswa', icon: Search },
        { id: 'undangan-beasiswa', label: 'Informasi Beasiswa', icon: Award },
      ],
    },
  ];

  return (
    <>
      {/* Overlay Backdrop untuk HP/Tablet */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
        ></div>
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-50 w-64 bg-slate-900 text-slate-200 h-screen lg:h-auto min-h-screen flex flex-col shrink-0 shadow-2xl lg:shadow-xl font-sans transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Hidden Input untuk File Avatar */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Header Profil Samping */}
        <div className="p-5 flex flex-col items-center text-center border-b border-slate-800/80 space-y-3 relative">
          
          {/* Tombol Close untuk Layar Mobile */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Avatar Interaktif dengan Hover Kamera */}
          <div
            onClick={handleAvatarClick}
            className="relative group w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-400 cursor-pointer overflow-hidden transition shadow-inner"
            title="Klik untuk mengubah foto profil"
          >
            {avatarSrc ? (
              <img src={avatarSrc} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8" />
            )}

            {/* Hover Camera Overlay */}
            <div className="absolute inset-0 bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-[9px] font-bold">
              <Camera className="w-4 h-4 mb-0.5" />
              <span>Ubah</span>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-xs text-white leading-snug truncate max-w-47.5">
              {studentData?.name || 'Bintang Syailendra'}
            </h2>
            <p className="text-[12px] font-semibold text-slate-300 font-mono mt-1">
              NIM: {studentData?.nim || '2301019082'}
            </p>
          </div>
        </div>

        {/* Navigasi Sub-menu */}
        <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
          
          {/* Dashboard Utama */}
          <button
            onClick={() => {
              setActiveTab('beranda');
              if (onClose) onClose();
            }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'beranda'
                ? 'bg-blue-600 text-white shadow-md font-bold'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="truncate">Dashboard Utama</span>
          </button>

          <div className="my-2 border-t border-slate-800/80"></div>

          {/* Group Accordion */}
          {menuGroups.map((group) => {
            const GroupIcon = group.icon;
            const isOpenGroup = openMenus[group.key];

            return (
              <div key={group.key} className="space-y-0.5">
                <button
                  onClick={() => toggleMenu(group.key)}
                  className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800/60 hover:text-white transition group"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <GroupIcon className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate tracking-wide">{group.title}</span>
                  </div>
                  {isOpenGroup ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white shrink-0" />
                  )}
                </button>

                {isOpenGroup && (
                  <div className="pl-4 pr-1 space-y-0.5 border-l-2 border-slate-800 ml-3.5 py-1">
                    {group.items.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = activeTab === subItem.id;

                      return (
                        <button
                          key={subItem.id}
                          onClick={() => {
                            setActiveTab(subItem.id);
                            if (onClose) onClose();
                          }}
                          className={`w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition ${
                            isSubActive
                              ? 'bg-blue-600/30 text-sky-300 font-bold border-l-2 border-sky-400'
                              : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                          }`}
                        >
                          <SubIcon className={`w-3.5 h-3.5 shrink-0 ${isSubActive ? 'text-sky-400' : 'text-slate-500'}`} />
                          <span className="truncate text-left leading-tight">{subItem.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}