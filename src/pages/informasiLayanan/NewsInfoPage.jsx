import React, { useState } from 'react';
import { announcements } from '../../data/announcements';
import { 
  Newspaper, 
  Search, 
  Calendar, 
  Tag, 
  ArrowRight, 
  Pin,
  Eye,
  X
} from 'lucide-react';

const NewsInfoPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNews, setSelectedNews] = useState(null); // State untuk Modal Detail Berita

  const categories = ['Semua', 'Pengumuman', 'Akademik', 'Kegiatan', 'Prestasi'];
  
  // Data pengumuman/berita dari import
  const newsData = announcements || [];

  const filteredNews = newsData.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.summary || item.content || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-4 sm:space-y-6 max-w-6xl mx-auto pb-12 font-sans w-full min-w-0 overflow-x-hidden px-1 sm:px-0">
      
      {/* 1. HEADER HALAMAN */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
          </div>
          <h1 className="text-base sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 shrink-0" />
            <span>Berita & Pengumuman Kampus</span>
          </h1>
          <p className="text-[11px] sm:text-sm text-slate-500 mt-0.5">
            Dapatkan informasi terkini seputar pengumuman akademik, kegiatan civitas, dan kabar kampus.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari berita atau pengumuman..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
      </div>

      {/* 2. CATEGORY TABS (SCROLLABLE ON MOBILE) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs mb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 3. GRID BERITA & PENGUMUMAN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredNews.length > 0 ? (
          filteredNews.map((item, idx) => (
            <div
              key={item.id || idx}
              className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex justify-between items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-lg text-[10px] sm:text-[11px] font-bold flex items-center gap-1">
                    <Tag className="w-3 h-3 text-blue-600" />
                    {item.category || 'Umum'}
                  </span>
                  {item.isPinned && (
                    <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[10px] sm:text-[11px] font-bold flex items-center gap-1 shrink-0">
                      <Pin className="w-3 h-3 text-amber-600" />
                      Disematkan
                    </span>
                  )}
                </div>

                <h2 
                  onClick={() => setSelectedNews(item)}
                  className="text-sm sm:text-base font-bold text-slate-900 leading-snug hover:text-blue-600 cursor-pointer transition line-clamp-2"
                >
                  {item.title}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {item.summary || item.content}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {item.date}
                  </span>
                  {item.views && (
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      {item.views}
                    </span>
                  )}
                </div>

                <button 
                  onClick={() => setSelectedNews(item)}
                  className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1 text-xs"
                >
                  <span>Baca</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white p-8 text-center rounded-2xl border border-slate-200 text-xs text-slate-500">
            Tidak ada berita yang cocok dengan kriteria pencarian.
          </div>
        )}
      </div>

      {/* 4. MODAL DETAIL PENGUMUMAN / BERITA */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
            <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-3">
              <div>
                <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-[10px] font-bold">
                  {selectedNews.category || 'Umum'}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {selectedNews.title}
                </h3>
                <p className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Dipublikasikan: {selectedNews.date}</span>
                </p>
              </div>
              <button 
                onClick={() => setSelectedNews(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-3">
              {selectedNews.content || selectedNews.summary || 'Detail pengumuman tidak tersedia.'}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
              >
                Tutup Pengumuman
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default NewsInfoPage;