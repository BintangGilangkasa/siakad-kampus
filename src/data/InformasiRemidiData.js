
export const informasiRemidi = {
  nim: '2301019082',
  nama: 'Bintang Gilangkasa Syailendra',
  angkatan: 2023,
  jurusan: 'S1 - Sains Data (R)',
  ipSemester: '-',
};

export const periodeRemidi = {
  '2026/2027-Ganjil': {
    tahunAkademik: '2026/2027',
    semester: 'Ganjil',
    semesterPerkuliahan: 7,
    statusPeriode: 'Belum dibuka',
    aturan: [
      'Tahun akademik remidi yang aktif adalah 2026/2027 Ganjil.',
      'Jadwal KRS Remidi belum dibuka.',
      'Belum ada mata kuliah yang dapat diremidikan pada periode ini.',
    ],
    jadwalRemidi: [
      {
        id: 'SD701',
        kode: 'SD701',
        mataKuliah: 'Magang',
        sks: 4,
        nilai: '-',
        tersedia: false,
        status: 'Belum dibuka',
      },
      {
        id: 'SD702',
        kode: 'SD702',
        mataKuliah: 'Seminar Proposal',
        sks: 2,
        nilai: '-',
        tersedia: false,
        status: 'Belum dibuka',
      },
      {
        id: 'SD703',
        kode: 'SD703',
        mataKuliah: 'Proyek Sains Data',
        sks: 3,
        nilai: '-',
        tersedia: false,
        status: 'Belum dibuka',
      },
    ],
  },

  '2025/2026-Genap': {
    tahunAkademik: '2025/2026',
    semester: 'Genap',
    semesterPerkuliahan: 6,
    statusPeriode: 'Simulasi tersedia',
    aturan: [
      'Periode ini digunakan untuk simulasi remidi semester 6.',
      'Terdapat tiga mata kuliah contoh dalam data simulasi.',
      'Nilai dan kelayakan remidi perlu diverifikasi dengan data akademik resmi.',
    ],
    jadwalRemidi: [
      {
        id: 'SD601',
        kode: 'SD601',
        mataKuliah: 'Deep Learning',
        sks: 3,
        hadir: 12,
        totalPertemuan: 14,
        nilai: 'D',
        tersedia: true,
        status: 'Dapat diajukan (simulasi)',
      },
      {
        id: 'SD602',
        kode: 'SD602',
        mataKuliah: 'Big Data Analytics',
        sks: 3,
        hadir: 14,
        totalPertemuan: 14,
        nilai: 'B',
        tersedia: false,
        status: 'Tidak memenuhi contoh kriteria',
      },
      {
        id: 'SD603',
        kode: 'SD603',
        mataKuliah: 'Rekayasa Data',
        sks: 3,
        hadir: 8,
        totalPertemuan: 14,
        nilai: 'D',
        tersedia: true,
        status: 'Dapat diajukan (simulasi)',
      },
    ],
  },
};
