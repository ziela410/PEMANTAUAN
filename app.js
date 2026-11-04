// ============================================================
// APP.JS — Logik Utama Dashboard Pemantauan Pelajar
// ============================================================

let chartKehadiran = null;
let chartCGPA = null;
let chartTrend = null;
let chartSubjek = null;
let chartLIStatus = null;

// ── NAVIGASI ──────────────────────────────────────────────────
function navigateTo(section) {
  document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById('section-' + section).classList.add('active');
  document.querySelector('[data-section="' + section + '"]').classList.add('active');

  const renderMap = {
    ringkasan: renderRingkasan,
    kehadiran: renderKehadiran,
    akademik: renderAkademik,
    kes: renderKes,
    li: renderLI,
    laporan: renderLaporan,
  };
  if (renderMap[section]) renderMap[section]();
}

// ── HELPERS ────────────────────────────────────────────────────
function stars(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('ms-MY', { day: '2-digit', month: 'short', year: 'numeric' });
}

function destroyChart(ref) {
  if (ref) { try { ref.destroy(); } catch (e) {} }
  return null;
}

// ── RINGKASAN ─────────────────────────────────────────────────
function renderRingkasan() {
  // Summary Cards
  const totalPelajar = students.length;
  const pelajarBerisiko = attendance.filter(a => a.peratus_hadir < 80).length;
  const prestasiRendah = academic.filter(a => a.cgpa < 2.0).length;
  const kesAktif = cases.filter(c => c.status !== 'Selesai').length;
  const pelajarLI = industrialTraining.length;

  document.getElementById('card-total').textContent = totalPelajar;
  document.getElementById('card-berisiko').textContent = pelajarBerisiko;
  document.getElementById('card-prestasi').textContent = prestasiRendah;
  document.getElementById('card-kes').textContent = kesAktif;
  document.getElementById('card-li').textContent = pelajarLI;

  // Carta Bar — Kehadiran per Kelas
  const avgAttByClass = classes.map(k => getAvgAttendanceByClass(k));
  chartKehadiran = destroyChart(chartKehadiran);
  const ctx1 = document.getElementById('chartKehadiran').getContext('2d');
  chartKehadiran = new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: classes,
      datasets: [{
        label: '% Kehadiran Purata',
        data: avgAttByClass,
        backgroundColor: avgAttByClass.map(v => v >= 85 ? '#28a745' : v >= 80 ? '#ffc107' : '#dc3545'),
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { min: 60, max: 100, ticks: { callback: v => v + '%' } }
      }
    }
  });

  // Carta Donut — Taburan CGPA
  const cgpaBands = [
    academic.filter(a => a.cgpa >= 3.5).length,
    academic.filter(a => a.cgpa >= 3.0 && a.cgpa < 3.5).length,
    academic.filter(a => a.cgpa >= 2.0 && a.cgpa < 3.0).length,
    academic.filter(a => a.cgpa < 2.0).length,
  ];
  chartCGPA = destroyChart(chartCGPA);
  const ctx2 = document.getElementById('chartCGPA').getContext('2d');
  chartCGPA = new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: ['Cemerlang (≥3.5)', 'Baik (3.0–3.49)', 'Sederhana (2.0–2.99)', 'Rendah (<2.0)'],
      datasets: [{
        data: cgpaBands,
        backgroundColor: ['#28a745', '#17a2b8', '#ffc107', '#dc3545'],
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } }
    }
  });

  // Jadual Pelajar Perlu Perhatian
  const atRisk = getStudentsAtRisk().slice(0, 10);
  const tbody = document.getElementById('tbody-perhatian');
  tbody.innerHTML = atRisk.map(s => {
    const att = getAttendanceByStudentId(s.id);
    const aca = getAcademicByStudentId(s.id);
    const issues = [];
    if (att && att.peratus_hadir < 80) issues.push(`Hadir: ${att.peratus_hadir}%`);
    if (aca && aca.cgpa < 2.0) issues.push(`CGPA: ${aca.cgpa.toFixed(2)}`);
    return `<tr>
      <td>${s.nama}</td>
      <td><span class="badge badge-info">${s.kelas}</span></td>
      <td>${issues.map(i => `<span class="badge badge-danger">${i}</span>`).join(' ')}</td>
      <td><button class="btn btn-primary btn-sm" onclick="navigateTo('kes')"><i class="fas fa-plus"></i> Rekod Kes</button></td>
    </tr>`;
  }).join('') || '<tr><td colspan="4" class="empty-state">Tiada pelajar berisiko.</td></tr>';
}

