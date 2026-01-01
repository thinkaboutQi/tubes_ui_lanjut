<script setup>
import DashboardNavbar from '../components/DashboardNavbar.vue'
import { Upload, X } from 'lucide-vue-next'
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const form = ref({
  title: '',
  category: '',
  author: '',
  abstract: '',
  keywords: '',
  fullContent: ''
})

const file = ref(null)
const fileName = ref('')
const dragActive = ref(false)
const isEditMode = ref(false)
const existingWorkId = ref(null)

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

const pageTitle = computed(() =>
  isEditMode.value ? 'Edit Karya Ilmiah' : 'Unggah Karya Ilmiah'
)
const submitButtonText = computed(() =>
  isEditMode.value ? 'Simpan Perubahan' : 'Unggah Karya'
)

onMounted(() => {
  if (route.params.id) {
    isEditMode.value = true
    existingWorkId.value = route.params.id
    loadExistingWork(route.params.id)
  }
})

/* ========================
   STORAGE KEY
======================== */
const getWorksKey = () => {
  const userStr = localStorage.getItem('user')
  if (userStr) {
    try {
      const user = JSON.parse(userStr)
      if (user.email) {
        return 'data_' + user.email.replace(/[^a-zA-Z0-9]/g, '_') + '_works'
      }
    } catch {}
  }
  return 'user_works'
}

/* ========================
   LOAD EDIT DATA
======================== */
const loadExistingWork = (id) => {
  const storedWorks = localStorage.getItem(getWorksKey())
  if (!storedWorks) return

  try {
    const works = JSON.parse(storedWorks)
    const work = works.find(w => w.id == id)

    if (!work) {
      alert('Karya tidak ditemukan')
      router.push('/my-works')
      return
    }

    form.value = {
      title: work.title,
      category: work.category,
      author: work.author,
      abstract: work.abstract,
      keywords: work.keywords,
      fullContent: work.fullContent || ''
    }

    if (work.pdfName) {
      fileName.value = work.pdfName
    }
  } catch (e) {
    console.error(e)
  }
}

/* ========================
   UPLOAD HANDLER (FIX)
======================== */
const validateFile = (selectedFile) => {
  if (selectedFile.type !== 'application/pdf') {
    alert('Hanya file PDF yang diperbolehkan')
    return false
  }
  if (selectedFile.size > MAX_FILE_SIZE) {
    alert('Ukuran file maksimal 10MB')
    return false
  }
  return true
}

const handleFileUpload = (event) => {
  const selectedFile = event.target.files[0]
  if (!selectedFile) return
  if (!validateFile(selectedFile)) {
    event.target.value = ''
    return
  }
  file.value = selectedFile
  fileName.value = selectedFile.name
}

const handleDrop = (event) => {
  dragActive.value = false
  const droppedFile = event.dataTransfer.files[0]
  if (!droppedFile) return
  if (!validateFile(droppedFile)) return
  file.value = droppedFile
  fileName.value = droppedFile.name
}

/* ========================
   SUBMIT
======================== */
const handleSubmit = () => {
  if (
    !form.value.title ||
    !form.value.category ||
    !form.value.author ||
    !form.value.abstract ||
    !form.value.fullContent
  ) {
    alert('Mohon lengkapi semua field termasuk Isi Lengkap')
    return
  }

  if (!isEditMode.value && !file.value) {
    alert('Mohon upload file PDF')
    return
  }

  const saveWork = (pdfData, pdfName) => {
    const worksKey = getWorksKey()
    let works = JSON.parse(localStorage.getItem(worksKey) || '[]')

    if (isEditMode.value) {
      const index = works.findIndex(w => w.id == existingWorkId.value)
      if (index !== -1) {
        works[index] = {
          ...works[index],
          ...form.value
        }
        if (pdfData) {
          works[index].pdfUrl = pdfData
          works[index].pdfName = pdfName
        }
      }
    } else {
      works.unshift({
        id: Date.now(),
        ...form.value,
        date: new Date().toISOString().split('T')[0],
        views: 0,
        status: 'Published',
        pdfUrl: pdfData,
        pdfName
      })
    }

    try {
      localStorage.setItem(worksKey, JSON.stringify(works))
      addUploadNotification(form.value.title)
      router.push('/my-works')
    } catch {
      alert('Gagal menyimpan: ukuran file melebihi batas LocalStorage')
    }
  }

  if (file.value) {
    const reader = new FileReader()
    reader.onload = e => saveWork(e.target.result, fileName.value)
    reader.readAsDataURL(file.value)
  } else {
    saveWork(null, null)
  }
}

