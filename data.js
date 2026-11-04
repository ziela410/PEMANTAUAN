// ============================================================
// DATA DUMMY — Dashboard Pemantauan Pelajar
// Jabatan Kejuruteraan Elektrik, Politeknik Kota Bharu
// ============================================================

const SEMESTER_SEMASA = 'Semester 2, Sesi 2026/2027';
const TARIKH_KEMASKINI = '04 November 2026';

const classes = ['EE1A', 'EE1B', 'EE2A', 'EE2B', 'EE3A', 'EE3B'];

const subjects = {
  'EE1A': ['Litar Elektrik 1', 'Matematik Kejuruteraan 1', 'Sains Kejuruteraan', 'Lukisan Kejuruteraan', 'Komunikasi Teknikal'],
  'EE1B': ['Litar Elektrik 1', 'Matematik Kejuruteraan 1', 'Sains Kejuruteraan', 'Lukisan Kejuruteraan', 'Komunikasi Teknikal'],
  'EE2A': ['Litar Elektrik 2', 'Matematik Kejuruteraan 2', 'Mesin Elektrik 1', 'Elektronik Analog', 'Pengaturcaraan Komputer'],
  'EE2B': ['Litar Elektrik 2', 'Matematik Kejuruteraan 2', 'Mesin Elektrik 1', 'Elektronik Analog', 'Pengaturcaraan Komputer'],
  'EE3A': ['Mesin Elektrik 2', 'Sistem Kawalan', 'Pemasangan Elektrik', 'Projek Tahun Akhir', 'Keusahawanan'],
  'EE3B': ['Mesin Elektrik 2', 'Sistem Kawalan', 'Pemasangan Elektrik', 'Projek Tahun Akhir', 'Keusahawanan'],
};

