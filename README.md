# TitikNol Journey — English Learning Platform

Platform belajar bahasa Inggris lengkap berbasis Next.js dengan AI-powered feedback.

## Fitur Utama

### Course Terstruktur
- **TN Basic** — course pemula: grammar, reading, listening, speaking
- **TN Intermediate** — course menengah: grammar, reading, listening, speaking, writing
- **TN Advance** — course lanjutan: grammar, reading, listening, speaking, writing

### Practice
- **AI Writing Check** — analisis grammar, vocab, coherence, sentence structure dengan Groq AI; riwayat tersimpan di localStorage
- **Guided Essay Writing** — tulis essay step by step (Intro → Body 1 → Body 2 → Conclusion) dengan AI review per section; feedback mencakup structure breakdown, grammar corrections, vocab suggestions, dan pro tips; cache localStorage agar progress tidak hilang saat reload
- **Latihan Surat** — formal & informal letter dengan AI feedback
- **IELTS Writing** — Task 1 & Task 2 dengan AI scoring dan feedback
- **IELTS Reading** — 3 latihan Academic Reading buatan sendiri; masing-masing 3 passages × 40 soal; tipe soal: True/False/Not Given, Yes/No/Not Given, short answer, sentence completion
- **IELTS Listening** — listening practice dengan audio
- **General Listening** — BBC listening practice
- **TOEFL Practice** — reading & practice soal
- **Translate** — terjemahan instan

### Referensi
- **Vocabulary** — kamus vocab dengan kategori, sinonim, contoh kalimat, dan quiz
- **Grammar Guide** — materi grammar lengkap dengan latihan dan penjelasan

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4
- **AI**: Groq `llama-3.3-70b-versatile` — primary key + backup key fallback otomatis
- **State**: Zustand + localStorage
- **Language**: TypeScript

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Buat file `.env.local` dan isi API key:
   ```env
   GROQ_API_KEY=your_primary_groq_key
   GROQ_API_KEY_BACKUP=your_backup_groq_key
   ```

3. Jalankan dev server:
   ```bash
   npm run dev
   ```

4. Buka [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Struktur AI Routes

| Route | Fungsi |
|---|---|
| `/api/writing-check` | AI Writing Check — analisis teks bebas |
| `/api/grammar-review` | Grammar correction detail |
| `/api/essay-review` | Review per section essay (Intro / Body / Conclusion) |
| `/api/letter-review` | Review surat formal & informal |
| `/api/ielts-writing` | Scoring IELTS Writing Task 1 & 2 |

Semua route menggunakan `src/lib/callAI.ts` dengan fallback otomatis dari `GROQ_API_KEY` ke `GROQ_API_KEY_BACKUP`.
