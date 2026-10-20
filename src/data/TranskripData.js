import { dataKhs, konfigurasiSemester } from './KhsData';

// ==========================================
// DAFTAR SEMESTER
// ==========================================
export const daftarSemesterTranskrip = [
  {
    nomor: 'semua',
    label: 'Semua Semester',
  },
  ...Object.entries(konfigurasiSemester)
    .map(([nomor, konfigurasi]) => ({
      nomor,
      tahunAjaran: konfigurasi.tahunAjaran,
      periode: konfigurasi.periode,
      label: `Semester ${nomor} (${konfigurasi.tahunAjaran} ${konfigurasi.periode})`,
    }))
    .sort((a, b) => Number(b.nomor) - Number(a.nomor)),
];

// ==========================================
// MENGAMBIL DATA TRANSKRIP
// ==========================================
export const ambilDataTranskrip = (
  semester = '7',
  tampilkanBelumDiambil = false
) => {
  let data = [...dataKhs];

  // Filter semester
  if (semester !== 'semua') {
    data = data.filter(
      (item) => Number(item.semester) === Number(semester)
    );
  }

  // Filter mata kuliah yang belum memiliki nilai
  if (!tampilkanBelumDiambil) {
    data = data.filter(
      (item) =>
        item.nilai !== null &&
        item.nilai !== undefined &&
        item.bobot !== null &&
        item.bobot !== undefined
    );
  }

  // Urutkan berdasarkan semester dan kode
  return data.sort((a, b) => {
    if (a.semester !== b.semester) {
      return a.semester - b.semester;
    }

    return a.kode.localeCompare(b.kode);
  });
};

// ==========================================
// MENGHITUNG RINGKASAN TRANSKRIP
// ==========================================
export const hitungRingkasanTranskrip = (data) => {
  const dataBernilai = data.filter(
    (item) =>
      item.bobot !== null &&
      item.bobot !== undefined &&
      item.nilaiXSkS !== null &&
      item.nilaiXSkS !== undefined
  );

  const totalSks = dataBernilai.reduce(
    (total, item) => total + Number(item.sks || 0),
    0
  );

  const totalNilaiBerbobot = dataBernilai.reduce(
    (total, item) => total + Number(item.nilaiXSkS || 0),
    0
  );

  const ipk =
    totalSks > 0 ? totalNilaiBerbobot / totalSks : 0;

  return {
    jumlahMataKuliah: data.length,
    totalSks,
    totalNilaiBerbobot,
    totalBobotSks: totalNilaiBerbobot,
    ipk,
  };
};