// ── PELAJAR ──────────────────────────────────────────────────
const students = [
  // EE1A
  { id: 1,  nama: 'Ahmad Faris Bin Zulkifli',    no_matrik: 'DKE231001', kelas: 'EE1A', program: 'DKE', semester: 2, telefon_wali: '019-3421876' },
  { id: 2,  nama: 'Nurul Izzati Binti Hamzah',   no_matrik: 'DKE231002', kelas: 'EE1A', program: 'DKE', semester: 2, telefon_wali: '012-7654321' },
  { id: 3,  nama: 'Muhammad Haziq Bin Roslan',   no_matrik: 'DKE231003', kelas: 'EE1A', program: 'DKE', semester: 2, telefon_wali: '011-2345678' },
  { id: 4,  nama: 'Siti Nur Ain Binti Kamal',    no_matrik: 'DKE231004', kelas: 'EE1A', program: 'DKE', semester: 2, telefon_wali: '013-9876543' },
  { id: 5,  nama: 'Amirul Hakimi Bin Nordin',    no_matrik: 'DKE231005', kelas: 'EE1A', program: 'DKE', semester: 2, telefon_wali: '017-1122334' },
  // EE1B
  { id: 6,  nama: 'Farah Nabilah Binti Ismail',  no_matrik: 'DKE231006', kelas: 'EE1B', program: 'DKE', semester: 2, telefon_wali: '018-5566778' },
  { id: 7,  nama: 'Izzuddin Bin Zakaria',         no_matrik: 'DKE231007', kelas: 'EE1B', program: 'DKE', semester: 2, telefon_wali: '014-9988776' },
  { id: 8,  nama: 'Nur Syafiqah Binti Abdul Rahman', no_matrik: 'DKE231008', kelas: 'EE1B', program: 'DKE', semester: 2, telefon_wali: '016-3344556' },
  { id: 9,  nama: 'Hafiz Bin Mohamad',            no_matrik: 'DKE231009', kelas: 'EE1B', program: 'DKE', semester: 2, telefon_wali: '010-7788990' },
  { id: 10, nama: 'Alya Farhana Binti Azman',    no_matrik: 'DKE231010', kelas: 'EE1B', program: 'DKE', semester: 2, telefon_wali: '019-1122334' },
  // EE2A
  { id: 11, nama: 'Zulhilmi Bin Sulaiman',        no_matrik: 'DKE221011', kelas: 'EE2A', program: 'DKE', semester: 4, telefon_wali: '012-2233445' },
  { id: 12, nama: 'Nurhidayah Binti Othman',      no_matrik: 'DKE221012', kelas: 'EE2A', program: 'DKE', semester: 4, telefon_wali: '013-3344556' },
  { id: 13, nama: 'Ridhwan Bin Jamaludin',         no_matrik: 'DKE221013', kelas: 'EE2A', program: 'DKE', semester: 4, telefon_wali: '011-4455667' },
  { id: 14, nama: 'Aina Syazwani Binti Ramli',    no_matrik: 'DKE221014', kelas: 'EE2A', program: 'DKE', semester: 4, telefon_wali: '017-5566778' },
  { id: 15, nama: 'Muhamad Syafiq Bin Hasnan',    no_matrik: 'DKE221015', kelas: 'EE2A', program: 'DKE', semester: 4, telefon_wali: '018-6677889' },
  // EE2B
  { id: 16, nama: 'Izzati Nadhirah Binti Yusof',  no_matrik: 'DKE221016', kelas: 'EE2B', program: 'DKE', semester: 4, telefon_wali: '014-7788990' },
  { id: 17, nama: 'Firdaus Bin Baharum',           no_matrik: 'DKE221017', kelas: 'EE2B', program: 'DKE', semester: 4, telefon_wali: '016-8899001' },
  { id: 18, nama: 'Nur Amira Binti Mohd Noor',    no_matrik: 'DKE221018', kelas: 'EE2B', program: 'DKE', semester: 4, telefon_wali: '010-9900112' },
  { id: 19, nama: 'Ariff Hazwan Bin Kamaruddin',  no_matrik: 'DKE221019', kelas: 'EE2B', program: 'DKE', semester: 4, telefon_wali: '019-0011223' },
  { id: 20, nama: 'Sharifah Nadzira Binti Syed Ali', no_matrik: 'DKE221020', kelas: 'EE2B', program: 'DKE', semester: 4, telefon_wali: '012-1122334' },
  // EE3A (Latihan Industri)
  { id: 21, nama: 'Mohd Aizat Bin Ghazali',       no_matrik: 'DKE211021', kelas: 'EE3A', program: 'DKE', semester: 6, telefon_wali: '013-2233445' },
  { id: 22, nama: 'Nur Liyana Binti Hassan',       no_matrik: 'DKE211022', kelas: 'EE3A', program: 'DKE', semester: 6, telefon_wali: '011-3344556' },
  { id: 23, nama: 'Azfar Hakim Bin Zainuddin',    no_matrik: 'DKE211023', kelas: 'EE3A', program: 'DKE', semester: 6, telefon_wali: '017-4455667' },
  { id: 24, nama: 'Nurul Shazwani Binti Mazlan',  no_matrik: 'DKE211024', kelas: 'EE3A', program: 'DKE', semester: 6, telefon_wali: '018-5566778' },
  { id: 25, nama: 'Hafizuddin Bin Mustafa',        no_matrik: 'DKE211025', kelas: 'EE3A', program: 'DKE', semester: 6, telefon_wali: '014-6677889' },
  // EE3B (Latihan Industri)
  { id: 26, nama: 'Izzatul Husna Binti Zaki',     no_matrik: 'DKE211026', kelas: 'EE3B', program: 'DKE', semester: 6, telefon_wali: '016-7788990' },
  { id: 27, nama: 'Danial Haqimi Bin Razali',      no_matrik: 'DKE211027', kelas: 'EE3B', program: 'DKE', semester: 6, telefon_wali: '010-8899001' },
  { id: 28, nama: 'Syafiq Ikhwan Bin Musa',        no_matrik: 'DKE211028', kelas: 'EE3B', program: 'DKE', semester: 6, telefon_wali: '019-9900112' },
  { id: 29, nama: 'Nur Aisyah Binti Lokman',       no_matrik: 'DKE211029', kelas: 'EE3B', program: 'DKE', semester: 6, telefon_wali: '012-0011223' },
  { id: 30, nama: 'Amirudin Bin Abdullah',         no_matrik: 'DKE211030', kelas: 'EE3B', program: 'DKE', semester: 6, telefon_wali: '013-1122334' },
];

