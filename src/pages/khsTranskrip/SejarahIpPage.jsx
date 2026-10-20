import { useMemo, useState } from 'react';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

// ==========================================
// DATA SEJARAH IP (SIMULASI)
// ==========================================

const dataSejarahIP = [
  {
    tahunAjaran: '2023/2024',
    semester: 'Ganjil',
    nomorSemester: 1,
    sks: 22,
    ip: 3.80,
  },
  {
    tahunAjaran: '2023/2024',
    semester: 'Genap',
    nomorSemester: 2,
    sks: 20,
    ip: 3.80,
  },
  {
    tahunAjaran: '2024/2025',
    semester: 'Ganjil',
    nomorSemester: 3,
    sks: 20,
    ip: 3.90,
  },
  {
    tahunAjaran: '2024/2025',
    semester: 'Genap',
    nomorSemester: 4,
    sks: 19,
    ip: 3.90,
  },
  {
    tahunAjaran: '2025/2026',
    semester: 'Ganjil',
    nomorSemester: 5,
    sks: 19,
    ip: 3.90,
  },
  {
    tahunAjaran: '2025/2026',
    semester: 'Genap',
    nomorSemester: 6,
    sks: 20,
    ip: 3.99,
  },
];

// ==========================================
// FORMAT ANGKA
// ==========================================

const formatAngka = (angka) =>
  angka.toLocaleString('id-ID', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// ==========================================
// HITUNG RIWAYAT IP
// ==========================================

const hitungRiwayat = () => {
  let totalSks = 0;
  let totalNxSks = 0;

  return dataSejarahIP.map((item) => {
    const nxSks = item.sks * item.ip;

    totalSks += item.sks;
    totalNxSks += nxSks;

    const ipKumulatif = totalNxSks / totalSks;

    return {
      ...item,
      nxSks,
      sksKumulatif: totalSks,
      nxSksKumulatif: totalNxSks,
      ipKumulatif,
    };
  });
};

// ==========================================
// KOMPONEN IKON
// ==========================================

const Ikon = ({ nama, ukuran = 20 }) => {
  const properti = {
    width: ukuran,
    height: ukuran,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  const gambar = {
    chart: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 14 4-4 4 3 5-7" />
      </>
    ),

    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </>
    ),

    graduation: (
      <>
        <path d="m2 10 10-5 10 5-10 5-10-5Z" />
        <path d="M6 12v5c4 3 8 3 12 0v-5" />
        <path d="M22 10v6" />
      </>
    ),

    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 11h18" />
      </>
    ),

    info: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </>
    ),
  };

  return <svg {...properti}>{gambar[nama]}</svg>;
};

// ==========================================
// KARTU STATISTIK
// ==========================================

const KartuStatistik = ({
  judul,
  nilai,
  keterangan,
  ikon,
  warna,
}) => (
  <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 lg:p-5">
    <div className="flex items-start justify-between gap-2 sm:gap-3">
      <div className="min-w-0">
        <p className="text-xs font-medium leading-5 text-slate-500 sm:text-sm">
          {judul}
        </p>

        <p className="mt-1.5 break-words text-2xl font-bold tracking-tight text-slate-900 sm:mt-2 sm:text-3xl">
          {nilai}
        </p>

        <p className="mt-1.5 text-[11px] leading-4 text-slate-500 sm:mt-2 sm:text-xs">
          {keterangan}
        </p>
      </div>

      <div
        className={`shrink-0 rounded-lg p-2 sm:rounded-xl sm:p-3 ${warna}`}
      >
        <Ikon nama={ikon} ukuran={18} />
      </div>
    </div>
  </div>
);

// ==========================================
// HALAMAN SEJARAH IP
// ==========================================

