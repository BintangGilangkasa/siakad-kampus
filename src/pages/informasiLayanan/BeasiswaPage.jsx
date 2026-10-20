import React, { useState } from 'react';
import { studentData } from '../../data/studentData';
import { beasiswaList } from '../../data/beasiswaList';
import { 
  GraduationCap, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Clock
} from 'lucide-react';

const BeasiswaPage = () => {
  const student = studentData;
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');

  const handleApply = (beasiswaTitle) => {
    alert(`Pendaftaran untuk "${beasiswaTitle}" berhasil diajukan! Cek status verifikasi secara berkala.`);
  };

  const filteredBeasiswa = (beasiswaList || []).filter((item) => {
    const matchesCategory = filterCategory === 'Semua' || item.category === filterCategory;
    const matchesSearch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.provider || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-sans">
      {/* HEADER HALAMAN */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Informasi & Layanan
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Tahun Akademik {student?.academicYear || '2026/2027'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <GraduationCap className="w-6 h-6 text-blue-600 shrink-0" />
            <span>Informasi Beasiswa Mahasiswa</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Temukan dan daftar program beasiswa internal kampus, pemerintah, maupun kemitraan swasta.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Semua">Semua Kategori</option>
            <option value="Pemerintah">Pemerintah</option>
            <option value="Internal">Internal Kampus</option>
            <option value="Mitra Swasta">Mitra Swasta</option>
          </select>

          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari beasiswa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* DAFTAR BEASISWA */}
      <div className="space-y-4">
        {filteredBeasiswa.length > 0 ? (
          filteredBeasiswa.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Status: {item.status}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                    {item.category}
                  </span>
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-900">{item.title}</h2>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Penyelenggara: {item.provider}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Cakupan Bantuan</span>
                    <strong className="text-blue-700 font-bold">{item.amount}</strong>
                  </div>
                  <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Batas Pendaftaran</span>
                    <strong className="text-rose-600 font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.deadline}
                    </strong>
                  </div>
                  <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Kuota Penerima</span>
                    <strong className="text-slate-800 font-semibold">{item.quota}</strong>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-700 block">Persyaratan Utama:</span>
                  <div className="flex flex-wrap gap-2">
                    {item.requirements.map((req, idx) => (
                      <span key={idx} className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <button
                  onClick={() => handleApply(item.title)}
                  className="w-full md:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Daftar Beasiswa</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-8 text-center rounded-2xl border border-slate-200 text-xs text-slate-500">
            Tidak ditemukan program beasiswa yang sesuai dengan kriteria pencarian.
          </div>
        )}
      </div>
    </div>
  );
};

export default BeasiswaPage;