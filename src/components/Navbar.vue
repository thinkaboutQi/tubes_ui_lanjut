<script setup>
import { BookOpen, User, Sun, Moon } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'

const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  updateTheme()
}

const updateTheme = () => {
  if (isDarkMode.value) {
    document.body.classList.add('dark-mode')
    localStorage.setItem('theme', 'dark')
  } else {
    document.body.classList.remove('dark-mode')
    localStorage.setItem('theme', 'light')
  }
}

const initTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDarkMode.value = true
    document.body.classList.add('dark-mode')
  }
}

onMounted(() => {
  initTheme()
})
</script>

<template>
  <header class="navbar">
    <div class="container nav-content">
      <div class="brand">
        <div class="logo-icon">
          <BookOpen :size="24" color="white" />
        </div>
        Jelajah Karya
      </div>
      <div class="nav-right">
        <button class="theme-toggle" @click="toggleDarkMode" :title="isDarkMode ? 'Mode Terang' : 'Mode Gelap'">
           <Sun v-if="isDarkMode" :size="20" class="text-warning" />
           <Moon v-else :size="20" class="text-muted" />
        </button>
        <router-link to="/login" class="nav-link">Masuk</router-link>
        <router-link to="/register" class="btn btn-primary no-underline">Daftar Gratis</router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  padding: 1.75rem 0;
  background: #ffffff;
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 700;
  font-size: 1.5rem;
  color: #1e293b; /* Dark slate */
}

.logo-icon {
  background-color: var(--primary);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  font-weight: 500;
  color: var(--text-muted);
  font-size: 0.95rem;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--primary);
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  margin-right: 0.5rem;
}

.theme-toggle:hover {
  background-color: #f1f5f9;
}

.text-warning { color: #fbbf24; }
.text-muted { color: #94a3b8; }

</style>

<style>
/* Dark Mode Overrides - Unscoped to ensure application */
body.dark-mode .navbar {
  background-color: #0f172a !important;
  border-bottom-color: #334155 !important;
}

body.dark-mode .brand {
  color: #f8fafc !important;
}

body.dark-mode .nav-link {
  color: #94a3b8 !important;
}

body.dark-mode .nav-link:hover {
  color: #10b981 !important; /* Primary */
}

body.dark-mode .theme-toggle:hover {
  background-color: rgba(255,255,255,0.1) !important;
}

body.dark-mode .dropdown-menu {
  background-color: #1e293b !important;
  border-color: #334155 !important;
  color: #f8fafc !important;
}

body.dark-mode .dropdown-item {
  color: #f8fafc !important;
}

body.dark-mode .dropdown-item:hover {
  background-color: #334155 !important;
}

body.dark-mode .dropdown-name {
  color: #f8fafc !important;
}

body.dark-mode .user-name {
  color: #f8fafc !important;
}
</style>
