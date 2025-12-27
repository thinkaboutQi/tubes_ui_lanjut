<script setup>
import DashboardNavbar from '../components/DashboardNavbar.vue'
import { User, Mail, Edit2, Save, X, Briefcase, Camera } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
import { useToast } from '../composables/useToast'

const { addToast } = useToast()

const user = ref({
  name: 'User Demo',
  email: 'user@demo.com',
  role: 'Mahasiswa',
  university: 'Telkom University',
  avatar: null
})

const isEditing = ref(false)
const editForm = ref({})
const fileInput = ref(null)

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      user.value = { ...user.value, ...JSON.parse(storedUser) }
    } catch (e) {
      console.error('Error parsing user data', e)
    }
  }
})

const startEdit = () => {
  editForm.value = { ...user.value }
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
  editForm.value = {}
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2000000) { // 2MB limit
      alert('Ukuran file terlalu besar (Maks 2MB)')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      editForm.value.avatar = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const saveProfile = () => {
  user.value = { ...editForm.value }
  localStorage.setItem('user', JSON.stringify(user.value))
  isEditing.value = false
  addToast('Profil berhasil diperbarui', 'success')
  
  // Dispatch event for other components (like Navbar) to update
  window.dispatchEvent(new Event('storage'))
}
</script>

<template>
  <div class="page-container">
    <DashboardNavbar />
    
    <main class="container page-content">
      <div class="profile-card">
        <div class="profile-header">
          <div class="avatar-container">
            <div class="avatar-large">
              <img v-if="isEditing ? editForm.avatar : user.avatar" 
                   :src="isEditing ? editForm.avatar : user.avatar" 
                   alt="Profile" 
                   class="avatar-img" />
              <User v-else :size="64" class="text-primary" />
            </div>
            
            <button v-if="isEditing" class="btn-change-photo" @click="triggerFileInput" title="Ganti Foto">
              <Camera :size="20" />
            </button>
            <input 
              type="file" 
              ref="fileInput" 
              class="hidden-input" 
              accept="image/*" 
              @change="handleImageUpload" 
            />
          </div>
          
          <div v-if="!isEditing" class="profile-info">
            <h1>{{ user.name }}</h1>
            <p class="role-badge">{{ user.role }}</p>
          </div>
          <div v-else class="edit-header-form">
            <div class="form-group-center">
               <label>Nama Lengkap</label>
               <input v-model="editForm.name" type="text" class="form-input text-center" />
            </div>
          </div>
        </div>

        <div class="profile-details">
          <div class="detail-item">
            <div class="label">
              <Mail :size="20" /> Email
            </div>
            <div v-if="!isEditing" class="value">{{ user.email }}</div>
            <div v-else class="edit-value">
               <input v-model="editForm.email" type="email" class="form-input" />
            </div>
          </div>
          
          <div class="detail-item">
             <div class="label">
               <Briefcase :size="20" /> Pekerjaan
             </div>
             <div v-if="!isEditing" class="value">{{ user.role }}</div>
             <div v-else class="edit-value">
               <input v-model="editForm.role" type="text" class="form-input" placeholder="Masukkan Pekerjaan" />
            </div>
          </div>

          <div class="detail-item">
             <div class="label">
               <User :size="20" /> Institusi
             </div>
             <div v-if="!isEditing" class="value">{{ user.university }}</div>
             <div v-else class="edit-value">
               <input v-model="editForm.university" type="text" class="form-input" />
             </div>
          </div>
        </div>

        <div class="action-section">
          <button v-if="!isEditing" class="btn-edit" @click="startEdit">
            <Edit2 :size="18" /> Edit Profil
          </button>
          
          <div v-else class="edit-actions">
             <button class="btn-cancel" @click="cancelEdit">
               <X :size="18" /> Batal
             </button>
             <button class="btn-save" @click="saveProfile">
               <Save :size="18" /> Simpan
             </button>
          </div>
        </div>
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
  padding-top: 3rem;
  display: flex;
  justify-content: center;
}

.profile-card {
  background-color: var(--card-bg);
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  padding: 3rem;
  width: 100%;
  max-width: 600px;
  box-shadow: var(--shadow-sm);
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  text-align: center;
}

.avatar-large {
  width: 120px;
  height: 120px;
  background-color: var(--secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 4px solid var(--card-bg);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-container {
  position: relative;
  margin-bottom: 1.5rem;
}

.btn-change-photo {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: var(--primary);
  color: white;
  border: 2px solid var(--card-bg);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.btn-change-photo:hover {
  background-color: var(--primary-hover);
  transform: scale(1.1);
}

.hidden-input {
  display: none;
}

.profile-info h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.role-badge {
  display: inline-block;
  padding: 0.25rem 1rem;
  background-color: #f1f5f9;
  color: var(--text-muted);
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.detail-item {
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
}

.label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.value {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-main);
  padding-left: 1.75rem;
}

.btn-edit {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-edit:hover {
  background-color: var(--primary-hover);
}

/* Edit Mode Styles */
.edit-actions {
  display: flex;
  gap: 1rem;
}

.btn-save, .btn-cancel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: none;
}

.btn-save {
  background-color: var(--primary);
  color: white;
}

.btn-save:hover {
  background-color: var(--primary-hover);
}

.btn-cancel {
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-muted);
}

.btn-cancel:hover {
  background-color: var(--bg-color);
}

.form-input, .form-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  background: var(--bg-color);
  color: var(--text-main);
  font-size: 1rem;
}

.form-group-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
}

.text-center {
  text-align: center;
}

.text-primary {
  color: var(--primary);
}

/* Dark Mode Overrides */
:global(body.dark-mode) .role-badge {
  background-color: #374151;
  color: #94a3b8;
}

:global(body.dark-mode) .btn-edit {
  color: white;
}

:global(body.dark-mode) .btn-cancel {
  color: var(--text-main);
}
</style>
