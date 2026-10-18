import React, { useState } from 'react';
import { studentData } from '../../data/studentData';
import { availableCourses } from '../../data/krsData';
import { 
  BookOpen, 
  Search, 
  Save, 
  ArrowRight, 
  Info, 
  Check, 
  X 
} from 'lucide-react';

const LihatPenawaranPage = ({ setActiveTab }) => {
  const student = studentData;
  const courses = availableCourses || [];

  const [selectedIds, setSelectedIds] = useState(['INF301', 'INF302', 'INF303']);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedCourses = courses.filter((c) =>
    selectedIds.includes(c.id || c.kode || c.code)
  );
  const totalSksDraf = selectedCourses.reduce((sum, item) => sum + item.sks, 0);
  const maxSks = 24;

  const handleToggleSelect = (courseId, sks) => {
    if (selectedIds.includes(courseId)) {
      setSelectedIds(selectedIds.filter((id) => id !== courseId));
    } else {
      if (totalSksDraf + sks > maxSks) {
        alert(`Batas maksimal pengambilan adalah ${maxSks} SKS!`);
        return;
      }
      setSelectedIds([...selectedIds, courseId]);
    }
  };

  const handleSaveDraft = () => {
    alert(
      `Draf tawaran matkul (${selectedCourses.length} matkul, ${totalSksDraf} SKS) tersimpan! Silakan lakukan pembayaran UKT.`
    );
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
    <div className="space-y-6 max-w-5xl mx-auto pb-12 font-sans">
      {/* HEADER HALAMAN */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Tahap 1: Penawaran Matkul
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <span>Daftar Penawaran Mata Kuliah</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Pilih rencana mata kuliah semester {student.semester} yang ingin diambil sebelum melakukan Pembayaran UKT.
            </p>
          </div>

          <div className="text-right bg-slate-50 p-3 rounded-xl border border-slate-200 w-full sm:w-auto">
            <span className="text-xs text-slate-500 block">Draf Terpilih</span>
            <span className="text-lg font-extrabold text-blue-600">
              {totalSksDraf} <span className="text-xs font-normal text-slate-600">/ {maxSks} SKS</span>
            </span>
          </div>
        </div>

        {/* Catatan Alur */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            Pilihan pada tahap penawaran ini digunakan untuk memesan kuota draf. Jadwal, dosen pengampu, dan ruang kelas ditentukan saat pengisian KRS resmi setelah pembayaran UKT lunas.
          </span>
        </div>
      </div>

      {/* TABEL PENAWARAN MATKUL */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-base font-bold text-slate-900">
            Katalog Mata Kuliah Ditawarkan ({filteredCourses.length})
          </h2>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kode atau nama mata kuliah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-3 px-3 text-center w-12">Pilih</th>
                <th className="py-3 px-3 w-28">Kode Matkul</th>
                <th className="py-3 px-3">Nama Mata Kuliah</th>
                <th className="py-3 px-3 text-center w-16">SKS</th>
                <th className="py-3 px-3 text-center w-24">Sifat</th>
                <th className="py-3 px-3 text-center w-28">Kuota Mahasiswa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course, idx) => {
                  const courseId = course.id || course.kode || course.code;
                  const isSelected = selectedIds.includes(courseId);
                  const isFull =
                    (course.terisi || course.filled) >= (course.kuota || course.quota);

                  return (
                    <tr
                      key={courseId || idx}
                      className={`hover:bg-slate-50 transition ${
                        isSelected ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <td className="py-3 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          disabled={isFull && !isSelected}
                          onChange={() => handleToggleSelect(courseId, course.sks)}
                          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed"
                        />
                      </td>
                      <td className="py-3 px-3 font-mono font-semibold text-slate-800">
                        {course.code || course.kode}
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-900">
                        {course.name || course.namaMatkul}
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-blue-600">
                        {course.sks} SKS
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium">
                          Wajib Prodi
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                            isFull
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {course.terisi || course.filled}/{course.kuota || course.quota}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-slate-500">
                    Tidak ditemukan mata kuliah yang sesuai.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER BAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 sticky bottom-4">
        <div className="text-xs text-slate-600">
          Ringkasan Draf: <span className="font-bold text-slate-900">{selectedCourses.length} Mata Kuliah</span> ({totalSksDraf} SKS)
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleSaveDraft}
            className="flex-1 sm:flex-none px-4 py-2.5 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Draf Pilihan</span>
          </button>

          {setActiveTab && (
            <button
              onClick={() => {
                handleSaveDraft();
                setActiveTab('keuangan');
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Lanjut ke Pembayaran UKT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LihatPenawaranPage;