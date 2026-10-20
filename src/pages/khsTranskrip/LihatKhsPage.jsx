import { useMemo, useState } from 'react';
import {
  dataKhs,
  konfigurasiSemester,
  hitungRingkasanKhs,
  hitungIPK,
} from '../../data/KhsData';
import { dataJadwalKuliah } from '../../data/PerkuliahanData';
import logoIcon from '../../assets/logo-uin.png';

// ==========================================
// DATA MAHASISWA DEMONSTRASI
// ==========================================

const student = {
  nim: '2301019082',
  nama: 'Bintang Gilangkasa Syailendra',
  prodi: 'S1 - Sains Data',
  fakultas: 'Fakultas Sains dan Teknologi',
  dosenPA: 'Wulan Izzatul Himmah, S.Pd., M.Pd.',
  semester: 7,
  batasSks: 24,
};

// ==========================================
// FORMAT ANGKA
// ==========================================

const formatAngka = (angka) => {
  if (angka === null || angka === undefined || angka === '') {
    return '-';
  }

  const nilai = Number(angka);

  if (!Number.isFinite(nilai)) {
    return '-';
  }

  return nilai.toLocaleString('id-ID', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// ==========================================
// PREDIKAT AKADEMIK
// ==========================================

const daftarPredikat = [
  { minimum: 3.71, maksimum: 4.0, label: 'Cumlaude' },
  { minimum: 3.01, maksimum: 3.7, label: 'Sangat Memuaskan' },
  { minimum: 2.76, maksimum: 3.0, label: 'Memuaskan' },
  { minimum: 2.5, maksimum: 2.75, label: 'Cukup' },
];

const tentukanPredikat = (ip) => {
  const nilai = Number(ip);

  if (!Number.isFinite(nilai) || nilai <= 0) {
    return 'Belum tersedia';
  }

  const predikat = daftarPredikat.find(
    (item) => nilai >= item.minimum && nilai <= item.maksimum
  );

  return predikat?.label ?? 'Perlu Ditingkatkan';
};

// ==========================================
// KARTU RINGKASAN
// ==========================================

function KartuRingkasan({ judul, nilai, keterangan }) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-5">
      <p className="text-xs font-medium leading-relaxed text-slate-500 sm:text-sm">
        {judul}
      </p>

      <p className="mt-2 break-words text-xl font-bold text-slate-900 sm:text-3xl">
        {nilai}
      </p>

      <p className="mt-1 text-[10px] leading-relaxed text-slate-500 sm:mt-2 sm:text-xs">
        {keterangan}
      </p>
    </div>
  );
}

// ==========================================
// HALAMAN KHS
// ==========================================