// ── KEHADIRAN ─────────────────────────────────────────────────
const attendance = [
  { student_id: 1,  peratus_hadir: 92, minggu_absen: 2, status: 'baik' },
  { student_id: 2,  peratus_hadir: 75, minggu_absen: 6, status: 'kritikal' },
  { student_id: 3,  peratus_hadir: 88, minggu_absen: 3, status: 'baik' },
  { student_id: 4,  peratus_hadir: 95, minggu_absen: 1, status: 'baik' },
  { student_id: 5,  peratus_hadir: 78, minggu_absen: 5, status: 'berisiko' },
  { student_id: 6,  peratus_hadir: 83, minggu_absen: 4, status: 'perhatian' },
  { student_id: 7,  peratus_hadir: 97, minggu_absen: 1, status: 'baik' },
  { student_id: 8,  peratus_hadir: 70, minggu_absen: 8, status: 'kritikal' },
  { student_id: 9,  peratus_hadir: 90, minggu_absen: 2, status: 'baik' },
  { student_id: 10, peratus_hadir: 85, minggu_absen: 3, status: 'perhatian' },
  { student_id: 11, peratus_hadir: 93, minggu_absen: 2, status: 'baik' },
  { student_id: 12, peratus_hadir: 76, minggu_absen: 6, status: 'kritikal' },
  { student_id: 13, peratus_hadir: 88, minggu_absen: 3, status: 'baik' },
  { student_id: 14, peratus_hadir: 91, minggu_absen: 2, status: 'baik' },
  { student_id: 15, peratus_hadir: 79, minggu_absen: 5, status: 'berisiko' },
  { student_id: 16, peratus_hadir: 96, minggu_absen: 1, status: 'baik' },
  { student_id: 17, peratus_hadir: 82, minggu_absen: 4, status: 'perhatian' },
  { student_id: 18, peratus_hadir: 87, minggu_absen: 3, status: 'baik' },
  { student_id: 19, peratus_hadir: 73, minggu_absen: 7, status: 'kritikal' },
  { student_id: 20, peratus_hadir: 94, minggu_absen: 2, status: 'baik' },
  { student_id: 21, peratus_hadir: 89, minggu_absen: 3, status: 'baik' },
  { student_id: 22, peratus_hadir: 91, minggu_absen: 2, status: 'baik' },
  { student_id: 23, peratus_hadir: 77, minggu_absen: 6, status: 'berisiko' },
  { student_id: 24, peratus_hadir: 95, minggu_absen: 1, status: 'baik' },
  { student_id: 25, peratus_hadir: 86, minggu_absen: 3, status: 'baik' },
  { student_id: 26, peratus_hadir: 92, minggu_absen: 2, status: 'baik' },
  { student_id: 27, peratus_hadir: 68, minggu_absen: 9, status: 'kritikal' },
  { student_id: 28, peratus_hadir: 84, minggu_absen: 4, status: 'perhatian' },
  { student_id: 29, peratus_hadir: 90, minggu_absen: 2, status: 'baik' },
  { student_id: 30, peratus_hadir: 81, minggu_absen: 5, status: 'perhatian' },
];

const attendanceTrend = [
  { minggu: 'M1', EE1A: 95, EE1B: 93, EE2A: 91, EE2B: 94, EE3A: 90, EE3B: 92 },
  { minggu: 'M2', EE1A: 92, EE1B: 90, EE2A: 89, EE2B: 92, EE3A: 88, EE3B: 91 },
  { minggu: 'M3', EE1A: 88, EE1B: 87, EE2A: 86, EE2B: 89, EE3A: 87, EE3B: 89 },
  { minggu: 'M4', EE1A: 86, EE1B: 85, EE2A: 85, EE2B: 87, EE3A: 85, EE3B: 86 },
  { minggu: 'M5', EE1A: 85, EE1B: 83, EE2A: 87, EE2B: 86, EE3A: 86, EE3B: 84 },
  { minggu: 'M6', EE1A: 84, EE1B: 82, EE2A: 88, EE2B: 85, EE3A: 87, EE3B: 83 },
  { minggu: 'M7', EE1A: 87, EE1B: 84, EE2A: 87, EE2B: 88, EE3A: 89, EE3B: 85 },
  { minggu: 'M8', EE1A: 86, EE1B: 83, EE2A: 86, EE2B: 87, EE3A: 88, EE3B: 84 },
];

// ── AKADEMIK ──────────────────────────────────────────────────
const academic = [
  { student_id: 1,  cgpa: 3.52, cgpa_lepas: 3.45, subjek_gagal: [], ca: 72, peperiksaan: 68 },
  { student_id: 2,  cgpa: 1.85, cgpa_lepas: 2.10, subjek_gagal: ['Litar Elektrik 1', 'Matematik Kejuruteraan 1'], ca: 42, peperiksaan: 38 },
  { student_id: 3,  cgpa: 3.10, cgpa_lepas: 3.00, subjek_gagal: [], ca: 65, peperiksaan: 60 },
  { student_id: 4,  cgpa: 3.78, cgpa_lepas: 3.70, subjek_gagal: [], ca: 80, peperiksaan: 78 },
  { student_id: 5,  cgpa: 2.30, cgpa_lepas: 2.45, subjek_gagal: ['Matematik Kejuruteraan 1'], ca: 50, peperiksaan: 48 },
  { student_id: 6,  cgpa: 2.85, cgpa_lepas: 2.90, subjek_gagal: [], ca: 60, peperiksaan: 55 },
  { student_id: 7,  cgpa: 3.65, cgpa_lepas: 3.55, subjek_gagal: [], ca: 78, peperiksaan: 75 },
  { student_id: 8,  cgpa: 1.60, cgpa_lepas: 1.80, subjek_gagal: ['Litar Elektrik 1', 'Sains Kejuruteraan', 'Matematik Kejuruteraan 1'], ca: 35, peperiksaan: 32 },
  { student_id: 9,  cgpa: 3.30, cgpa_lepas: 3.20, subjek_gagal: [], ca: 68, peperiksaan: 65 },
  { student_id: 10, cgpa: 2.90, cgpa_lepas: 2.85, subjek_gagal: [], ca: 62, peperiksaan: 58 },
  { student_id: 11, cgpa: 3.40, cgpa_lepas: 3.35, subjek_gagal: [], ca: 70, peperiksaan: 67 },
  { student_id: 12, cgpa: 1.95, cgpa_lepas: 2.20, subjek_gagal: ['Litar Elektrik 2', 'Elektronik Analog'], ca: 45, peperiksaan: 40 },
  { student_id: 13, cgpa: 3.20, cgpa_lepas: 3.10, subjek_gagal: [], ca: 66, peperiksaan: 63 },
  { student_id: 14, cgpa: 3.55, cgpa_lepas: 3.48, subjek_gagal: [], ca: 74, peperiksaan: 71 },
  { student_id: 15, cgpa: 2.15, cgpa_lepas: 2.30, subjek_gagal: ['Matematik Kejuruteraan 2'], ca: 48, peperiksaan: 45 },
  { student_id: 16, cgpa: 3.80, cgpa_lepas: 3.75, subjek_gagal: [], ca: 82, peperiksaan: 80 },
  { student_id: 17, cgpa: 2.70, cgpa_lepas: 2.65, subjek_gagal: [], ca: 57, peperiksaan: 55 },
  { student_id: 18, cgpa: 3.00, cgpa_lepas: 2.95, subjek_gagal: [], ca: 63, peperiksaan: 60 },
  { student_id: 19, cgpa: 1.75, cgpa_lepas: 1.90, subjek_gagal: ['Litar Elektrik 2', 'Mesin Elektrik 1', 'Elektronik Analog'], ca: 38, peperiksaan: 35 },
  { student_id: 20, cgpa: 3.45, cgpa_lepas: 3.40, subjek_gagal: [], ca: 71, peperiksaan: 68 },
  { student_id: 21, cgpa: 3.25, cgpa_lepas: 3.15, subjek_gagal: [], ca: 67, peperiksaan: 64 },
  { student_id: 22, cgpa: 3.60, cgpa_lepas: 3.50, subjek_gagal: [], ca: 76, peperiksaan: 73 },
  { student_id: 23, cgpa: 2.40, cgpa_lepas: 2.55, subjek_gagal: ['Mesin Elektrik 2'], ca: 52, peperiksaan: 50 },
  { student_id: 24, cgpa: 3.70, cgpa_lepas: 3.65, subjek_gagal: [], ca: 79, peperiksaan: 76 },
  { student_id: 25, cgpa: 3.00, cgpa_lepas: 2.90, subjek_gagal: [], ca: 63, peperiksaan: 60 },
  { student_id: 26, cgpa: 3.50, cgpa_lepas: 3.45, subjek_gagal: [], ca: 73, peperiksaan: 70 },
  { student_id: 27, cgpa: 1.80, cgpa_lepas: 2.00, subjek_gagal: ['Sistem Kawalan', 'Mesin Elektrik 2'], ca: 40, peperiksaan: 37 },
  { student_id: 28, cgpa: 2.95, cgpa_lepas: 2.88, subjek_gagal: [], ca: 62, peperiksaan: 59 },
  { student_id: 29, cgpa: 3.35, cgpa_lepas: 3.28, subjek_gagal: [], ca: 69, peperiksaan: 66 },
  { student_id: 30, cgpa: 2.60, cgpa_lepas: 2.70, subjek_gagal: ['Sistem Kawalan'], ca: 55, peperiksaan: 52 },
];

// ── KES PELAJAR ───────────────────────────────────────────────
const cases = [
  { id_kes: 'KES-001', student_id: 2,  jenis: 'Akademik',  status: 'Dalam Proses', tarikh_buka: '2026-09-10', dirujuk_ke: 'Penasihat Akademik', catatan: 'Pelajar menghadapi kesukaran dalam subjek Matematik dan Litar Elektrik. Telah dirujuk untuk kelas tambahan.' },
  { id_kes: 'KES-002', student_id: 8,  jenis: 'Akademik',  status: 'Dalam Proses', tarikh_buka: '2026-09-12', dirujuk_ke: 'Penasihat Akademik', catatan: 'Prestasi sangat rendah. Kehadiran kritikal. Perlu tindakan segera.' },
  { id_kes: 'KES-003', student_id: 5,  jenis: 'Kehadiran', status: 'Baru',          tarikh_buka: '2026-10-01', dirujuk_ke: 'Wali Pelajar',       catatan: 'Wali telah dihubungi. Pelajar dilaporkan ada masalah pengangkutan.' },
  { id_kes: 'KES-004', student_id: 19, jenis: 'Disiplin',  status: 'Dalam Proses', tarikh_buka: '2026-09-20', dirujuk_ke: 'Unit HEP',            catatan: 'Pelajar ponteng kelas berulang kali tanpa sebab munasabah.' },
  { id_kes: 'KES-005', student_id: 12, jenis: 'Akademik',  status: 'Baru',          tarikh_buka: '2026-10-05', dirujuk_ke: 'Penasihat Akademik', catatan: 'CGPA jatuh dari 2.20 ke 1.95. Perlu program bimbingan segera.' },
  { id_kes: 'KES-006', student_id: 27, jenis: 'Kewangan',  status: 'Selesai',       tarikh_buka: '2026-08-15', dirujuk_ke: 'Unit Pinjaman',       catatan: 'Masalah pembayaran PTPK telah diselesaikan. Pelajar menerima bayaran.' },
  { id_kes: 'KES-007', student_id: 15, jenis: 'Akademik',  status: 'Selesai',       tarikh_buka: '2026-08-20', dirujuk_ke: 'Penasihat Akademik', catatan: 'Pelajar telah mengikuti kelas tambahan dan menunjukkan peningkatan.' },
  { id_kes: 'KES-008', student_id: 23, jenis: 'Kehadiran', status: 'Baru',          tarikh_buka: '2026-10-08', dirujuk_ke: 'Wali Pelajar',       catatan: 'Kehadiran menurun kepada 77%. Wali sedang dihubungi.' },
  { id_kes: 'KES-009', student_id: 8,  jenis: 'Kesihatan', status: 'Selesai',       tarikh_buka: '2026-09-05', dirujuk_ke: 'Klinik Politeknik',   catatan: 'Pelajar mengalami masalah kesihatan kronik. MC telah dikemukakan.' },
  { id_kes: 'KES-010', student_id: 19, jenis: 'Peribadi',  status: 'Dalam Proses', tarikh_buka: '2026-10-10', dirujuk_ke: 'Unit Kaunseling',    catatan: 'Pelajar menghadapi tekanan keluarga. Sesi kaunseling dijadualkan.' },
];

