import React, { useState } from 'react';

import {
  daftarSemester,
  dataKehadiran,
} from '../../data/PerkuliahanData';

export default function InformasiKehadiran() {
  // Semester 7 dipilih secara default
  const [semester, setSemester] = useState('Semester 7');

  // Filter data berdasarkan semester yang dipilih
  const dataSemester = dataKehadiran.filter(
    (item) => item.semester === semester
  );

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Judul halaman */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
          Informasi Kehadiran
        </h1>

        <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
          Informasi rekapitulasi kehadiran perkuliahan mahasiswa.
        </p>
      </div>

      {/* Filter semester */}
      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
        <label
          htmlFor="semester"
          className="mb-2 block text-xs font-medium text-slate-700 sm:text-sm"
        >
          Pilih Semester
        </label>

        <select
          id="semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:max-w-xs sm:px-4 sm:py-3 sm:text-sm"
        >
          {daftarSemester.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Tabel kehadiran */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header tabel */}
        <div className="border-b border-slate-200 px-3 py-3 sm:px-5 sm:py-4">
          <h2 className="text-sm font-semibold text-slate-800 sm:text-base">
            Rekap Kehadiran
          </h2>

          <p className="mt-1 text-[10px] text-slate-500 sm:text-sm">
            {semester} · {dataSemester.length} mata kuliah
          </p>
        </div>

        {/* Tabel responsif */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-xs sm:min-w-[650px] sm:text-sm">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500 sm:text-xs">
              <tr>
                <th className="whitespace-nowrap px-2 py-3 font-semibold sm:px-5 sm:py-4">
                  No.
                </th>

                <th className="whitespace-nowrap px-2 py-3 font-semibold sm:px-5 sm:py-4">
                  Kode
                </th>

                <th className="px-2 py-3 font-semibold sm:px-5 sm:py-4">
                  Mata Kuliah
                </th>

                <th className="whitespace-nowrap px-2 py-3 text-center font-semibold sm:px-5 sm:py-4">
                  SKS
                </th>

                <th className="whitespace-nowrap px-2 py-3 text-center font-semibold sm:px-5 sm:py-4">
                  Kehadiran
                </th>

                <th className="whitespace-nowrap px-2 py-3 text-center font-semibold sm:px-5 sm:py-4">
                  Persentase
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {dataSemester.length > 0 ? (
                dataSemester.map((item, index) => {
                  const persentase =
                    item.total > 0
                      ? Math.round(
                          (item.hadir / item.total) * 100
                        )
                      : 0;

                  return (
                    <tr
                      key={item.kode}
                      className="transition hover:bg-slate-50"
                    >
                      {/* Nomor */}
                      <td className="whitespace-nowrap px-2 py-3 text-slate-500 sm:px-5 sm:py-4">
                        {index + 1}
                      </td>

                      {/* Kode mata kuliah */}
                      <td className="whitespace-nowrap px-2 py-3 font-medium text-slate-700 sm:px-5 sm:py-4">
                        {item.kode}
                      </td>

                      {/* Nama mata kuliah */}
                      <td className="min-w-[150px] px-2 py-3 sm:min-w-[200px] sm:px-5 sm:py-4">
                        <p className="text-xs font-medium leading-snug text-slate-800 sm:text-sm">
                          {item.mataKuliah}
                        </p>
                      </td>

                      {/* SKS */}
                      <td className="whitespace-nowrap px-2 py-3 text-center text-slate-600 sm:px-5 sm:py-4">
                        {item.sks}
                      </td>

                      {/* Jumlah kehadiran */}
                      <td className="whitespace-nowrap px-2 py-3 text-center text-[10px] text-slate-600 sm:px-5 sm:py-4 sm:text-sm">
                        {item.hadir}/{item.total} pertemuan
                      </td>

                      {/* Persentase */}
                      <td className="whitespace-nowrap px-2 py-3 text-center sm:px-5 sm:py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold sm:px-3 sm:text-xs ${
                            persentase >= 80
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {persentase}%
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 py-8 text-center text-xs text-slate-500 sm:px-5 sm:py-10 sm:text-sm"
                  >
                    Belum ada data kehadiran untuk {semester}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Catatan */}
        <div className="border-t border-slate-200 px-3 py-3 text-[10px] leading-relaxed text-slate-500 sm:px-5 sm:text-xs">
          Catatan: data kehadiran merupakan data dummy untuk pengujian
          antarmuka dan filter semester.
        </div>
      </div>
    </div>
  );
}