// ── KEHADIRAN ─────────────────────────────────────────────────
function renderKehadiran() {
  const kelasFilter = document.getElementById('filter-kelas-hadir')?.value || 'semua';
  const statusFilter = document.getElementById('filter-status-hadir')?.value || 'semua';
  const carian = document.getElementById('carian-hadir')?.value?.toLowerCase() || '';

  // Trend chart
  chartTrend = destroyChart(chartTrend);
  const ctx = document.getElementById('chartTrend').getContext('2d');
  const weeks = attendanceTrend.map(w => w.minggu);
  const datasets = classes.map((k, i) => ({
    label: k,
    data: attendanceTrend.map(w => w[k]),
    borderColor: ['#003580','#0066cc','#28a745','#ffc107','#dc3545','#6f42c1'][i],
    backgroundColor: 'transparent',
    tension: 0.3,
    pointRadius: 3,
  }));
  chartTrend = new Chart(ctx, {
    type: 'line',
    data: { labels: weeks, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } },
      scales: { y: { min: 60, max: 100, ticks: { callback: v => v + '%' } } }
    }
  });

  // Table
  let list = students.map(s => ({
    s, att: getAttendanceByStudentId(s.id)
  }));

  if (kelasFilter !== 'semua') list = list.filter(({s}) => s.kelas === kelasFilter);
  if (statusFilter !== 'semua') list = list.filter(({att}) => att && att.status === statusFilter);
  if (carian) list = list.filter(({s}) => s.nama.toLowerCase().includes(carian) || s.no_matrik.toLowerCase().includes(carian));

  const tbody = document.getElementById('tbody-hadir');
  tbody.innerHTML = list.map(({s, att}) => {
    const rowClass = att ? (att.peratus_hadir < 80 ? 'row-kritikal' : att.peratus_hadir <= 85 ? 'row-berisiko' : '') : '';
    const badgeClass = att ? getAttendanceStatusClass(att.status) : '';
    const pct = att ? att.peratus_hadir : '—';
    const absen = att ? att.minggu_absen : '—';
    return `<tr class="${rowClass}">
      <td>${s.nama}</td>
      <td>${s.no_matrik}</td>
      <td><span class="badge badge-info">${s.kelas}</span></td>
      <td><strong>${pct}%</strong></td>
      <td>${absen} minggu</td>
      <td><span class="badge ${badgeClass}">${att ? getAttendanceStatusLabel(att.status) : '—'}</span></td>
      <td>
        ${att && att.peratus_hadir < 85 ? `<button class="btn btn-danger btn-sm" onclick="bukaModalKes(${s.id})"><i class="fas fa-exclamation-triangle"></i> Rekod Kes</button>` : '<span class="badge badge-success">OK</span>'}
      </td>
    </tr>`;
  }).join('') || '<tr><td colspan="7" class="empty-state">Tiada rekod ditemui.</td></tr>';
}

