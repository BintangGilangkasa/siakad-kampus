import React from 'react';
import { studentData } from '../../data/studentData';
import { CheckCircle2, FileCheck, ShieldCheck } from 'lucide-react';

export default function StatusRegistrasiPage() {
  return (
    <div className="space-y-5 max-w-7xl mx-auto font-sans text-slate-800 w-full min-w-0 px-2 sm:px-4 lg:px-0">
      
      {/* Header Info */}
      <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm space-y-1">
        <div className="flex items-center space-x-2">
          <FileCheck className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg sm:text-xl font-black text-slate-900">Status Registrasi Ulang Mahasiswa</h1>
        </div>
        <p className="text-xs text-slate-500">
          Verifikasi keaktifan akademik dan kelengkapan administrasi semester Ganjil 2026/2027.
        </p>
      </div>

      {/* Indicator Card */}
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold text-emerald-950">Registrasi Ulang Berhasil</p>
            <p className="text-[11px] text-emerald-700">Status perkuliahan Anda telah aktif dan tercatat pada sistem akademik pusat.</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
          AKTIF KULIAH
        </span>
      </div>

      {/* Grid Rincian Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        
        {/* Administrasi & PDDikti */}
        <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <h2 className="font-extrabold text-sm text-slate-800 border-b border-slate-100 pb-2">
            Administrasi & PDDikti
          </h2>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="text-slate-600 font-medium">Status Keuangan</span>
              <span className="font-bold text-emerald-600">Bebas Tanggungan</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="text-slate-600 font-medium">Verifikasi Berkas Dikti</span>
              <span className="font-bold text-emerald-600">Terverifikasi</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="text-slate-600 font-medium">Batas Maksimal Pengambilan</span>
              <span className="font-bold text-slate-800">24 SKS</span>
            </div>
          </div>
        </div>

        {/* Persetujuan DPA */}
        <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <h2 className="font-extrabold text-sm text-slate-800 border-b border-slate-100 pb-2">
            Validasi Pembimbing Akademik
          </h2>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="text-slate-600 font-medium">Dosen Pembimbing (DPA)</span>
              <span className="font-bold text-slate-800">{studentData?.dosenPA || 'Dr. Hendra Kusuma, M.Si.'}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="text-slate-600 font-medium">Persetujuan KRS DPA</span>
              <span className="font-bold text-emerald-600">Disetujui</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="text-slate-600 font-medium">Tanggal Validasi</span>
              <span className="font-mono text-slate-700">14 Oktober 2026</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}