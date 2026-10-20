import React, { useState } from 'react';
import InputField from '../components/inputField';
import Button from '../components/Button';
import { User, Lock, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';

export default function LoginPage({ onLoginSuccess, onLogin }) {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Path gambar / assets
  const campusBgUrl = "/images/foto-kampus.png";
  const logoCard = "src/assets/logo-uin.png";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!nim.trim()) {
      setError('Nomor Induk Mahasiswa (NIM) wajib diisi.');
      return;
    }
    if (!password) {
      setError('Kata sandi wajib diisi.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const userData = {
        name: 'Bintang Gilangkasa Syailendra',
        nim: nim,
        prodi: 'S1 - Sains Data',
        fakultas: 'Sains dan Teknologi',
        semester: 7,
        ipk: 3.88
      };

      // Mendukung pemanggilan props onLoginSuccess maupun onLogin
      if (onLoginSuccess) {
        onLoginSuccess(userData);
      } else if (onLogin) {
        onLogin();
      }
    }, 800);
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 relative font-sans"
      style={{ backgroundImage: `url('${campusBgUrl}')` }}
    >
      {/* Dark Overlay transparan agar teks & card tetap jelas */}
      <div className="absolute inset-0 backdrop-blur-[1px]"></div>

      {/* Card Login */}
      <div className="relative z-10 w-full max-w-md bg-white/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30">
        
        {/* Header Logo & Title */}
        <div className="text-center space-y-2.5 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30">
            <img src={logoCard} alt="Logo UIN" className="w-8 h-11 object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-700 tracking-tight">
              SIAKAD<span className="text-blue-600">.NextGen</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">Selamat Datang Kembali!</p>
          </div>
        </div>

        {/* Banner Pesan Error */}
        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Input Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Nomor Induk Mahasiswa (NIM)"
            type="text"
            placeholder="Masukkan NIM Anda..."
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            icon={User}
            required
          />

          <InputField
            label="Kata Sandi / Password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            required
          />

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center space-x-2 cursor-pointer text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span>Ingat saya</span>
            </label>

            <a
              href="#lupa-password"
              onClick={(e) => {
                e.preventDefault();
                alert('Silakan hubungi Biro Akademik / Dosen PA untuk reset password.');
              }}
              className="text-blue-600 font-bold hover:underline"
            >
              Lupa Password?
            </a>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full h-10 mt-2 py-3 "
            icon={ArrowRight}
          >
            Masuk ke SIAKAD
          </Button>
        </form>

        {/* Footer Ringkas */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-400 flex items-center justify-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>SIAKAD NextGen v2.0</span>
        </div>

      </div>
    </div>
  );
}