// ── AKADEMIK ──────────────────────────────────────────────────
function renderAkademik() {
  const kelasFilter = document.getElementById('filter-kelas-akademik')?.value || 'semua';
  const carian = document.getElementById('carian-akademik')?.value?.toLowerCase() || '';

  // Carta Bar subjek
  const chartKelasFilter = document.getElementById('filter-kelas-akademik-chart')?.value || 'EE2A';
  const targetKelas = kelasFilter !== 'semua' ? kelasFilter : chartKelasFilter;
  const subjekList = subjects[targetKelas] || [];
  const sIds = students.filter(s => s.kelas === targetKelas).map(s => s.id);
  const avgCA = subjekList.map((_, i) => {
    const vals = academic.filter(a => sIds.includes(a.student_id)).map(a => a.ca);
    return vals.length ? Math.round(vals.reduce((s, v) => s + v, 0) / vals.length) : 0;
  });

  chartSubjek = destroyChart(chartSubjek);
  const ctx = document.getElementById('chartSubjek').getContext('2d');
  chartSubjek = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: subjekList.map(s => s.length > 18 ? s.slice(0, 18) + '…' : s),
      datasets: [{
        label: 'Purata Markah CA',
        data: avgCA,
        backgroundColor: '#003580',
        borderRadius: 5,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { min: 0, max: 100 } }
    }
  });

  // Table
  let list = students.map(s => ({
    s, aca: getAcademicByStudentId(s.id)
  }));

  if (kelasFilter !== 'semua') list = list.filter(({s}) => s.kelas === kelasFilter);
  if (carian) list = list.filter(({s}) => s.nama.toLowerCase().includes(carian) || s.no_matrik.toLowerCase().includes(carian));

  const tbody = document.getElementById('tbody-akademik');
  tbody.innerHTML = list.map(({s, aca}) => {
    const rowClass = aca ? (aca.cgpa < 2.0 ? 'row-kritikal' : aca.cgpa < 2.5 ? 'row-berisiko' : '') : '';
    const trend = aca ? (aca.cgpa > aca.cgpa_lepas ? '▲' : aca.cgpa < aca.cgpa_lepas ? '▼' : '—') : '—';
    const trendColor = aca ? (aca.cgpa > aca.cgpa_lepas ? 'color:#28a745' : aca.cgpa < aca.cgpa_lepas ? 'color:#dc3545' : '') : '';
    return `<tr class="${rowClass}">
      <td>${s.nama}</td>
      <td><span class="badge badge-info">${s.kelas}</span></td>
      <td><strong>${aca ? aca.cgpa.toFixed(2) : '—'}</strong> <span style="${trendColor};font-size:12px">${trend}</span></td>
      <td>${aca ? aca.ca : '—'}</td>
      <td>${aca ? aca.peperiksaan : '—'}</td>
      <td>${aca && aca.subjek_gagal.length ? aca.subjek_gagal.map(sg => `<span class="badge badge-danger" style="margin:1px">${sg.slice(0,20)}</span>`).join('') : '<span class="badge badge-success">Tiada</span>'}</td>
      <td><span class="badge ${aca ? getCGPAStatusClass(aca.cgpa) : ''}">${aca ? getCGPALabel(aca.cgpa) : '—'}</span></td>
      <td>
        ${aca && aca.cgpa < 2.5 ? `<button class="btn btn-warning btn-sm" onclick="bukaModalKes(${s.id})"><i class="fas fa-chalkboard-teacher"></i> Bimbingan</button>` : ''}
      </td>
    </tr>`;
  }).join('');
}

// ── KES ───────────────────────────────────────────────────────
let allCases = [...cases];

function renderKes(preStudentId = null) {
  const jenisFilter = document.getElementById('filter-jenis-kes')?.value || 'semua';
  const statusFilter = document.getElementById('filter-status-kes')?.value || 'semua';

  // Summary cards
  document.getElementById('kes-baru').textContent = allCases.filter(c => c.status === 'Baru').length;
  document.getElementById('kes-proses').textContent = allCases.filter(c => c.status === 'Dalam Proses').length;
  document.getElementById('kes-selesai').textContent = allCases.filter(c => c.status === 'Selesai').length;

  let list = [...allCases];
  if (jenisFilter !== 'semua') list = list.filter(c => c.jenis === jenisFilter);
  if (statusFilter !== 'semua') list = list.filter(c => c.status === statusFilter);

  const tbody = document.getElementById('tbody-kes');
  tbody.innerHTML = list.map(c => {
    const s = getStudentById(c.student_id);
    return `<tr>
      <td><strong>${c.id_kes}</strong></td>
      <td>${s ? s.nama : '—'}</td>
      <td>${s ? `<span class="badge badge-info">${s.kelas}</span>` : '—'}</td>
      <td><span class="badge badge-purple">${c.jenis}</span></td>
      <td><span class="badge ${getCasesStatusClass(c.status)}">${c.status}</span></td>
      <td>${formatDate(c.tarikh_buka)}</td>
      <td>${c.dirujuk_ke}</td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="lihatButiranKes('${c.id_kes}')"><i class="fas fa-eye"></i> Lihat</button>
        ${c.status !== 'Selesai' ? `<button class="btn btn-success btn-sm" style="margin-left:4px" onclick="kemaskiniStatusKes('${c.id_kes}')"><i class="fas fa-check"></i></button>` : ''}
      </td>
    </tr>`;
  }).join('') || '<tr><td colspan="8"><div class="empty-state"><i class="fas fa-folder-open"></i><br>Tiada kes ditemui.</div></td></tr>';
}

function lihatButiranKes(idKes) {
  const c = allCases.find(k => k.id_kes === idKes);
  if (!c) return;
  const s = getStudentById(c.student_id);
  const att = getAttendanceByStudentId(c.student_id);
  const aca = getAcademicByStudentId(c.student_id);
  document.getElementById('modal-kes-content').innerHTML = `
    <div class="detail-row"><span class="detail-label">No. Kes</span><span class="detail-value"><strong>${c.id_kes}</strong></span></div>
    <div class="detail-row"><span class="detail-label">Nama Pelajar</span><span class="detail-value">${s ? s.nama : '—'}</span></div>
    <div class="detail-row"><span class="detail-label">No. Matrik</span><span class="detail-value">${s ? s.no_matrik : '—'}</span></div>
    <div class="detail-row"><span class="detail-label">Kelas</span><span class="detail-value">${s ? s.kelas : '—'}</span></div>
    <div class="detail-row"><span class="detail-label">Kehadiran</span><span class="detail-value">${att ? att.peratus_hadir + '%' : '—'}</span></div>
    <div class="detail-row"><span class="detail-label">CGPA Semasa</span><span class="detail-value">${aca ? aca.cgpa.toFixed(2) : '—'}</span></div>
    <hr style="margin:12px 0; border-color: var(--border)">
    <div class="detail-row"><span class="detail-label">Jenis Kes</span><span class="detail-value"><span class="badge badge-purple">${c.jenis}</span></span></div>
    <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value"><span class="badge ${getCasesStatusClass(c.status)}">${c.status}</span></span></div>
    <div class="detail-row"><span class="detail-label">Tarikh Buka</span><span class="detail-value">${formatDate(c.tarikh_buka)}</span></div>
    <div class="detail-row"><span class="detail-label">Dirujuk Ke</span><span class="detail-value">${c.dirujuk_ke}</span></div>
    <div class="detail-row"><span class="detail-label">Catatan</span><span class="detail-value" style="max-width:360px">${c.catatan}</span></div>
    ${s ? `<div class="detail-row"><span class="detail-label">Tel. Wali</span><span class="detail-value">${s.telefon_wali}</span></div>` : ''}
  `;
  document.getElementById('modal-kes-id').value = idKes;
  document.getElementById('modal-kes').classList.add('open');
}

function kemaskiniStatusKes(idKes) {
  const c = allCases.find(k => k.id_kes === idKes);
  if (!c) return;
  const nextStatus = { 'Baru': 'Dalam Proses', 'Dalam Proses': 'Selesai' };
  if (nextStatus[c.status]) {
    c.status = nextStatus[c.status];
    renderKes();
    renderRingkasanCards();
  }
}

function renderRingkasanCards() {
  document.getElementById('card-kes').textContent = allCases.filter(c => c.status !== 'Selesai').length;
}

function bukaModalKes(studentId) {
  navigateTo('kes');
  const s = getStudentById(studentId);
  document.getElementById('kes-nama').value = s ? s.nama : '';
  document.getElementById('kes-matrik').value = s ? s.no_matrik : '';
  document.getElementById('modal-tambah-kes').classList.add('open');
}

function tambahKes() {
  const nama = document.getElementById('kes-nama').value;
  const matrik = document.getElementById('kes-matrik').value;
  const jenis = document.getElementById('kes-jenis').value;
  const dirujuk = document.getElementById('kes-dirujuk').value;
  const catatan = document.getElementById('kes-catatan').value;

  if (!jenis || !dirujuk) { alert('Sila lengkapkan maklumat kes.'); return; }

  const s = students.find(st => st.no_matrik === matrik || st.nama === nama);
  const newId = 'KES-' + String(allCases.length + 1).padStart(3, '0');
  allCases.push({
    id_kes: newId,
    student_id: s ? s.id : 0,
    jenis,
    status: 'Baru',
    tarikh_buka: new Date().toISOString().slice(0, 10),
    dirujuk_ke: dirujuk,
    catatan: catatan || '—',
  });

  document.getElementById('modal-tambah-kes').classList.remove('open');
  document.getElementById('form-tambah-kes').reset();
  renderKes();
}

