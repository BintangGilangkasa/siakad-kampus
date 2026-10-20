import React, { useState, useEffect } from 'react';
import { FileEdit, Save, CheckCircle2 } from 'lucide-react';

export default function UpdateBiodataPage({ studentData, onUpdateStudentData, setActiveTab }) {
  // Initialize state dari data studentData terpusat
  const [formData, setFormData] = useState({
    name: studentData?.name || '',
    nim: studentData?.nim || '',
    nik: studentData?.nik || '',
    alamatlengkap: studentData?.alamatlengkap || '',
    tmptlahir: studentData?.tmptlahir || '',
    tgllahir: studentData?.tgllahir || '',
    kewarganegaraan: studentData?.kewarganegaraan || 'WNI',
    jeniskelamin: studentData?.jeniskelamin || 'Laki-laki',
    agama: studentData?.agama || 'Islam',
    nohp: studentData?.nohp || '',
    email: studentData?.email || '',
    tinggiBadan: studentData?.tinggiBadan || '',
    beratBadan: studentData?.beratBadan || '',
    golDarah: studentData?.golDarah || 'O',
    // Data Orang Tua / Wali
    namaOrtu: studentData?.namaOrtu || '',
    pekerjaanOrtu: studentData?.pekerjaanOrtu || '',
    pendidikanOrtu: studentData?.pendidikanOrtu || '',
    penghasilanOrtu: studentData?.penghasilanOrtu || '',
    alamatOrtu: studentData?.alamatOrtu || '',
    telponOrtu: studentData?.telponOrtu || ''
  });

  // Sinkronkan form jika prop studentData berubah
  useEffect(() => {
    if (studentData) {
      setFormData((prev) => ({
        ...prev,
        name: studentData.name || prev.name,
        nim: studentData.nim || prev.nim,
        nik: studentData.nik || prev.nik,
        alamatlengkap: studentData.alamatlengkap || prev.alamatlengkap,
        tmptlahir: studentData.tmptlahir || prev.tmptlahir,
        tgllahir: studentData.tgllahir || prev.tgllahir,
        kewarganegaraan: studentData.kewarganegaraan || prev.kewarganegaraan,
        jeniskelamin: studentData.jeniskelamin || prev.jeniskelamin,
        agama: studentData.agama || prev.agama,
        nohp: studentData.nohp || prev.nohp,
        email: studentData.email || prev.email,
        tinggiBadan: studentData.tinggiBadan || prev.tinggiBadan,
        beratBadan: studentData.beratBadan || prev.beratBadan,
        golDarah: studentData.golDarah || prev.golDarah,
        namaOrtu: studentData.namaOrtu || prev.namaOrtu,
        pekerjaanOrtu: studentData.pekerjaanOrtu || prev.pekerjaanOrtu,
        pendidikanOrtu: studentData.pendidikanOrtu || prev.pendidikanOrtu,
        penghasilanOrtu: studentData.penghasilanOrtu || prev.penghasilanOrtu,
        alamatOrtu: studentData.alamatOrtu || prev.alamatOrtu,
        telponOrtu: studentData.telponOrtu || prev.telponOrtu
      }));
    }
  }, [studentData]);

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update data mahasiswa di tingkat aplikasi (global state)
    if (onUpdateStudentData) {
      onUpdateStudentData(formData);
    }

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      // Pindah otomatis ke Halaman Biodata untuk melihat hasilnya
      if (setActiveTab) setActiveTab('biodata');
    }, 1500);
  };

  return (
    <div className="space-y-5 max-w-5xl mx-auto font-sans text-slate-800 w-full min-w-0 px-2 sm:px-4 lg:px-0 pb-10">
      
      {/* Header Halaman */}
      <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <FileEdit className="w-5 h-5 text-blue-600" />
            <h1 className="text-lg sm:text-xl font-black text-slate-900">Form Update Biodata Mahasiswa</h1>
          </div>
          <p className="text-xs text-slate-500">
            Pembaruan data mandiri terintegrasi pelaporan PDDikti dan data ijazah kelulusan.
          </p>
        </div>

        {isSaved && (
          <div className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center justify-center gap-1.5 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Biodata Berhasil Diperbarui & Disinkronkan!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        
        <div className="divide-y divide-slate-200 text-xs">
          
          {/* Alamat Lengkap */}
          <div className="p-4 bg-slate-50/50 grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
            <div>
              <label className="font-bold text-slate-900 block">Alamat Lengkap</label>
              <p className="text-[11px] text-slate-500 italic mt-1 leading-snug">
                (Silahkan Diisi dengan benar, karena data terkait pelaporan ke DIKTI, sehingga Ijazah Kelulusan yang bersangkutan akan sesuai denga data terisi disamping.)
              </p>
            </div>
            <div className="md:col-span-2">
              <textarea
                name="alamatlengkap"
                rows={3}
                value={formData.alamatlengkap}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium text-slate-800"
                required
              />
            </div>
          </div>

          {/* Tempat / Tanggal Lahir */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <label className="font-bold text-slate-900">Tempat / Tanggal Lahir</label>
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                name="tmptlahir"
                placeholder="Tempat Lahir"
                value={formData.tmptlahir}
                onChange={handleChange}
                className="w-full sm:w-1/2 p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                required
              />
              <input
                type="text"
                name="tgllahir"
                placeholder="24 Februari 2005"
                value={formData.tgllahir}
                onChange={handleChange}
                className="w-full sm:w-1/2 p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                required
              />
            </div>
          </div>

          {/* Kewarganegaraan */}
          <div className="p-4 bg-slate-50/50 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <label className="font-bold text-slate-900">KEWARGANEGARAAN</label>
            <div className="md:col-span-2">
              <select
                name="kewarganegaraan"
                value={formData.kewarganegaraan}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              >
                <option value="WNI">WNI (Warga Negara Indonesia)</option>
                <option value="WNA">WNA (Warga Negara Asing)</option>
              </select>
            </div>
          </div>

          {/* Jenis Kelamin */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <label className="font-bold text-slate-900">Jenis Kelamin</label>
            <div className="md:col-span-2">
              <select
                name="jeniskelamin"
                value={formData.jeniskelamin}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
          </div>

          {/* Agama */}
          <div className="p-4 bg-slate-50/50 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <label className="font-bold text-slate-900">Agama</label>
            <div className="md:col-span-2">
              <select
                name="agama"
                value={formData.agama}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              >
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Katolik">Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Khonghucu">Khonghucu</option>
              </select>
            </div>
          </div>

          {/* No. Hp */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <label className="font-bold text-slate-900">No. Hp</label>
            <div className="md:col-span-2">
              <input
                type="text"
                name="nohp"
                value={formData.nohp}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                required
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="p-4 bg-slate-50/50 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <label className="font-bold text-slate-900">EMAIL</label>
            <div className="md:col-span-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                required
              />
            </div>
          </div>

          {/* Tinggi Badan */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <label className="font-bold text-slate-900">Tinggi Badan (cm)</label>
            <div className="md:col-span-2">
              <input
                type="number"
                name="tinggiBadan"
                value={formData.tinggiBadan}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              />
            </div>
          </div>

          {/* Berat Badan */}
          <div className="p-4 bg-slate-50/50 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <label className="font-bold text-slate-900">Berat Badan (kg)</label>
            <div className="md:col-span-2">
              <input
                type="number"
                name="beratBadan"
                value={formData.beratBadan}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              />
            </div>
          </div>

          {/* Gol. Darah */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <label className="font-bold text-slate-900">Gol. Darah</label>
            <div className="md:col-span-2">
              <select
                name="golDarah"
                value={formData.golDarah}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
                <option value="-">-</option>
              </select>
            </div>
          </div>

          {/* HEADER SEKSI: Data Orang Tua / Wali */}
          <div className="p-3.5 bg-slate-900 text-white font-bold text-xs">
            Data Orang Tua / Wali
          </div>

          {/* Nama Ortu/Wali */}
          <div className="p-4 bg-slate-50/50 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <label className="font-bold text-slate-900">Nama Ortu/Wali</label>
            <div className="md:col-span-2">
              <input
                type="text"
                name="namaOrtu"
                value={formData.namaOrtu}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                required
              />
            </div>
          </div>

          {/* Pekerjaan Ortu/Wali */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <label className="font-bold text-slate-900">Pekerjaan Ortu/Wali</label>
            <div className="md:col-span-2">
              <input
                type="text"
                name="pekerjaanOrtu"
                value={formData.pekerjaanOrtu}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              />
            </div>
          </div>

          {/* Pendidikan Ortu/Wali */}
          <div className="p-4 bg-slate-50/50 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <label className="font-bold text-slate-900">Pendidikan Ortu/Wali</label>
            <div className="md:col-span-2">
              <input
                type="text"
                name="pendidikanOrtu"
                value={formData.pendidikanOrtu}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              />
            </div>
          </div>

          {/* Penghasilan Ortu/Wali */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <label className="font-bold text-slate-900">Penghasilan Ortu/Wali</label>
            <div className="md:col-span-2">
              <input
                type="text"
                name="penghasilanOrtu"
                value={formData.penghasilanOrtu}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              />
            </div>
          </div>

          {/* Alamat Ortu / Wali */}
          <div className="p-4 bg-slate-50/50 grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
            <label className="font-bold text-slate-900">Alamat Ortu / Wali</label>
            <div className="md:col-span-2">
              <textarea
                name="alamatOrtu"
                rows={2}
                value={formData.alamatOrtu}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              />
            </div>
          </div>

          {/* Telpon / Hp ORTU/WALI */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <label className="font-bold text-slate-900">Telpon / Hp ORTU/WALI</label>
            <div className="md:col-span-2">
              <input
                type="text"
                name="telponOrtu"
                value={formData.telponOrtu}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              />
            </div>
          </div>

        </div>

        {/* Footer Action Button */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Biodata</span>
          </button>
        </div>

      </form>
    </div>
  );
}