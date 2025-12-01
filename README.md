# 🚀 QRISin — QRIS Dynamic Generator (Nominal)

Dibuat oleh [Wanndev](https://github.com/sofwanrsd)

QRISin adalah aplikasi web open-source berbasis **Next.js** yang digunakan untuk:

- Mengupload gambar QRIS statis
- Membaca RAW QRIS dari gambar (menggunakan jsQR)
- Menambahkan nominal (TAG 54)
- Mengubah QRIS statis menjadi **QRIS Dinamis Valid BI**
- Menghasilkan QR PNG siap-scan
- Mendukung Dark Mode & tampilan responsif Bootstrap

Project ini cocok untuk:

- Website auto-pembayaran
- Bot Telegram Payment
- Online Shop otomatis
- Sistem kasir digital
- Developer QRIS tools

---

## ✨ Fitur Utama

### ✔ Convert QRIS Biasa → QRIS Dinamis (Nominal)

Menggunakan algoritma:

- Ubah Tag `01` → `12`
- Tambah tag nominal `54xx[nominal]`
- CRC16 dihitung ulang (CRC16-CCITT-FALSE)
- Struktur QRIS asli merchant **tidak diubah**

### ✔ Upload Gambar QRIS (PNG/JPG)

Gambar dibaca dengan `jsQR` untuk menghasilkan RAW QRIS.

### ✔ API Endpoint

Endpoint bawaan:

## POST /api/generate

Contoh Body:

```json
{
  "qris_raw": "000201010212...",
  "amount": "15000"
}
```

Contoh Response:

```
{
  "status": true,
  "qris_dynamic": "000201010212...",
  "qr_png": "data:image/png;base64,..."
}
```

## ✔ Modern UI (Bootstrap 5 + Dark Mode)

Navbar premium
Layout rapi & responsif
Tombol Dark Mode / Light Mode
Footer dengan branding

## ✔ Tidak menyimpan data

Aplikasi ini sepenuhnya client-side untuk input gambar dan tidak menyimpan data QR apa pun.

## 🛠️ Teknologi

Next.js 14 (Pages Router)
Bootstrap 5 (CDN)
jsQR — membaca QR dari gambar
qrcode — membuat QR PNG Base64
Custom CRC16 — valid untuk standard QRIS (EMV)
React Hooks

## 📦 Instalasi

1. Clone repository

```
git clone https://github.com/sofwanrsd/qrisin
cd qrisin
```

2. Install dependencies

```
npm install
```

3. Jalankan development server

```
npm run dev
```

Running :

```
http://localhost:3000
```

## 📁 Struktur Project

```
qrisin/
│
├─ core/
│   └─ qris.js            # Logic QRIS: nominal, tag, CRC
│
├─ pages/
│   ├─ layout.js          # Navbar, Dark Mode, Footer
│   ├─ index.js           # Halaman utama
│   ├─ docs.js            # Dokumentasi API
│   └─ api/
│       └─ generate.js    # API QRIS Dynamic Generator
│
├─ styles/
│   └─ globals.css
│
├─ public/
│   └─ favicon.ico
│
├─ package.json
└─ next.config.js
```

## 📡 API Documentation (Singkat)

### POST /api/generate

Request:

```
{
  "qris_raw": "000201010211...",
  "amount": "10000"
}
```

Response:

```
{
  "status": true,
  "qris_dynamic": "000201010212...",
  "qr_png": "data:image/png;base64,..."
}
```

Jika error:

```
{
  "status": false,
  "error": "QRIS tidak valid"
}
```

## 🔐 Validasi QRIS

QRIS dinamis yang dihasilkan:

- Valid EMV
- Menggunakan CRC16-CCITT-FALSE
- Bisa discan: Dana, OVO, ShopeePay, Gopay, BCA, BRI, Mandiri, dll.

## 🌙 Dark Mode

- Disimpan ke localStorage
- Tersedia tombol toggle di navbar
- Semua halaman ikut berubah

## 🧑‍💻 Kontribusi

- Pull Request sangat diterima.
- Jika ingin menambah fitur baru

📄 Lisensi
MIT License
Created by Wanndev
© 2025 QRISin
