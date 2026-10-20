import React from 'react';
import { studentData } from '../data/studentData';
import { todayClasses } from '../data/scheduleData';
import { attendanceList } from '../data/attendanceData';
import { announcements } from '../data/announcements';
import {
  Clock,
  MapPin,
  User,
  BookOpen,
  TrendingUp,
  Bell,
  Calendar,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Award,
  AlertCircle
} from 'lucide-react';

export default function HomePage({ onOpenKrsModal, setActiveTab }) {
  const totalPresent = (attendanceList || []).reduce((acc, curr) => acc + curr.present, 0);
  const totalMeetings = (attendanceList || []).reduce((acc, curr) => acc + curr.total, 0);
  const attendancePercentage = totalMeetings > 0 ? Math.round((totalPresent / totalMeetings) * 100) : 0;

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto font-sans text-slate-800 w-full min-w-0 px-2 sm:px-4 lg:px-0">
      
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-700 p-4 text-white shadow-sm sm:rounded-2xl sm:p-6">
        {/* Dekorasi background */}
        <div className="pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full border-[20px] border-white/10 sm:h-56 sm:w-56 sm:border-[30px]" />

        <div className="pointer-events-none absolute -bottom-20 right-20 h-36 w-36 rounded-full bg-white/5 sm:-bottom-24 sm:right-28 sm:h-48 sm:w-48" />

        {/* Konten Header */}
        <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="min-w-0 space-y-1">
            <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-medium text-blue-50 sm:text-xs">
              <GraduationCap className="h-3.5 w-3.5 shrink-0 text-blue-100 sm:h-4 sm:w-4" />

              <span className="truncate">
                Semester {studentData?.semester || 7} • TA 2026/2027 Ganjil
              </span>
            </div>

            <h1 className="text-lg font-black tracking-tight sm:text-xl lg:text-2xl">
              Selamat Datang, {studentData.name.split(' ')[0]}! 👋
            </h1>

            <p className="text-[11px] leading-normal text-blue-100 sm:text-xs">
              Dosen Pembimbing A:{' '}
              <strong className="font-semibold text-white">
                {studentData?.dosenPA || 'Dr. Hendra Kusuma, M.Si.'}
              </strong>
            </p>
          </div>

          {/* Tombol */}
          <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto sm:gap-2.5">
            <button
              onClick={onOpenKrsModal}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-blue-500 active:bg-blue-700 sm:flex-none sm:px-4 sm:py-2.5"
            >
              <BookOpen className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
              <span>Simulasi KRS</span>
            </button>

            <button
              onClick={() => setActiveTab && setActiveTab('cetak-krs')}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/20 sm:flex-none sm:px-4 sm:py-2.5"
            >
              <span>Lihat KRS</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Quick Highlight Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        
        {/* Card IPK */}
        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">IP Kumulatif</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl sm:text-2xl font-black text-slate-900">{studentData?.ipk || '3.88'}</span>
              <span className="text-[9px] sm:text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Cumlaude
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Total 6 Semester Tempuh</p>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-blue-50 text-blue-600 shrink-0">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Card Total SKS */}
        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">Progres SKS</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-xl sm:text-2xl font-black text-slate-900">{studentData?.totalSks || 124}</span>
              <span className="text-xs text-slate-400 font-semibold">/ {studentData?.targetSks || 144} SKS</span>
            </div>
            <p className="text-[10px] text-slate-400">Sisa {(studentData?.targetSks || 144) - (studentData?.totalSks || 124)} SKS Lagi</p>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-amber-50 text-amber-600 shrink-0">
            <Award className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Card Kehadiran */}
        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between sm:col-span-2 md:col-span-1">
          <div className="space-y-0.5">
            <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">Kehadiran Total</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl sm:text-2xl font-black text-slate-900">{attendancePercentage}%</span>
            </div>
            <p className="text-[10px] text-slate-400">Syarat Kehadiran ≥ 75%</p>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

      </div>

      {/* 3. Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        
        {/* Kolom Kiri: Jadwal Hari Ini */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm space-y-3.5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 gap-2">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 sm:p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-extrabold text-slate-800 text-xs sm:text-sm">Jadwal Kuliah Hari Ini</h2>
                  <p className="text-[10px] text-slate-400">Senin, 19 Oktober 2026</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab && setActiveTab('jadwal-silabus')}
                className="text-[11px] font-bold text-blue-600 hover:underline flex items-center space-x-1 shrink-0"
              >
                <span>Semua</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* List Matkul */}
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

          {/* Ringkasan Presensi */}
          <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="font-extrabold text-[11px] uppercase tracking-wider text-slate-500">
                Presensi Per Mata Kuliah
              </h3>
              <button
                onClick={() => setActiveTab && setActiveTab('informasi-kehadiran')}
                className="text-[10px] sm:text-[11px] font-bold text-blue-600 hover:underline"
              >
                Detail →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {(attendanceList || []).map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-slate-800 text-xs truncate">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{item.code} • {item.present}/{item.total} Kehadiran</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Pengumuman */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                  <Bell className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm">Pengumuman Kampus</h3>
              </div>
              <button
                onClick={() => setActiveTab && setActiveTab('news-info')}
                className="text-[11px] font-bold text-amber-700 hover:underline"
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

                  <h4 className="font-bold text-slate-800 text-xs hover:text-blue-600 cursor-pointer transition leading-snug line-clamp-2">
                    {item.title}
                  </h4>

                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Catatan Penting */}
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