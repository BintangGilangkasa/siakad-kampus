import React, { useState } from 'react';
import { studentData } from '../../data/studentData';
import { paymentMethods } from '../../data/paymentMetods';

import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Receipt, 
  ArrowRight, 
  ShieldCheck, 
  Copy, 
  Check,
  RefreshCw,
  HelpCircle,
  Smartphone,
  Landmark,
  QrCode
} from 'lucide-react';

export const TagihanUktPage = ({ setActiveTab }) => {
  const student = studentData;

  const [statusPembayaran, setStatusPembayaran] = useState(student.statusPembayaran || 'Belum Lunas');
  const [selectedMethod, setSelectedMethod] = useState('mandiri');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const nominalUKT = 3200000;

  // Mendapatkan objek metode pembayaran yang sedang aktif
  const currentMethodObj = paymentMethods.find((m) => m.id === selectedMethod) || paymentMethods[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentMethodObj.vaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStatusPembayaran('Lunas');
      student.statusPembayaran = 'Lunas';
      alert('Pembayaran UKT Berhasil Terverifikasi! Akses penguncian KRS kini telah dibuka.');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-sans">
      {/* 1. HEADER HALAMAN */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Modul Keuangan
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Tahun Akademik {student.academicYear}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Receipt className="w-6 h-6 text-blue-600 shrink-0" />
            <span>Informasi Tagihan UKT</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pilih metode pembayaran di bawah untuk melihat kode bayar dan tata cara pelunasan.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 w-full md:w-auto shrink-0">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
          <div>
            <span className="text-[11px] text-slate-500 block">Status Registrasi Keuangan</span>
            <span className={`text-xs font-bold ${statusPembayaran === 'Lunas' ? 'text-emerald-600' : 'text-amber-600'}`}>
              {statusPembayaran === 'Lunas' ? 'Lunas / Terverifikasi' : 'Menunggu Pelunasan'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. BARIS UTAMA: RINCIAN TAGIHAN & OPSI PEMBAYARAN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* KOLOM KIRI: RINCIAN TAGIHAN (7 COLS) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Rincian Tagihan Aktif
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                  UKT Semester {student.semester}
                </h2>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                  statusPembayaran === 'Lunas'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {statusPembayaran === 'Lunas' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>LUNAS</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>BELUM BAYAR</span>
                  </>
                )}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Program Studi:</span>
                <span className="font-semibold text-slate-800">{student.prodi}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Batas Akhir Pembayaran:</span>
                <span className="font-semibold text-rose-600">{student.batasKrs || '20 Oktober 2026'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">NIM Mahasiswa:</span>
                <span className="font-mono font-semibold text-slate-800">{student.nim}</span>
              </div>
              <div className="flex justify-between py-2.5 items-center bg-slate-50 p-3 rounded-xl border border-slate-100 mt-2">
                <span className="font-bold text-slate-700">Total Harus Dibayar:</span>
                <span className="text-xl font-extrabold text-blue-700">
                  Rp {nominalUKT.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          {/* SIMULASI TESTING TOOLBAR */}
          <div className="pt-3 border-t border-slate-100">
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-blue-900 flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                  Pengujian Alur Sistem:
                </span>
                <span className="text-[11px] text-blue-700">Simulasi verifikasi lunas</span>
              </div>
              {statusPembayaran !== 'Lunas' ? (
                <button
                  onClick={handleSimulatePayment}
                  disabled={isProcessing}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isProcessing ? 'Memverifikasi...' : 'Simulasi Pembayaran Lunas'}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setStatusPembayaran('Belum Lunas');
                    student.statusPembayaran = 'Belum Lunas';
                  }}
                  className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold transition"
                >
                  Reset Status ke Belum Bayar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: PILIH SALURAN & KODE BAYAR (5 COLS) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-blue-600 shrink-0" />
              <span>Pilih Opsi Pembayaran</span>
            </h2>

            {statusPembayaran === 'Lunas' ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3 my-auto">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <div>
                  <h3 className="text-sm font-bold text-emerald-900">Pembayaran UKT Lunas</h3>
                  <p className="text-xs text-emerald-700 mt-1">
                    Akses penguncian & pengisian KRS kini telah dibuka.
                  </p>
                </div>
                {setActiveTab && (
                  <button
                    onClick={() => setActiveTab('isi-krs')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 mx-auto mt-2"
                  >
                    <span>Ke Pengisian KRS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Daftar Pilihan Radio Card */}
                <div className="space-y-2">
                  {paymentMethods.map((method) => {
                    const IconComp = method.icon || Building2;
                    const isSelected = selectedMethod === method.id;
                    return (
                      <label
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">{method.name}</p>
                            <p className="text-[11px] text-slate-500">{method.category}</p>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="payment_method"
                          checked={isSelected}
                          onChange={() => setSelectedMethod(method.id)}
                          className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* BOX KODE BILLING / VIRTUAL ACCOUNT (UKURAN & POSISI KONSISTEN) */}
          {statusPembayaran !== 'Lunas' && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 mt-2">
              <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
                <span>
                  {currentMethodObj.id === 'qris' ? 'ID Transaksi QRIS Kampus:' : 'Kode Virtual Account:'}
                </span>
                <span className="text-blue-700 font-bold">{currentMethodObj.name}</span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="font-mono text-base sm:text-lg font-extrabold text-slate-900 tracking-wider">
                  {currentMethodObj.vaCode}
                </span>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 shrink-0 shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copied ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. TATA CARA PEMBAYARAN DINAMIS (KONSISTEN, TERSTRUKTUR & RAPI) */}
      {statusPembayaran !== 'Lunas' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
              <h2 className="text-base font-bold text-slate-900">
                Tata Cara Pembayaran — {currentMethodObj.name}
              </h2>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Instruksi Resmi UIN Salatiga
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {currentMethodObj.instructions.map((group, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide pb-2 border-b border-slate-200/60 mb-3">
                    {idx === 0 ? <Smartphone className="w-4 h-4 text-blue-600 shrink-0" /> : <Landmark className="w-4 h-4 text-blue-600 shrink-0" />}
                    <span>{group.channel}</span>
                  </h3>

                  <ol className="space-y-2.5 text-xs text-slate-600">
                    {group.steps.map((step, stepIdx) => (
                      <li key={stepIdx} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                          {stepIdx + 1}
                        </span>
                        <span className="leading-relaxed">
                          {step.split('**').map((part, pIdx) => 
                            pIdx % 2 === 1 ? <strong key={pIdx} className="text-slate-900 font-bold">{part}</strong> : part
                          )}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagihanUktPage;