import React from 'react';
import { studentData } from '../../data/studentData';

export const CetakBiodataPage = ({ setActiveTab }) => {
  const data = studentData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* ========================================================= */}
      {/* 1. AKSI ATAS (Tombol Kembali & Cetak - Sembunyi Saat Cetak) */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div>
          <h1 className="text-lg font-bold text-slate-800">Cetak Biodata Mahasiswa</h1>
          <p className="text-xs text-slate-500">
            Pratinjau formulir resmi sebelum dicetak atau disimpan sebagai PDF.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {setActiveTab && (
            <button
              onClick={() => setActiveTab('biodata')}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs sm:text-sm font-semibold transition"
            >
              ← Kembali
            </button>
          )}
          <button
            onClick={handlePrint}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition shadow-sm flex items-center gap-2"
          >
            <span>🖨️</span> Cetak / PDF
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. DOKUMEN BIODATA A4 (Area Cetak Resmi) */}
      {/* ========================================================= */}
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-md border border-slate-200 print:shadow-none print:border-none print:p-0 print:m-0 text-slate-900 font-sans">
        
        {/* KOP SURAT UNIVERSITAS */}
        <div className="flex items-center gap-4 border-b-4 border-double border-slate-900 pb-3 mb-6">
          <div className="w-20 h-20 shrink-0 flex items-center justify-center">
            <img 
              src="/images/logo-uin.png" 
              alt="Logo Kampus" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.parentElement.innerHTML = '<div class="w-16 h-16 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center text-center">UIN</div>';
              }}
            />
          </div>
          <div className="flex-1 text-center">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
              Kementerian Agama Republik Indonesia
            </h3>
            <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-wide text-slate-900">
              Universitas Islam Negeri Salatiga
            </h2>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">
              Fakultas {data.fakultas}
            </h4>
            <p className="text-[11px] text-slate-600 mt-1">
              Jl. Lingkar Salatiga Km. 02 Pulutan, Sidorejo, Kota Salatiga, Jawa Tengah
              <br />
              Website: www.uinsalatiga.ac.id | Email: info@uinsalatiga.ac.id
            </p>
          </div>
        </div>

        {/* JUDUL FORMULIR */}
        <div className="text-center mb-6">
          <h1 className="text-base sm:text-lg font-bold uppercase underline tracking-wide">
            BIODATA MAHASISWA
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Tahun Akademik {data.academicYear}
          </p>
        </div>

        {/* DATA UTAMA & PAS FOTO */}
        <div className="flex flex-col sm:flex-row gap-6 mb-6 text-xs sm:text-sm">
          {/* Tabel Informasi Identitas */}
          <table className="flex-1 border-collapse text-slate-800">
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="py-1.5 font-semibold w-36">NIM</td>
                <td className="py-1.5 w-3 text-center">:</td>
                <td className="py-1.5 font-bold text-slate-900">{data.nim}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-1.5 font-semibold">Nama Lengkap</td>
                <td className="py-1.5 text-center">:</td>
                <td className="py-1.5 font-bold uppercase text-slate-900">{data.name}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-1.5 font-semibold">Tempat, Tgl Lahir</td>
                <td className="py-1.5 text-center">:</td>
                <td className="py-1.5">{data.tmptlahir}, {data.tgllahir}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-1.5 font-semibold">Jenis Kelamin</td>
                <td className="py-1.5 text-center">:</td>
                <td className="py-1.5">{data.jeniskelamin}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-1.5 font-semibold">Agama</td>
                <td className="py-1.5 text-center">:</td>
                <td className="py-1.5">{data.agama}</td>
              </tr>
            </tbody>
          </table>

          {/* Bingkai Pas Foto 3x4 */}
          <div className="self-center sm:self-start shrink-0">
            <div className="w-28 h-36 sm:w-32 sm:h-42 border-2 border-slate-400 bg-slate-50 flex flex-col items-center justify-center p-2 text-center text-slate-400 rounded">
              <span className="text-xs font-semibold">Pas Foto</span>
              <span className="text-[10px]">3 x 4 cm</span>
            </div>
          </div>
        </div>

        {/* DETAIL AKADEMIK & KONTAK */}
        <div className="space-y-4 text-xs sm:text-sm mb-10">
          <div>
            <h4 className="font-bold text-slate-900 border-b-2 border-slate-800 pb-1 mb-2 uppercase text-xs">
              A. Program Studi & Status Akademik
            </h4>
            <table className="w-full border-collapse text-slate-800">
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-1.5 font-semibold w-40">Fakultas</td>
                  <td className="py-1.5 w-3 text-center">:</td>
                  <td className="py-1.5">{data.fakultas}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-1.5 font-semibold">Program Studi</td>
                  <td className="py-1.5 text-center">:</td>
                  <td className="py-1.5 font-medium">{data.prodi}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-1.5 font-semibold">Semester / Angkatan</td>
                  <td className="py-1.5 text-center">:</td>
                  <td className="py-1.5">Semester {data.semester} / Angkatan {data.angkatan}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-1.5 font-semibold">Status Akademik</td>
                  <td className="py-1.5 text-center">:</td>
                  <td className="py-1.5 font-medium text-emerald-700">{data.statusAkademik}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-1.5 font-semibold">IPK / SKS Kumulatif</td>
                  <td className="py-1.5 text-center">:</td>
                  <td className="py-1.5 font-bold">{data.ipk} ({data.totalSks} dari {data.targetSks} SKS)</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-1.5 font-semibold">Dosen Penasihat Akademik</td>
                  <td className="py-1.5 text-center">:</td>
                  <td className="py-1.5">{data.dosenPA}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 border-b-2 border-slate-800 pb-1 mb-2 uppercase text-xs">
              B. Alamat & Kontak Pribadi
            </h4>
            <table className="w-full border-collapse text-slate-800">
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-1.5 font-semibold w-40">Nomor Telepon/HP</td>
                  <td className="py-1.5 w-3 text-center">:</td>
                  <td className="py-1.5">{data.nohp}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-1.5 font-semibold">Email Mahasiswa</td>
                  <td className="py-1.5 text-center">:</td>
                  <td className="py-1.5">{data.email}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-1.5 font-semibold">Alamat Lengkap</td>
                  <td className="py-1.5 text-center">:</td>
                  <td className="py-1.5">{data.alamatlengkap} (Kode Pos: {data.kodepos})</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* KOLOM TANDA TANGAN */}
        <div className="text-xs sm:text-sm pt-4">
          <div className="flex justify-between items-start text-center">
            <div className="w-64">
              <p>Mengetahui,</p>
              <p className="font-semibold text-slate-900 mt-0.5">Dosen Penasihat Akademik</p>
              <div className="h-20"></div>
              <p className="font-bold text-slate-900 underline">{data.dosenPA}</p>
            </div>

            <div className="w-64">
              <p>Salatiga, 17 Oktober 2026</p>
              <p className="font-semibold text-slate-900 mt-0.5">Mahasiswa Bersangkutan,</p>
              <div className="h-20"></div>
              <p className="font-bold text-slate-900 underline uppercase">{data.name}</p>
              <p className="text-[11px] text-slate-600 mt-0.5">NIM. {data.nim}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};