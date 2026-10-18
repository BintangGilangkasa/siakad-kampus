import React from 'react';
import { studentData } from '../../data/studentData';
import { historyPayment } from '../../data/historyPayment';
import { FileSpreadsheet, Download } from 'lucide-react';

const RekapPembayaranPage = () => {
  const student = studentData;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-sans">
      {/* HEADER HALAMAN */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Modul Keuangan
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Tahun Akademik {student?.academicYear || '2026/2027'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <FileSpreadsheet className="w-6 h-6 text-blue-600" />
            <span>Rekap Pembayaran</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Riwayat transaksi resmi pembayaran UKT dari semester ke semester.
          </p>
        </div>

        <button className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5">
          <Download className="w-4 h-4" />
          <span>Cetak Rekap PDF</span>
        </button>
      </div>

      {/* TABEL REKAP */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-3 px-3">No. Transaksi</th>
                <th className="py-3 px-3">Semester</th>
                <th className="py-3 px-3">Tahun Akademik</th>
                <th className="py-3 px-3">Nominal UKT</th>
                <th className="py-3 px-3">Tanggal Lunas</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-center">Bukti Bayar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {historyPayment && historyPayment.length > 0 ? (
                historyPayment.map((trx, idx) => (
                  <tr key={trx.noTransaksi || idx} className="hover:bg-slate-50/80">
                    <td className="py-3 px-3 font-mono text-slate-700 font-semibold">
                      {trx.noTransaksi}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-800">
                      {trx.semester}
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {trx.period}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      {trx.amount}
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {trx.date}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[11px] font-bold">
                        {trx.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button className="px-2.5 py-1 text-blue-600 hover:bg-blue-50 rounded-lg text-[11px] font-semibold transition flex items-center gap-1 mx-auto">
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