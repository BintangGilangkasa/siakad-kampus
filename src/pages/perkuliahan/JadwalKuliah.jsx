
import { useMemo, useState } from 'react';
import { dataJadwalKuliah } from '../../data/PerkuliahanData';
const hariList = [
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
];

const formatWaktu = (mulai, selesai) => `${mulai}–${selesai}`;

function Ikon({ nama, className = 'h-5 w-5' }) {
  const paths = {
    calendar: 'M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
    book: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5ZM4 5.5V21m4-13h8m-8 4h8',
    clock: 'M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    pin: 'M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0ZM12 10h.01',
    search: 'm21 21-4.3-4.3M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z',
    check: 'm5 12 4 4L19 6',
    graduation: 'm22 10-10-5L2 10l10 5 10-5Zm-16 3v5c4 3 8 3 12 0v-5M22 10v6',
    target: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-6v3m0 14v3M2 12h3m14 0h3m-3.5-6.5 2-2m-13 13-2 2m0-15 2 2m13 13 2 2',
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[nama] || paths.book} />
    </svg>
  );
}

function KartuStatistik({ ikon, label, nilai, detail }) {
  return (
    <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-2 shadow-sm sm:rounded-2xl sm:p-5">
      <div className="flex flex-col-reverse items-start justify-between gap-1 sm:flex-row sm:items-center sm:gap-3">
        <p className="break-words text-[9px] font-medium leading-tight text-gray-500 sm:text-sm">
          {label}
        </p>

        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 sm:h-10 sm:w-10 sm:rounded-xl">
          <Ikon nama={ikon} className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
        </span>
      </div>

      <p className="mt-2 break-words text-base font-bold text-gray-900 sm:mt-3 sm:text-2xl">
        {nilai}
      </p>

      <p className="mt-1 break-words text-[8px] leading-tight text-gray-500 sm:text-xs">
        {detail}
      </p>
    </div>
  );
}

export default function JadwalKuliah() {
  const [tabAktif, setTabAktif] = useState('jadwal');
  const [semester, setSemester] = useState('7');
  const [hariAktif, setHariAktif] = useState('Semua');
  const [pencarian, setPencarian] = useState('');
  const [mataKuliahAktif, setMataKuliahAktif] = useState(
    dataJadwalKuliah[0]?.id ?? ''
  );

  const daftarSemester = useMemo(
    () => [...new Set(dataJadwalKuliah.map((item) => String(item.semester)))].sort(
      (a, b) => Number(b) - Number(a)
    ),
    []
  );

  const dataSemester = useMemo(
    () => dataJadwalKuliah.filter((item) => String(item.semester) === semester),
    [semester]
  );

  const dataTampil = useMemo(() => {
    const kata = pencarian.trim().toLowerCase();

    return dataSemester.filter((item) => {
      const cocokHari = hariAktif === 'Semua' || item.hari === hariAktif;
      const cocokKata =
        !kata ||
        item.nama.toLowerCase().includes(kata) ||
        item.kode.toLowerCase().includes(kata) ||
        item.dosen.toLowerCase().includes(kata) ||
        item.ruang.toLowerCase().includes(kata);

      return cocokHari && cocokKata;
    });
  }, [dataSemester, hariAktif, pencarian]);

  const mataKuliahTerpilih =
    dataSemester.find((item) => item.id === mataKuliahAktif) ??
    dataSemester[0];

  const totalSks = dataSemester.reduce((total, item) => total + item.sks, 0);
  const jumlahDosen = new Set(dataSemester.map((item) => item.dosen)).size;

  const gantiSemester = (value) => {
    setSemester(value);
    setHariAktif('Semua');
    setPencarian('');
    const pertama = dataJadwalKuliah.find(
      (item) => String(item.semester) === value
    );
    setMataKuliahAktif(pertama?.id ?? '');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-700 p-4 text-white shadow-sm sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-50">
            <Ikon nama="graduation" className="h-4 w-4" />
            Layanan Akademik
          </div>
          <h1 className="text-xl font-bold sm:text-3xl">
             Jadwal Kuliah & Silabus
          </h1>
          <p className="mt-2 max-w-xl text-xs leading-5 text-blue-100 sm:mt-3 sm:text-base sm:leading-6">
            Temukan jadwal perkuliahan, informasi dosen, dan rencana
            pembelajaran mata kuliah dalam satu halaman.
          </p>
        </div>
        <div className="pointer-events-none absolute -right-8 -top-12 h-56 w-56 rounded-full border-[30px] border-white/10" />
        <div className="pointer-events-none absolute -bottom-24 right-28 h-48 w-48 rounded-full bg-white/5" />
      </section>

      {/* Statistik */}
      <section className="grid grid-cols-4 gap-2 sm:gap-4">
        <KartuStatistik
          ikon="book"
          label="Mata Kuliah"
          nilai={dataSemester.length}
          detail={`Pada semester ${semester}`}
        />
        <KartuStatistik
          ikon="graduation"
          label="Total Beban Studi"
          nilai={`${totalSks} SKS`}
          detail="Akumulasi SKS semester terpilih"
        />
        <KartuStatistik
          ikon="calendar"
          label="Hari Perkuliahan"
          nilai={new Set(dataSemester.map((item) => item.hari)).size}
          detail="Hari dengan jadwal kuliah"
        />
        <KartuStatistik
          ikon="check"
          label="Dosen Pengampu"
          nilai={jumlahDosen}
          detail="Dosen pada daftar mata kuliah"
        />
      </section>

            {/* Filter */}
      <section className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-5">
        {/* Header Filter */}
        <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-sm font-bold text-gray-800 sm:text-base">
              Jadwal Akademik
            </h2>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Pilih semester atau cari informasi perkuliahan.
            </p>
          </div>

          <span className="inline-flex max-w-full items-center rounded-full bg-blue-50 px-2.5 py-1.5 text-[10px] font-semibold text-blue-700 sm:px-3 sm:text-xs">
            Tahun Akademik 2026/2027 · Ganjil
          </span>
        </div>

        {/* Input Filter */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-[200px_1fr]">
          {/* Pilihan Semester */}
          <div className="min-w-0">
            <label
              htmlFor="semester-kuliah"
              className="mb-1.5 block text-xs font-medium text-gray-600 sm:mb-2 sm:text-sm"
            >
              Semester Perkuliahan
            </label>

            <select
              id="semester-kuliah"
              value={semester}
              onChange={(e) => gantiSemester(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:py-3 sm:text-sm"
            >
              {daftarSemester.map((item) => (
                <option key={item} value={item}>
                  Semester {item}
                </option>
              ))}
            </select>
          </div>

          {/* Pencarian Mata Kuliah */}
          <div className="min-w-0">
            <label
              htmlFor="cari-kuliah"
              className="mb-1.5 block text-xs font-medium text-gray-600 sm:mb-2 sm:text-sm"
            >
              Cari Mata Kuliah
            </label>

            <div className="relative">
              <Ikon
                nama="search"
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 sm:h-5 sm:w-5"
              />

              <input
                id="cari-kuliah"
                type="text"
                value={pencarian}
                onChange={(e) => setPencarian(e.target.value)}
                placeholder="Cari nama, kode, dosen, atau ruang..."
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-9 pr-3 text-xs outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:py-3 sm:pl-10 sm:pr-4 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto border-b border-gray-200 sm:gap-2">
        <button
          onClick={() => setTabAktif('jadwal')}
          className={`whitespace-nowrap rounded-t-lg px-3 py-2.5 text-xs font-semibold transition sm:rounded-t-xl sm:px-5 sm:py-3 sm:text-sm ${
            tabAktif === 'jadwal'
              ? 'border-b-2 border-blue-600 bg-blue-50 text-blue-700'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <span className="inline-flex items-center gap-1.5 sm:gap-2">
            <Ikon nama="calendar" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Jadwal Perkuliahan
          </span>
        </button>

        <button
          onClick={() => setTabAktif('silabus')}
          className={`whitespace-nowrap rounded-t-lg px-3 py-2.5 text-xs font-semibold transition sm:rounded-t-xl sm:px-5 sm:py-3 sm:text-sm ${
            tabAktif === 'silabus'
              ? 'border-b-2 border-blue-600 bg-blue-50 text-blue-700'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <span className="inline-flex items-center gap-1.5 sm:gap-2">
            <Ikon nama="book" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Silabus Mata Kuliah
          </span>
        </button>
      </div>

      {tabAktif === 'jadwal' ? (
        <div className="space-y-4 sm:space-y-5">
          {/* Filter Hari */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {['Semua', ...hariList].map((hari) => (
              <button
                key={hari}
                onClick={() => setHariAktif(hari)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition sm:px-4 sm:py-2 sm:text-sm ${
                  hariAktif === hari
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-700'
                }`}
              >
                {hari}
              </button>
            ))}
          </div>

      {/* Daftar Jadwal */}
          <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:rounded-2xl">
            {/* Header Daftar Jadwal */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 p-3 sm:gap-3 sm:p-5">
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-gray-800 sm:text-base">
                  Daftar Jadwal Perkuliahan
                </h2>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  {dataTampil.length} mata kuliah ditemukan
                </p>
              </div>

              <span className="shrink-0 rounded-lg bg-gray-100 px-2.5 py-1.5 text-[10px] font-medium text-gray-600 sm:px-3 sm:py-2 sm:text-xs">
                Semester {semester}
              </span>
            </div>

            {/* Tabel Jadwal */}
            {dataTampil.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left text-xs sm:min-w-[850px] sm:text-sm">
                  <thead className="bg-gray-50 text-[10px] uppercase tracking-wide text-gray-500 sm:text-xs">
                    <tr>
                      <th className="px-3 py-3 sm:px-5 sm:py-4">Waktu</th>
                      <th className="px-3 py-3 sm:px-5 sm:py-4">Mata Kuliah</th>
                      <th className="px-3 py-3 sm:px-5 sm:py-4">Dosen</th>
                      <th className="px-3 py-3 sm:px-5 sm:py-4">Ruang / Kelas</th>
                      <th className="px-3 py-3 sm:px-5 sm:py-4">SKS</th>
                      <th className="px-3 py-3 sm:px-5 sm:py-4">Detail</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {dataTampil
                      .slice()
                      .sort(
                        (a, b) =>
                          hariList.indexOf(a.hari) - hariList.indexOf(b.hari) ||
                          a.mulai.localeCompare(b.mulai)
                      )
                      .map((item) => (
                        <tr
                          key={item.id}
                          className="transition hover:bg-blue-50/40"
                        >
                          {/* Waktu */}
                          <td className="whitespace-nowrap px-3 py-3 sm:px-5 sm:py-4">
                            <div className="font-semibold text-gray-800">
                              {item.hari}
                            </div>

                            <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-500 sm:gap-1.5 sm:text-xs">
                              <Ikon nama="clock" className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                              {formatWaktu(item.mulai, item.selesai)}
                            </div>
                          </td>

                          {/* Mata Kuliah */}
                          <td className="px-3 py-3 sm:px-5 sm:py-4">
                            <p className="max-w-xs font-semibold text-gray-800">
                              {item.nama}
                            </p>

                            <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                              {item.kode}
                            </p>
                          </td>

                          {/* Dosen */}
                          <td className="px-3 py-3 text-gray-600 sm:px-5 sm:py-4">
                            {item.dosen}
                          </td>

                          {/* Ruang / Kelas */}
                          <td className="px-3 py-3 sm:px-5 sm:py-4">
                            <div className="flex items-center gap-1 text-gray-700">
                              <Ikon nama="pin" className="h-3.5 w-3.5 shrink-0 text-gray-400 sm:h-4 sm:w-4" />
                              {item.ruang}
                            </div>

                            <span className="mt-1 inline-flex rounded-md bg-gray-100 px-1.5 py-1 text-[10px] text-gray-600 sm:px-2 sm:text-xs">
                              Kelas {item.kelas}
                            </span>
                          </td>

                          {/* SKS */}
                          <td className="whitespace-nowrap px-3 py-3 font-medium text-gray-700 sm:px-5 sm:py-4">
                            {item.sks}
                          </td>

                          {/* Detail */}
                          <td className="whitespace-nowrap px-3 py-3 sm:px-5 sm:py-4">
                            <button
                              onClick={() => {
                                setMataKuliahAktif(item.id);
                                setTabAktif('silabus');
                              }}
                              className="rounded-lg border border-blue-200 px-2 py-1.5 text-[10px] font-semibold text-blue-700 transition hover:bg-blue-50 sm:px-3 sm:py-2 sm:text-xs"
                            >
                              Lihat Silabus
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Kondisi Jadwal Kosong */
              <div className="p-6 text-center sm:p-10">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 sm:h-12 sm:w-12">
                  <Ikon nama="calendar" className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                <h3 className="mt-3 text-sm font-semibold text-gray-800 sm:text-base">
                  Jadwal Tidak Ditemukan
                </h3>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Coba ubah filter hari atau kata kunci pencarian.
                </p>

                <button
                  onClick={() => {
                    setHariAktif('Semua');
                    setPencarian('');
                  }}
                  className="mt-4 text-xs font-semibold text-blue-700 hover:underline sm:text-sm"
                >
                  Reset filter
                </button>
              </div>
            )}
          </section>

          {/* Keterangan */}
          <div className="flex items-start gap-2.5 rounded-xl border border-blue-100 bg-blue-50 p-3 text-xs text-blue-800 sm:gap-3 sm:p-4 sm:text-sm">
            <Ikon nama="calendar" className="mt-0.5 h-4 w-4 shrink-0 sm:h-5 sm:w-5" />

            <p className="leading-5 sm:leading-6">
              Jadwal pada halaman ini merupakan data simulasi. Jadwal resmi,
              perubahan ruang, dan informasi perkuliahan perlu dikonfirmasi
              melalui pihak akademik.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
          {/* Pilihan mata kuliah */}
          <aside className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 p-5">
              <h2 className="font-bold text-gray-800">Mata Kuliah</h2>
              <p className="mt-1 text-sm text-gray-500">
                Pilih mata kuliah untuk melihat silabus.
              </p>
            </div>
            <div className="space-y-2 p-3">
              {dataSemester.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setMataKuliahAktif(item.id)}
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    mataKuliahTerpilih?.id === item.id
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-transparent hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xs font-semibold text-blue-700">
                    {item.kode} · {item.sks} SKS
                  </span>
                  <span className="mt-1 block text-sm font-semibold leading-5 text-gray-800">
                    {item.nama}
                  </span>
                  <span className="mt-2 block text-xs text-gray-500">
                    {item.dosen}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* Detail silabus */}
          {mataKuliahTerpilih ? (
            <section className="min-w-0 space-y-5">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {mataKuliahTerpilih.kode}
                    </span>
                    <h2 className="mt-3 text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
                      {mataKuliahTerpilih.nama}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                      {mataKuliahTerpilih.dosen}
                    </p>
                  </div>
                  <div className="rounded-xl bg-gray-50 px-4 py-3 text-center">
                    <p className="text-2xl font-bold text-blue-700">
                      {mataKuliahTerpilih.sks}
                    </p>
                    <p className="text-xs text-gray-500">SKS</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Semester</p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      Semester {mataKuliahTerpilih.semester}
                    </p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Jadwal</p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {mataKuliahTerpilih.hari}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {formatWaktu(
                        mataKuliahTerpilih.mulai,
                        mataKuliahTerpilih.selesai
                      )}
                    </p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Ruang</p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {mataKuliahTerpilih.ruang}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-bold text-gray-800">
                    Deskripsi Mata Kuliah
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    {mataKuliahTerpilih.deskripsi}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                    <Ikon nama="target" />
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-800">
                      Capaian Pembelajaran
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Kemampuan yang diharapkan setelah mengikuti perkuliahan.
                    </p>
                  </div>
                </div>
                <ol className="mt-5 space-y-3">
                  {mataKuliahTerpilih.capaian.map((item, index) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-gray-600">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Ikon nama="book" />
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-800">
                      Rencana Materi Perkuliahan
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Contoh urutan materi untuk satu semester.
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-0">
                  {mataKuliahTerpilih.materi.map((item, index) => (
                    <div key={`${index}-${item}`} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-xs font-semibold text-gray-600">
                          {index + 1}
                        </span>
                        {index < mataKuliahTerpilih.materi.length - 1 && (
                          <span className="my-1 min-h-5 w-px flex-1 bg-gray-200" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1 pb-5">
                        <p className="pt-1.5 text-sm font-medium text-gray-800">
                          {item}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          Pertemuan {index + 1}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h3 className="font-bold text-gray-800">
                    Komponen Penilaian
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Contoh pembobotan nilai akhir.
                  </p>
                  <div className="mt-5 space-y-4">
                    {mataKuliahTerpilih.penilaian.map((item) => (
                      <div key={item.nama}>
                        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                          <span className="text-gray-600">{item.nama}</span>
                          <span className="font-semibold text-gray-800">
                            {item.bobot}%
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{ width: `${item.bobot}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-gray-400">
                    Total bobot:{' '}
                    {mataKuliahTerpilih.penilaian.reduce(
                      (total, item) => total + item.bobot,
                      0
                    )}%
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h3 className="font-bold text-gray-800">
                    Referensi Pembelajaran
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Bahan rujukan untuk belajar lebih lanjut.
                  </p>
                  <ul className="mt-5 space-y-3">
                    {mataKuliahTerpilih.referensi.map((item, index) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-6 text-gray-600">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                          <Ikon nama="book" className="h-3.5 w-3.5" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                <Ikon nama="calendar" className="mt-0.5 h-5 w-5 shrink-0" />
                <p>
                  Silabus, urutan materi, dan komponen penilaian di halaman ini
                  merupakan contoh rancangan. Silabus resmi tetap mengacu pada
                  dokumen yang ditetapkan dosen pengampu.
                </p>
              </div>
            </section>
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
              Belum ada data silabus untuk semester ini.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
