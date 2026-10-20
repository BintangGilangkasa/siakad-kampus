import React, { useState } from 'react';
import { studentData } from '../../data/studentData';
import { availableCourses } from '../../data/krsData';
import { 
  Search, 
  Clock, 
  MapPin, 
  User, 
  Trash2, 
  Plus, 
  Check, 
  AlertTriangle, 
  BookOpen, 
  CheckCircle2,
  Info
} from 'lucide-react';

const KrsPage = ({ setActiveTab }) => {
  const student = studentData;
  const courses = availableCourses || [];

  const isPaid = student.statusPembayaran === 'Lunas';
  const maxSks = 24;

  const [selectedIds, setSelectedIds] = useState(['INF301', 'INF302']);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCourses = courses.filter((c) =>
    selectedIds.includes(c.id || c.kode || c.code)
  );

  const totalSks = selectedCourses.reduce((sum, item) => sum + item.sks, 0);
  const remainingSks = maxSks - totalSks;
  const progressPercent = Math.min(100, Math.round((totalSks / maxSks) * 100));

  const handleAddCourse = (course) => {
    const courseId = course.id || course.kode || course.code;
    if (selectedIds.includes(courseId)) return;

    if (totalSks + course.sks > maxSks) {
      alert(`Batas maksimum pengambilan adalah ${maxSks} SKS! Sisa SKS kamu: ${remainingSks} SKS.`);
      return;
    }

    setSelectedIds([...selectedIds, courseId]);
  };

  const handleRemoveCourse = (courseId) => {
    setSelectedIds(selectedIds.filter((id) => id !== courseId));
  };

  const handleSubmitKrs = () => {
    if (!isPaid) {
      alert('Pembayaran UKT belum terverifikasi! Silakan lakukan pembayaran UKT terlebih dahulu.');
      if (setActiveTab) setActiveTab('keuangan');
      return;
    }

    if (selectedCourses.length === 0) {
      alert('Silakan pilih minimal 1 mata kuliah sebelum menyimpan KRS.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`KRS berhasil disimpan (${totalSks} SKS) dan diajukan ke Dosen PA: ${student.dosenPA}`);
      if (setActiveTab) setActiveTab('status-registrasi');
    }, 600);
  };

  const filteredCourses = courses.filter((course) => {
    const name = course.name || course.namaMatkul || '';
    const code = course.code || course.kode || '';
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
      {/* 1. PERINGATAN UKT BELUM LUNAS */}
      {!isPaid && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-900">
                Status Pembayaran UKT: Belum Terverifikasi Lunas
              </h3>
              <p className="text-xs text-amber-800 mt-0.5">
                Kamu dapat memilih draf mata kuliah, tetapi penguncian KRS memerlukan pelunasan UKT.
              </p>
            </div>
          </div>
          {setActiveTab && (
            <button
              onClick={() => setActiveTab('keuangan')}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shrink-0 transition"
            >
              Bayar UKT Sekarang →
            </button>
          )}
        </div>
      )}

      {/* 2. HEADER & INDIKATOR KAPASITAS SKS */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-slate-500 font-medium">
              Semester {student.semester} ({student.academicYear})
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span>Pengisian KRS Interaktif</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Jatah Maksimum SKS Semester Ini: <strong className="text-slate-800">{maxSks} SKS</strong> (Berdasarkan IPK {student.ipk})
          </p>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full lg:w-80 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-600 font-medium">
              Terpakai: <strong className="text-blue-700">{totalSks} SKS</strong>
            </span>
            <span className="text-slate-600 font-medium">
              Sisa: <strong className="text-emerald-700">{remainingSks} SKS</strong>
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div  
              className={`h-full transition-all duration-300 ${
                totalSks > maxSks ? 'bg-rose-500' : 'bg-blue-600'
              }`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 3. LAYOUT UTAMA (DAFTAR MATKUL & PANEL DRAF) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* KOLOM KIRI: DAFAR MATA KULIAH */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h2 className="text-base font-bold text-slate-900">
              Penawaran Mata Kuliah & Jadwal
            </h2>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari kode / mata kuliah..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => {
                const courseId = course.id || course.kode || course.code;
                const isSelected = selectedIds.includes(courseId);
                const isFull = (course.terisi || course.filled) >= (course.kuota || course.quota);

                return (
                  <div
                    key={courseId}
                    className={`p-4 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-300 bg-blue-50/40 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-mono font-bold">
                            {course.code || course.kode}
                          </span>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-bold">
                            Kelas {course.class || course.kelas || 'A'}
                          </span>
                          <span className="px-2 py-0.5 bg-slate-800 text-white rounded text-[11px] font-bold">
                            {course.sks} SKS
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-slate-900">
                          {course.name || course.namaMatkul}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
                          <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {course.day || course.hari}, {course.time || course.jam}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {course.room || course.ruang}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            {course.lecturer || course.dosen}
                          </span>
                        </div>
                      </div>

                      <div className="self-end sm:self-center shrink-0">
                        {isSelected ? (
                          <button
                            onClick={() => handleRemoveCourse(courseId)}
                            className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Batal</span>
                          </button>
                        ) : isFull ? (
                          <span className="px-4 py-2 bg-slate-100 text-slate-400 rounded-xl text-xs font-semibold block text-center">
                            Penuh
                          </span>
                        ) : (
                          <button
                            onClick={() => handleAddCourse(course)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition shadow-sm flex items-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Ambil</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-slate-500 text-xs">
                Mata kuliah tidak ditemukan.
              </div>
            )}
          </div>
        </div>

        {/* KOLOM KANAN: RINGKASAN KRS DITAMBAHKAN */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 sticky top-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              KRS Ditambahkan ({selectedCourses.length})
            </h2>
            <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
              Total: {totalSks} SKS
            </span>
          </div>

          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {selectedCourses.length > 0 ? (
              selectedCourses.map((course) => {
                const courseId = course.id || course.kode || course.code;
                return (
                  <div
                    key={courseId}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-start gap-2 hover:bg-slate-100/80 transition"
                  >
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {course.name || course.namaMatkul}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {course.code || course.kode} • Kelas {course.class || course.kelas || 'A'} •{' '}
                        <strong className="text-slate-700">{course.sks} SKS</strong>
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemoveCourse(courseId)}
                      title="Hapus Mata Kuliah"
                      className="text-slate-400 hover:text-rose-600 p-1 text-xs transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs">
                Belum ada mata kuliah yang diambil.
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={handleSubmitKrs}
              disabled={isSubmitting || selectedCourses.length === 0}
              className={`w-full py-3 rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-2 ${
                isSubmitting || selectedCourses.length === 0
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Menyimpan...' : 'Simpan Kartu Rencana Studi'}</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center mt-2.5">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>KRS akan diteruskan ke Dosen PA ({student.dosenPA}).</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KrsPage;