// ── LATIHAN INDUSTRI ──────────────────────────────────────────
let allLI = [...industrialTraining];

function renderLI() {
  const statusLawatanFilter = document.getElementById('filter-li-lawatan')?.value || 'semua';
  const statusLogbukFilter  = document.getElementById('filter-li-logbuk')?.value || 'semua';

  const sudahDilawat = allLI.filter(li => li.status_lawatan === 'Sudah Dilawat').length;
  const belumDilawat = allLI.filter(li => li.status_lawatan === 'Belum Dilawat').length;
  const logLengkap   = allLI.filter(li => li.status_logbuk === 'Lengkap').length;

  document.getElementById('li-total').textContent  = allLI.length;
  document.getElementById('li-lawat').textContent  = sudahDilawat;
  document.getElementById('li-belum').textContent  = belumDilawat;
  document.getElementById('li-logbuk').textContent = logLengkap;

  // Carta donut
  chartLIStatus = destroyChart(chartLIStatus);
  const ctx = document.getElementById('chartLIStatus').getContext('2d');
  chartLIStatus = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Sudah Dilawat', 'Belum Dilawat'],
      datasets: [{ data: [sudahDilawat, belumDilawat], backgroundColor: ['#28a745', '#dc3545'] }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { font: { size: 12 } } } }
    }
  });

  let list = [...allLI];
  if (statusLawatanFilter !== 'semua') list = list.filter(li => li.status_lawatan === statusLawatanFilter);
  if (statusLogbukFilter !== 'semua') list = list.filter(li => li.status_logbuk === statusLogbukFilter);

  const tbody = document.getElementById('tbody-li');
  tbody.innerHTML = list.map(li => {
    const s = getStudentById(li.student_id);
    const lawatanBadge = li.status_lawatan === 'Sudah Dilawat' ? 'badge-success' : 'badge-danger';
    const logbukBadge = li.status_logbuk === 'Lengkap' ? 'badge-success' : li.status_logbuk === 'Dalam Semakan' ? 'badge-warning' : 'badge-danger';
    return `<tr>
      <td>${s ? s.nama : '—'}</td>
      <td>${s ? s.no_matrik : '—'}</td>
      <td>${li.syarikat}</td>
      <td>${li.lokasi}</td>
      <td>${formatDate(li.tarikh_mula)} — ${formatDate(li.tarikh_tamat)}</td>
      <td><span class="badge ${lawatanBadge}">${li.status_lawatan}</span></td>
      <td>${li.tarikh_lawatan ? formatDate(li.tarikh_lawatan) : '—'}</td>
      <td><span class="badge ${logbukBadge}">${li.status_logbuk}</span></td>
      <td><span class="stars">${stars(li.rating_majikan)}</span></td>
      <td>
        ${li.status_lawatan === 'Belum Dilawat' ? `<button class="btn btn-success btn-sm" onclick="tandaLawatan(${li.student_id})"><i class="fas fa-check"></i> Dilawat</button>` : ''}
      </td>
    </tr>`;
  }).join('');
}

function tandaLawatan(studentId) {
  const li = allLI.find(l => l.student_id === studentId);
  if (li) {
    li.status_lawatan = 'Sudah Dilawat';
    li.tarikh_lawatan = new Date().toISOString().slice(0, 10);
    renderLI();
  }
}

// ── LAPORAN ───────────────────────────────────────────────────
function renderLaporan() {}