// ── LATIHAN INDUSTRI ──────────────────────────────────────────
const industrialTraining = [
  { student_id: 21, syarikat: 'TNB Kelantan Sdn Bhd',        lokasi: 'Kota Bharu, Kelantan',  tarikh_mula: '2026-07-01', tarikh_tamat: '2026-12-31', status_lawatan: 'Sudah Dilawat', tarikh_lawatan: '2026-09-15', status_logbuk: 'Lengkap',         rating_majikan: 4 },
  { student_id: 22, syarikat: 'Ericsson Malaysia Sdn Bhd',   lokasi: 'Kuala Lumpur',          tarikh_mula: '2026-07-01', tarikh_tamat: '2026-12-31', status_lawatan: 'Sudah Dilawat', tarikh_lawatan: '2026-09-20', status_logbuk: 'Lengkap',         rating_majikan: 5 },
  { student_id: 23, syarikat: 'Petronas Gas Berhad',          lokasi: 'Kerteh, Terengganu',    tarikh_mula: '2026-07-01', tarikh_tamat: '2026-12-31', status_lawatan: 'Belum Dilawat', tarikh_lawatan: null,         status_logbuk: 'Tidak Lengkap',   rating_majikan: 3 },
  { student_id: 24, syarikat: 'Siemens Malaysia Sdn Bhd',    lokasi: 'Shah Alam, Selangor',   tarikh_mula: '2026-07-01', tarikh_tamat: '2026-12-31', status_lawatan: 'Sudah Dilawat', tarikh_lawatan: '2026-10-01', status_logbuk: 'Lengkap',         rating_majikan: 5 },
  { student_id: 25, syarikat: 'JKR Kelantan',                 lokasi: 'Kota Bharu, Kelantan',  tarikh_mula: '2026-07-01', tarikh_tamat: '2026-12-31', status_lawatan: 'Sudah Dilawat', tarikh_lawatan: '2026-09-18', status_logbuk: 'Dalam Semakan',   rating_majikan: 4 },
  { student_id: 26, syarikat: 'ABB Malaysia Sdn Bhd',         lokasi: 'Petaling Jaya, Selangor', tarikh_mula: '2026-07-01', tarikh_tamat: '2026-12-31', status_lawatan: 'Sudah Dilawat', tarikh_lawatan: '2026-10-05', status_logbuk: 'Lengkap',       rating_majikan: 4 },
  { student_id: 27, syarikat: 'Tenaga Nasional Berhad',       lokasi: 'Kuala Lumpur',          tarikh_mula: '2026-07-01', tarikh_tamat: '2026-12-31', status_lawatan: 'Belum Dilawat', tarikh_lawatan: null,         status_logbuk: 'Tidak Lengkap',   rating_majikan: 2 },
  { student_id: 28, syarikat: 'Kelantan Property Sdn Bhd',   lokasi: 'Kota Bharu, Kelantan',  tarikh_mula: '2026-07-01', tarikh_tamat: '2026-12-31', status_lawatan: 'Sudah Dilawat', tarikh_lawatan: '2026-09-25', status_logbuk: 'Lengkap',         rating_majikan: 3 },
  { student_id: 29, syarikat: 'Telekom Malaysia Berhad',      lokasi: 'Kota Bharu, Kelantan',  tarikh_mula: '2026-07-01', tarikh_tamat: '2026-12-31', status_lawatan: 'Sudah Dilawat', tarikh_lawatan: '2026-10-10', status_logbuk: 'Lengkap',         rating_majikan: 5 },
  { student_id: 30, syarikat: 'MARA Digital Kelantan',        lokasi: 'Kota Bharu, Kelantan',  tarikh_mula: '2026-07-01', tarikh_tamat: '2026-12-31', status_lawatan: 'Belum Dilawat', tarikh_lawatan: null,         status_logbuk: 'Dalam Semakan',   rating_majikan: 3 },
];

