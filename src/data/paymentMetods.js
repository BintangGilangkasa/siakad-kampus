import { Building2, QrCode } from 'lucide-react';

export const paymentMethods = [
  { 
    id: 'mandiri', 
    name: 'Bank Mandiri (VA)', 
    category: 'Virtual Account', 
    icon: Building2,
    vaCode: '8801928374920',
    instructions: [
      {
        channel: 'Livin\' by Mandiri (Mobile Banking)',
        steps: [
          'Buka aplikasi Livin\' by Mandiri dan login.',
          'Pilih menu **Bayar** lalu pilih **Pembayaran Baru**.',
          'Pilih menu **Multipayment** / cari penyedia jasa **UIN Salatiga**.',
          'Masukkan Kode Virtual Account: **8801928374920**.',
          'Konfirmasi rincian tagihan (Nominal Rp 3.200.000) lalu masukkan PIN.'
        ]
      },
      {
        channel: 'ATM Mandiri',
        steps: [
          'Masukkan kartu ATM Mandiri & PIN Anda.',
          'Pilih menu **Bayar/Beli** > **Pendidikan**.',
          'Masukkan kode perusahaan / penyedia jasa UIN Salatiga.',
          'Masukkan Nomor Virtual Account **8801928374920**.',
          'Periksa konfirmasi data di layar, lalu pilih **YA**.'
        ]
      }
    ]
  },
  { 
    id: 'bni', 
    name: 'Bank BNI (VA)', 
    category: 'Virtual Account', 
    icon: Building2,
    vaCode: '9881928374920',
    instructions: [
      {
        channel: 'BNI Mobile Banking',
        steps: [
          'Buka aplikasi BNI Mobile Banking dan login.',
          'Pilih menu **Pembayaran** > **Virtual Account Billing**.',
          'Pilih rekening sumber dana dan masukkan Kode VA **9881928374920**.',
          'Layar akan menampilkan validasi tagihan UKT UIN Salatiga.',
          'Masukkan Password Transaksi dan tekan **Lanjut**.'
        ]
      },
      {
        channel: 'ATM BNI',
        steps: [
          'Masukkan kartu ATM BNI & PIN.',
          'Pilih menu **Menu Lain** > **Pembayaran** > **Virtual Account Billing**.',
          'Masukkan Nomor Virtual Account **9881928374920**.',
          'Pastikan nama & nominal sesuai, lalu tekan **YA**.'
        ]
      }
    ]
  },
  { 
    id: 'bri', 
    name: 'Bank BRI (VA / BRIVA)', 
    category: 'Virtual Account', 
    icon: Building2,
    vaCode: '7701928374920',
    instructions: [
      {
        channel: 'BRImo (BRI Mobile)',
        steps: [
          'Login ke aplikasi BRImo.',
          'Pilih menu **BRIVA** > **Tambah Transaksi Baru**.',
          'Masukkan Nomor BRIVA **7701928374920**.',
          'Cek rincian nama dan jumlah tagihan UKT.',
          'Konfirmasi dan masukkan PIN BRImo.'
        ]
      },
      {
        channel: 'ATM BRI',
        steps: [
          'Masukkan kartu ATM BRI & PIN.',
          'Pilih menu **Transaksi Lain** > **Pembayaran** > **Lainnya** > **BRIVA**.',
          'Masukkan Nomor BRIVA **7701928374920**.',
          'Tekan **Ya** untuk mengonfirmasi pembayaran.'
        ]
      }
    ]
  },
  { 
    id: 'qris', 
    name: 'QRIS (All Bank / E-Wallet)', 
    category: 'Instan QR Code', 
    icon: QrCode,
    vaCode: 'QRIS-UINSALATIGA-UKT',
    instructions: [
      {
        channel: 'Aplikasi E-Wallet (GoPay, OVO, DANA, ShopeePay)',
        steps: [
          'Buka aplikasi e-wallet pilihan kamu (GoPay, OVO, DANA, dll).',
          'Pilih menu **Scan / Pindai QR**.',
          'Arahkan kamera ke Kode QRIS Kampus UIN Salatiga.',
          'Periksa nominal (Rp 3.200.000) dan nama merchant **UIN Salatiga**.',
          'Selesaikan pembayaran dengan memasukkan PIN e-wallet.'
        ]
      },
      {
        channel: 'Mobile Banking (BCA, Mandiri, BNI, BRI, dll)',
        steps: [
          'Buka aplikasi Mobile Banking bank manapun yang kamu miliki.',
          'Pilih fitur **QRIS / Scan QR** di halaman utama aplikasi.',
          'Pindai Kode QRIS resmi UIN Salatiga.',
          'Konfirmasi detail tagihan UKT dan nama merchant **UIN Salatiga**.',
          'Masukkan PIN Mobile Banking untuk menyelesaikan transaksi.'
        ]
      }
    ]
  }
];