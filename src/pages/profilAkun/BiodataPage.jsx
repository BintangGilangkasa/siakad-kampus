import React from 'react';
import { studentData } from '../../data/studentData';
import {
  User,
  FileText,
  Printer,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';

export default function BiodataPage({ setActiveTab}) {
  const handlePrint = () => {
    if (setActiveTab) {
      setActiveTab('cetak-biodata')
    } else {
      window.print();
    }
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto font-sans text-slate-800 w-full min-w-0 px-2 sm:px-4 lg:px-0">
      
      {/* Header & Action Button Cetak */}
      <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-blue-600" />
            <h1 className="text-lg sm:text-l font-black text-slate-900">Biodata Mahasiswa & Data Dikti</h1>
          </div>
          <p className="text-xs text-slate-500">
            Data identitas diri resmi yang terintegrasi dengan Pangkalan Data Pendidikan Tinggi (PDDikti).
          </p>
        </div>

        {/* Tombol Cetak / Export PDF */}
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-2 shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Biodata (PDF)</span>
        </button>
      </div>

      {/* Banner Status PDDikti */}
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold text-emerald-950">Status Data PDDikti: Terverifikasi & Valid</p>
            <p className="text-[11px] text-emerald-700">Terakhir disinkronisasi dengan pelaporan kementerian semester ganjil.</p>
          </div>
        </div>
      </div>

      {/* Grid Informasi Biodata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        
        {/* Card 1: Data Identitas Pribadi */}
        <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <FileText className="w-4 h-4 text-blue-600" />
            <h2 className="font-extrabold text-sm text-slate-800">Identitas Pribadi</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-medium">Nama Lengkap</span>
              <span className="col-span-2 font-bold text-slate-800">{studentData?.name || 'Bintang Gilangkasa Syailendra'}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-medium">NIM</span>
              <span className="col-span-2 font-mono font-bold text-slate-800">{studentData?.nim || '2301019082'}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-medium">NIK / No. KTP</span>
              <span className="col-span-2 font-mono text-slate-700">3518012004030002</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-medium">Tempat, Tgl Lahir</span>
              <span className="col-span-2 text-slate-700">{studentData.tmptlahir}, {studentData.tgllahir}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-medium">Jenis Kelamin</span>
              <span className="col-span-2 text-slate-700">{studentData.jeniskelamin}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-medium">Agama</span>
              <span className="col-span-2 text-slate-700">{studentData.agama}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-medium">Alamat Rumah</span>
              <span className="col-span-2 text-slate-700">{studentData.alamatlengkap}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-medium">No. HP / Whatsapp</span>
              <span className="col-span-2 text-slate-700">{studentData.nohp}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-medium">Email Student</span>
              <span className="col-span-2 text-slate-700">{studentData.email}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Data Akademik & Perguruan Tinggi */}
        <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <h2 className="font-extrabold text-sm text-slate-800">Data Akademik & Kampus</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-medium">Perguruan Tinggi</span>
              <span className="col-span-2 font-bold text-slate-800">Universitas Islam Negeri Salatiga</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-medium">Fakultas</span>
              <span className="col-span-2 text-slate-700">{studentData?.fakultas || 'Sains dan Teknologi'}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-medium">Program Studi</span>
              <span className="col-span-2 font-bold text-slate-800">{studentData?.prodi || 'S1 - Sains Data'}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-medium">Semester</span>
              <span className="col-span-2 text-slate-700">{studentData?.semester || 'semester'}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-medium">Angkatan</span>
              <span className="col-span-2 text-slate-700">{studentData?.angkatan || '****'}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-medium">Status Mahasiswa</span>
              <span className="col-span-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {studentData?.statusAkademik || 'Aktif Kuliah'}
                </span>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-medium">Dosen Pembimbing Akademik</span>
              <span className="col-span-2 font-bold text-slate-700">{studentData?.dosenPA || '-'}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}