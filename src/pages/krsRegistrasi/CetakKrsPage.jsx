import React from 'react';
import { studentData } from '../../data/studentData';
import { availableCourses } from '../../data/krsData';
import { Printer, FileText } from 'lucide-react';

export default function CetakKrsPage() {
  const approvedCourses = availableCourses.slice(0, 4);
  const totalSks = approvedCourses.reduce((sum, c) => sum + c.sks, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto font-sans text-slate-800 w-full min-w-0 px-2 sm:px-4 lg:px-0">
      
      {/* Header & Button Cetak */}
      <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h1 className="text-lg sm:text-xl font-black text-slate-900">Kartu Rencana Studi (KRS)</h1>
          </div>
          <p className="text-xs text-slate-500">
            Daftar mata kuliah resmi yang diambil pada semester Ganjil 2026/2027.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-2 shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak KRS (PDF)</span>
        </button>
      </div>

      {/* Tabel Rincian KRS */}
      <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs border-b border-slate-100 pb-4">
          <div>
            <p className="text-slate-400">Nama Mahasiswa</p>
            <p className="font-bold text-slate-900">{studentData?.name || 'Bintang Syailendra'}</p>
          </div>
          <div>
            <p className="text-slate-400">NIM</p>
            <p className="font-mono font-bold text-slate-900">{studentData?.nim || '2301019082'}</p>
          </div>
          <div>
            <p className="text-slate-400">Program Studi</p>
            <p className="font-bold text-slate-900">{studentData?.prodi || 'S1 - Sains Data'}</p>
          </div>
          <div>
            <p className="text-slate-400">Dosen Pembimbing Akademik</p>
            <p className="font-bold text-slate-900">{studentData?.dosenPA || 'Dr. Hendra Kusuma, M.Si.'}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th className="p-3">No</th>
                <th className="p-3">Kode</th>
                <th className="p-3">Mata Kuliah</th>
                <th className="p-3 text-center">Kelas</th>
                <th className="p-3 text-center">SKS</th>
                <th className="p-3">Jadwal & Ruang</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {approvedCourses.map((c, idx) => (
                <tr key={c.id} className="hover:bg-slate-50/50">
                  <td className="p-3 text-slate-500">{idx + 1}</td>
                  <td className="p-3 font-mono font-bold text-slate-700">{c.code}</td>
                  <td className="p-3 font-bold text-slate-800">{c.name}</td>
                  <td className="p-3 text-center font-bold text-blue-600">{c.class}</td>
                  <td className="p-3 text-center font-bold">{c.sks}</td>
                  <td className="p-3 text-slate-600 text-[11px]">
                    {c.schedule} ({c.room})
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 font-bold border-t border-slate-200 text-slate-800">
                <td colSpan={4} className="p-3 text-right">Total SKS Diambil:</td>
                <td className="p-3 text-center text-blue-600">{totalSks} SKS</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

      </div>

    </div>
  );
}