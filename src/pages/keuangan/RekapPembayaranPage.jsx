import React from 'react';
import { studentData } from '../../data/studentData';
import { historyPayment } from '../../data/historyPayment';
import { FileSpreadsheet, Download, Printer } from 'lucide-react';

const RekapPembayaranPage = () => {
  const student = studentData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-6xl mx-auto pb-12 font-sans w-full min-w-0 overflow-x-hidden px-1 sm:px-0">
      
      {/* 1. HEADER HALAMAN */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Tahun Akademik {student?.academicYear || '2026/2027'}
            </span>
          </div>
          <h1 className="text-base sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 shrink-0" />
            <span>Rekap Pembayaran UKT</span>
          </h1>
          <p className="text-[11px] sm:text-sm text-slate-500 mt-0.5">
            Riwayat transaksi resmi pembayaran UKT dari semester ke semester.
          </p>
        </div>

        <button 
          onClick={handlePrint}
          className="w-full sm:w-auto px-4 py-2 border border-slate-300 hover:bg-slate-900 hover:text-white text-slate-700 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 shrink-0 shadow-sm print:hidden"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Rekap PDF</span>
        </button>
      </div>

      {/* 2. TABEL REKAP UKT (DILENGKAPI CONTAINER SCROLL RESPONSIP) */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-2.5 px-3 whitespace-nowrap">No. Transaksi</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Semester</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Tahun Akademik</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Nominal UKT</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Tanggal Lunas</th>
                <th className="py-2.5 px-3 text-center whitespace-nowrap">Status</th>
                <th className="py-2.5 px-3 text-center whitespace-nowrap">Bukti Bayar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {historyPayment && historyPayment.length > 0 ? (
                historyPayment.map((trx, idx) => (
                  <tr key={trx.noTransaksi || idx} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-3 font-mono text-slate-700 font-semibold whitespace-nowrap">
                      {trx.noTransaksi}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-800 whitespace-nowrap">
                      {trx.semester}
                    </td>
                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      {trx.period}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">
                      {trx.amount}
                    </td>
                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      {trx.date}
                    </td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[11px] font-bold">
                        {trx.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <button 
                        onClick={() => alert(`Mengunduh kwitansi transaksi ${trx.noTransaksi}...`)}
                        className="px-2.5 py-1 text-blue-600 hover:bg-blue-50 rounded-lg text-[11px] font-semibold transition flex items-center gap-1 mx-auto"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Kwitansi</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-slate-500">
                    Belum ada riwayat transaksi pembayaran.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default RekapPembayaranPage;