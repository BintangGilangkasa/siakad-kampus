import React, { useState } from 'react';
import { 
  Headphones, 
  Search, 
  PlusCircle, 
  HelpCircle, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  Paperclip,
  PhoneCall,
  Mail,
  FileText
} from 'lucide-react';

const HelpdeskPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // State Tiket Bantuan
  const [tickets, setTickets] = useState([
    {
      id: 'TKT-20261019-01',
      kategori: 'Keuangan & UKT',
      subjek: 'Status pembayaran UKT belum berubah di SIAKAD',
      deskripsi: 'Saya sudah melakukan pembayaran UKT lewat m-Banking Mandiri pada tanggal 18 Oktober 2026 pukul 14:20 WIB, namun di portal statusnya masih Belum Lunas.',
      status: 'Diproses',
      urgensi: 'Tinggi',
      tanggal: '19 Okt 2026, 09:15 WIB',
      balasan: [
        {
          pengirim: 'Admin Keuangan (Ibu Nurul)',
          waktu: '19 Okt 2026, 11:30 WIB',
          pesan: 'Halo Bintang, berkas bukti transfer kamu sudah kami terima dan sedang diverifikasi dengan pihak bank mitra. Mohon tunggu 1x24 jam.'
        }
      ]
    },
    {
      id: 'TKT-20260905-04',
      kategori: 'KRS & Akademik',
      subjek: 'Kuota Mata Kuliah Pengolahan Bahasa Alami (NLP) Penuh',
      deskripsi: 'Mohon penambahan kuota kelas A untuk matkul NLP karena kuota 40 mahasiswa sudah terpenuhi.',
      status: 'Selesai',
      urgensi: 'Sedang',
      tanggal: '05 Sep 2026, 10:00 WIB',
      balasan: [
        {
          pengirim: 'Admin Prodi Data Science',
          waktu: '05 Sep 2026, 14:10 WIB',
          pesan: 'Kuota kelas NLP A telah ditambah menjadi 45 mahasiswa. Silakan lakukan penguncian ulang di menu KRS.'
        }
      ]
    }
  ]);

  // Form State Tiket Baru
  const [newTicket, setNewTicket] = useState({
    kategori: 'KRS & Akademik',
    subjek: '',
    urgensi: 'Sedang',
    deskripsi: ''
  });

  // Data FAQ
  const faqs = [
    {
      kategori: 'KRS & Akademik',
      tanya: 'Bagaimana jika jadwal mata kuliah bentrok?',
      jawab: 'Kamu dapat memilih kelas atau paralel lain yang tidak bentrok. Jika semua kelas bentrok atau penuh, silakan hubungi Dosen PA atau buat tiket bantuan kategori KRS & Akademik untuk pengajuan kelas tambahan.'
    },
    {
      kategori: 'Keuangan & UKT',
      tanya: 'Berapa lama status verifikasi pembayaran UKT otomatis terupdate?',
      jawab: 'Pembayaran melalui Virtual Account mitra bank terverifikasi otomatis dalam 5-15 menit. Jika menggunakan metode transfer manual, verifikasi membutuhkan waktu 1x24 jam kerja.'
    },
    {
      kategori: 'Akun & Login',
      tanya: 'Bagaimana cara mereset kata sandi SIAKAD yang lupa?',
      jawab: 'Gunakan fitur "Lupa Password" di halaman login utama, atau hubungi unit PTIPD/Helpdesk Kampus dengan melampirkan foto Kartu Tanda Mahasiswa (KTM).'
    },
    {
      kategori: 'KRS & Akademik',
      tanya: 'Syarat untuk bisa melakukan ACC KRS oleh Dosen PA?',
      jawab: 'Pastikan status pembayaran UKT semester berjalan sudah Lunas dan kamu telah mengunci draf mata kuliah di menu Pengisian KRS.'
    }
  ];

  const categories = ['Semua', 'KRS & Akademik', 'Keuangan & UKT', 'Akun & Login', 'Masalah Teknis'];

  const filteredFaqs = faqs.filter(faq => {
    const matchCat = selectedCategory === 'Semua' || faq.kategori === selectedCategory;
    const matchSearch = faq.tanya.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        faq.jawab.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicket.subjek || !newTicket.deskripsi) {
      alert('Mohon isi subjek dan deskripsi kendala kamu.');
      return;
    }

    const created = {
      id: `TKT-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}${String(new Date().getDate()).padStart(2,'0')}-${Math.floor(10 + Math.random() * 89)}`,
      kategori: newTicket.kategori,
      subjek: newTicket.subjek,
      deskripsi: newTicket.deskripsi,
      status: 'Menunggu Balasan',
      urgensi: newTicket.urgensi,
      tanggal: new Date().toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB',
      balasan: []
    };

    setTickets([created, ...tickets]);
    setIsModalOpen(false);
    setNewTicket({ kategori: 'KRS & Akademik', subjek: '', urgensi: 'Sedang', deskripsi: '' });
    alert('Tiket bantuan berhasil dikirim! Tim helpdesk akan merespons secepatnya.');
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-6xl mx-auto pb-12 font-sans w-full min-w-0 overflow-x-hidden px-1 sm:px-0">
      
      {/* 1. HEADER BANNER HELPDESK */}
      <div className="bg-linear-to-r from-slate-900 via-blue-950 to-indigo-900 text-white p-4 sm:p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-base sm:text-2xl font-bold text-white mt-1 flex items-center gap-2">
            <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400 shrink-0" />
            <span>Helpdesk & Layanan Pengaduan</span>
          </h1>
          <p className="text-[11px] sm:text-sm text-slate-300 mt-0.5">
            Punya kendala registrasi, pembayaran UKT, atau sistem SIAKAD? Sampaikan ke tim helpdesk kami.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-md flex items-center justify-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Buat Tiket Bantuan</span>
        </button>
      </div>

      {/* 2. DOKUMENTASI LAYANAN / KONTAK CEPAT */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Call Center UIN</span>
            <span className="text-xs font-bold text-slate-800">(0298) 321470</span>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Email Helpdesk</span>
            <span className="text-xs font-bold text-slate-800">helpdesk@uinsalatiga.ac.id</span>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Jam Operasional</span>
            <span className="text-xs font-bold text-slate-800">Senin - Jumat (08:00 - 16:00)</span>
          </div>
        </div>
      </div>

      {/* 3. TIKET SAYA (RIWAYAT PENGADUAN) */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>Tiket Pengaduan Saya ({tickets.length})</span>
          </h2>
        </div>

        <div className="space-y-3">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition bg-slate-50/50 space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[11px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                      {ticket.id}
                    </span>
                    <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[10px] font-bold">
                      {ticket.kategori}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ticket.status === 'Selesai'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : ticket.status === 'Diproses'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{ticket.tanggal}</span>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {ticket.subjek}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                    {ticket.deskripsi}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex justify-between items-center text-xs">
                  <span className="text-[11px] text-slate-500">
                    Respon/Balasan: <strong className="text-slate-700">{ticket.balasan.length} Balasan</strong>
                  </span>
                  <button
                    onClick={() => setSelectedTicket(ticket)}
                    className="text-blue-600 font-bold hover:underline text-xs flex items-center gap-1"
                  >
                    <span>Lihat Detail Tiket</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-xs text-slate-400">
              Belum ada tiket pengaduan yang dibuat.
            </div>
          )}
        </div>
      </div>

      {/* 4. PENGETAHUAN & FAQ MANDIRI */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Pertanyaan Sering Diajukan (FAQ)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cari solusi mandiri secara cepat untuk masalah akademis umum sebelum membuat tiket.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari pertanyaan atau kata kunci..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-2 pt-2">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-3.5 bg-slate-50/80 hover:bg-slate-100/80 text-left flex justify-between items-center gap-3"
                  >
                    <span className="text-xs font-bold text-slate-800">{faq.tanya}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-3.5 bg-white text-xs text-slate-600 border-t border-slate-100 leading-relaxed">
                      {faq.jawab}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-6 text-center text-xs text-slate-400">
              Tidak ada FAQ yang cocok dengan kata kunci pencarian.
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: BUAT TIKET BANTUAN BARU */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-blue-600" />
                <span>Buat Tiket Pengaduan Baru</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Kategori Masalah</label>
                <select
                  value={newTicket.kategori}
                  onChange={(e) => setNewTicket({ ...newTicket, kategori: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="KRS & Akademik">KRS & Akademik</option>
                  <option value="Keuangan & UKT">Keuangan & UKT</option>
                  <option value="Akun & Login">Akun & Login</option>
                  <option value="Masalah Teknis">Masalah Teknis</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tingkat Urgensi</label>
                <select
                  value={newTicket.urgensi}
                  onChange={(e) => setNewTicket({ ...newTicket, urgensi: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Rendah">Rendah (Pertanyaan Umum)</option>
                  <option value="Sedang">Sedang (Butuh Tindakan 1-2 Hari)</option>
                  <option value="Tinggi">Tinggi (Darurat / Mendesak)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subjek Ringkas</label>
                <input
                  type="text"
                  placeholder="Contoh: UKT Lunas Tapi KRS Masih Terkunci"
                  value={newTicket.subjek}
                  onChange={(e) => setNewTicket({ ...newTicket, subjek: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Rincian Kendala & Deskripsi</label>
                <textarea
                  rows="4"
                  placeholder="Jelaskan kronologi kendala, nomor transaksi (jika ada), atau pesan error yang muncul..."
                  value={newTicket.deskripsi}
                  onChange={(e) => setNewTicket({ ...newTicket, deskripsi: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-slate-500">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <Paperclip className="w-4 h-4 text-slate-400" />
                  <span>Lampiran Bukti (Opsional)</span>
                </span>
                <span className="text-[10px] text-blue-600 font-bold cursor-pointer hover:underline">
                  Pilih Berkas
                </span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Tiket</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: DETAIL TIKET & BALASAN ADMIN */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-5 space-y-4 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3 gap-2">
              <div>
                <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {selectedTicket.id}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                  {selectedTicket.subjek}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Laporan Asal Mahasiswa */}
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 space-y-1">
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span className="font-bold text-blue-900">Saya (Pelapor)</span>
                  <span>{selectedTicket.tanggal}</span>
                </div>
                <p className="text-slate-800 leading-relaxed">{selectedTicket.deskripsi}</p>
              </div>

              {/* Riwayat Balasan Admin */}
              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                  Riwayat Tanggapan Admin / Helpdesk
                </h4>
                {selectedTicket.balasan.length > 0 ? (
                  selectedTicket.balasan.map((reply, i) => (
                    <div key={i} className="p-3 bg-slate-100 rounded-xl border border-slate-200 space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span className="font-bold text-slate-900">{reply.pengirim}</span>
                        <span>{reply.waktu}</span>
                      </div>
                      <p className="text-slate-800 leading-relaxed">{reply.pesan}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-[11px] flex items-center gap-2">
                    <Clock className="w-4 h-4 shrink-0 text-amber-600" />
                    <span>Tiket sedang dalam antrean penanganan oleh tim teknis.</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default HelpdeskPage;