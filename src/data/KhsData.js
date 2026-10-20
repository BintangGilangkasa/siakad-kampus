import { dataKehadiran, dataJadwalKuliah } from './PerkuliahanData';

// ==========================================
// KONFIGURASI TAHUN AKADEMIK
// ==========================================

export const konfigurasiSemester = {
  1: { tahunAjaran: '2023/2024', periode: 'Ganjil' },
  2: { tahunAjaran: '2023/2024', periode: 'Genap' },
  3: { tahunAjaran: '2024/2025', periode: 'Ganjil' },
  4: { tahunAjaran: '2024/2025', periode: 'Genap' },
  5: { tahunAjaran: '2025/2026', periode: 'Ganjil' },
  6: { tahunAjaran: '2025/2026', periode: 'Genap' },
  7: { tahunAjaran: '2026/2027', periode: 'Ganjil' },
};

// ==========================================
// NILAI SIMULASI
// ==========================================

// Nilai ini hanya untuk demonstrasi antarmuka, bukan nilai akademik resmi.
const nilaiSimulasi = {
  SD101: 'A',
  SD102: 'A-',
  SD103: 'A',
  SD201: 'A-',
  SD202: 'A',
  SD203: 'B+',
  SD204: 'A',
  SD301: 'A',
  SD302: 'A-',
  SD303: 'A',
  SD401: 'A-',
  SD402: 'A',
  SD403: 'B+',
  SD404: 'A',
  SD501: 'A',
  SD502: 'A-',
  SD503: 'A',
  SD504: 'A',
  SD505: 'B+',
  SD601: 'A',
  SD602: 'A',
  SD603: 'A-',
  INF301: 'A',
  INF302: 'A-',
  INF303: 'A',
  INF304: 'A-',
  INF305: 'A',
  INF306: 'A-',
};

const bobotNilai = {
  A: 4.0,
  'A-': 3.75,
  'B+': 3.5,
  B: 3.0,
  'B-': 2.75,
  'C+': 2.5,
  C: 2.0,
  D: 1.0,
  E: 0.0,
};

// ==========================================
// MEMBENTUK DATA KHS
// ==========================================

const dataMataKuliah = [
  ...dataKehadiran.map((item) => ({
    kode: item.kode,
    mataKuliah: item.mataKuliah,
    sks: item.sks,
    semester: Number(item.semester.replace('Semester ', '')),
    kelas: 'A',
  })),

  // Semester 7 memakai data jadwal perkuliahan.
  ...dataJadwalKuliah.map((item) => ({
    kode: item.kode,
    mataKuliah: item.nama,
    sks: item.sks,
    semester: Number(item.semester),
    kelas: item.kelas,
  })),
];

// Hindari duplikasi kode mata kuliah.
// Data semester 7 di dataKehadiran dan dataJadwalKuliah beririsan.
const mataKuliahUnik = [
  ...new Map(dataMataKuliah.map((item) => [item.kode, item])).values(),
];

export const dataKhs = mataKuliahUnik.map((item) => {
  const nilai = nilaiSimulasi[item.kode] ?? null;
  const bobot = nilai ? bobotNilai[nilai] : null;

  return {
    ...item,
    tahunAjaran: konfigurasiSemester[item.semester].tahunAjaran,
    periode: konfigurasiSemester[item.semester].periode,
    nilai,
    bobot,
    nilaiXSkS: bobot === null ? null : bobot * item.sks,
  };
});

// ==========================================
// FUNGSI PERHITUNGAN KHS
// ==========================================

export const hitungRingkasanKhs = (semester) => {
  const daftarNilai = dataKhs.filter(
    (item) => item.semester === Number(semester)
  );

  const totalSks = daftarNilai.reduce(
    (total, item) => total + item.sks,
    0
  );

  const dataBernilai = daftarNilai.filter(
    (item) => item.bobot !== null
  );

  const totalSksBernilai = dataBernilai.reduce(
    (total, item) => total + item.sks,
    0
  );

  const totalNilaiXSkS = dataBernilai.reduce(
    (total, item) => total + item.nilaiXSkS,
    0
  );

  const ips =
    totalSksBernilai > 0
      ? totalNilaiXSkS / totalSksBernilai
      : 0;

  return {
    totalSks,
    totalSksBernilai,
    totalNilaiXSkS,
    ips,
    jumlahMataKuliah: daftarNilai.length,
  };
};

// IPK kumulatif dihitung dari seluruh mata kuliah sampai semester terpilih.
export const hitungIPK = (semester) => {
  const daftarNilai = dataKhs.filter(
    (item) =>
      item.semester <= Number(semester) &&
      item.bobot !== null
  );

  const totalSks = daftarNilai.reduce(
    (total, item) => total + item.sks,
    0
  );

  const totalNilaiXSkS = daftarNilai.reduce(
    (total, item) => total + item.nilaiXSkS,
    0
  );

  return totalSks > 0 ? totalNilaiXSkS / totalSks : 0;
};