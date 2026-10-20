import { useEffect, useState } from 'react';
import {
  informasiRemidi,
  periodeRemidi,
} from '../../data/InformasiRemidiData';

export default function InformasiRemidi() {
  const [tabAktif, setTabAktif] = useState('pengajuan');
  const [tahunAkademik, setTahunAkademik] = useState('2026/2027');
  const [semester, setSemester] = useState('Ganjil');
  const [pesan, setPesan] = useState('');

  // Memuat pengajuan dari penyimpanan browser.
  const [pengajuanPerPeriode, setPengajuanPerPeriode] = useState(() => {
    try {
      const dataTersimpan = localStorage.getItem(
        'pengajuan-remidi-mahasiswa'
      );

      return dataTersimpan ? JSON.parse(dataTersimpan) : {};
    } catch {
      return {};
    }
  });

  // Menyimpan perubahan pengajuan ke penyimpanan browser.
  useEffect(() => {
    localStorage.setItem(
      'pengajuan-remidi-mahasiswa',
      JSON.stringify(pengajuanPerPeriode)
    );
  }, [pengajuanPerPeriode]);

  const formatSks = (jumlah) => `${jumlah} SKS`;

  // Mengambil data sesuai tahun akademik dan semester.
  const periodeKey = `${tahunAkademik}-${semester}`;
  const periodeAktif = periodeRemidi[periodeKey];

  const jadwalRemidiAktif = periodeAktif?.jadwalRemidi ?? [];
  const pengajuan = pengajuanPerPeriode[periodeKey] ?? [];

  const totalSks = pengajuan.reduce(
    (total, item) => total + Number(item.sks || 0),
    0
  );

  const semesterPerkuliahan =
    periodeAktif?.semesterPerkuliahan ?? '-';

  const aturanAktif = periodeAktif?.aturan ?? [
    'Belum ada data untuk periode akademik ini.',
  ];

  const statusPeriode =
    periodeAktif?.statusPeriode ?? 'Belum tersedia';

  // Mengajukan mata kuliah remidi.
  const ajukanRemidi = (item) => {
    if (!periodeAktif || !item.tersedia) {
      setPesan(
        'Pengajuan remidi belum tersedia untuk periode ini.'
      );
      return;
    }

    if (pengajuan.some((data) => data.id === item.id)) {
      setPesan(
        'Mata kuliah ini sudah ada dalam daftar pengajuan.'
      );
      return;
    }

    setPengajuanPerPeriode((sebelumnya) => ({
      ...sebelumnya,
      [periodeKey]: [
        ...(sebelumnya[periodeKey] ?? []),
        item,
      ],
    }));

    setPesan(
      `Pengajuan ${item.mataKuliah} berhasil ditambahkan.`
    );
  };

  return (
    <div className="space-y-6 halaman-remidi">
      {/* CSS khusus halaman cetak */}
      <style>{`
        .dokumen-cetak-remidi {
          color: #1e293b;
        }

        .header-cetak-remidi {
          border-bottom: 2px solid #1e40af;
        }

        .tabel-cetak-remidi {
          width: 100%;
          border-collapse: collapse;
        }

        .tabel-cetak-remidi th,
        .tabel-cetak-remidi td {
          border: 1px solid #cbd5e1;
          padding: 10px;
          text-align: left;
        }

        .tabel-cetak-remidi th {
          background: #eff6ff;
          font-weight: 700;
        }

        @page {
          size: A4 portrait;
          margin: 12mm;
        }

        @media print {
          body * {
            visibility: hidden !important;
          }

          .dokumen-cetak-remidi,
          .dokumen-cetak-remidi * {
            visibility: visible !important;
          }

          .dokumen-cetak-remidi {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            color: #1e293b !important;
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 10pt !important;
          }

          .kartu-remidi,
          .daftar-remidi {
            width: 100% !important;
            margin: 0 0 8mm !important;
            overflow: visible !important;
            border: 1px solid #cbd5e1 !important;
            border-radius: 6px !important;
            box-shadow: none !important;
            break-inside: avoid !important;
            background: white !important;
          }

          .header-kartu-remidi {
            background: #1e40af !important;
            color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .header-kartu-remidi * {
            color: white !important;
          }

          .tabel-cetak-remidi {
            width: 100% !important;
            min-width: 0 !important;
            border-collapse: collapse !important;
            font-size: 9pt !important;
          }

          .tabel-cetak-remidi th,
          .tabel-cetak-remidi td {
            border: 1px solid #94a3b8 !important;
            padding: 7px !important;
            color: #1e293b !important;
          }

          .tabel-cetak-remidi th {
            background: #eff6ff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .tombol-cetak-remidi,
          .bagian-tidak-cetak {
            display: none !important;
          }

          html,
          body {
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            background: white !important;
          }
        }
      `}</style>

      {/* Header halaman */}
      <div className="bagian-tidak-cetak">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 4h8m-9 4h10M7 12h10M7 16h6M5 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
              />
            </svg>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Informasi Remidi
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Pengajuan dan kartu studi ujian remidi mahasiswa.
            </p>
          </div>
        </div>
      </div>

      {/* Ringkasan akademik */}
      <div className="bagian-tidak-cetak grid grid-cols-4 gap-2 sm:gap-4">

        {/* Tahun Akademik */}
        <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-2 shadow-sm sm:p-4">
          <p className="text-[10px] leading-tight text-gray-500 sm:text-sm">
            Tahun Akademik
          </p>

          <p className="mt-2 break-words text-[10px] font-semibold leading-tight text-gray-800 sm:text-sm">
            {tahunAkademik} {semester}
          </p>
        </div>

        {/* Semester Perkuliahan */}
        <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-2 shadow-sm sm:p-4">
          <p className="text-[10px] leading-tight text-gray-500 sm:text-sm">
            Semester Perkuliahan
          </p>

          <p className="mt-2 break-words text-[10px] font-semibold leading-tight text-gray-800 sm:text-sm">
            Semester {semesterPerkuliahan}
          </p>
        </div>

        {/* Total SKS Pengajuan */}
        <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-2 shadow-sm sm:p-4">
          <p className="text-[10px] leading-tight text-gray-500 sm:text-sm">
            Total SKS Pengajuan
          </p>

          <p className="mt-2 text-[10px] font-semibold leading-tight text-gray-800 sm:text-sm">
            {formatSks(totalSks)}
          </p>
        </div>

        {/* Status Periode */}
        <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-2 shadow-sm sm:p-4">
          <p className="text-[10px] leading-tight text-gray-500 sm:text-sm">
            Status Periode
          </p>

          <span className="mt-2 inline-flex max-w-full items-center whitespace-nowrap rounded-full bg-amber-100 px-1.5 py-1 text-[8px] font-medium text-amber-800 sm:px-3 sm:text-xs">
            {statusPeriode}
          </span>
        </div>

      </div>

      {/* Filter akademik */}
      <div className="bagian-tidak-cetak rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-gray-800">
          Filter Akademik
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              NIM
            </label>
            <input
              value={informasiRemidi.nim}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Tahun Akademik
            </label>
            <select
              value={tahunAkademik}
              onChange={(e) => {
                setTahunAkademik(e.target.value);
                setPesan('');
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="2026/2027">2026/2027</option>
              <option value="2025/2026">2025/2026</option>
              <option value="2024/2025">2024/2025</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Semester
            </label>
            <select
              value={semester}
              onChange={(e) => {
                setSemester(e.target.value);
                setPesan('');
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="Ganjil">Ganjil</option>
              <option value="Genap">Genap</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tab navigasi */}
      <div className="bagian-tidak-cetak flex flex-wrap gap-2 border-b border-gray-200">
        <button
          onClick={() => {
            setTabAktif('pengajuan');
            setPesan('');
          }}
          className={`rounded-t-lg px-5 py-3 text-sm font-semibold transition ${
            tabAktif === 'pengajuan'
              ? 'border-b-2 border-blue-600 bg-blue-50 text-blue-700'
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
          }`}
        >
          Pengajuan Remidi
        </button>

        <button
          onClick={() => {
            setTabAktif('kartu');
            setPesan('');
          }}
          className={`rounded-t-lg px-5 py-3 text-sm font-semibold transition ${
            tabAktif === 'kartu'
              ? 'border-b-2 border-blue-600 bg-blue-50 text-blue-700'
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
          }`}
        >
          Kartu Studi/Ujian Remidi
        </button>
      </div>

      {/* TAB PENGAJUAN */}
      {tabAktif === 'pengajuan' ? (
        <div className="bagian-tidak-cetak space-y-5">
          {/* Aturan periode */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-semibold text-gray-800">
              Informasi Periode Remidi
            </h2>

            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
              {aturanAktif.map((aturan, index) => (
                <li key={index}>{aturan}</li>
              ))}
            </ul>
          </div>

          {/* Daftar mata kuliah */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 p-5">
              <h2 className="font-semibold text-gray-800">
                Daftar Mata Kuliah Remidi
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Tahun Akademik {tahunAkademik} {semester}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-5 py-3">Mata Kuliah</th>
                    <th className="px-5 py-3">SKS</th>
                    <th className="px-5 py-3">Nilai</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {jadwalRemidiAktif.length > 0 ? (
                    jadwalRemidiAktif.map((item) => {
                      const sudahDiajukan = pengajuan.some(
                        (data) => data.id === item.id
                      );

                      return (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-5 py-4">
                            <p className="font-medium text-gray-800">
                              {item.mataKuliah}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              {item.kode}
                            </p>
                          </td>

                          <td className="px-5 py-4">{item.sks}</td>

                          <td className="px-5 py-4">
                            {item.nilai ?? '-'}
                          </td>

                          <td className="px-5 py-4">
                            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800">
                              {sudahDiajukan
                                ? 'Dalam simulasi'
                                : item.status}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-right">
                            <button
                              disabled={
                                !item.tersedia || sudahDiajukan
                              }
                              onClick={() => ajukanRemidi(item)}
                              className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                            >
                              {sudahDiajukan
                                ? 'Sudah Ditambahkan'
                                : 'Ajukan Remidi'}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-10 text-center text-sm text-gray-500"
                      >
                        Belum ada data remidi untuk periode ini.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-200 bg-gray-50 px-5 py-3 text-xs text-gray-500">
              Data mata kuliah dan nilai perlu diverifikasi dengan
              data akademik resmi.
            </div>
          </div>

          {pesan && (
            <div
              role="status"
              className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800"
            >
              {pesan}
            </div>
          )}
        </div>
      ) : (
        /* TAB KARTU CETAK */
        <div className="space-y-5">
          <div className="dokumen-cetak-remidi">
            {/* Identitas mahasiswa */}
            <div className="kartu-remidi overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="header-kartu-remidi bg-blue-700 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-9 w-9"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3 3 8l9 5 9-5-9-5Zm-6 8v5l6 3 6-3v-5M21 8v7"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest">
                      Sistem Informasi Akademik
                    </p>
                    <h2 className="mt-1 text-xl font-bold">
                      Kartu Studi/Ujian Remidi
                    </h2>
                    <p className="mt-1 text-sm">
                      Tahun Akademik {tahunAkademik} {semester}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-5 flex items-center justify-between gap-3 border-b border-gray-200 pb-3">
                  <h3 className="font-bold uppercase tracking-wide text-gray-700">
                    Identitas Mahasiswa
                  </h3>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {statusPeriode}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-gray-500">
                      Nama Mahasiswa
                    </p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {informasiRemidi.nama}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Nomor Induk Mahasiswa
                    </p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {informasiRemidi.nim}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Program Studi
                    </p>
                    <p className="mt-1 font-medium text-gray-800">
                      {informasiRemidi.jurusan}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Angkatan</p>
                    <p className="mt-1 font-medium text-gray-800">
                      {informasiRemidi.angkatan}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Semester Perkuliahan
                    </p>
                    <p className="mt-1 font-medium text-gray-800">
                      Semester {semesterPerkuliahan}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Total Mata Kuliah Remidi
                    </p>
                    <p className="mt-1 font-medium text-gray-800">
                      {pengajuan.length} Mata Kuliah
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Daftar mata kuliah yang diajukan */}
            <div className="daftar-remidi overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 p-5">
                <h3 className="font-bold text-gray-800">
                  Daftar Mata Kuliah yang Diajukan
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Daftar berikut mengikuti pengajuan pada periode
                  akademik yang dipilih.
                </p>
              </div>

              {pengajuan.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="tabel-cetak-remidi w-full min-w-[500px] text-sm">
                    <thead>
                      <tr>
                        <th className="w-12 text-center">No.</th>
                        <th>Kode</th>
                        <th>Mata Kuliah</th>
                        <th className="w-20 text-center">SKS</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {pengajuan.map((item, index) => (
                        <tr key={item.id}>
                          <td className="text-center">{index + 1}</td>
                          <td>{item.kode}</td>
                          <td className="font-medium">
                            {item.mataKuliah}
                          </td>
                          <td className="text-center">{item.sks}</td>
                          <td>Simulasi pengajuan</td>
                        </tr>
                      ))}
                    </tbody>

                    <tfoot>
                      <tr>
                        <td
                          colSpan={3}
                          className="text-right font-bold"
                        >
                          Total SKS
                        </td>
                        <td className="text-center font-bold">
                          {totalSks}
                        </td>
                        <td className="font-semibold">SKS</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ) : (
                <div className="p-10 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                      />
                    </svg>
                  </div>

                  <h3 className="mt-3 font-semibold text-gray-800">
                    Belum Ada Pengajuan
                  </h3>

                  <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
                    Belum ada mata kuliah yang diajukan untuk periode
                    akademik ini.
                  </p>
                </div>
              )}

              <div className="border-t border-gray-200 bg-gray-50 px-5 py-3 text-xs text-gray-500">
                Dokumen ini merupakan simulasi kartu akademik.
                Data resmi mengikuti ketentuan pihak akademik.
              </div>
            </div>

            {/* Pengesahan */}
            <div className="mt-8 grid grid-cols-2 gap-8 text-center text-sm">
              <div>
                <p className="text-gray-600">Mahasiswa,</p>
                <div className="h-16" />
                <p className="font-semibold text-gray-800">
                  {informasiRemidi.nama}
                </p>
                <p className="text-xs text-gray-500">
                  NIM {informasiRemidi.nim}
                </p>
              </div>

              <div>
                <p className="text-gray-600">
                  Petugas Akademik,
                </p>
                <div className="h-16" />
                <p className="font-semibold text-gray-800">
                  ______________________
                </p>
              </div>
            </div>
          </div>

          {/* Tombol cetak hanya muncul di halaman web */}
          <div className="tombol-cetak-remidi flex flex-wrap gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6v-7Z"
                />
              </svg>
              Cetak Kartu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}