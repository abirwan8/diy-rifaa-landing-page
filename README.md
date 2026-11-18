# DIY Rifa's (Next.js)

Situs marketing untuk channel YouTube DIY dan toko Shopee.
**Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + TypeScript.**

```bash
nvm use                          # Node >= 20.9 (direkomendasikan 22, lihat .nvmrc)
npm install
cp .env.example .env.local       # opsional: atur SITE_URL
npm run dev                      # http://localhost:3000
```

Tanpa konfigurasi apa pun situs sudah lengkap: foto placeholder dan video contoh disertakan.

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | server pengembangan |
| `npm run build` && `npm start` | produksi (SSG, gambar dioptimasi on-demand) |
| `npm run build:static` | export statis penuh ke `out/` (GitHub Pages, hosting statis apa pun) |
| `npm run typecheck` | cek TypeScript |

---

## 1. Struktur

```
content/
  products/*.json          <- 1 file per produk (nama, harga, badge, link Shopee, foto)
  gallery.json             <- foto "Made With Love"
  videos.json              <- daftar video YouTube yang ditampilkan
public/images/             <- hero/ products/ gallery/ about/ fallback/ (foto)
src/
  app/                     <- layout.tsx, page.tsx, globals.css, sitemap/robots/manifest, not-found
  components/              <- seksi halaman; Filter.tsx & Header.tsx = client components
    ui/Reveal.tsx          <- animasi muncul saat scroll
  data/site.ts             <- nama brand, link Shopee/YouTube/sosmed, navigasi, badge kepercayaan
  data/video-config.ts     <- label kategori video
  lib/videos.ts            <- loader + validasi Zod untuk daftar video
  lib/content.ts           <- loader + validasi Zod untuk produk/galeri
  lib/seo.ts               <- JSON-LD schema.org
  lib/env.ts               <- validasi environment (server-only)
```

### Produk (`content/products/<slug>.json`)

```json
{
  "name": "Premium Satin Ribbon Roll (6cm x 25m) – Pastel Rose & Blush Pink",
  "description": "Ringkasan singkat (dipakai untuk SEO).",
  "price": 28500,
  "category": "ribbons",
  "badge": "Best Seller",
  "badgeStyle": "soft",
  "shopeeUrl": "https://shopee.co.id/product/<shopid>/<itemid>",
  "image": "/images/products/satin-ribbon-roll.jpg",
  "imageAlt": "Deskripsikan fotonya",
  "rating": 4.9,
  "sold": 12400,
  "order": 1
}
```

* **Tambah produk** = tambah file. **Sembunyikan** = `"draft": true`. Urutan = `order` (kecil dulu).
* `category`: `ribbons | wrapping | keychain | beads | kits | tools | packaging` (label di `src/data/site.ts`).
  Chip filter dibuat otomatis dari kategori yang punya produk.
* Setiap file **divalidasi dengan Zod** saat build: harga harus bilangan bulat positif, link harus domain Shopee,
  file foto harus ada di `public/`. Salah ketik = build gagal dengan pesan jelas, bukan halaman rusak.
* 6 produk pertama tampil, sisanya di balik tombol "Show all N products" (`site.products.initialCount`).

### Foto
Ganti JPG placeholder di `public/images/**` (nama file boleh sama). Ukuran ~1200 px sisi panjang. Perbarui teks `alt`
(`imageAlt`, `gallery.json`, `Hero.tsx`) agar sesuai foto asli: penting untuk SEO dan aksesibilitas.
Ganti juga `public/og-default.jpg` (1200x630) untuk preview media sosial.

---

## 2. Animasi saat scroll

Komponen **`<Reveal>`** (`src/components/ui/Reveal.tsx`) membungkus setiap blok. Satu `IntersectionObserver`
bersama dipakai semua elemen; begitu ~12% elemen masuk layar, atribut `data-visible` ditambahkan dan CSS
menganimasikan `opacity` + `transform` dengan kurva *ease-out-expo* (cepat di awal, melambat halus), 1–1,3 detik.

```tsx
<Reveal>                              // naik + fade (default)
<Reveal variant="right">              // geser dari kanan; juga left | scale | fade
<Reveal as="li" variant="mask" index={2}>   // foto "terbuka" dari bingkai; index = jeda berantai 90 ms
```

* Kartu dalam satu baris muncul **berantai** (stagger), judul seksi dulu lalu chip lalu kartu.
* Hero punya koreografi sendiri: kartu foto "dibagikan" keluar dari tengah, headline naik per baris, lalu kartu melayang pelan.
* Ada progress bar scroll di atas halaman dan parallax hero (CSS scroll-driven, di browser yang mendukung).
* Aman: halaman **terlihat penuh tanpa JavaScript**; `prefers-reduced-motion` mematikan animasi; jaring pengaman
  5 detik menampilkan semua konten bila hydration gagal. Semua gaya ada di bagian "motion" `src/app/globals.css`.

---

## 3. Video YouTube dari JSON

Tidak ada YouTube API, RSS, atau API key. Semua data kartu tutorial dikelola di `content/videos.json` dan divalidasi saat build.
Satu objek JSON berisi `id` (ID video YouTube, 11 karakter), `title`, `publishedAt`, dan `categories`.
Thumbnail otomatis memakai `i.ytimg.com` jika tidak diisi; `views`, `durationSeconds`, `description`, `shopeeUrl`,
dan `shopeeLabel` bersifat opsional. Jika ingin memakai thumbnail lokal, simpan di `public/images/` dan gunakan path `/images/...`.

Contoh:

```json
{
  "id": "dQw4w9WgXcQ",
  "title": "Cara Membuat Buket Bunga Satin",
  "description": "Tutorial langkah demi langkah membuat buket bunga satin.",
  "publishedAt": "2026-09-30T08:00:00Z",
  "categories": ["bouquets", "beginner"],
  "views": 54200,
  "durationSeconds": 862,
  "shopeeUrl": "https://shopee.co.id/product/1/2",
  "shopeeLabel": "Get Bouquet Kit"
}
```

Kategori yang tersedia: `beginner`, `bouquets`, `boxes`, `keychains`. Untuk menambahkan video, tambahkan objek
ke array di JSON dan jalankan ulang build/deploy. Jumlah subscriber yang ditampilkan di situs diatur manual di
`site.channelStats` pada `src/data/site.ts`.

---

## 4. SEO

* Metadata API Next.js: `title` template, description, canonical, robots (`max-image-preview:large`), Open Graph, Twitter card.
* **JSON-LD**: `Organization`, `WebSite`, `ItemList` + `Product`/`Offer` dan `VideoObject` untuk setiap entri video
  dengan ID YouTube valid. Baris contoh yang memakai ID `sample-*` tidak ikut.
* `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` (file convention Next.js), favicon set.
* Satu `<h1>`, urutan heading logis, landmark, alt teks, skip link, fokus terlihat.
* Performa: halaman statis, font self-hosted (`next/font/local`, subset latin, otomatis preload), gambar responsif
  WebP via `next/image` (gambar hero tengah di-`preload`, sisanya lazy), tanpa layout shift.

**Setelah rilis**: daftarkan situs di Google Search Console, kirim `/sitemap.xml`, uji dengan Rich Results Test.

---

## 5. Deploy

**Vercel (paling mudah)**: import repo dan, bila perlu, atur `SITE_URL`. Video tidak memerlukan API key.

**Server Node / Docker**: `npm run build && npm start` (butuh Node, gambar dioptimasi on-demand; `sharp` sudah terpasang).

**GitHub Pages / hosting statis**: workflow `.github/workflows/deploy.yml` memakai `npm run build:static`.
Tambahkan *variable* `SITE_URL` bila diperlukan. Pada mode ini gambar tidak dioptimasi (batasan Next.js static export)
dan thumbnail YouTube dimuat langsung dari `i.ytimg.com`.
Jika situs berada di `user.github.io/repo/`, tambahkan `basePath: '/repo'` di `next.config.ts`.

---

## 6. Checklist sebelum rilis

- [ ] Ganti semua `REPLACE_*`: `src/data/site.ts` (toko, channel, sosmed) dan `shopeeUrl` tiap produk (build memberi peringatan selama masih ada).
- [ ] Pastikan ejaan nama brand di `src/data/site.ts` ("DIY Rifa's").
- [ ] Ganti foto placeholder + teks alt; ganti `public/og-default.jpg`.
- [ ] Perbarui `rating` / `sold` dengan angka Shopee asli (atau hapus field-nya), juga `site.trust` dan `site.channelStats`: ditampilkan sebagai fakta.
- [ ] Ganti data contoh di `content/videos.json` dengan video YouTube yang sebenarnya.
- [ ] Atur `SITE_URL` untuk domain produksi.

Font: Plus Jakarta Sans dan Playfair Display (SIL Open Font License), disalin dari paket Fontsource ke `src/app/fonts/`.
