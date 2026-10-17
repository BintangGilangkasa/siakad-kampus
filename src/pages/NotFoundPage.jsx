export const NotFoundPage = ({ setActiveTab }) => {
  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="space-y-2">
          <h1 className="text-7xl font-extrabold text-blue-600">404</h1>
          <h2 className="text-2xl font-bold text-slate-800">Halaman Tidak Ditemukan</h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Maaf, halaman atau tab yang Anda cari tidak ada atau sedang dalam tahap pengembangan.
          </p>
        </div>

        <div className="flex justify-center pt-2">
          <button
            onClick={() => setActiveTab && setActiveTab('beranda')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-medium transition shadow-sm"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
};