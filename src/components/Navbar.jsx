import React from 'react';
import {
  Search,
  Mail,
  Bell,
  LogOut,
  GraduationCap,
  Menu
} from 'lucide-react';

export default function Navbar({ onLogout, onToggleSidebar }) {
  return (
    <header className="bg-white border-b border-slate-200/90 shadow-sm sticky top-0 z-30 font-sans">
      
      {/* 1. Bar Atas: Identitas Lembaga & Status Semester */}
      <div className="bg-slate-900 text-slate-300 px-4 sm:px-6 py-2 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2">
          {/* Tombol Hamburger khusus Tampilan HP/Tablet */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-1 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition mr-1"
            title="Buka Menu"
          > 
            <Menu className="w-4 h-4" />
          </button>

          <GraduationCap className="w-4 h-4 text-amber-400 shrink-0 hidden sm:block" />
          <span className="tracking-wide text-[11px] sm:text-xs">
            Portal Akademik | <strong className="text-sky-300 font-bold">Universitas Islam Negeri Salatiga</strong>
          </span>
        </div>
      </div>

      {/* 2. Bar Utama: Search Bar & Action Buttons */}
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        
        {/* Kolom Kiri: Input Pencarian */}
        <div className="flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Cari fitur, mata kuliah, atau informasi..."
              className="w-full pl-10 pr-4 py-2 rounded-full text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Kolom Kanan: Pesan, Notifikasi, & Logout */}
        <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
          
          <button className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition relative">
            <Mail className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-900 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
              9
            </span>
          </button>

          <button className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-900 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
              9
            </span>
          </button>

          <div className="h-5 w-px bg-slate-200"></div>

          <button
            onClick={onLogout}
            title="Keluar / Logout"
            className="w-10 h-8 sm:w-13 sm:h-8 rounded-l bg-slate-900 hover:bg-red-600 active:bg-red-700 text-white flex items-center justify-center shadow-md transition shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>

        </div>

      </div>

    </header>
  );
}