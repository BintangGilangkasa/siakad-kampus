import React, { useState } from 'react';
import { studentData } from '../../data/studentData';
import { 
  UserCheck, 
  UserCog, 
  User, 
  GraduationCap,
  Award, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  Save, 
  CreditCard,
  Building2,
} from 'lucide-react';

const StatusAkademikPage = ({ activeTab, setActiveTab }) => {
  const student = studentData;

  // Sub-tab switcher internal: 'status' atau 'update'
  const [activeSubTab, setActiveSubTab] = useState('status');

  // State Form Update Biodata
  const [biodataForm, setBiodataForm] = useState({
    nik: '3374021809020003',
    email: student?.email || 'bintang@student.uinsalatiga.ac.id',
    phone: student?.nohp || '081234567890',
    placeOfBirth: student?.tmptlahir || 'Salatiga',
    dateOfBirth: student?.tgllahir || '2003-08-18',
    address: student?.alamatlengkap || 'Salatiga, Jawa Tengah',
  });

  const handleSaveBiodata = (e) => {
    e.preventDefault();
    alert('Data biodata berhasil diperbarui ke sistem!');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-sans">
      
      {/* 1. HEADER & NAVBAR SLIDE (SUB-TAB SWITCHER) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            {activeSubTab === 'status' ? (
              <>
                <UserCheck className="w-6 h-6 text-blue-600 shrink-0" />
                <span>Status & Informasi Akademik</span>
              </>
            ) : (
              <>
                <UserCog className="w-6 h-6 text-blue-600 shrink-0" />
                <span>Update Biodata Mahasiswa</span>
              </>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {activeSubTab === 'status'
              ? 'Ringkasan data keaktifan perkuliahan dan informasi dosen penasihat akademik.'
              : 'Perbarui data kontak dan identitas diri untuk kelengkapan administrasi kampus.'}
          </p>
        </div>

        {/* NAVBAR SLIDE SWITCHER */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-full md:w-auto shrink-0">
          <button
            onClick={() => setActiveSubTab('status')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeSubTab === 'status'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Status Akademik</span>
          </button>
          
          <button
            onClick={() => setActiveSubTab('update')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeSubTab === 'update'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCog className="w-4 h-4" />
            <span>Update Biodata</span>
          </button>
        </div>
      </div>

      {/* 2. TAMPILAN 1: STATUS AKADEMIK */}
      {activeSubTab === 'status' && (
        <div className="space-y-6">
          {/* BANNER RINGKASAN UTAMA STATUS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-100 gap-3">

              <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Status: {student?.statusAkademik || 'Aktif Kuliah'}</span>
              </span>
            </div>

            {/* GRID STATUS AKADEMIK LENGKAP */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              
              {/* Nama */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 block text-[10px] font-medium uppercase tracking-wider">
                  Nama Mahasiswa
                </span>
                <span className="font-bold text-slate-900 text-sm block">
                  {student?.name || 'Bintang Gilangkasa Syailendra'}
                </span>
              </div>

              {/* NIM */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 block text-[10px] font-medium uppercase tracking-wider">
                  NIM (Nomor Induk Mahasiswa)
                </span>
                <span className="font-mono font-bold text-slate-900 text-sm block">
                  {student?.nim || '2301019082'}
                </span>
              </div>

              {/* Semester */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 block text-[10px] font-medium uppercase tracking-wider">
                  Semester Perkuliahan
                </span>
                <span className="font-bold text-blue-700 text-sm block">
                  Semester {student?.semester || 7} ({student?.academicYear || '2026/2027'})
                </span>
              </div>

              {/* Angkatan */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 block text-[10px] font-medium uppercase tracking-wider">
                  Tahun Angkatan
                </span>
                <span className="font-bold text-slate-900 text-sm block">
                  {student?.angkatan || '2023'}
                </span>
              </div>

              {/* Jurusan / Prodi */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 block text-[10px] font-medium uppercase tracking-wider">
                  Program Studi / Jurusan
                </span>
                <span className="font-bold text-slate-900 text-sm block">
                  {student?.prodi || 'S1 - Sains Data'}
                </span>
              </div>

              {/* Dosen PA */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 block text-[10px] font-medium uppercase tracking-wider">
                  Dosen Pembimbing Akademik (PA)
                </span>
                <span className="font-bold text-slate-900 text-sm block">
                  {student?.dosenPA || 'Prof. Eko Prasetyo, Ph.D.'}
                </span>
              </div>

            </div>
          </div>

          {/* DETAIL TAMBAHAN FAKULTAS & CAPAIAN */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Fakultas</span>
                <Building2 className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-base font-extrabold text-slate-900">{student?.fakultas || 'Sains dan Teknologi'}</p>
              <p className="text-[11px] text-slate-500">UIN Salatiga</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">IPK Kumulatif</span>
                <Award className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900">{student?.ipk || '3.82'}</p>
              <p className="text-[11px] text-emerald-600 font-semibold">Skala Maksimal 4.00</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Total SKS Tempuh</span>
                <GraduationCap className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900">{student?.totalSksLulus || 118} SKS</p>
              <p className="text-[11px] text-slate-500">Lulus Evaluasi Akademik</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAMPILAN 2: UPDATE BIODATA */}
      {activeSubTab === 'update' && (
        <form onSubmit={handleSaveBiodata} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              Formulir Perubahan Data Diri
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Field nama dan NIM dikunci oleh sistem PDDikti, silakan perbarui data kontak dan tempat tinggal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nama (Disabled) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Nama Lengkap</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  disabled
                  value={student?.name || 'Bintang Gilangkasa Syailendra'}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 cursor-not-allowed"
                />
              </div>
            </div>

            {/* NIM (Disabled) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">NIM (Nomor Induk Mahasiswa)</label>
              <div className="relative">
                <CreditCard className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  disabled
                  value={student?.nim || '2301019082'}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 bg-slate-50 rounded-xl text-xs font-mono font-bold text-slate-600 cursor-not-allowed"
                />
              </div>
            </div>

            {/* NIK */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">NIK (Nomor Induk Kependudukan)</label>
              <input
                type="text"
                value={biodataForm.nik}
                onChange={(e) => setBiodataForm({ ...biodataForm, nik: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Email Student */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Email Student Kampus</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  value={biodataForm.email}
                  onChange={(e) => setBiodataForm({ ...biodataForm, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* No. HP / WhatsApp */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Nomor Telepon / WhatsApp</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={biodataForm.phone}
                  onChange={(e) => setBiodataForm({ ...biodataForm, phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Tempat & Tanggal Lahir */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Tempat & Tanggal Lahir</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={biodataForm.placeOfBirth}
                  onChange={(e) => setBiodataForm({ ...biodataForm, placeOfBirth: e.target.value })}
                  className="w-1/2 px-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                  type="date"
                  value={biodataForm.dateOfBirth}
                  onChange={(e) => setBiodataForm({ ...biodataForm, dateOfBirth: e.target.value })}
                  className="w-1/2 px-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Alamat Domisili */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Alamat Tempat Tinggal Saat Ini</label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <textarea
                rows="3"
                value={biodataForm.address}
                onChange={(e) => setBiodataForm({ ...biodataForm, address: e.target.value })}
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>
          </div>

          {/* Tombol Simpan */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Biodata</span>
            </button>
          </div>
        </form>
      )}

    </div>
  );
};

export default StatusAkademikPage;