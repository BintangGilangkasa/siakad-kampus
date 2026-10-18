import React from 'react';
import { studentData } from '../../data/studentData';
import { availableCourses } from '../../data/krsData';

import logoIcon from '../../assets/logo-uin.png'

const CetakKrsPage = ({ setActiveTab }) => {
  const student = studentData;
  // Mengambil daftar matakuliah (atau menggunakan sampel jika dari state/props)
  const courses = availableCourses || [];
  const totalSks = courses.reduce((sum, item) => sum + item.sks, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Tombol Aksi (Hilang saat Dicetak) */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div>
          <h1 className="text-lg font-bold text-slate-800">Cetak Kartu Rencana Studi (KRS)</h1>
          <p className="text-xs text-slate-500">
            Pratinjau lembar persetujuan KRS resmi sebelum dicetak atau disimpan ke PDF.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {setActiveTab && (
            <button
              onClick={() => setActiveTab('isi-krs')}
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

      {/* Dokumen Lembar Cetak A4 */}
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-md border border-slate-200 print:shadow-none print:border-none print:p-0 print:m-0 text-slate-900 font-sans">
        
        {/* Kop Surat */}
        <div className="flex items-center gap-4 border-b-4 border-double border-slate-900 pb-3 mb-6">
          <div className="w-20 h-20 shrink-0 flex items-center justify-center">
            <img 
              src={logoIcon}
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
              Fakultas {student.fakultas}
            </h4>
            <p className="text-[11px] text-slate-600 mt-1">
              Jl. Lingkar Salatiga Km. 02 Pulutan, Sidorejo, Kota Salatiga, Jawa Tengah
              <br />
              Website: www.uinsalatiga.ac.id | Email: info@uinsalatiga.ac.id
            </p>
          </div>
        </div>

        {/* Judul Dokument */}
        <div className="text-center mb-6">
          <h1 className="text-base sm:text-lg font-bold uppercase underline tracking-wide">
            KARTU RENCANA STUDI (KRS)
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Tahun Akademik {student.academicYear}
          </p>
        </div>

        {/* Header Data Mahasiswa */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200 print:bg-transparent print:p-0 print:border-none">
          <div className="space-y-1">
            <p><span className="font-semibold inline-block w-28">NIM</span>: {student.nim}</p>
            <p><span className="font-semibold inline-block w-28">Nama</span>: <span className="uppercase">{student.name}</span></p>
            <p><span className="font-semibold inline-block w-28">Program Studi</span>: {student.prodi}</p>
          </div>
          <div className="space-y-1">
            <p><span className="font-semibold inline-block w-28">Semester</span>: Semester {student.semester}</p>
            <p><span className="font-semibold inline-block w-28">Dosen PA</span>: {student.dosenPA}</p>
            <p><span className="font-semibold inline-block w-28">Batas Maks. SKS</span>: 24 SKS</p>
          </div>
        </div>

        {/* Tabel Mata Kuliah */}
        <table className="w-full text-xs sm:text-sm border-collapse border border-slate-300 mb-6">
          <thead>
            <tr className="bg-slate-100 print:bg-slate-200 text-slate-900 font-bold text-center">
              <th className="border border-slate-300 py-2 px-2 w-10">No</th>
              <th className="border border-slate-300 py-2 px-2 w-28">Kode</th>
              <th className="border border-slate-300 py-2 px-3 text-left">Mata Kuliah</th>
              <th className="border border-slate-300 py-2 px-2 w-14">SKS</th>
              <th className="border border-slate-300 py-2 px-2 w-16">Kelas</th>
              <th className="border border-slate-300 py-2 px-3 text-left">Dosen Pengampu</th>
              <th className="border border-slate-300 py-2 px-2 w-16">Ruang</th>
              <th className="border border-slate-300 py-2 px-3 text-left">Hari</th>
              <th className="border border-slate-300 py-2 px-3 text-left">Jam</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <tr key={course.id || index} className="hover:bg-slate-50 print:bg-transparent">
                  <td className="border border-slate-300 py-2 px-2 text-center">{index + 1}</td>
                  <td className="border border-slate-300 py-2 px-2 text-center font-mono">{course.code}</td>
                  <td className="border border-slate-300 py-2 px-3 font-medium">{course.name}</td>
                  <td className="border border-slate-300 py-2 px-2 text-center font-semibold">{course.sks}</td>
                  <td className="border border-slate-300 py-2 px-2 text-center">{course.class || 'A'}</td>
                  <td className="border border-slate-300 py-2 px-3">{course.lecturer}</td>
                  <td className="border border-slate-300 py-2 px-2 text-center">{course.room}</td>
                  <td className="border border-slate-300 py-2 px-2 text-center">{course.day}</td>
                  <td className="border border-slate-300 py-2 px-2 text-center">{course.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="border border-slate-300 py-4 text-center text-slate-500">
                  Belum ada mata kuliah yang diambil.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="bg-slate-50 print:bg-slate-100 font-bold">
              <td colSpan="3" className="border border-slate-300 py-2 px-3 text-right">Total SKS Diambil:</td>
              <td className="border border-slate-300 py-2 px-2 text-center text-blue-700 print:text-slate-900">{totalSks}</td>
              <td colSpan="5" className="border border-slate-300 py-2 px-3"></td>
            </tr>
          </tfoot>
        </table>

        {/* Tanda Tangan Persetujuan */}
        <div className="text-xs sm:text-sm pt-4">
          <div className="flex justify-between items-start text-center">
            <div className="w-60">
              <p>Menyetujui,</p>
              <p className="font-semibold text-slate-900 mt-0.5">Dosen Pembimbing Akademik</p>
              <div className="h-20"></div>
              <p className="font-bold text-slate-900 underline">{student.dosenPA}</p>
            </div>

            <div className="w-60">
              <p>Salatiga, 17 Oktober 2026</p>
              <p className="font-semibold text-slate-900 mt-0.5">Mahasiswa,</p>
              <div className="h-20"></div>
              <p className="font-bold text-slate-900 underline uppercase">{student.name}</p>
              <p className="text-[11px] text-slate-600 mt-0.5">NIM. {student.nim}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CetakKrsPage;