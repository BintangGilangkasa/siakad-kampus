import React from 'react';
import { studentData } from '../../data/studentData';
import { availableCourses } from '../../data/krsData';

import logoIcon from '../../assets/logo-uin.png';
import { Printer, ArrowLeft } from 'lucide-react';

const CetakKrsPage = ({ setActiveTab }) => {
  const student = studentData;
  const courses = availableCourses || [];
  const totalSks = courses.reduce((sum, item) => sum + item.sks, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-12 font-sans w-full min-w-0 px-1 sm:px-0">
      
      {/* 1. Tombol Aksi (Hilang saat Dicetak) */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-800 text-center sm:text-left">
            Cetak Kartu Rencana Studi (KRS)
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 text-center sm:text-left mt-0.5">
            Pratinjau lembar persetujuan KRS resmi sebelum dicetak atau disimpan ke PDF.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
          {setActiveTab && (
            <button
              onClick={() => setActiveTab('isi-krs')}
              className="flex-1 sm:flex-none px-3.5 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
          )}
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition shadow-sm flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Lembar KRS</span>
          </button>
        </div>
      </div>

      {/* 2. Dokumen Lembar Cetak A4 */}
      <div className="bg-white p-3.5 sm:p-8 rounded-2xl shadow-md border border-slate-200 print:shadow-none print:border-none print:p-0 print:m-0 print:w-full text-slate-900 overflow-hidden">

        {/* Kop Surat Kampus */}
        <div className="flex flex-row items-center justify-between border-b-2 sm:border-b-4 border-double border-slate-900 pb-2 mb-3 gap-2">
          <div className="w-10 h-10 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center">
            <img
              src={logoIcon}
              alt="Logo UIN Salatiga"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.parentElement.innerHTML = '<div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center text-center">UIN</div>';
              }}
            />
          </div>
          <div className="flex-1 text-center px-1">
            <h3 className="text-[8px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700">
              Kementerian Agama Republik Indonesia
            </h3>
            <h2 className="text-[10px] sm:text-sm font-extrabold uppercase tracking-wide text-slate-900">
              Universitas Islam Negeri Salatiga
            </h2>
            <p className="text-[7.5px] sm:text-[10px] text-slate-600 leading-tight mt-0.5">
              Jl. Lingkar Salatiga Km. 02, Pulutan, Sidorejo, Kota Salatiga, Jawa Tengah 50716
            </p>
            <p className="text-[7.5px] sm:text-[10px] text-slate-600 leading-tight">
              Email: info@uinsalatiga.ac.id
            </p>
          </div>
          <div className="w-10 h-10 sm:w-16 sm:h-16 shrink-0 opacity-0 hidden sm:block"></div>
        </div>

        {/* Judul Dokumen */}
        <div className="text-center mb-3">
          <h1 className="text-xs sm:text-sm font-bold uppercase underline tracking-wide">
            KARTU RENCANA STUDI (KRS)
          </h1>
          <p className="text-[10px] sm:text-[11px] text-slate-600">
            Tahun Akademik {student.academicYear || '2026/2027 Ganjil'}
          </p>
        </div>

        {/* Header Data Mahasiswa (1 Kolom di HP, 2 Kolom di Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px] sm:text-xs mb-3 bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200 print:bg-transparent print:p-0 print:border-none">
          <div className="space-y-0.5">
            <p><span className="font-semibold inline-block w-24 text-slate-600">NIM</span>: {student.nim}</p>
            <p><span className="font-semibold inline-block w-24 text-slate-600">Nama</span>: <strong className="font-bold text-slate-900">{student.name}</strong></p>
            <p><span className="font-semibold inline-block w-24 text-slate-600">Program Studi</span>: {student.prodi}</p>
          </div>
          <div className="space-y-0.5">
            <p><span className="font-semibold inline-block w-24 sm:w-28 text-slate-600">Semester</span>: Semester {student.semester}</p>
            <p><span className="font-semibold inline-block w-24 sm:w-28 text-slate-600">Dosen PA</span>: {student.dosenPA}</p>
            <p><span className="font-semibold inline-block w-24 sm:w-28 text-slate-600">Batas Maks. SKS</span>: 24 SKS</p>
          </div>
        </div>

        {/* Tabel Mata Kuliah dengan Scrollbar Horizontal Khusus Layar Seluler */}
        <div className="overflow-x-auto border border-slate-300 rounded-lg sm:rounded-none sm:border-none mb-4 -mx-1 sm:mx-0">
          <table className="w-full min-w-150 sm:min-w-full text-[10px] sm:text-[11px] border-collapse border-0 sm:border sm:border-slate-300">
            <thead>
              <tr className="bg-slate-100 print:bg-slate-200 text-slate-900 font-bold text-center">
                <th className="border border-slate-300 py-1.5 px-1.5 w-7">No</th>
                <th className="border border-slate-300 py-1.5 px-1.5 w-16 sm:w-20">Kode</th>
                <th className="border border-slate-300 py-1.5 px-2 text-left">Mata Kuliah</th>
                <th className="border border-slate-300 py-1.5 px-1.5 w-8 sm:w-10">SKS</th>
                <th className="border border-slate-300 py-1.5 px-1.5 w-10 sm:w-12">Kelas</th>
                <th className="border border-slate-300 py-1.5 px-2 text-left">Dosen Pengampu</th>
                <th className="border border-slate-300 py-1.5 px-1.5 w-16">Ruang</th>
                <th className="border border-slate-300 py-1.5 px-1.5 w-12">Hari</th>
                <th className="border border-slate-300 py-1.5 px-1.5 w-16">Jam</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <tr key={course.id || index} className="hover:bg-slate-50 print:bg-transparent">
                    <td className="border border-slate-300 py-1 px-1.5 text-center">{index + 1}</td>
                    <td className="border border-slate-300 py-1 px-1.5 text-center font-mono font-semibold">{course.code}</td>
                    <td className="border border-slate-300 py-1 px-2 font-bold">{course.name}</td>
                    <td className="border border-slate-300 py-1 px-1.5 text-center font-semibold">{course.sks}</td>
                    <td className="border border-slate-300 py-1 px-1.5 text-center">{course.class || 'A'}</td>
                    <td className="border border-slate-300 py-1 px-2">{course.lecturer}</td>
                    <td className="border border-slate-300 py-1 px-1.5 text-center">{course.room}</td>
                    <td className="border border-slate-300 py-1 px-1.5 text-center">{course.day}</td>
                    <td className="border border-slate-300 py-1 px-1.5 text-center text-[9px] sm:text-[10px]">{course.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="border border-slate-300 py-3 text-center text-slate-500">
                    Belum ada mata kuliah yang diambil.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 print:bg-slate-100 font-bold">
                <td colSpan="3" className="border border-slate-300 py-1 px-2 text-right">Total SKS Diambil:</td>
                <td className="border border-slate-300 py-1 px-1.5 text-center text-blue-700 print:text-slate-900">{totalSks}</td>
                <td colSpan="5" className="border border-slate-300 py-1 px-2"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Tanda Tangan Persetujuan */}
        <div className="text-[11px] sm:text-xs pt-1">
          <div className="flex justify-between items-start text-center gap-2">
            <div className="w-36 sm:w-56">
              <p className="text-[10px] sm:text-xs">Menyetujui,</p>
              <p className="font-semibold text-slate-900 leading-tight">Dosen Pembimbing Akademik</p>
              <div className="h-12 sm:h-14"></div>
              <p className="font-bold text-slate-900 underline text-[10px] sm:text-xs">{student.dosenPA}</p>
            </div>

            <div className="w-36 sm:w-56">
              <p className="text-[10px] sm:text-xs">Salatiga, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="font-semibold text-slate-900 leading-tight">Mahasiswa,</p>
              <div className="h-12 sm:h-14"></div>
              <p className="font-bold text-slate-900 underline uppercase text-[10px] sm:text-xs">{student.name}</p>
              <p className="text-[9px] sm:text-[10px] text-slate-600">NIM. {student.nim}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CetakKrsPage;