export default function LihatKhsPage() {
  const [semesterAktif, setSemesterAktif] = useState(7);

  // Mengontrol pesan larangan cetak KHS.
  const [pesanCetakKhs, setPesanCetakKhs] = useState(false);

  // ==========================================
  // DATA KHS BERDASARKAN SEMESTER
  // ==========================================

  const daftarMataKuliah = useMemo(
    () =>
      dataKhs.filter(
        (item) => item.semester === Number(semesterAktif)
      ),
    [semesterAktif]
  );

  const ringkasan = useMemo(
    () => hitungRingkasanKhs(semesterAktif),
    [semesterAktif]
  );

  const ipk = useMemo(
    () => hitungIPK(semesterAktif),
    [semesterAktif]
  );

  const konfigurasi = konfigurasiSemester[semesterAktif];

  // ==========================================
  // DATA KARTU STUDI
  // ==========================================

  const jadwalKartuStudi = useMemo(() => {
    return dataJadwalKuliah
      .filter(
        (item) => Number(item.semester) === Number(semesterAktif)
      )
      .slice()
      .sort((a, b) => {
        const urutanHari = [
          'Senin',
          'Selasa',
          'Rabu',
          'Kamis',
          'Jumat',
          'Sabtu',
        ];

        return (
          urutanHari.indexOf(a.hari) - urutanHari.indexOf(b.hari) ||
          a.mulai.localeCompare(b.mulai)
        );
      });
  }, [semesterAktif]);

  const totalSksKartuStudi = jadwalKartuStudi.reduce(
    (total, item) => total + Number(item.sks || 0),
    0
  );

  // ==========================================
  // CETAK KARTU STUDI
  // ==========================================

  const cetakKartuStudi = () => {
    setPesanCetakKhs(false);

    // Beri waktu untuk memastikan tampilan dokumen siap dicetak.
    requestAnimationFrame(() => {
      window.print();
    });
  };

  // ==========================================
  // CETAK KHS
  // ==========================================

  const tampilkanPesanCetakKhs = () => {
    setPesanCetakKhs(true);
  };

  // ==========================================
  // TAMPILAN
  // ==========================================

  return (
    <div className="min-h-screen space-y-4 bg-slate-50 p-3 sm:space-y-6 sm:p-5 md:p-7">
      <style>{`
        /* =====================================
           DOKUMEN CETAK KRS
        ===================================== */

        .krs-document {
          display: none;
          background: #ffffff;
          color: #111827;
          font-family: Arial, Helvetica, sans-serif;
        }

        .krs-document table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
          font-size: 10px;
        }

        .krs-document th,
        .krs-document td {
          border: 1px solid #cbd5e1;
          padding: 6px 4px;
          vertical-align: middle;
          overflow-wrap: anywhere;
        }

        .krs-document th {
          text-align: center;
          font-weight: 700;
        }

        .krs-document .text-center {
          text-align: center;
        }

        .krs-document .identitas-krs td {
          border: none;
          padding: 3px 2px;
          vertical-align: top;
          overflow-wrap: normal;
        }

        .krs-document .judul-krs {
          text-align: center;
          font-size: 14px;
          font-weight: 700;
          text-decoration: underline;
        }

        .krs-document .total-krs td {
          font-weight: 700;
        }

        @page {
          size: A4 landscape;
          margin: 10mm;
        }

        @media print {
          html,
          body {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body * {
            visibility: hidden;
          }

          .krs-document,
          .krs-document * {
            visibility: visible;
          }

          .krs-document {
            display: block !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            font-size: 10px !important;
          }

          .no-print {
            display: none !important;
          }

          .krs-document table {
            font-size: 10px !important;
          }

          .krs-document th,
          .krs-document td {
            padding: 6px 4px !important;
          }

          .krs-document .identitas-krs th,
          .krs-document .identitas-krs td {
            padding: 3px 2px !important;
          }
        }
      `}</style>

      {/* =====================================
          HEADER HALAMAN
      ===================================== */}

      <div className="no-print flex flex-col justify-between gap-3 sm:gap-4 lg:flex-row lg:items-center">
        <div className="min-w-0">
          <p className="text-[10px] text-slate-500 sm:text-sm">
            Akademik / KHS dan Transkrip / Kartu Hasil Studi
          </p>

          <h1 className="mt-1 text-xl font-bold text-slate-900 sm:mt-2 sm:text-2xl md:text-3xl">
            Kartu Hasil Studi
          </h1>

          <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:mt-2 sm:text-sm">
            Lihat hasil studi berdasarkan semester akademik.
          </p>
        </div>

        {/* Tombol */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <button
            type="button"
            onClick={cetakKartuStudi}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
          >
            Cetak Kartu Studi
          </button>

          <button
            type="button"
            onClick={tampilkanPesanCetakKhs}
            className="rounded-lg bg-blue-700 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-800 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
          >
            Cetak KHS
          </button>
        </div>
      </div>

      {/* =====================================
          PESAN LARANGAN CETAK KHS
      ===================================== */}

      {pesanCetakKhs && (
        <div
          role="alert"
          className="no-print flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 sm:p-4 sm:text-sm"
        >
          <span className="mt-0.5 shrink-0 text-base font-bold">
            !
          </span>

          <div className="min-w-0 flex-1">
            <p className="font-semibold">
              Informasi Cetak KHS
            </p>

            <p className="mt-1 leading-relaxed">
              Maaf, Anda tidak diperbolehkan untuk cetak KHS dari
              anjungan anda, silahkan menghubungi pihak Jurusan.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setPesanCetakKhs(false)}
            aria-label="Tutup pesan"
            className="shrink-0 rounded-md px-2 py-1 font-bold text-amber-900 hover:bg-amber-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* =====================================
          PERINGATAN DATA SIMULASI
      ===================================== */}

      <div className="no-print rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 sm:p-4 sm:text-sm">
        <p className="font-semibold">
          Perhatian: data simulasi
        </p>

        <p className="mt-1 leading-relaxed">
          Nilai dan perhitungan pada halaman ini merupakan data contoh
          untuk pengembangan antarmuka, bukan nilai akademik resmi.
        </p>
      </div>

      {/* =====================================
          FILTER SEMESTER
      ===================================== */}

      <section className="no-print rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-5">
        <label
          htmlFor="pilih-semester-khs"
          className="mb-2 block text-xs font-semibold text-slate-700 sm:text-sm"
        >
          Tahun Akademik dan Semester
        </label>

        <select
          id="pilih-semester-khs"
          value={semesterAktif}
          onChange={(event) => {
            setSemesterAktif(Number(event.target.value));
            setPesanCetakKhs(false);
          }}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:max-w-md sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
        >
          {Object.entries(konfigurasiSemester).map(([nomor, item]) => (
            <option key={nomor} value={nomor}>
              Semester {nomor} ({item.tahunAjaran} {item.periode})
            </option>
          ))}
        </select>
      </section>

      {/* =====================================
          KARTU RINGKASAN
      ===================================== */}

      <div className="no-print grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <KartuRingkasan
          judul="Total SKS"
          nilai={ringkasan.totalSks}
          keterangan={`${ringkasan.jumlahMataKuliah} mata kuliah`}
        />

        <KartuRingkasan
          judul="Total Nilai × SKS"
          nilai={formatAngka(ringkasan.totalNilaiXSkS)}
          keterangan="Akumulasi nilai berbobot"
        />

        <KartuRingkasan
          judul="Indeks Prestasi Semester"
          nilai={formatAngka(ringkasan.ips)}
          keterangan={tentukanPredikat(ringkasan.ips)}
        />

        <KartuRingkasan
          judul="IPK Kumulatif"
          nilai={formatAngka(ipk)}
          keterangan={`Sampai semester ${semesterAktif}`}
        />
      </div>

      {/* =====================================
          TABEL NILAI KHS
      ===================================== */}

      <section className="no-print overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
        <div className="border-b border-slate-200 p-3 sm:p-5">
          <h2 className="text-sm font-bold text-slate-900 sm:text-lg">
            Daftar Hasil Studi
          </h2>

          <p className="mt-1 text-[10px] text-slate-500 sm:text-sm">
            Semester {semesterAktif} · {konfigurasi.tahunAjaran}{' '}
            {konfigurasi.periode}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-xs sm:min-w-[900px] sm:text-sm">
            <thead className="bg-slate-100 text-[10px] text-slate-600 sm:text-xs">
              <tr>
                <th className="whitespace-nowrap px-3 py-3 sm:px-4 sm:py-4">
                  No.
                </th>

                <th className="whitespace-nowrap px-3 py-3 sm:px-4 sm:py-4">
                  Kode
                </th>

                <th className="px-3 py-3 sm:px-4 sm:py-4">
                  Mata Kuliah
                </th>

                <th className="px-3 py-3 sm:px-4 sm:py-4">
                  Kelas
                </th>

                <th className="px-3 py-3 text-center sm:px-4 sm:py-4">
                  SKS
                </th>

                <th className="px-3 py-3 text-center sm:px-4 sm:py-4">
                  Sem.
                </th>

                <th className="px-3 py-3 text-center sm:px-4 sm:py-4">
                  Huruf
                </th>

                <th className="px-3 py-3 text-center sm:px-4 sm:py-4">
                  Bobot
                </th>

                <th className="whitespace-nowrap px-3 py-3 text-right sm:px-4 sm:py-4">
                  NA × SKS
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {daftarMataKuliah.map((item, index) => (
                <tr
                  key={item.kode}
                  className="transition hover:bg-blue-50/60"
                >
                  <td className="px-3 py-3 text-slate-500 sm:px-4">
                    {index + 1}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 font-medium text-slate-700 sm:px-4">
                    {item.kode}
                  </td>

                  <td className="max-w-[240px] px-3 py-3 font-medium text-slate-800 sm:px-4">
                    {item.mataKuliah}
                  </td>

                  <td className="px-3 py-3 text-slate-600 sm:px-4">
                    {item.kelas}
                  </td>

                  <td className="px-3 py-3 text-center sm:px-4">
                    {item.sks}
                  </td>

                  <td className="px-3 py-3 text-center sm:px-4">
                    {String(item.semester).padStart(2, '0')}
                  </td>

                  <td className="px-3 py-3 text-center sm:px-4">
                    <span className="inline-flex min-w-8 justify-center rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 sm:min-w-10 sm:rounded-lg sm:text-xs">
                      {item.nilai ?? '-'}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-center sm:px-4">
                    {item.bobot === null
                      ? '-'
                      : formatAngka(item.bobot)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-right font-semibold text-slate-800 sm:px-4">
                    {item.nilaiXSkS === null
                      ? '-'
                      : formatAngka(item.nilaiXSkS)}
                  </td>
                </tr>
              ))}

              {daftarMataKuliah.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-3 py-10 text-center text-slate-500 sm:px-4 sm:py-12"
                  >
                    Belum ada data mata kuliah untuk semester ini.
                  </td>
                </tr>
              )}
            </tbody>

            <tfoot className="bg-slate-50 font-bold text-slate-800">
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-3 text-right sm:px-4 sm:py-4"
                >
                  JUMLAH
                </td>

                <td className="px-3 py-3 text-center sm:px-4 sm:py-4">
                  {ringkasan.totalSks}
                </td>

                <td colSpan={3} />

                <td className="px-3 py-3 text-right sm:px-4 sm:py-4">
                  {formatAngka(ringkasan.totalNilaiXSkS)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 p-3 text-[10px] text-slate-500 sm:p-4 sm:text-sm">
          Catatan: nilai bertanda '-' berarti nilai belum tersedia.
        </div>
      </section>

      {/* =====================================
          PREDIKAT AKADEMIK
      ===================================== */}

      <section className="no-print rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-5">
        <h2 className="text-sm font-bold text-slate-900 sm:text-lg">
          Predikat Akademik
        </h2>

        <p className="mt-1 text-[10px] text-slate-500 sm:text-sm">
          Predikat berdasarkan IPS semester yang dipilih.
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
          {daftarPredikat.map((item) => (
            <div
              key={item.label}
              className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:rounded-xl sm:p-4"
            >
              <p className="text-xs font-semibold text-slate-800 sm:text-sm">
                {item.label}
              </p>

              <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                {formatAngka(item.minimum)} – {formatAngka(item.maksimum)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================
          DOKUMEN CETAK KRS
      ===================================== */}

      <div className="krs-document">
        {/* JUDUL */}
        <div className="mb-1">
          <h1 className="judul-krs">
            KARTU RENCANA STUDI (KRS)
          </h1>

          <p className="mt-1 text-center text-[10px]">
            Tahun Akademik {konfigurasi.tahunAjaran}{' '}
            {konfigurasi.periode}
          </p>
        </div>

        {/* IDENTITAS */}
        <table className="identitas-krs my-4">
          <tbody>
            <tr>
              <td style={{ width: '16%' }}>
                <strong>NIM</strong>
              </td>

              <td style={{ width: '35%' }}>
                : {student.nim}
              </td>

              <td style={{ width: '16%' }}>
                <strong>Semester</strong>
              </td>

              <td style={{ width: '33%' }}>
                : Semester {semesterAktif}
              </td>
            </tr>

            <tr>
              <td>
                <strong>Nama</strong>
              </td>

              <td>
                : {student.nama.toUpperCase()}
              </td>

              <td>
                <strong>Dosen PA</strong>
              </td>

              <td>
                : {student.dosenPA}
              </td>
            </tr>

            <tr>
              <td>
                <strong>Program Studi</strong>
              </td>

              <td>
                : {student.prodi}
              </td>

              <td>
                <strong>Batas Maks. SKS</strong>
              </td>

              <td>
                : {student.batasSks} SKS
              </td>
            </tr>
          </tbody>
        </table>

        {/* TABEL KRS */}
        <table>
          <thead>
            <tr>
              <th style={{ width: '5%' }}>No</th>
              <th style={{ width: '10%' }}>Kode</th>
              <th style={{ width: '20%' }}>Mata Kuliah</th>
              <th style={{ width: '6%' }}>SKS</th>
              <th style={{ width: '6%' }}>Kelas</th>
              <th style={{ width: '16%' }}>Dosen Pengampu</th>
              <th style={{ width: '12%' }}>Ruang</th>
              <th style={{ width: '8%' }}>Hari</th>
              <th style={{ width: '9%' }}>Jam</th>
            </tr>
          </thead>

          <tbody>
            {jadwalKartuStudi.map((item, index) => (
              <tr key={item.id}>
                <td className="text-center">
                  {index + 1}
                </td>

                <td className="text-center">
                  {item.kode}
                </td>

                <td>
                  <strong>{item.nama}</strong>
                </td>

                <td className="text-center">
                  {item.sks}
                </td>

                <td className="text-center">
                  {item.kelas}
                </td>

                <td>
                  {item.dosen}
                </td>

                <td className="text-center">
                  {item.ruang}
                </td>

                <td className="text-center">
                  {item.hari}
                </td>

                <td className="text-center">
                  {item.mulai}
                  <br />
                  -
                  <br />
                  {item.selesai}
                </td>
              </tr>
            ))}

            {jadwalKartuStudi.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center">
                  Tidak ada data jadwal pada semester ini.
                </td>
              </tr>
            )}
          </tbody>

          <tfoot>
            <tr className="total-krs">
              <td colSpan={3} className="text-center">
                Total SKS Diambil:
              </td>

              <td className="text-center">
                {totalSksKartuStudi}
              </td>

              <td colSpan={5} />
            </tr>
          </tfoot>
        </table>

        <p className="mt-3 text-[9px]">
          Catatan: Dokumen ini merupakan kartu studi demonstrasi,
          bukan dokumen akademik resmi.
        </p>
      </div>
    </div>
  );
}