function janaLaporan() {
  const jenis = document.getElementById('lap-jenis').value;
  const kelas = document.getElementById('lap-kelas').value;
  const preview = document.getElementById('laporan-preview');
  const tarikh = new Date().toLocaleDateString('ms-MY', { day: '2-digit', month: 'long', year: 'numeric' });

  const letterhead = `
    <div class="report-letterhead">
      <h2>POLITEKNIK KOTA BHARU</h2>
      <p>Jabatan Kejuruteraan Elektrik</p>
      <p>Pemantauan Pelajar — ${SEMESTER_SEMASA}</p>
      <p style="margin-top:6px; font-size:11px">Tarikh Jana: ${tarikh}</p>
    </div>
  `;

  let body = '';
  const kelasLabel = kelas === 'semua' ? 'Semua Kelas' : kelas;

  if (jenis === 'kehadiran') {
    const list = kelas === 'semua' ? students : students.filter(s => s.kelas === kelas);
    body = `<h3 style="margin-bottom:12px; color:var(--primary)">Laporan Kehadiran Pelajar — ${kelasLabel}</h3>
    <table>
      <thead><tr><th>#</th><th>Nama Pelajar</th><th>No. Matrik</th><th>Kelas</th><th>% Hadir</th><th>Status</th></tr></thead>
      <tbody>${list.map((s, i) => {
        const att = getAttendanceByStudentId(s.id);
        return `<tr><td>${i+1}</td><td>${s.nama}</td><td>${s.no_matrik}</td><td>${s.kelas}</td>
          <td>${att ? att.peratus_hadir + '%' : '—'}</td>
          <td>${att ? getAttendanceStatusLabel(att.status) : '—'}</td></tr>`;
      }).join('')}</tbody>
    </table>`;
  } else if (jenis === 'akademik') {
    const list = kelas === 'semua' ? students : students.filter(s => s.kelas === kelas);
    body = `<h3 style="margin-bottom:12px; color:var(--primary)">Laporan Prestasi Akademik — ${kelasLabel}</h3>
    <table>
      <thead><tr><th>#</th><th>Nama Pelajar</th><th>No. Matrik</th><th>Kelas</th><th>CGPA</th><th>Status</th><th>Subjek Gagal</th></tr></thead>
      <tbody>${list.map((s, i) => {
        const aca = getAcademicByStudentId(s.id);
        return `<tr><td>${i+1}</td><td>${s.nama}</td><td>${s.no_matrik}</td><td>${s.kelas}</td>
          <td>${aca ? aca.cgpa.toFixed(2) : '—'}</td>
          <td>${aca ? getCGPALabel(aca.cgpa) : '—'}</td>
          <td>${aca && aca.subjek_gagal.length ? aca.subjek_gagal.join(', ') : 'Tiada'}</td></tr>`;
      }).join('')}</tbody>
    </table>`;
  } else if (jenis === 'kes') {
    body = `<h3 style="margin-bottom:12px; color:var(--primary)">Laporan Kes Pelajar</h3>
    <table>
      <thead><tr><th>#</th><th>No. Kes</th><th>Nama Pelajar</th><th>Kelas</th><th>Jenis</th><th>Status</th><th>Dirujuk Ke</th><th>Tarikh</th></tr></thead>
      <tbody>${allCases.map((c, i) => {
        const s = getStudentById(c.student_id);
        return `<tr><td>${i+1}</td><td>${c.id_kes}</td><td>${s ? s.nama : '—'}</td><td>${s ? s.kelas : '—'}</td>
          <td>${c.jenis}</td><td>${c.status}</td><td>${c.dirujuk_ke}</td><td>${formatDate(c.tarikh_buka)}</td></tr>`;
      }).join('')}</tbody>
    </table>`;
  } else if (jenis === 'li') {
    body = `<h3 style="margin-bottom:12px; color:var(--primary)">Laporan Pemantauan Latihan Industri</h3>
    <table>
      <thead><tr><th>#</th><th>Nama Pelajar</th><th>Syarikat</th><th>Lokasi</th><th>Status Lawatan</th><th>Tarikh Lawatan</th><th>Log Buku</th><th>Rating</th></tr></thead>
      <tbody>${allLI.map((li, i) => {
        const s = getStudentById(li.student_id);
        return `<tr><td>${i+1}</td><td>${s ? s.nama : '—'}</td><td>${li.syarikat}</td><td>${li.lokasi}</td>
          <td>${li.status_lawatan}</td><td>${formatDate(li.tarikh_lawatan)}</td>
          <td>${li.status_logbuk}</td><td>${li.rating_majikan}/5</td></tr>`;
      }).join('')}</tbody>
    </table>`;
  }

  preview.innerHTML = letterhead + body;
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Update header date
  const now = new Date();
  document.getElementById('header-tarikh').textContent = now.toLocaleDateString('ms-MY', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
  document.getElementById('header-semester').textContent = SEMESTER_SEMASA;

  navigateTo('ringkasan');
});
