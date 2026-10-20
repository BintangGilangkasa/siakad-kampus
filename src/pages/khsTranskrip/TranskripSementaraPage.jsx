import { useMemo, useState } from 'react';

import {
  daftarSemesterTranskrip,
  ambilDataTranskrip,
  hitungRingkasanTranskrip,
} from '../../data/TranskripData';

import logoIcon from '../../assets/logo-uin.png';

// DATA MAHASISWA DEMONSTRASI
const student = {
  nim: '2301019082',
  nama: 'Bintang Gilangkasa Syailendra',
  prodi: 'S1 - Sains Data',
  fakultas: 'Fakultas Sains dan Teknologi',
  dosenPA: 'Wulan Izzatul Himmah, S.Pd., M.Pd.',
};

// FORMAT ANGKA
const formatAngka = (nilai) => {
  if (
    nilai === null ||
    nilai === undefined ||
    nilai === ''
  ) {
    return '-';
  }

  const angka = Number(nilai);

  if (!Number.isFinite(angka)) {
    return '-';
  }

  return angka.toLocaleString('id-ID', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// PREDIKAT
const tentukanPredikat = (ip) => {
  const nilai = Number(ip);

  if (!Number.isFinite(nilai) || nilai <= 0) {
    return '-';
  }

  if (nilai >= 3.71) return 'Cumlaude';
  if (nilai >= 3.01) return 'Sangat Memuaskan';
  if (nilai >= 2.76) return 'Memuaskan';
  if (nilai >= 2.5) return 'Cukup';

  return 'Perlu Ditingkatkan';
};

// BARIS DATA PER SEMESTER
function FragmentSemester({
  semester,
  data,
  mulaiNomor,
}) {
  return (
    <>
      <tr className="semester-heading">
        <td colSpan={8}>
          SEMESTER {semester}
        </td>
      </tr>

      {data.map((item, index) => {
        const bobot = item.bobot;

        const bobotSks =
          item.nilaiXSkS ??
          (
            bobot !== null &&
            bobot !== undefined
              ? Number(bobot) * Number(item.sks)
              : null
          );

        return (
          <tr key={`${item.kode}-${index}`}>
            <td className="text-center">
              {mulaiNomor + index}
            </td>

            <td className="text-center">
              {item.kode || '-'}
            </td>

            <td>
              {item.mataKuliah || item.nama || '-'}
            </td>

            <td className="text-center">
              {item.sks ?? '-'}
            </td>

            <td className="text-center">
              {item.nilai ?? '-'}
            </td>

            <td className="text-center">
              {formatAngka(bobot)}
            </td>

            <td className="text-center">
              {formatAngka(bobotSks)}
            </td>

            <td className="text-center">
              {item.nilai !== null &&
              item.nilai !== undefined
                ? 'Selesai'
                : 'Belum dinilai'}
            </td>
          </tr>
        );
      })}
    </>
  );
}

// HALAMAN TRANSKRIP SEMENTARA
export default function TranskripSementaraPage() {
  const [semesterTerpilih, setSemesterTerpilih] =
    useState('7');

  const [tampilkanBelumDiambil, setTampilkanBelumDiambil] =
    useState(false);

  const [filterAktif, setFilterAktif] = useState({
    semester: '7',
    belumDiambil: false,
  });

  // DATA TRANSKRIP BERDASARKAN FILTER
  const dataTranskrip = useMemo(() => {
    return ambilDataTranskrip(
      filterAktif.semester,
      filterAktif.belumDiambil
    );
  }, [filterAktif]);

  // RINGKASAN NILAI
  const ringkasan = useMemo(() => {
    return hitungRingkasanTranskrip(dataTranskrip);
  }, [dataTranskrip]);

  // KELOMPOK DATA BERDASARKAN SEMESTER
  const kelompokSemester = useMemo(() => {
    const kelompok = {};

    dataTranskrip.forEach((item) => {
      const semester = item.semester ?? '-';

      if (!kelompok[semester]) {
        kelompok[semester] = [];
      }

      kelompok[semester].push(item);
    });

    return Object.entries(kelompok).sort(
      ([a], [b]) => {
        const nomorA = Number(a);
        const nomorB = Number(b);

        if (
          Number.isNaN(nomorA) ||
          Number.isNaN(nomorB)
        ) {
          return String(a).localeCompare(String(b));
        }

        return nomorA - nomorB;
      }
    );
  }, [dataTranskrip]);

  // RINGKASAN TOTAL
  const jumlahSks = ringkasan.totalSks ?? 0;
  const totalBobot = ringkasan.totalNilaiBerbobot ?? 0;
  const ip = ringkasan.ipk ?? 0;

  // NOMOR URUT MATA KULIAH
  let nomorUrut = 1;

  // TAMPILAN
  return (
    <div className="min-h-screen bg-slate-100 p-3 sm:p-4 md:p-8">
      <style>{`
        .transkrip-document {
          background: #ffffff;
          color: #111827;
          font-family: Arial, Helvetica, sans-serif;
        }

        .transkrip-document table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }

        .transkrip-document th,
        .transkrip-document td {
          border: 1px solid #374151;
          padding: 7px 6px;
          vertical-align: middle;
        }

        .transkrip-document thead th {
          background: #e5e7eb;
          font-weight: 700;
          text-align: center;
        }

        .transkrip-document .semester-heading td {
          background: #f3f4f6;
          font-weight: 700;
          text-align: left;
        }

        .transkrip-document .text-center {
          text-align: center;
        }

        .transkrip-document .total-row td {
          font-weight: 700;
          background: #f3f4f6;
        }

        .transkrip-document .identitas td {
          border: none;
          padding: 4px 2px;
          vertical-align: top;
        }

        .transkrip-document .signature-area {
          break-inside: avoid;
          page-break-inside: avoid;
        }

        .transkrip-document .transkrip-table tr {
          break-inside: avoid;
          page-break-inside: avoid;
        }

        @page {
          size: A4 portrait;
          margin: 12mm;
        }

        @media print {
          html,
          body {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          body * {
            visibility: hidden;
          }

          .transkrip-document,
          .transkrip-document * {
            visibility: visible;
          }

          .no-print {
            display: none !important;
          }

          .transkrip-page-wrapper {
            display: block !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .transkrip-document {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            font-size: 11px !important;
          }

          .transkrip-document table {
            font-size: 10px !important;
          }

          .transkrip-document th,
          .transkrip-document td {
            padding: 5px 4px !important;
          }

          .transkrip-document thead {
            display: table-header-group;
          }

          .transkrip-document .semester-heading {
            break-after: avoid;
            page-break-after: avoid;
          }

          .transkrip-document .signature-area {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .transkrip-document .transkrip-table tr {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>

      {/* ====================================== */}
      {/* PANEL FILTER */}
      {/* ====================================== */}

      <div className="no-print mx-auto mb-4 max-w-6xl sm:mb-6">
        {/* JUDUL HALAMAN */}
        <div className="mb-4 sm:mb-5">
          <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
            Transkrip Nilai Sementara
          </h1>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Lihat ringkasan nilai dan cetak transkrip sementara.
          </p>
        </div>

        {/* PERINGATAN */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 sm:p-4 sm:text-sm">
          <strong>Perhatian:</strong> Data ini merupakan
          data demonstrasi, bukan transkrip akademik resmi.
        </div>

        {/* FORM FILTER */}
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:mt-5 sm:p-5">
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 md:items-end">
            {/* PILIH SEMESTER */}
            <div className="min-w-0">
              <label
                htmlFor="semester"
                className="mb-1.5 block text-xs font-medium text-slate-700 sm:mb-2 sm:text-sm"
              >
                Pilih Semester
              </label>

              <select
                id="semester"
                value={semesterTerpilih}
                onChange={(event) =>
                  setSemesterTerpilih(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:text-sm"
              >
                {daftarSemesterTranskrip.map((semester) => (
                  <option
                    key={semester.nomor}
                    value={String(semester.nomor)}
                  >
                    {semester.label}
                  </option>
                ))}
              </select>
            </div>

            {/* CHECKBOX NILAI */}
            <label className="flex min-w-0 cursor-pointer items-start gap-2.5 rounded-lg border border-slate-200 p-3 sm:items-center sm:gap-3">
              <input
                type="checkbox"
                checked={tampilkanBelumDiambil}
                onChange={(event) =>
                  setTampilkanBelumDiambil(
                    event.target.checked
                  )
                }
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 sm:mt-0"
              />

              <span className="text-xs leading-5 text-slate-700 sm:text-sm">
                Tampilkan mata kuliah yang belum memiliki nilai
              </span>
            </label>

            {/* TOMBOL FILTER */}
            <button
              type="button"
              onClick={() =>
                setFilterAktif({
                  semester: semesterTerpilih,
                  belumDiambil: tampilkanBelumDiambil,
                })
              }
              className="w-full rounded-lg bg-blue-700 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-800 sm:text-sm"
            >
              Tampilkan Transkrip
            </button>
          </div>
        </div>

        {/* ====================================== */}
        {/* KARTU RINGKASAN */}
        {/* ====================================== */}

        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-5 sm:gap-4 lg:grid-cols-4">
          {/* MATA KULIAH */}
          <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
            <p className="text-[10px] leading-4 text-slate-500 sm:text-sm sm:leading-normal">
              Mata Kuliah Ditampilkan
            </p>

            <p className="mt-1.5 text-xl font-bold text-slate-800 sm:mt-2 sm:text-2xl">
              {dataTranskrip.length}
            </p>
          </div>

          {/* TOTAL SKS */}
          <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
            <p className="text-[10px] leading-4 text-slate-500 sm:text-sm sm:leading-normal">
              Total SKS Bernilai
            </p>

            <p className="mt-1.5 text-xl font-bold text-slate-800 sm:mt-2 sm:text-2xl">
              {jumlahSks}
            </p>
          </div>

          {/* TOTAL BOBOT */}
          <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
            <p className="text-[10px] leading-4 text-slate-500 sm:text-sm sm:leading-normal">
              Total Bobot × SKS
            </p>

            <p className="mt-1.5 break-words text-xl font-bold text-slate-800 sm:mt-2 sm:text-2xl">
              {formatAngka(totalBobot)}
            </p>
          </div>

          {/* IP */}
          <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
            <p className="text-[10px] leading-4 text-slate-500 sm:text-sm sm:leading-normal">
              IP Data Ditampilkan
            </p>

            <p className="mt-1.5 text-xl font-bold text-blue-700 sm:mt-2 sm:text-2xl">
              {formatAngka(ip)}
            </p>
          </div>
        </div>

        {/* TOMBOL CETAK */}
        <div className="mt-4 flex justify-end sm:mt-5">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-700 sm:w-auto sm:px-5 sm:text-sm"
          >
            Cetak Transkrip
          </button>
        </div>
      </div>

      {/* ====================================== */}
      {/* DOKUMEN TRANSKRIP */}
      {/* ====================================== */}

      <div className="transkrip-page-wrapper mx-auto max-w-6xl">
        <div className="transkrip-document overflow-hidden rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-6 md:p-10">
          {/* KOP SURAT */}
          <div className="flex items-center gap-2 border-b-2 border-black pb-3 sm:gap-4 sm:pb-4">
            <img
              src={logoIcon}
              alt="Logo UIN Salatiga"
              className="h-12 w-12 shrink-0 object-contain sm:h-20 sm:w-20"
            />

            <div className="min-w-0 flex-1 text-center">
              <h2 className="text-[9px] font-bold uppercase sm:text-base md:text-lg">
                Kementerian Agama Republik Indonesia
              </h2>

              <h1 className="mt-1 text-[11px] font-extrabold uppercase sm:text-lg md:text-xl">
                Universitas Islam Negeri Salatiga
              </h1>

              <p className="mt-1 text-[9px] sm:text-xs">
                Fakultas Sains dan Teknologi
              </p>

              <p className="mt-1 text-[8px] sm:text-[10px]">
                Jl. Lingkar Salatiga Km. 02 Pulutan, Sidorejo,
                Kota Salatiga, Jawa Tengah
              </p>

              <p className="text-[8px] sm:text-[10px]">
                www.uinsalatiga.ac.id | info@uinsalatiga.ac.id
              </p>
            </div>
          </div>

          {/* JUDUL DOKUMEN */}
          <div className="mb-4 mt-5 text-center sm:mb-5 sm:mt-6">
            <h2 className="text-xs font-bold uppercase tracking-wide sm:text-base">
              Transkrip Nilai Sementara
            </h2>

            <p className="mt-1 text-[10px] sm:text-xs">
              Tahun Akademik: Sesuai Data Akademik
            </p>
          </div>

          {/* IDENTITAS MAHASISWA */}
          <div className="mb-4 overflow-x-auto sm:mb-5">
            <table className="identitas">
              <tbody>
                <tr>
                  <td style={{ width: '17%' }}>Nama</td>

                  <td style={{ width: '33%' }}>
                    : {student.nama}
                  </td>

                  <td style={{ width: '17%' }}>NIM</td>

                  <td style={{ width: '33%' }}>
                    : {student.nim}
                  </td>
                </tr>

                <tr>
                  <td>Program Studi</td>
                  <td>: {student.prodi}</td>

                  <td>Semester Dipilih</td>

                  <td>
                    : {filterAktif.semester === 'semua'
                      ? 'Semua Semester'
                      : filterAktif.semester}
                  </td>
                </tr>

                <tr>
                  <td>Fakultas</td>
                  <td>: {student.fakultas}</td>

                  <td>Dosen PA</td>
                  <td>: {student.dosenPA}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* TABEL NILAI */}
          <div className="overflow-x-auto">
            <table className="transkrip-table">
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>No.</th>
                  <th style={{ width: '12%' }}>Kode</th>
                  <th style={{ width: '35%' }}>Mata Kuliah</th>
                  <th style={{ width: '7%' }}>SKS</th>
                  <th style={{ width: '8%' }}>Nilai</th>
                  <th style={{ width: '9%' }}>Bobot</th>
                  <th style={{ width: '12%' }}>Bobot × SKS</th>
                  <th style={{ width: '12%' }}>Status</th>
                </tr>
              </thead>

              <tbody>
                {kelompokSemester.length > 0 ? (
                  kelompokSemester.map(([semester, data]) => {
                    const nomorAwal = nomorUrut;
                    nomorUrut += data.length;

                    return (
                      <FragmentSemester
                        key={semester}
                        semester={semester}
                        data={data}
                        mulaiNomor={nomorAwal}
                      />
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center">
                      Tidak ada data transkrip untuk filter ini.
                    </td>
                  </tr>
                )}
              </tbody>

              <tfoot>
                <tr className="total-row">
                  <td colSpan={3} className="text-center">
                    TOTAL
                  </td>

                  <td className="text-center">
                    {jumlahSks}
                  </td>

                  <td colSpan={2}></td>

                  <td className="text-center">
                    {formatAngka(totalBobot)}
                  </td>

                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* RINGKASAN AKADEMIK */}
          <div className="mt-4 sm:mt-5">
            <h3 className="mb-2 text-xs font-bold uppercase sm:text-sm">
              Ringkasan Akademik
            </h3>

            <table>
              <tbody>
                <tr>
                  <td style={{ width: '35%' }}>
                    Total SKS Bernilai
                  </td>

                  <td>{jumlahSks} SKS</td>
                </tr>

                <tr>
                  <td>Indeks Prestasi Data Ditampilkan</td>
                  <td>{formatAngka(ip)}</td>
                </tr>

                <tr>
                  <td>Predikat</td>
                  <td>{tentukanPredikat(ip)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* CATATAN */}
          <p className="mt-4 text-[9px] italic sm:text-[10px]">
            Catatan: Dokumen ini merupakan transkrip nilai
            sementara berdasarkan data demonstrasi dan bukan
            transkrip akademik resmi.
          </p>

          {/* TANDA TANGAN */}
          <div className="signature-area mt-8 grid grid-cols-2 gap-3 text-center text-[9px] sm:mt-10 sm:gap-8 sm:text-xs">
            <div>
              <p>
                Mengetahui,
                <br />
                Dosen Pembimbing Akademik
              </p>

              <div className="h-12 sm:h-16"></div>

              <p className="break-words font-bold underline">
                {student.dosenPA}
              </p>

              <p>NIP. -</p>
            </div>

            <div>
              <p>
                Salatiga,{' '}
                {new Date().toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
                <br />
                Mahasiswa,
              </p>

              <div className="h-12 sm:h-16"></div>

              <p className="break-words font-bold underline">
                {student.nama}
              </p>

              <p>{student.nim}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}