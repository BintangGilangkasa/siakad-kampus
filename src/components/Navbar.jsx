import React, { useState, useRef, useEffect } from 'react';
import { announcements } from '../data/announcements';
import { messagesData } from '../data/messagesData';
import logoUin from '../assets/logo-uin.png';
import {
  Search,
  Mail,
  Bell,
  LogOut,
  Menu,
  CheckCheck,
  MessageSquare,
  Tag,
  Calendar,
  ExternalLink,
  X
} from 'lucide-react';

export default function Navbar({ onLogout, onToggleSidebar, setActiveTab }) {
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // State Pesan dari messagesData.js
  const [messages, setMessages] = useState(messagesData || []);

  // State Notifikasi dari announcements.js
  const [notifs, setNotifs] = useState(() => {
    return (announcements || []).map((item, idx) => ({
      ...item,
      unread: idx < 3
    }));
  });

  const msgRef = useRef(null);
  const notifRef = useRef(null);

  // Menutup dropdown jika klik di luar area
  useEffect(() => {
    function handleClickOutside(event) {
      if (msgRef.current && !msgRef.current.contains(event.target)) {
        setShowMessages(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadMsgCount = messages.filter((m) => m.unread).length;
  const unreadNotifCount = notifs.filter((n) => n.unread).length;

  const markAllMsgRead = () => {
    setMessages(messages.map((m) => ({ ...m, unread: false })));
  };

  const markAllNotifRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header className="bg-white border-b border-slate-200/90 shadow-xs sticky top-0 z-30 font-sans print:hidden w-full overflow-visible">

      {/* BAR NAVIGASI UTAMA (MENYATUKAN SIDEBAR & BRANDING) */}
      <div className="px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 w-full relative">

        {/* SISI KIRI: Tombol Toggle Sidebar & Logo SIAKAD */}
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={onToggleSidebar}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition shrink-0 lg:hidden"
            title="Buka / Tutup Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* TENGAH: Input Pencarian Desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Cari fitur, mata kuliah, atau informasi..."
              className="w-full pl-10 pr-4 py-2 rounded-full text-xs bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>
        </div>

        {/* SISI KANAN: Menu Aksi (Pesan, Notifikasi & Keluar) */}
        <div className="flex items-center space-x-1 sm:space-x-2 shrink-0 ml-auto">

          {/* Tombol Pencarian Mobile */}
          <button
            onClick={() => {
              setShowMobileSearch(!showMobileSearch);
              setShowMessages(false);
              setShowNotifications(false);
            }}
            className={`md:hidden p-1.5 rounded-xl transition ${showMobileSearch ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-100'
              }`}
            title="Cari"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Dropdown Pesan Masuk */}
          <div className="relative" ref={msgRef}>
            <button
              onClick={() => {
                setShowMessages(!showMessages);
                setShowNotifications(false);
                setShowMobileSearch(false);
              }}
              className={`p-1.5 sm:p-2 rounded-xl transition relative ${showMessages ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-100'
                }`}
              title="Pesan Akademik"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadMsgCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {unreadMsgCount}
                </span>
              )}
            </button>

            {showMessages && (
              <div className="absolute right-0 sm:-right-12 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-3 bg-slate-900 text-white flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-bold">Pesan & Catatan Dosen</span>
                  </div>
                  {unreadMsgCount > 0 && (
                    <button
                      onClick={markAllMsgRead}
                      className="text-[10px] text-sky-300 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <CheckCheck className="w-3 h-3" />
                      <span>Tandai dibaca</span>
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 text-xs hover:bg-slate-50 transition flex gap-3 ${msg.unread ? 'bg-blue-50/40' : ''
                        }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {msg.sender.charAt(0)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start gap-1">
                          <span className="font-bold text-slate-900 leading-tight block">
                            {msg.sender}
                          </span>
                          <span className="text-[9px] text-slate-400 shrink-0">{msg.time}</span>
                        </div>
                        <span className="text-[10px] text-blue-600 block font-medium">{msg.role}</span>
                        <p className="text-[11px] text-slate-600 leading-snug">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                  <button
                    onClick={() => {
                      setShowMessages(false);
                      if (setActiveTab) setActiveTab('helpdesk');
                    }}
                    className="text-xs text-blue-600 font-bold hover:underline"
                  >
                    Hubungi Layanan Helpdesk →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dropdown Notifikasi */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowMessages(false);
                setShowMobileSearch(false);
              }}
              className={`p-1.5 sm:p-2 rounded-xl transition relative ${showNotifications ? 'bg-amber-50 text-amber-600' : 'text-slate-600 hover:bg-slate-100'
                }`}
              title="Notifikasi Pengumuman Kampus"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadNotifCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-amber-500 text-slate-900 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 sm:-right-6 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-3 bg-slate-900 text-white flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold">Pengumuman Kampus ({notifs.length})</span>
                  </div>
                  {unreadNotifCount > 0 && (
                    <button
                      onClick={markAllNotifRead}
                      className="text-[10px] text-sky-300 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <CheckCheck className="w-3 h-3" />
                      <span>Tandai dibaca</span>
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifs.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setShowNotifications(false);
                        if (setActiveTab) setActiveTab('news-info');
                      }}
                      className={`p-3 text-xs hover:bg-slate-50 transition space-y-1.5 cursor-pointer ${item.unread ? 'bg-amber-50/40' : ''
                        }`}
                    >
                      <div className="flex justify-between items-center gap-2">
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold text-[9px] flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5" />
                          {item.category || 'Pengumuman'}
                        </span>
                        <span className="text-[9px] text-slate-400 flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5" />
                          {item.date}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-xs leading-snug line-clamp-2 hover:text-blue-600">
                        {item.title}
                      </h4>

                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {item.summary || item.content}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      if (setActiveTab) setActiveTab('news-info');
                    }}
                    className="text-xs text-amber-700 font-bold hover:underline flex items-center justify-center gap-1 mx-auto"
                  >
                    <span>Lihat Semua Pengumuman Kampus</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-slate-200 my-auto mx-0.5"></div>

          {/* Tombol Keluar */}
          <button
            onClick={onLogout}
            className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-900 hover:bg-red-600 text-white font-bold text-xs transition flex items-center gap-1.5 shrink-0"
          >
            <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>

      {/* Input Pencarian Expandable Khusus Layar Mobile */}
      {showMobileSearch && (
        <div className="md:hidden px-3 py-2 bg-slate-50 border-t border-slate-200 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="relative w-full flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                autoFocus
                placeholder="Cari fitur, mata kuliah, atau informasi..."
                className="w-full pl-9 pr-3 py-1.5 rounded-full text-xs bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            </div>
            <button
              onClick={() => setShowMobileSearch(false)}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 shrink-0"
              title="Tutup Pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}