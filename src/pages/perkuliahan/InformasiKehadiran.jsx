
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
    <div className="space-y-6">
      {/* Judul halaman */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Informasi Kehadiran
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Informasi rekapitulasi kehadiran perkuliahan mahasiswa.
        </p>
      </div>

      {/* Filter semester */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <label
          htmlFor="semester"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Pilih Semester
        </label>

        <select
          id="semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:max-w-xs"
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
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-800">
            Rekap Kehadiran
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {semester} · {dataSemester.length} mata kuliah
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4 font-semibold">
                  No.
                </th>

                <th className="px-5 py-4 font-semibold">
                  Kode
                </th>

                <th className="px-5 py-4 font-semibold">
                  Mata Kuliah
                </th>

                <th className="px-5 py-4 text-center font-semibold">
                  SKS
                </th>

                <th className="px-5 py-4 text-center font-semibold">
                  Kehadiran
                </th>

                <th className="px-5 py-4 text-center font-semibold">
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
                      <td className="px-5 py-4 text-slate-500">
                        {index + 1}
                      </td>

                      <td className="px-5 py-4 font-medium text-slate-700">
                        {item.kode}
                      </td>

                      <td className="px-5 py-4 font-medium text-slate-800">
                        {item.mataKuliah}
                      </td>

                      <td className="px-5 py-4 text-center text-slate-600">
                        {item.sks}
                      </td>

                      <td className="px-5 py-4 text-center text-slate-600">
                        {item.hadir}/{item.total} pertemuan
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
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
                    className="px-5 py-10 text-center text-slate-500"
                  >
                    Belum ada data kehadiran untuk {semester}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-200 px-5 py-3 text-xs text-slate-500">
          Catatan: data kehadiran merupakan data dummy untuk pengujian
          antarmuka dan filter semester.
        </div>
      </div>
    </div>
  );
}
