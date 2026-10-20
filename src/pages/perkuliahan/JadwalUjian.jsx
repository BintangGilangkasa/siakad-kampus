import { useState } from 'react';
import {
  informasiJadwalUjian,
  jadwalUjianData,
} from '../../data/JadwalUjianData';

export default function JadwalUjian() {
  const [jenisUjian, setJenisUjian] = useState('UTS');

  const dataUjian = jadwalUjianData.filter(
    (item) => item.jenis === jenisUjian
  );

  const formatTanggal = (tanggal) => {
    if (!tanggal) return '-';

    return new Date(`${tanggal}T00:00:00`).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatWaktu = (item) => {
    if (!item.waktuMulai || !item.waktuSelesai) {
      return '-';
    }

    return `${item.waktuMulai} - ${item.waktuSelesai}`;
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header halaman */}
      <div>
        <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
          Jadwal Ujian
        </h1>

        <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
          Informasi jadwal Ujian Tengah Semester dan Ujian Akhir Semester.
        </p>
      </div>

      {/* Ringkasan Akademik */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {/* Tahun Akademik */}
        <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-2 shadow-sm sm:p-4">
          <p className="text-[10px] leading-tight text-gray-500 sm:text-sm">
            Tahun Akademik
          </p>

          <p className="mt-2 break-words text-[10px] font-semibold leading-tight text-gray-800 sm:text-sm">
            {informasiJadwalUjian.tahunAkademik ?? '2026/2027'}
          </p>
        </div>

        {/* Semester */}
        <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-2 shadow-sm sm:p-4">
          <p className="text-[10px] leading-tight text-gray-500 sm:text-sm">
            Semester
          </p>

          <p className="mt-2 break-words text-[10px] font-semibold leading-tight text-gray-800 sm:text-sm">
            {informasiJadwalUjian.periode ?? 'Ganjil'}
          </p>
        </div>

        {/* Semester Perkuliahan */}
        <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-2 shadow-sm sm:p-4">
          <p className="text-[10px] leading-tight text-gray-500 sm:text-sm">
            Semester Perkuliahan
          </p>

          <p className="mt-2 break-words text-[10px] font-semibold leading-tight text-gray-800 sm:text-sm">
            {informasiJadwalUjian.semester ?? 7}
          </p>
        </div>
      </div>

      {/* Daftar jadwal ujian */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Header dan pilihan UTS/UAS */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-5">
          <div>
            <h2 className="text-base font-semibold text-gray-800 sm:text-lg">
              Daftar Jadwal Ujian
            </h2>

            <p className="mt-1 text-[10px] text-gray-500 sm:text-sm">
              Daftar mata kuliah semester 7.
            </p>
          </div>

          {/* Tombol UTS dan UAS */}
          <div className="flex shrink-0 rounded-lg bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => setJenisUjian('UTS')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition sm:px-4 sm:py-2 sm:text-sm ${
                jenisUjian === 'UTS'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              UTS
            </button>

            <button
              type="button"
              onClick={() => setJenisUjian('UAS')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition sm:px-4 sm:py-2 sm:text-sm ${
                jenisUjian === 'UAS'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              UAS
            </button>
          </div>
        </div>

        {/* Tabel jadwal */}
        {dataUjian.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left text-xs sm:min-w-[1000px] sm:text-sm">
              <thead>
                <tr className="border-y border-gray-200 bg-gray-50 text-gray-600">
                  <th className="whitespace-nowrap px-2 py-2.5 font-semibold sm:px-4 sm:py-3">
                    No.
                  </th>

                  <th className="px-2 py-2.5 font-semibold sm:px-4 sm:py-3">
                    Mata Kuliah
                  </th>

                  <th className="whitespace-nowrap px-2 py-2.5 font-semibold sm:px-4 sm:py-3">
                    Waktu
                  </th>

                  <th className="px-2 py-2.5 font-semibold sm:px-4 sm:py-3">
                    Dosen
                  </th>

                  <th className="px-2 py-2.5 font-semibold sm:px-4 sm:py-3">
                    Kelas
                  </th>

                  <th className="px-2 py-2.5 font-semibold sm:px-4 sm:py-3">
                    Kursi
                  </th>

                  <th className="px-2 py-2.5 font-semibold sm:px-4 sm:py-3">
                    Ruang
                  </th>
                </tr>
              </thead>

              <tbody>
                {dataUjian.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 transition hover:bg-gray-50"
                  >
                    {/* Nomor */}
                    <td className="whitespace-nowrap px-2 py-3 text-gray-600 sm:px-4 sm:py-4">
                      {index + 1}
                    </td>

                    {/* Mata Kuliah */}
                    <td className="min-w-[160px] px-2 py-3 sm:min-w-[220px] sm:px-4 sm:py-4">
                      <p className="text-xs font-medium leading-snug text-gray-800 sm:text-sm">
                        {item.mataKuliah}
                      </p>

                      <p className="mt-1 text-[10px] leading-tight text-gray-500 sm:text-xs">
                        {item.kode} · {item.sks} SKS
                      </p>
                    </td>

                    {/* Waktu */}
                    <td className="whitespace-nowrap px-2 py-3 text-[10px] text-gray-600 sm:px-4 sm:py-4 sm:text-sm">
                      <p>{formatTanggal(item.tanggal)}</p>

                      <p className="mt-1">
                        {formatWaktu(item)}
                      </p>
                    </td>

                    {/* Dosen */}
                    <td className="min-w-[120px] px-2 py-3 text-xs text-gray-600 sm:px-4 sm:py-4 sm:text-sm">
                      {item.dosen}
                    </td>

                    {/* Kelas */}
                    <td className="whitespace-nowrap px-2 py-3 text-xs text-gray-600 sm:px-4 sm:py-4 sm:text-sm">
                      {item.kelas}
                    </td>

                    {/* Kursi */}
                    <td className="whitespace-nowrap px-2 py-3 text-xs text-gray-600 sm:px-4 sm:py-4 sm:text-sm">
                      {item.kursi || '-'}
                    </td>

                    {/* Ruang */}
                    <td className="whitespace-nowrap px-2 py-3 text-xs text-gray-600 sm:px-4 sm:py-4 sm:text-sm">
                      {item.ruang || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Jadwal belum tersedia */
          <div className="border-t border-gray-100 px-4 py-10 text-center sm:px-6 sm:py-12">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.7}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                />
              </svg>
            </div>

            <h3 className="text-sm font-semibold text-gray-800 sm:text-base">
              Jadwal {jenisUjian} belum tersedia
            </h3>

            <p className="mt-2 text-xs text-gray-500 sm:text-sm">
              Informasi jadwal akan ditampilkan setelah data ujian ditambahkan.
            </p>
          </div>
        )}
      </div>

      {/* Catatan */}
      <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 sm:p-4">
        <p className="text-xs leading-relaxed text-blue-800 sm:text-sm">
          <span className="font-semibold">Catatan:</span>{' '}
          Jadwal tanggal, waktu, ruang, dan nomor kursi perlu disesuaikan
          dengan informasi resmi dari kampus.
        </p>
      </div>
    </div>
  );
}