// ── HELPER FUNCTIONS ──────────────────────────────────────────
function getStudentById(id) {
  return students.find(s => s.id === id);
}

function getAttendanceByStudentId(id) {
  return attendance.find(a => a.student_id === id);
}

function getAcademicByStudentId(id) {
  return academic.find(a => a.student_id === id);
}

function getLIByStudentId(id) {
  return industrialTraining.find(li => li.student_id === id);
}

function getAttendanceStatusLabel(status) {
  const map = { 'baik': 'Baik', 'perhatian': 'Perhatian', 'berisiko': 'Berisiko', 'kritikal': 'Kritikal' };
  return map[status] || status;
}

function getAttendanceStatusClass(status) {
  const map = { 'baik': 'badge-success', 'perhatian': 'badge-warning', 'berisiko': 'badge-danger', 'kritikal': 'badge-kritikal' };
  return map[status] || '';
}

function getCGPAStatusClass(cgpa) {
  if (cgpa >= 3.5) return 'badge-success';
  if (cgpa >= 3.0) return 'badge-info';
  if (cgpa >= 2.0) return 'badge-warning';
  return 'badge-danger';
}

function getCGPALabel(cgpa) {
  if (cgpa >= 3.5) return 'Cemerlang';
  if (cgpa >= 3.0) return 'Baik';
  if (cgpa >= 2.0) return 'Sederhana';
  return 'Rendah';
}

function getCasesStatusClass(status) {
  const map = { 'Baru': 'badge-info', 'Dalam Proses': 'badge-warning', 'Selesai': 'badge-success' };
  return map[status] || '';
}

function getAvgAttendanceByClass(kelas) {
  const ids = students.filter(s => s.kelas === kelas).map(s => s.id);
  const records = attendance.filter(a => ids.includes(a.student_id));
  if (!records.length) return 0;
  return Math.round(records.reduce((sum, r) => sum + r.peratus_hadir, 0) / records.length);
}

function getStudentsAtRisk() {
  return students.filter(s => {
    const att = getAttendanceByStudentId(s.id);
    const aca = getAcademicByStudentId(s.id);
    return (att && att.peratus_hadir < 80) || (aca && aca.cgpa < 2.0);
  });
}
