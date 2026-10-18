import React from 'react';
import { studentData } from '../../data/studentData';
import { availableCourses } from '../../data/krsData';
import { 
  Printer, 
  Check, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  CreditCard, 
  UserCheck, 
  ArrowRight,
  FileText
} from 'lucide-react';

const StatusRegistrasiPage = ({ setActiveTab }) => {
  const student = studentData;
  const courses = availableCourses || [];
  const totalSks = courses.reduce((sum, item) => sum + item.sks, 0);

  const statusPembayaran = student.statusPembayaran || 'Lunas';
  const statusAccPA = student.statusAccPA || 'Disetujui';

  const steps = [
    {
      id: 1,
      title: 'Penawaran Matkul',
      description: 'Melihat & menyimpan penawaran matkul',
      status: 'complete',
    },
    {
      id: 2,
      title: 'Pembayaran UKT',
      description: 'Lunas tagihan keuangan semester',
      status: statusPembayaran === 'Lunas' ? 'complete' : 'current',
    },
    {
      id: 3,
      title: 'Pengisian KRS',
      description: 'Memilih & mengunci mata kuliah',
      status: statusPembayaran === 'Lunas' ? 'complete' : 'upcoming',
    },
    {
      id: 4,
      title: 'ACC Dosen PA',
      description: `Persetujuan oleh ${student.dosenPA}`,
      status:
        statusAccPA === 'Disetujui'
          ? 'complete'
          : statusAccPA === 'Pending'
          ? 'current'
          : 'upcoming',
    },
    {
      id: 5,
      title: 'KRS & Jadwal Resmi',
      description: 'Siap dicetak dan perkuliahan dimulai',
      status: statusAccPA === 'Disetujui' ? 'complete' : 'upcoming',
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-sans">
      {/* 1. HEADER HALAMAN */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Tahun Akademik {student.academicYear || 'Ganjil 2026/2027'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {student.statusAkademik || 'Aktif Kuliah'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-blue-600" />
            <span>Status Registrasi & ACC KRS</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pantau progres persetujuan KRS dan tahapan registrasi akademik kamu semester ini.
          </p>
        </div>

        {statusAccPA === 'Disetujui' && setActiveTab && (
          <button
            onClick={() => setActiveTab('cetak-krs')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition shadow-sm flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Lembar KRS</span>
          </button>
        )}
      </div>

      {/* 2. TIMELINE PROGRES */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">
          Alur Registrasi Akademik
        </h2>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
            {steps.map((step) => {
              const isComplete = step.status === 'complete';
              const isCurrent = step.status === 'current';

              return (
                <div
                  key={step.id}
                  className="flex md:flex-col items-start md:items-center text-left md:text-center gap-3 md:gap-2 p-3 md:p-0 rounded-xl bg-slate-50 md:bg-transparent border border-slate-100 md:border-none"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-all ${
                      isComplete
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100'
                        : isCurrent
                        ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isComplete ? <Check className="w-5 h-5" /> : step.id}
                  </div>

                  <div>
                    <h3
                      className={`text-xs sm:text-sm font-bold ${
                        isComplete
                          ? 'text-slate-900'
                          : isCurrent
                          ? 'text-amber-700'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. KARTU DETAIL STATUS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Pembayaran UKT */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Tahap 1 & 2
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                  statusPembayaran === 'Lunas'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {statusPembayaran === 'Lunas' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Pembayaran Lunas</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Belum Lunas</span>
                  </>
                )}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-slate-700" />
              <span>Keuangan & UKT Semester</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Pembayaran UKT membuka akses untuk melakukan pengisian dan penguncian mata kuliah di KRS.
            </p>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Status Tagihan:</span>
                <span className="font-semibold text-slate-800">Lunas / Terverifikasi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Batas Pengisian KRS:</span>
                <span className="font-semibold text-slate-800">{student.batasKrs || '20 Okt 2026'}</span>
              </div>
            </div>
          </div>

          {statusPembayaran !== 'Lunas' && setActiveTab && (
            <button
              onClick={() => setActiveTab('keuangan')}
              className="mt-4 w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <span>Bayar UKT Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status ACC Dosen PA */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Tahap 4
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                  statusAccPA === 'Disetujui'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : statusAccPA === 'Pending'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {statusAccPA === 'Disetujui' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Disetujui Dosen PA</span>
                  </>
                ) : statusAccPA === 'Pending' ? (
                  <>
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Menunggu ACC</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Perlu Revisi</span>
                  </>
                )}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-slate-700" />
              <span>Persetujuan Dosen PA</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Dosen Penasihat Akademik (PA) memeriksa kesesuaian beban SKS dan mata kuliah yang kamu ambil.
            </p>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Dosen PA:</span>
                <span className="font-semibold text-slate-800">{student.dosenPA}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Matkul & SKS:</span>
                <span className="font-semibold text-slate-800">
                  {courses.length} Matkul ({totalSks} SKS)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            {setActiveTab && (
              <button
                onClick={() => setActiveTab('isi-krs')}
                className="flex-1 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition"
              >
                Lihat KRS Saya
              </button>
            )}
            {statusAccPA === 'Disetujui' && setActiveTab && (
              <button
                onClick={() => setActiveTab('cetak-krs')}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak KRS</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. RINGKASAN MATA KULIAH */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Daftar Mata Kuliah dalam Pengajuan KRS
            </h3>
            <p className="text-xs text-slate-500">
              Rincian jadwal dan mata kuliah yang menunggu / telah disetujui Dosen PA.
            </p>
          </div>
          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">
            Total SKS: {totalSks} SKS
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-2.5 px-3">Kode</th>
                <th className="py-2.5 px-3">Mata Kuliah</th>
                <th className="py-2.5 px-3 text-center">SKS</th>
                <th className="py-2.5 px-3 text-center">Kelas</th>
                <th className="py-2.5 px-3">Jadwal & Ruang</th>
                <th className="py-2.5 px-3">Dosen Pengampu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map((course, idx) => (
                <tr key={course.id || idx} className="hover:bg-slate-50/80">
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">
                    {course.code || course.kode}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-900">
                    {course.name || course.namaMatkul}
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-blue-600">
                    {course.sks}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {course.class || course.kelas || 'A'}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    <span className="font-medium text-slate-800">
                      {course.day || course.hari} ({course.time || course.jam})
                    </span>
                    <br />
                    <span className="text-[11px] text-slate-400">
                      {course.room || course.ruang}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">
                    {course.lecturer || course.dosen}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatusRegistrasiPage;