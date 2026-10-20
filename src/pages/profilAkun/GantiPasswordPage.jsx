import React, { useState } from 'react';
import { Eye, EyeOff, KeyRound, Lock } from 'lucide-react';

export default function GantiPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Konfirmasi kata sandi baru tidak cocok!');
      return;
    }
    alert('Kata sandi berhasil diperbarui!');
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto font-sans text-slate-800 w-full min-w-0 px-2 sm:px-4">
      <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm space-y-1">
        <div className="flex items-center space-x-2">
          <Lock className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg sm:text-xl font-black text-slate-900">Ganti Kata Sandi</h1>
        </div>
        <p className="text-xs text-slate-500">Perbarui kata sandi akun SIAKAD Anda.</p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <KeyRound className="w-4 h-4 text-blue-600" />
          <h2 className="font-extrabold text-sm text-slate-800">Ubah Kata Sandi SIAKAD</h2>
        </div>

        <form onSubmit={handleSubmitPassword} className="space-y-3.5 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700">Kata Sandi Saat Ini</label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              placeholder="Masukkan kata sandi lama"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Kata Sandi Baru</label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              placeholder="Minimal 8 karakter (huruf & angka)"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Konfirmasi Kata Sandi Baru</label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Ketik ulang kata sandi baru"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-500 hover:text-slate-800 flex items-center space-x-1.5 text-[11px] font-medium"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showPassword ? 'Sembunyikan' : 'Tampilkan'} Kata Sandi</span>
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs shadow-md transition"
          >
            Simpan Kata Sandi Baru
          </button>
        </form>
      </div>
    </div>
  );
}
