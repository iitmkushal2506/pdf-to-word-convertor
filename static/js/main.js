/* ── DOM refs ─────────────────────────────────────────────────────── */
const dropzone      = document.getElementById('dropzone');
const fileInput     = document.getElementById('file-input');
const fileInfo      = document.getElementById('file-info');
const fileName      = document.getElementById('file-name');
const fileSize      = document.getElementById('file-size');
const fileRemove    = document.getElementById('file-remove');
const detectTables  = document.getElementById('detect-tables');
const btnConvert    = document.getElementById('btn-convert');
const progressWrap  = document.getElementById('progress-wrap');
const progressFill  = document.getElementById('progress-fill');
const progressLabel = document.getElementById('progress-label');
const resultDiv     = document.getElementById('result');
const resultMeta    = document.getElementById('result-meta');
const btnDownload   = document.getElementById('btn-download');
const errorBox      = document.getElementById('error-box');
const errorMsg      = document.getElementById('error-msg');

let selectedFile = null;

/* ── Helpers ──────────────────────────────────────────────────────── */
function formatBytes(bytes) {
  if (bytes < 1024)       return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function showFile(file) {
  selectedFile = file;
  fileName.textContent = file.name;
  fileSize.textContent = formatBytes(file.size);
  dropzone.classList.add('hidden');
  fileInfo.classList.remove('hidden');
  btnConvert.disabled = false;
  hideResult();
  hideError();
}

function clearFile() {
  selectedFile = null;
  fileInput.value = '';
  dropzone.classList.remove('hidden');
  fileInfo.classList.add('hidden');
  btnConvert.disabled = true;
  hideResult();
  hideError();
}

function showError(msg) {
  errorMsg.textContent = msg;
  errorBox.classList.remove('hidden');
}
function hideError()  { errorBox.classList.add('hidden'); }
function hideResult() { resultDiv.classList.add('hidden'); }

function setProgress(pct, label) {
  progressFill.style.width = pct + '%';
  progressLabel.textContent = label;
}

/* ── Drag & Drop ──────────────────────────────────────────────────── */
dropzone.addEventListener('dragover', e => {
  e.preventDefault();
  dropzone.classList.add('drag-over');
});
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
dropzone.addEventListener('drop', e => {
  e.preventDefault();
  dropzone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) handleFileSelect(file);
});
dropzone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) handleFileSelect(fileInput.files[0]);
});

fileRemove.addEventListener('click', clearFile);

function handleFileSelect(file) {
  if (!file.name.endsWith('.pdf')) {
    showError('Please select a valid PDF file (.pdf).');
    return;
  }
  if (file.size > 50 * 1024 * 1024) {
    showError('File is too large. Maximum size is 50 MB.');
    return;
  }
  showFile(file);
}

/* ── Convert ──────────────────────────────────────────────────────── */
btnConvert.addEventListener('click', async () => {
  if (!selectedFile) return;

  // Reset UI
  hideError();
  hideResult();
  btnConvert.disabled = true;
  progressWrap.classList.remove('hidden');
  setProgress(10, 'Uploading…');

  const formData = new FormData();
  formData.append('pdf', selectedFile);
  formData.append('detect_tables', detectTables.checked ? 'true' : 'false');

  try {
    // Animate progress while waiting
    let fakeProgress = 10;
    const ticker = setInterval(() => {
      if (fakeProgress < 80) {
        fakeProgress += Math.random() * 8;
        setProgress(Math.min(fakeProgress, 80), 'Converting…');
      }
    }, 400);

    const res  = await fetch('/convert', { method: 'POST', body: formData });
    const data = await res.json();
    clearInterval(ticker);

    if (!res.ok || data.error) {
      throw new Error(data.error || 'Conversion failed.');
    }

    setProgress(100, 'Done!');
    setTimeout(() => {
      progressWrap.classList.add('hidden');
      resultMeta.textContent = `${data.pages} page${data.pages !== 1 ? 's' : ''} converted · ${data.filename}`;
      btnDownload.href        = `/download/${data.download_id}?filename=${encodeURIComponent(data.filename)}`;
      btnDownload.download    = data.filename;
      resultDiv.classList.remove('hidden');
      btnConvert.disabled = false;
    }, 600);

  } catch (err) {
    progressWrap.classList.add('hidden');
    showError(err.message || 'Something went wrong. Please try again.');
    btnConvert.disabled = false;
  }
});
