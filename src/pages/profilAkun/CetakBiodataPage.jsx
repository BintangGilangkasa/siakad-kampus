import React from 'react';
import { studentData } from '../../data/studentData';
import logoIcon from '../../assets/logo-uin.png';
import { Printer, ArrowLeft } from 'lucide-react';

const CetakBiodataPage = ({ setActiveTab }) => {
  const student = studentData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-12 font-sans px-2 sm:px-0">
      {/* Tombol Aksi Header - Responsif */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-800">Cetak Biodata Mahasiswa</h1>
          <p className="text-xs text-slate-500">
            Pratinjau lembar biodata resmi terintegrasi sebelum dicetak atau disimpan ke PDF.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">

          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Dokumen (PDF)</span>
          </button>
        </div>
      </div>

      {/* Lembar Cetak Biodata Resmi */}
      <div className="bg-white p-4 sm:p-8 rounded-2xl border border-slate-200 shadow-sm print:shadow-none print:border-none print:p-0 print:m-0 print:w-full space-y-4 text-slate-900">
        
        {/* Kop Surat Kampus */}
        <div className="flex flex-row items-center justify-between border-b-4 border-double border-slate-900 pb-2 mb-3">
          <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center">
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
          <div className="flex-1 text-center px-1 sm:px-2">
            <h3 className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700">
              Kementerian Agama Republik Indonesia
            </h3>
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900">
              Universitas Islam Negeri Salatiga
            </h2>
            <p className="text-[8px] sm:text-[10px] text-slate-600 leading-tight mt-0.5">
              Jl. Lingkar Salatiga Km. 02, Pulutan, Sidorejo, Kota Salatiga, Jawa Tengah 50716
            </p>
            <p className='text-[8px] sm:text-[10px] text-slate-600 leading-tight mt-0.5'>
              Email: info@uinsalatiga.ac.id
            </p>
          </div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 opacity-0"></div> {/* Spacer Penyeimbang Centering */}
        </div>

        {/* Judul Dokumen */}
        <div className="text-center py-1">
          <h1 className="text-xs sm:text-sm font-bold uppercase tracking-wider underline text-slate-900">
            BIODATA MAHASISWA
          </h1>
          <p className="text-[10px] sm:text-[11px] text-slate-600 mt-0.5">
            Tahun Akademik {student?.academicYear || '2026/2027'}
          </p>
        </div>

        {/* Tabel Data Diri & Pasfoto */}
        <div className="flex flex-col-reverse sm:flex-row print:flex-row gap-4 items-center sm:items-start print:items-start">
          <div className="flex-1 w-full overflow-x-auto print:overflow-visible">
            <table className="w-full text-[11px] sm:text-xs border-collapse border border-slate-300">
              <tbody className="divide-y divide-slate-300">
                <tr>
                  <td className="py-1.5 px-2 sm:px-3 font-semibold bg-slate-50 w-28 sm:w-40 border-r border-slate-300 text-slate-600">Nama Lengkap</td>
                  <td className="py-1.5 px-2 sm:px-3 font-bold text-slate-900">{student?.name || 'nama user'}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 sm:px-3 font-semibold bg-slate-50 border-r border-slate-300 text-slate-600">NIM</td>
                  <td className="py-1.5 px-2 sm:px-3 font-mono font-bold text-slate-900">{student?.nim || '2301019082'}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 sm:px-3 font-semibold bg-slate-50 border-r border-slate-300 text-slate-600">Fakultas</td>
                  <td className="py-1.5 px-2 sm:px-3">{student?.fakultas || 'Sains dan Teknologi'}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 sm:px-3 font-semibold bg-slate-50 border-r border-slate-300 text-slate-600">Program Studi</td>
                  <td className="py-1.5 px-2 sm:px-3 font-bold">{student?.prodi || 'S1 - Sains Data'}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 sm:px-3 font-semibold bg-slate-50 border-r border-slate-300 text-slate-600">Semester</td>
                  <td className="py-1.5 px-2 sm:px-3">Semester {student?.semester || 7} ({student?.statusAkademik || 'Aktif Kuliah'})</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 sm:px-3 font-semibold bg-slate-50 border-r border-slate-300 text-slate-600">Status Mahasiswa</td>
                  <td className="py-1.5 px-2 sm:px-3">{student?.statusAkademik || 'Aktif Kuliah'}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 sm:px-3 font-semibold bg-slate-50 border-r border-slate-300 text-slate-600">Tempat, Tgl Lahir</td>
                  <td className="py-1.5 px-2 sm:px-3">{student?.tmptlahir || 'Salatiga'}, {student?.tgllahir || '18 Agustus 2003'}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 sm:px-3 font-semibold bg-slate-50 border-r border-slate-300 text-slate-600">Jenis Kelamin</td>
                  <td className="py-1.5 px-2 sm:px-3">{student?.jeniskelamin || 'Laki-laki'} / {student?.agama || 'Islam'}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 sm:px-3 font-semibold bg-slate-50 border-r border-slate-300 text-slate-600">Agama</td>
                  <td className="py-1.5 px-2 sm:px-3">{student?.agama || 'Islam'}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 sm:px-3 font-semibold bg-slate-50 border-r border-slate-300 text-slate-600">Alamat Lengkap</td>
                  <td className="py-1.5 px-2 sm:px-3">{student?.alamatlengkap || 'Salatiga, Jawa Tengah'}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 sm:px-3 font-semibold bg-slate-50 border-r border-slate-300 text-slate-600">Nomor HP / WA</td>
                  <td className="py-1.5 px-2 sm:px-3">{student?.nohp || '081234567890'}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 sm:px-3 font-semibold bg-slate-50 border-r border-slate-300 text-slate-600">Email Student</td>
                  <td className="py-1.5 px-2 sm:px-3 break-all sm:break-normal">{student?.email || 'bintang@student.uinsalatiga.ac.id'}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 sm:px-3 font-semibold bg-slate-50 border-r border-slate-300 text-slate-600">Dosen Pembimbing PA</td>
                  <td className="py-1.5 px-2 sm:px-3 font-bold text-slate-800">{student?.dosenPA || 'Prof. Eko Prasetyo, Ph.D.'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Kotak Tempat Foto 3x4 */}
          <div className="w-20 h-28 sm:w-24 sm:h-32 border-2 border-dashed border-slate-300 rounded flex items-center justify-center text-[10px] text-slate-400 font-semibold text-center shrink-0 self-center sm:self-start print:self-start mt-1">
            Pasfoto<br />3 x 4
          </div>
        </div>

        {/* Tanda Tangan */}
        <div className="pt-4 sm:pt-6 text-xs text-slate-800">
          <div className="flex flex-row justify-between items-start text-center">
            <div className="w-36 sm:w-56">
              <p className="text-[11px] sm:text-xs">Mahasiswa Bersangkutan,</p>
              <div className="h-12 sm:h-16"></div>
              <p className="font-bold underline uppercase text-[10px] sm:text-xs">{student?.name || 'Bintang Gilangkasa Syailendra'}</p>
              <p className="text-[9px] sm:text-[10px] text-slate-600">NIM. {student?.nim || '2301019082'}</p>
            </div>

            <div className="w-40 sm:w-56">
              <p className="text-[11px] sm:text-xs">Salatiga, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="font-semibold text-slate-900 text-[10px] sm:text-xs">a.n. Bagian Administrasi Akademik,</p>
              <div className="h-12 sm:h-16"></div>
              <p className="font-bold underline text-slate-900 text-[10px] sm:text-xs">{student?.dosenPA || 'Prof. Eko Prasetyo, Ph.D.'}</p>
              <p className="text-[9px] sm:text-[10px] text-slate-600">NIP. 197805122005011002</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CetakBiodataPage;