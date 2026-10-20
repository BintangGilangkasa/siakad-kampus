import React, { useState, useRef } from 'react';
import { studentData } from '../data/studentData';
import { todayClasses } from '../data/scheduleData';
import { attendanceList } from '../data/attendanceData';
import { announcements } from '../data/announcements';
import {
  Clock,
  MapPin,
  User,
  TrendingUp,
  Bell,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Award,
  AlertCircle,
  Megaphone,
  BookOpen,
  UserCheck,
  ShieldCheck,
  Camera,
  X,
  Check,
  ZoomIn,
  Move
} from 'lucide-react';

export default function HomePage({ onOpenKrsModal, setActiveTab }) {
  // Ref & State Foto Profil Utama
  const fileInputRef = useRef(null);
  const [photoSrc, setPhotoSrc] = useState(studentData?.photo || null);

  // State Modal Editor & Pratinjau Foto
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [tempPhotoSrc, setTempPhotoSrc] = useState(null);

  // State Notifikasi Berhasil Upload Foto
  const [isPhotoSaved, setIsPhotoSaved] = useState(false);

  // State Pengaturan Posisi & Zoom Sementara
  const [zoomScale, setZoomScale] = useState(1);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  // State Gaya Posisi Foto yang Disetujui
  const [savedStyle, setSavedStyle] = useState({
    scale: 1,
    x: 0,
    y: 0
  });

  const totalPresent = (attendanceList || []).reduce((acc, curr) => acc + curr.present, 0);
  const totalMeetings = (attendanceList || []).reduce((acc, curr) => acc + curr.total, 0);
  const attendancePercentage = totalMeetings > 0 ? Math.round((totalPresent / totalMeetings) * 100) : 0;

  const displayName = studentData?.name ? studentData.name.split(' ').slice(0, 2).join(' ') : 'Mahasiswa';

  // Handler Buka File Picker
  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handler Pilih Berkas Baru -> Buka Modal
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setTempPhotoSrc(newImageUrl);
      setZoomScale(1);
      setPositionX(0);
      setPositionY(0);
      setIsPhotoModalOpen(true);
    }
  };

  // Handler Persetujuan Simpan Posisi Foto
  const handleSavePhoto = () => {
    if (tempPhotoSrc) {
      setPhotoSrc(tempPhotoSrc);
      setSavedStyle({
        scale: zoomScale,
        x: positionX,
        y: positionY
      });

      // Tampilkan Notifikasi Berhasil
      setIsPhotoSaved(true);
      setTimeout(() => {
        setIsPhotoSaved(false);
      }, 3000);
    }
    setIsPhotoModalOpen(false);
  };

  // Handler Batal Edit
  const handleCancelEdit = () => {
    setTempPhotoSrc(null);
    setIsPhotoModalOpen(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto font-sans text-slate-800 w-full min-w-0 px-1 sm:px-4 lg:px-0 relative">

      {/* NOTIFIKASI TOAST BERHASIL UPLOAD FOTO */}
      {isPhotoSaved && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in slide-in-from-top-3 duration-300 border border-emerald-400/30">
          <CheckCircle2 className="w-5 h-5 text-emerald-100 shrink-0" />
          <span>Foto profil berhasil diperbarui!</span>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoChange}
        accept="image/*"
        className="hidden"
      />

      {/* 1. WELCOME BANNER UTAMA */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-blue-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center relative z-10">

          {/* SISI KIRI: FOTO PROFIL (PAS FOTO 3x4) & UCAPAN */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-start sm:items-center gap-4">

            {/* Foto Profil Pas Foto 3x4 & Tombol Ganti Foto (Tanpa Border) */}
            <div className="relative shrink-0 flex flex-col items-center gap-2">

              {/* Frame Pas Foto 3x4 */}
              <div className="w-20 sm:w-24 aspect-3/4 rounded-2xl bg-linear-to-tr from-blue-500 via-indigo-400 to-sky-300 p-0.5 shadow-xl overflow-hidden relative">
                <div className="w-full h-full bg-slate-900 rounded-[14px] overflow-hidden relative flex items-center justify-center">
                  {photoSrc ? (
                    <img
                      src={photoSrc}
                      alt="Foto Profil 3x4"
                      className="w-full h-full object-cover object-top transition-transform duration-150"
                      style={{
                        transform: `scale(${savedStyle.scale}) translate(${savedStyle.x}px, ${savedStyle.y}px)`
                      }}
                      onError={() => setPhotoSrc(null)}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 gap-1">
                      <User className="w-8 h-8" />
                      <span className="text-[9px] font-bold">Foto Profil</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tombol Ganti Foto di Bawah Pas Foto (Clean Style, Tanpa Border) */}
              <button
                type="button"
                onClick={handlePhotoClick}
                className="w-full px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Camera className="w-3.5 h-3.5 text-sky-300" />
                <span>Ganti Foto</span>
              </button>

            </div>

            {/* Detail Nama & Akses Pintas */}
            <div className="space-y-1.5 min-w-0">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                {studentData.name}
              </h1>

              <p className="text-xs text-slate-300 flex items-center gap-1.5 flex-wrap">
                <span>NIM: <strong className="font-mono text-white">{studentData?.nim || '2301019082'}</strong></span>
                <span>•</span>
                <span>{studentData?.prodi || 'S1 - Sains Data'}</span>
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => setActiveTab && setActiveTab('status-registrasi')}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Cek Status ACC KRS</span>
                </button>
                <button
                  onClick={() => setActiveTab && setActiveTab('lihat-penawaran')}
                  className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-sky-300" />
                  <span>Penawaran Matkul</span>
                </button>
              </div>
            </div>

          </div>

          {/* SISI KANAN: KARTU IDENTITAS */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 text-xs space-y-2.5">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-[10px] uppercase font-bold text-sky-300 tracking-wider">Kartu Informasi Mahasiswa</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{studentData?.statusAkademik || 'Aktif Kuliah'}</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[10px]">Dosen PA</span>
                  <span className="font-semibold text-white truncate block">{studentData?.dosenPA || 'Wulan Izzatul Himmah, S.Pd., M.Pd.'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Status UKT</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Lunas
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Fakultas / Prodi</span>
                  <span className="font-bold text-white truncate block">{studentData?.fakultas || 'Sains & Teknologi'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Batas Beban SKS</span>
                  <span className="font-bold text-amber-300">24 SKS</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL EDITOR POSISI & ZOOM FOTO PROFIL */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl border border-slate-100">

            {/* Header Modal */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Move className="w-4 h-4 text-blue-600" />
                <span>Sesuaikan Posisi Foto Profil (3x4)</span>
              </h3>
              <button
                onClick={handleCancelEdit}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Frame Pratinjau Pas Foto 3x4 */}
            <div className="flex justify-center my-2">
              <div className="w-32 aspect-3/4 rounded-2xl bg-slate-900 border-4 border-blue-600 shadow-md overflow-hidden relative flex items-center justify-center">
                <img
                  src={tempPhotoSrc}
                  alt="Pratinjau Foto"
                  className="w-full h-full object-cover transition-transform duration-75"
                  style={{
                    transform: `scale(${zoomScale}) translate(${positionX}px, ${positionY}px)`
                  }}
                />
              </div>
            </div>

            {/* Sliders Kontrol Posisi & Zoom */}
            <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-700 text-[11px]">
                  <span className="flex items-center gap-1">
                    <ZoomIn className="w-3.5 h-3.5 text-blue-600" /> Ukuran Zoom
                  </span>
                  <span>{Math.round(zoomScale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="2.5"
                  step="0.05"
                  value={zoomScale}
                  onChange={(e) => setZoomScale(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-700 text-[11px]">
                  <span>Geser Vertikal (Atas/Bawah)</span>
                  <span>{positionY}px</span>
                </div>
                <input
                  type="range"
                  min="-40"
                  max="40"
                  step="1"
                  value={positionY}
                  onChange={(e) => setPositionY(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-700 text-[11px]">
                  <span>Geser Horizontal (Kiri/Kanan)</span>
                  <span>{positionX}px</span>
                </div>
                <input
                  type="range"
                  min="-40"
                  max="40"
                  step="1"
                  value={positionX}
                  onChange={(e) => setPositionX(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Tombol Persetujuan */}
            <div className="pt-2 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSavePhoto}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Simpan & Terapkan Foto</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* BANNER PENGUMUMAN URGENT & STAT CARDS */}
      <div className="p-3 sm:p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0">
            <Megaphone className="w-4 h-4" />
          </div>
          <div className="text-xs min-w-0">
            <span className="font-bold block text-amber-950 truncate">Batas Akhir Pengisian KRS Semester Ganjil</span>
            <span className="text-[11px] text-amber-800 block truncate">Segera konsultasi dengan Dosen PA sebelum tanggal 20 Oktober 2026.</span>
          </div>
        </div>
        {setActiveTab && (
          <button
            onClick={() => setActiveTab('status-registrasi')}
            className="w-full sm:w-auto px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shrink-0 text-center cursor-pointer"
          >
            Cek Status
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-4">
        <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[9px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider truncate">IP Kumulatif</span>
            <div className="p-1 rounded-lg bg-blue-50 text-blue-600 shrink-0 hidden sm:block">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className="text-sm sm:text-2xl font-black text-slate-900">{studentData?.ipk || '3.88'}</span>
              <span className="text-[8px] sm:text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-md border border-emerald-200">
                Cumlaude
              </span>
            </div>
            <p className="text-[8px] sm:text-[11px] text-slate-400 mt-0.5 truncate">Total 6 Smt Tempuh</p>
          </div>
        </div>

        <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[9px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider truncate">Progres SKS</span>
            <div className="p-1 rounded-lg bg-amber-50 text-amber-600 shrink-0 hidden sm:block">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-sm sm:text-2xl font-black text-slate-900">
              {studentData?.totalSks || 124} <span className="text-[9px] sm:text-xs font-normal text-slate-400">/ {studentData?.targetSks || 144}</span>
            </div>
            <p className="text-[8px] sm:text-[11px] text-slate-400 mt-0.5 truncate">
              Sisa {(studentData?.targetSks || 144) - (studentData?.totalSks || 124)} SKS
            </p>
          </div>
        </div>

        <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[9px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider truncate">Kehadiran</span>
            <div className="p-1 rounded-lg bg-emerald-50 text-emerald-600 shrink-0 hidden sm:block">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-sm sm:text-2xl font-black text-slate-900">{attendancePercentage}%</div>
            <p className="text-[8px] sm:text-[11px] text-emerald-600 font-semibold mt-0.5 truncate">Syarat ≥ 75%</p>
          </div>
        </div>
      </div>

      {/* 4. MAIN GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 gap-2">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 sm:p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-extrabold text-slate-800 text-xs sm:text-sm">Jadwal Kuliah Hari Ini</h2>
                  <p className="text-[10px] text-slate-400">Selasa, 20 Oktober 2026</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab && setActiveTab('isi-krs')}
                className="text-[11px] font-bold text-blue-600 hover:underline flex items-center space-x-1 shrink-0 cursor-pointer"
              >
                <span>Semua</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              {(todayClasses || []).map((cls) => (
                <div key={cls.id} className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                      {cls.code}
                    </span>
                    <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full ${cls.statusBg}`}>
                      {cls.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug">{cls.name}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[11px] text-slate-600 pt-1.5 border-t border-slate-200/60">
                    <p className="flex items-center space-x-1.5 truncate">
                      <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{cls.time}</span>
                    </p>
                    <p className="flex items-center space-x-1.5 truncate">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{cls.room}</span>
                    </p>
                    <p className="flex items-center space-x-1.5 truncate">
                      <User className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{cls.lecturer}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="font-extrabold text-[11px] uppercase tracking-wider text-slate-500">
                Presensi Per Mata Kuliah
              </h3>
              <button
                onClick={() => setActiveTab && setActiveTab('status-registrasi')}
                className="text-[10px] sm:text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Detail →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {(attendanceList || []).map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-slate-800 text-xs truncate">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {item.code} • {item.present}/{item.total} Kehadiran
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                  <Bell className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm">Pengumuman Kampus</h3>
              </div>
              <button
                onClick={() => setActiveTab && setActiveTab('news-info')}
                className="text-[11px] font-bold text-amber-700 hover:underline cursor-pointer"
              >
                Semua
              </button>
            </div>

            <div className="space-y-2.5">
              {(announcements || []).slice(0, 3).map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition space-y-1">
                  <div className="flex items-center justify-between text-[9px] sm:text-[10px]">
                    <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className="text-slate-400">{item.date}</span>
                  </div>

                  <h4
                    onClick={() => setActiveTab && setActiveTab('news-info')}
                    className="font-bold text-slate-800 text-xs hover:text-blue-600 cursor-pointer transition leading-snug line-clamp-2"
                  >
                    {item.title}
                  </h4>

                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>  

          <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 space-y-1.5">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <h4 className="font-bold text-xs">Batas Akademik</h4>
            </div>
            <ul className="text-[11px] text-amber-800 space-y-0.5 list-disc list-inside">
              <li>Revisi KRS terakhir: <strong>20 Oktober 2026</strong></li>
              <li>Status Registrasi Ulang: <strong>Aktif</strong></li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}