const addUploadNotification = (title) => {
  const notif = {
    id: Date.now(),
    text: `Karya ilmiah "${title}" berhasil ditambahkan.`,
    time: 'Baru saja',
    read: false,
    type: 'success'
  }

  const userNotifications =
    JSON.parse(localStorage.getItem('user_notifications') || '[]')

  userNotifications.unshift(notif)

  localStorage.setItem(
    'user_notifications',
    JSON.stringify(userNotifications.slice(0, 10))
  )
}

const handleCancel = () => router.push('/my-works')
</script>

<template>
  <div class="page-container">
    <DashboardNavbar />

    <main class="container page-content">
      <div class="form-card">
        <div class="form-header">
          <h1>{{ pageTitle }}</h1>
          <p>Bagikan karya ilmiah Anda dengan komunitas akademis</p>
        </div>

        <form @submit.prevent="handleSubmit" class="work-form">
          <!-- FORM INPUT (TIDAK DIUBAH) -->

          <div class="form-group">
            <label>Judul Karya <span class="required">*</span></label>
            <input v-model="form.title" class="form-input" />
          </div>

          <div class="form-group">
            <label>Kategori <span class="required">*</span></label>
            <select v-model="form.category" class="form-select">
              <option disabled value="">Pilih kategori</option>
              <option>Teknologi Informasi</option>
              <option>Data Science</option>
              <option>Internet of Things</option>
              <option>Artificial Intelligence</option>
              <option>Cyber Security</option>
            </select>
          </div>

          <div class="form-group">
            <label>Penulis <span class="required">*</span></label>
            <input v-model="form.author" class="form-input" />
          </div>

          <div class="form-group">
            <label>Abstrak <span class="required">*</span></label>
            <textarea v-model="form.abstract" class="form-textarea" />
          </div>

          <div class="form-group">
            <label>Isi Lengkap <span class="required">*</span></label>
            <textarea v-model="form.fullContent" class="form-textarea" />
          </div>

          <div class="form-group">
            <label>Kata Kunci <span class="required">*</span></label>
            <input v-model="form.keywords" class="form-input" />
          </div>

          <div class="form-group">
            <label>Upload File PDF <span v-if="!isEditMode">*</span></label>
            <div
              class="upload-area"
              :class="{ 'drag-active': dragActive }"
              @dragenter.prevent="dragActive = true"
              @dragleave.prevent="dragActive = false"
              @dragover.prevent
              @drop="handleDrop"
              @click="$refs.fileInput.click()"
            >
              <input
                ref="fileInput"
                type="file"
                accept="application/pdf"
                class="hidden-input"
                @change="handleFileUpload"
              />

              <div v-if="!file && !fileName">
                <Upload />
                <p>Klik untuk upload PDF (Max 10MB)</p>
              </div>

              <div v-else class="file-info">
                <span>{{ fileName }}</span>
                <button @click.stop="file=null;fileName=''">
                  <X />
                </button>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-outline" @click="handleCancel">Batal</button>
            <button class="btn btn-primary">{{ submitButtonText }}</button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: var(--bg-color);
}

.page-content {
  padding-top: 2rem;
  padding-bottom: 4rem;
  display: flex;
  justify-content: center;
}

.form-card {
  background: var(--card-bg);
  width: 100%;
  max-width: 800px;
  padding: 2.5rem;
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.form-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.form-header p {
  color: var(--text-muted);
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text-main);
}

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
  background-color: var(--bg-color); /* Matches page bg */
  color: var(--text-main);
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
}

.upload-area {
  border: 2px dashed var(--border-color);
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background-color: var(--bg-color);
}

.upload-area:hover, .drag-active {
  background-color: var(--card-bg);
  border-color: var(--primary);
}

.file-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--card-bg);
  padding: 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #10b981;
}

.file-name {
  font-weight: 500;
  color: var(--text-main);
}

.btn-outline {
  flex: 1;
  padding: 0.75rem;
  font-weight: 600;
  border: 1px solid var(--border-color);
  background: var(--card-bg);
  color: var(--text-main);
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-outline:hover {
  background-color: var(--bg-color);
}

/* Dark Mode Overrides */
:global(body.dark-mode) .page-container {
  background-color: #0f172a !important;
}

:global(body.dark-mode) .form-card {
  background-color: var(--card-bg);
  border-color: var(--border-color);
}

:global(body.dark-mode) .form-input, 
:global(body.dark-mode) .form-select, 
:global(body.dark-mode) .form-textarea {
  background-color: #0f172a; /* Darker than card */
  border-color: var(--border-color);
  color: var(--text-main);
}

:global(body.dark-mode) .upload-area {
  background-color: #0f172a;
  border-color: var(--border-color);
}

:global(body.dark-mode) .upload-area:hover {
  background-color: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
}

:global(body.dark-mode) .btn-outline {
  background-color: transparent;
  border-color: var(--border-color);
  color: var(--text-main);
}
:global(body.dark-mode) .btn-outline:hover {
  background-color: rgba(255,255,255,0.05);
}
</style>