export default function SejarahIpPage() {
  const [filterTahun, setFilterTahun] = useState('Semua');

  const riwayat = useMemo(() => hitungRiwayat(), []);

  const daftarTahun = [
    ...new Set(dataSejarahIP.map((item) => item.tahunAjaran)),
  ];

  const riwayatTampil = riwayat.filter(
    (item) =>
      filterTahun === 'Semua' ||
      item.tahunAjaran === filterTahun
  );

  const terakhir = riwayat[riwayat.length - 1];

  // ==========================================
  // TAMPILAN
  // ==========================================

  return (
    <div className="min-h-screen space-y-4 bg-slate-50 p-3 sm:space-y-6 sm:p-4 md:p-7">

      {/* HEADER */}
      <header className="flex flex-col justify-between gap-3 sm:gap-4 lg:flex-row lg:items-center">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 sm:gap-2 sm:text-sm">
            <span>Akademik</span>
            <span>/</span>
            <span className="font-medium text-blue-700">
              Sejarah IP
            </span>
          </div>

          <h1 className="mt-2 text-xl font-bold leading-tight tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
            Sejarah Indeks Prestasi
          </h1>

          <p className="mt-1.5 text-xs leading-relaxed text-slate-500 sm:mt-2 sm:text-sm">
            Riwayat hasil studi dan perkembangan IP setiap semester.
          </p>
        </div>

      </header>

      {/* PEMBERITAHUAN DATA */}
      <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900 sm:gap-3 sm:p-4 sm:text-sm">
        <div className="shrink-0 pt-0.5">
          <Ikon nama="info" ukuran={18} />
        </div>

        <div className="min-w-0">
          <p className="font-semibold">
            Data simulasi akademik
          </p>

          <p className="mt-1">
            Data semester dan perhitungan pada halaman ini merupakan
            contoh untuk pengembangan antarmuka. Nilai belum berasal
            dari basis data akademik resmi.
          </p>
        </div>
      </div>

      {/* STATISTIK */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <KartuStatistik
          judul="IPK Kumulatif"
          nilai={formatAngka(terakhir.ipKumulatif)}
          keterangan="Sampai semester 6"
          ikon="graduation"
          warna="bg-blue-50 text-blue-700"
        />

        <KartuStatistik
          judul="IP Semester Terakhir"
          nilai={formatAngka(terakhir.ip)}
          keterangan="Semester 6 · Genap"
          ikon="chart"
          warna="bg-emerald-50 text-emerald-700"
        />

        <KartuStatistik
          judul="Total SKS"
          nilai={terakhir.sksKumulatif}
          keterangan="SKS kumulatif simulasi"
          ikon="book"
          warna="bg-violet-50 text-violet-700"
        />

        <KartuStatistik
          judul="Semester Tercatat"
          nilai={riwayat.length}
          keterangan="Semester 1 sampai 6"
          ikon="calendar"
          warna="bg-orange-50 text-orange-700"
        />
      </div>

      {/* GRAFIK GARIS PERKEMBANGAN IP */}
      <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5 md:p-6">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-base font-bold leading-snug text-slate-900 sm:text-lg">
            Perkembangan IP Semester
          </h2>

          <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
            Perbandingan IP dari semester 1 hingga semester 6.
          </p>
        </div>

        {/* Grafik responsif */}
        <div className="h-56 w-full min-w-0 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={riwayat}
              margin={{
                top: 10,
                right: 8,
                left: -18,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="nomorSemester"
                tickFormatter={(value) => `Sem. ${value}`}
                tick={{
                  fontSize: 10,
                  fill: '#64748b',
                }}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                interval={0}
              />

              <YAxis
                domain={[0, 4]}
                ticks={[0, 1, 2, 3, 4]}
                tick={{
                  fontSize: 10,
                  fill: '#64748b',
                }}
                axisLine={false}
                tickLine={false}
                width={32}
              />

              <Tooltip
                labelFormatter={(value) => `Semester ${value}`}
                formatter={(value) => [
                  formatAngka(Number(value)),
                  'IP Semester',
                ]}
                contentStyle={{
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontSize: '12px',
                  padding: '8px 10px',
                }}
              />

              <Line
                type="monotone"
                dataKey="ip"
                name="IP Semester"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={{
                  r: 4,
                  fill: '#2563eb',
                  stroke: '#ffffff',
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: '#059669',
                  stroke: '#ffffff',
                  strokeWidth: 2,
                }}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* RINGKASAN GRAFIK */}
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 sm:mt-5 sm:gap-4">
          <div className="min-w-0">
            <p className="text-[11px] leading-relaxed text-slate-500 sm:text-xs">
              IP semester terakhir
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
              {formatAngka(terakhir.ip)}
            </p>
          </div>

          <div className="min-w-0 text-right">
            <p className="text-[11px] leading-relaxed text-slate-500 sm:text-xs">
              Semester tercatat
            </p>

            <p className="mt-1 text-lg font-bold text-blue-700 sm:text-xl">
              {riwayat.length} Semester
            </p>
          </div>
        </div>
      </section>

      {/* TABEL RIWAYAT */}
      <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-3 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              Riwayat IP per Semester
            </h2>

            <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
              Rincian indeks prestasi semester dan kumulatif.
            </p>
          </div>

          <select
            value={filterTahun}
            onChange={(event) => setFilterTahun(event.target.value)}
            className="w-full min-w-0 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:text-sm lg:w-auto lg:min-w-[210px]"
            aria-label="Filter tahun ajaran"
          >
            <option value="Semua">Semua Tahun Ajaran</option>

            {daftarTahun.map((tahun) => (
              <option key={tahun} value={tahun}>
                {tahun}
              </option>
            ))}
          </select>
        </div>

        {/* Tabel bisa digeser secara horizontal di HP */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left text-xs sm:min-w-[1050px] sm:text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-600">
                <th
                  rowSpan={2}
                  className="whitespace-nowrap border-b border-slate-200 px-3 py-3 font-semibold sm:px-4"
                >
                  Tahun Ajaran
                </th>

                <th
                  rowSpan={2}
                  className="whitespace-nowrap border-b border-slate-200 px-3 py-3 font-semibold sm:px-4"
                >
                  Semester
                </th>

                <th
                  colSpan={3}
                  className="whitespace-nowrap border-b border-l border-slate-200 px-3 py-3 text-center font-semibold sm:px-4"
                >
                  IP Semester
                </th>

                <th
                  colSpan={3}
                  className="whitespace-nowrap border-b border-l border-slate-200 px-3 py-3 text-center font-semibold sm:px-4"
                >
                  IP Kumulatif
                </th>

                <th
                  colSpan={3}
                  className="whitespace-nowrap border-b border-l border-slate-200 px-3 py-3 text-center font-semibold sm:px-4"
                >
                  IP Kumulatif Fixed
                </th>
              </tr>

              <tr className="bg-slate-50 text-[10px] text-slate-500 sm:text-xs">
                {[
                  'SKS',
                  'NxSKS',
                  'IP',
                  'SKS',
                  'NxSKS',
                  'IP',
                  'SKS',
                  'NxSKS',
                  'IP',
                ].map((judul, index) => (
                  <th
                    key={`${judul}-${index}`}
                    className={`whitespace-nowrap border-b border-slate-200 px-3 py-3 text-center font-semibold sm:px-4 ${
                      index === 0 || index === 3 || index === 6
                        ? 'border-l'
                        : ''
                    }`}
                  >
                    {judul}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {riwayatTampil.map((item) => (
                <tr
                  key={item.nomorSemester}
                  className={`transition hover:bg-blue-50/60 ${
                    item.nomorSemester === 6
                      ? 'bg-blue-50/40'
                      : ''
                  }`}
                >
                  <td className="whitespace-nowrap px-3 py-3 text-slate-700 sm:px-4">
                    {item.tahunAjaran}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-slate-700 sm:px-4">
                    {item.semester}

                    <span className="ml-1 text-[10px] text-slate-400 sm:ml-2 sm:text-xs">
                      ({item.nomorSemester})
                    </span>
                  </td>

                  <td className="border-l border-slate-100 px-3 py-3 text-center sm:px-4">
                    {item.sks}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-center sm:px-4">
                    {formatAngka(item.nxSks)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-center font-semibold text-blue-700 sm:px-4">
                    {formatAngka(item.ip)}
                  </td>

                  <td className="border-l border-slate-100 px-3 py-3 text-center sm:px-4">
                    {item.sksKumulatif}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-center sm:px-4">
                    {formatAngka(item.nxSksKumulatif)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-center font-semibold text-slate-800 sm:px-4">
                    {formatAngka(item.ipKumulatif)}
                  </td>

                  <td className="border-l border-slate-100 px-3 py-3 text-center sm:px-4">
                    {item.sksKumulatif}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-center sm:px-4">
                    {formatAngka(item.nxSksKumulatif)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-center font-bold text-emerald-700 sm:px-4">
                    {formatAngka(item.ipKumulatif)}
                  </td>
                </tr>
              ))}

              {riwayatTampil.length === 0 && (
                <tr>
                  <td
                    colSpan={11}
                    className="px-3 py-8 text-center text-xs text-slate-500 sm:px-4 sm:py-10 sm:text-sm"
                  >
                    Tidak ada riwayat untuk tahun ajaran ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* KETERANGAN */}
        <div className="border-t border-slate-200 bg-slate-50 p-3 sm:p-5">
          <h3 className="mb-2 text-xs font-bold text-slate-800 sm:mb-3 sm:text-sm">
            Keterangan
          </h3>

          <div className="space-y-2 text-[11px] leading-relaxed text-slate-600 sm:text-sm">
            <p>
              <strong>IP Sem:</strong> Indeks Prestasi Semester,
              yaitu total NxSKS pada semester tersebut dibagi
              total SKS semester.
            </p>

            <p>
              <strong>IP Kum:</strong> Indeks Prestasi Kumulatif
              berdasarkan seluruh semester yang tercatat.
            </p>

            <p>
              <strong>IP Kum Fixed:</strong> Pada simulasi ini
              disamakan dengan IP Kum karena belum ada data
              mata kuliah ulang.
            </p>

            <p>
              <strong>NxSKS:</strong> Dalam simulasi ini dihitung
              dari SKS mata kuliah atau semester dikalikan IP
              yang digunakan.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}