import React, { useState } from 'react';
import { availableCourses } from '../../data/krsData'
import { studentData } from '../../data/studentData';
import {
  BookOpen,
  Search,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  User,
  Info
} from 'lucide-react';

export default function KrsPage() {
  const maxSks = 24; // Batas SKS berdasarkan IPK
  const [selectedCourses, setSelectedCourses] = useState([
    availableCourses[0], // Web Modern
    availableCourses[1], // AI & ML
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  // Total SKS yang sudah diambil
  const currentSks = selectedCourses.reduce((sum, item) => sum + item.sks, 0);

  // Toggle Ambil Matkul
  const handleSelectCourse = (course) => {
    const isSelected = selectedCourses.some((c) => c.id === course.id);

    if (isSelected) {
      setSelectedCourses(selectedCourses.filter((c) => c.id !== course.id));
    } else {
      if (currentSks + course.sks > maxSks) {
        alert(`Batas maksimum SKS (${maxSks} SKS) telah tercapai!`);
        return;
      }
      if (course.filled >= course.quota) {
        alert('Kuota kelas ini sudah penuh!');
        return;
      }
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const filteredCourses = availableCourses.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5 max-w-7xl mx-auto font-sans text-slate-800 w-full min-w-0">
      
      {/* Header Info Jatah SKS */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h1 className="text-lg font-black text-slate-900">Pengisian KRS Interaktif</h1>
          </div>
          <p className="text-xs text-slate-500">
            Jatah Maksimum SKS Semester Ini: <strong className="text-slate-800">{maxSks} SKS</strong> (Berdasarkan IPK {studentData?.ipk || 3.88})
          </p>
        </div>

        {/* Indikator SKS Real-time */}
        <div className="w-full md:w-64 bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-600">Terpakai: {currentSks} SKS</span>
            <span className={maxSks - currentSks < 3 ? 'text-amber-600' : 'text-emerald-600'}>
              Sisa: {maxSks - currentSks} SKS
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                currentSks === maxSks ? 'bg-amber-500' : 'bg-blue-600'
              }`}
              style={{ width: `${(currentSks / maxSks) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* KOLOM KIRI (7 Kolom): Daftar Penawaran Matkul */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3.5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <h2 className="font-extrabold text-sm text-slate-800">Penawaran Mata Kuliah</h2>
              
              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Cari kode / mata kuliah..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl text-xs bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>

            {/* List Penawaran */}
            <div className="space-y-2.5">
              {filteredCourses.map((course) => {
                const isSelected = selectedCourses.some((c) => c.id === course.id);
                const isFull = course.filled >= course.quota;

                return (
                  <div
                    key={course.id}
                    className={`p-3.5 rounded-xl border transition space-y-2 ${
                      isSelected
                        ? 'bg-blue-50/60 border-blue-300'
                        : 'bg-slate-50 border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-200 text-slate-700 rounded">
                            {course.code}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                            Kelas {course.class}
                          </span>
                          <span className="text-xs font-extrabold text-slate-800">{course.sks} SKS</span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-xs sm:text-sm mt-1">{course.name}</h3>
                      </div>

                      <button
                        onClick={() => handleSelectCourse(course)}
                        disabled={isFull && !isSelected}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1 shrink-0 ${
                          isSelected
                            ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                            : isFull
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-500'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Batal</span>
                          </>
                        ) : isFull ? (
                          <span>Penuh</span>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Ambil</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 text-[10px] text-slate-500 pt-1.5 border-t border-slate-200/60">
                      <p className="flex items-center space-x-1 truncate">
                        <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{course.schedule}</span>
                      </p>
                      <p className="flex items-center space-x-1 truncate">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{course.room}</span>
                      </p>
                      <p className="flex items-center space-x-1 truncate">
                        <User className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{course.lecturer}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* KOLOM KANAN (5 Kolom): Ringkasan KRS Terpilih */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3.5 sticky top-20">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-extrabold text-sm text-slate-800">KRS Ditambahkan ({selectedCourses.length})</h2>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                Total: {currentSks} SKS
              </span>
            </div>

            {/* List Pilihan */}
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
              {selectedCourses.map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 text-xs">
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 text-xs truncate">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {item.code} • Kelas {item.class} • {item.sks} SKS
                    </p>
                  </div>
                  <button
                    onClick={() => handleSelectCourse(item)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition shrink-0"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {selectedCourses.length === 0 && (
                <div className="p-6 text-center text-slate-400 text-xs bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  Belum ada mata kuliah yang dipilih.
                </div>
              )}
            </div>

            {/* Tombol Simpan KRS */}
            <button
              onClick={() => alert('KRS Berhasil Disimpan!')}
              disabled={selectedCourses.length === 0}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center space-x-2 ${
                selectedCourses.length > 0
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan Kartu Rencana Studi (KRS)</span>
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}