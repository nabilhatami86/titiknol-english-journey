import type { TaskPrompt } from '@/types/ielts-writing';

export const TASK1_PROMPTS: TaskPrompt[] = [
  {
    id: 't1-1',
    title: 'Internet Usage by Age Group',
    question: `The bar chart below shows the percentage of people in different age groups who used the internet daily in a particular country in 2010 and 2020.

[Chart description: In 2010 — Age 16-24: 72%, Age 25-34: 68%, Age 35-44: 55%, Age 45-54: 42%, Age 55-64: 28%, Age 65+: 15%. In 2020 — Age 16-24: 96%, Age 25-34: 94%, Age 35-44: 90%, Age 45-54: 82%, Age 55-64: 68%, Age 65+: 48%]

Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.`,
    tips: [
      'Tulis overview di paragraf kedua (jangan di intro)',
      'Bandingkan tren antara 2010 dan 2020',
      'Gunakan data spesifik (angka persentase)',
      'Jangan tulis opini atau kesimpulan pribadi',
    ],
  },
  {
    id: 't1-2',
    title: 'Population Growth in Three Cities',
    question: `The line graph below shows the population (in millions) of three cities — Tokyo, Lagos, and Sydney — from 1980 to 2020 with projections to 2040.

[Chart description: Tokyo: 1980=8.5M, 1990=11M, 2000=12.5M, 2010=13M, 2020=13.5M, 2040=13M (projected). Lagos: 1980=2M, 1990=4M, 2000=7M, 2010=10.5M, 2020=14.8M, 2040=24M (projected). Sydney: 1980=3M, 1990=3.6M, 2000=4M, 2010=4.4M, 2020=5.3M, 2040=6.5M (projected)]

Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.`,
    tips: [
      'Identifikasi tren utama setiap kota',
      'Bandingkan pertumbuhan yang paling signifikan',
      'Sebutkan nilai tertinggi dan terendah',
      'Gunakan language of trends: rose sharply, remained stable, is projected to',
    ],
  },
  {
    id: 't1-3',
    title: 'Energy Sources — Pie Chart',
    question: `The pie charts below show the proportion of electricity generated from different energy sources in Country X in 2000 and 2022.

[Chart description: 2000 — Coal: 52%, Natural Gas: 20%, Nuclear: 15%, Hydroelectric: 8%, Renewables: 5%. 2022 — Coal: 28%, Natural Gas: 22%, Nuclear: 12%, Hydroelectric: 10%, Renewables: 28%]

Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.`,
    tips: [
      'Highlight perubahan paling signifikan (coal turun, renewables naik)',
      'Bandingkan dua pie chart secara langsung',
      'Gunakan frasa perbandingan: whereas, while, compared to',
      'Jangan jelaskan SEMUA angka — pilih yang paling penting',
    ],
  },
  {
    id: 't1-4',
    title: 'Water Recycling Process',
    question: `The diagram below illustrates the process of water recycling in a modern city.

[Process description: (1) Rainwater collected from rooftops → (2) Stored in underground tanks → (3) Filtered through sand and gravel layers → (4) Treated with UV light to kill bacteria → (5) Pumped to storage reservoir → (6) Distributed for non-drinking uses (toilets, gardening, industrial) → (7) Wastewater collected → (8) Sent to treatment plant → back to step 3]

Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.`,
    tips: [
      'Gunakan passive voice: water is collected, is filtered',
      'Deskripsikan proses secara berurutan dengan sequencers: first, then, after that, finally',
      'Sebutkan tujuan setiap tahap jika jelas dari diagram',
      'Jangan pakai opini pribadi',
    ],
  },
];

export const TASK2_PROMPTS: TaskPrompt[] = [
  {
    id: 't2-1',
    title: 'Technology & Social Skills',
    question: `Some people believe that modern technology has made people less socially skilled. To what extent do you agree or disagree?

Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.`,
    tips: [
      'Nyatakan posisi (agree/disagree/partially) dengan jelas di intro',
      'Kembangkan 2 body paragraphs dengan satu main idea masing-masing',
      'Dukung argumen dengan contoh spesifik',
      'Tulis conclusion yang me-restate posisimu',
    ],
  },
  {
    id: 't2-2',
    title: 'Government vs Individual Health Responsibility',
    question: `Some argue that it is the responsibility of governments to ensure that all citizens have a healthy lifestyle. Others believe that individuals should take responsibility for their own health.

Discuss both views and give your own opinion. Write at least 250 words.`,
    tips: [
      'Bahas KEDUA pandangan secara seimbang sebelum memberikan opini',
      'Gunakan language of discussion: proponents argue, critics contend, on the other hand',
      'Nyatakan opinimu di intro dan ulangi di conclusion',
      'Tambahkan contoh konkret (kebijakan pemerintah, gaya hidup individu)',
    ],
  },
  {
    id: 't2-3',
    title: 'Traffic Congestion in Cities',
    question: `Traffic congestion in cities is a growing problem worldwide.

What are the main causes of this problem? What measures could be taken to solve it? Write at least 250 words.`,
    tips: [
      'Bahas PENYEBAB di body 1 dan SOLUSI di body 2',
      'Berikan 2-3 penyebab yang jelas dan logis',
      'Berikan 2-3 solusi yang realistis dan spesifik',
      'Pastikan solusi berhubungan langsung dengan penyebab yang disebutkan',
    ],
  },
  {
    id: 't2-4',
    title: 'Free University Education',
    question: `In some countries, university education is free for all students. Do you think this is a positive or negative development?

Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.`,
    tips: [
      'Pilih satu posisi: positive ATAU negative (hindari "it depends" yang tidak berkembang)',
      'Berikan 2 alasan kuat dengan penjelasan mendalam',
      'Gunakan contoh dari negara nyata jika memungkinkan',
      'Akui counter-argument dan refute dengan argumen yang lebih kuat',
    ],
  },
  {
    id: 't2-5',
    title: 'Pros and Cons of Globalization',
    question: `Globalization has had both positive and negative effects on societies around the world.

Discuss the advantages and disadvantages of globalization and give your own opinion. Write at least 250 words.`,
    tips: [
      'Bahas keuntungan di body 1: economic growth, cultural exchange, access to technology',
      'Bahas kerugian di body 2: local culture threatened, job loss, wealth inequality',
      'Gunakan contoh nyata: perusahaan multinasional, perdagangan bebas, internet',
      'Berikan opini yang jelas di intro dan ulangi di conclusion',
    ],
  },
];
