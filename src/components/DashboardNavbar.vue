<script setup>
import { 
  BookOpen, 
  LayoutDashboard, 
  FileText, 
  Search, 
  Bookmark, 
  Calendar,
  Bell,
  User,
  ChevronDown,
  LogOut,
  Sun,
  Moon
} from 'lucide-vue-next'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref({
  name: 'User Demo',
  email: 'user@demo.com'
})

const showDropdown = ref(false)
const showNotifications = ref(false)

const notifications = ref([])

const loadNotifications = () => {
  const stored = localStorage.getItem('user_notifications')
  if (stored) {
    try {
      notifications.value = JSON.parse(stored)
    } catch (e) {
      console.error('Error parsing notifications', e)
    }
  } else {
    // Seed initial welcome notification if empty
    const welcome = [
       { id: 999, text: 'Selamat datang di Jelajah Karya! Mulai eksplorasi event akademik sekarang.', time: 'Baru saja', read: false }
    ]
    notifications.value = welcome
    localStorage.setItem('user_notifications', JSON.stringify(welcome))
  }
}

import { computed } from 'vue'
const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  if (showNotifications.value) showDropdown.value = false // Close other dropdown
}

const markAsRead = (id) => {
  const notif = notifications.value.find(n => n.id === id)
  if (notif) {
    notif.read = true
    localStorage.setItem('user_notifications', JSON.stringify(notifications.value))
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
  localStorage.setItem('user_notifications', JSON.stringify(notifications.value))
}

const updateUserData = () => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
    } catch (e) {
      console.error('Error parsing user data', e)
    }
  }
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
  if (showDropdown.value) showNotifications.value = false // Close other dropdown
}

const logout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}

// Close dropdown when clicking outside
const closeDropdown = (e) => {
  if (showDropdown.value && !e.target.closest('.user-profile')) {
    showDropdown.value = false
  }
  if (showNotifications.value && !e.target.closest('.notification-wrapper')) {
    showNotifications.value = false
  }
}

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
  updateUserData()
  loadNotifications() // Load notifications
  initTheme()
  window.addEventListener('storage', updateUserData)
  
  // Listen for storage changes to update notifications in real-time across tabs/components
  window.addEventListener('storage', (e) => {
    if (e.key === 'user') updateUserData()
    if (e.key === 'user_notifications') loadNotifications()
  })
  
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  window.removeEventListener('storage', updateUserData)
  document.removeEventListener('click', closeDropdown)
})
</script>

<template>
  <header class="navbar">
    <div class="container nav-content">
      <div class="nav-left">
        <div class="brand">
          <div class="logo-icon">
            <BookOpen :size="24" color="white" />
          </div>
          <span class="brand-text">Jelajah Karya</span>
        </div>
        
        <nav class="main-nav">
          <router-link to="/dashboard" class="nav-item" active-class="active">
            <LayoutDashboard :size="18" /> Dashboard
          </router-link>
          <router-link to="/my-works" class="nav-item" active-class="active">
            <FileText :size="18" /> Karya Saya
          </router-link>
          <router-link to="/explore" class="nav-item" active-class="active">
            <Search :size="18" /> Jelajahi Karya
          </router-link>
          <router-link to="/bookmarks" class="nav-item" active-class="active">
            <Bookmark :size="18" /> Bookmark
          </router-link>
          <router-link to="/events" class="nav-item" active-class="active">
            <Calendar :size="18" /> Event
          </router-link>
        </nav>
      </div>

      <div class="nav-right">
        <button class="theme-toggle" @click="toggleDarkMode" :title="isDarkMode ? 'Mode Terang' : 'Mode Gelap'">
           <Sun v-if="isDarkMode" :size="20" class="text-warning" />
           <Moon v-else :size="20" class="text-muted" />
        </button>

        <div class="notification-wrapper" @click.stop="toggleNotifications">
          <Bell :size="24" class="text-muted" />
          <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
          
          <!-- Notification Dropdown -->
          <div v-if="showNotifications" class="dropdown-menu notification-dropdown">
            <div class="dropdown-header">
              <span class="dropdown-title">Notifikasi</span>
              <button v-if="unreadCount > 0" class="mark-read-btn" @click.stop="markAllAsRead">
                Tandai semua dibaca
              </button>
            </div>
            
            <div class="notification-list">
              <div 
                v-for="notif in notifications" 
                :key="notif.id" 
                class="dropdown-item notification-item" 
                :class="{ 'unread': !notif.read }"
                @click.stop="markAsRead(notif.id)"
              >
                <div class="notif-content">
                  <p class="notif-text">{{ notif.text }}</p>
                  <span class="notif-time">{{ notif.time }}</span>
                </div>
                <div v-if="!notif.read" class="unread-dot"></div>
              </div>
              <div v-if="notifications.length === 0" class="empty-notif">
                Tidak ada notifikasi baru
              </div>
            </div>
          </div>
        </div>
        
        <div class="user-profile" @click="toggleDropdown">
          <div class="avatar">
            <img v-if="user.avatar" :src="user.avatar" alt="User" class="nav-avatar-img" />
            <User v-else :size="20" class="text-primary" />
          </div>
          <span class="user-name">{{ user.name }}</span>
          <ChevronDown :size="20" class="text-muted" :class="{ 'rotate-180': showDropdown }" />
          
          <div v-if="showDropdown" class="dropdown-menu">
            <div class="dropdown-header">
              <span class="dropdown-name">{{ user.name }}</span>
              <span class="dropdown-email">{{ user.email }}</span>
            </div>
            <router-link to="/profile" class="dropdown-item">
              <User :size="16" />
              <span>Profil Saya</span>
            </router-link>
            <div class="dropdown-item text-red" @click.stop="logout">
              <LogOut :size="16" />
              <span>Keluar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  padding: 1.5rem 0;
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color 0.2s;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 700;
  color: var(--text-main);
}

.brand-text {
  font-size: 1.25rem;
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

.main-nav {
  display: flex;
  gap: 2rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-muted);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.nav-item:hover {
  color: #1e293b; /* Darker text on hover */
  background-color: #f1f5f9; /* Light gray bg */
}

.nav-item.active {
  color: #059669; /* Slightly darker green */
  background-color: #d1fae5; /* Light green bg */
  font-weight: 600;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.notification-wrapper {
  position: relative;
  cursor: pointer;
}

.text-muted {
  color: var(--text-muted);
}

.badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #ef4444; /* Red */
  color: white;
  font-size: 0.7rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  transition: background 0.2s;
}

.user-profile:hover {
  background-color: #f1f5f9;
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: var(--secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Ensure image stays circular */
}

.nav-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-primary {
  color: var(--primary);
}

.user-name {
  font-weight: 600;
  font-size: 1rem;
  color: var(--text-main);
}

@media (max-width: 1024px) {
  .nav-left {
    gap: 1.5rem;
  }
  
  .brand-text {
    display: none;
  }
}

/* Dropdown Styles */
.user-profile {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 120%;
  right: 0;
  width: 200px;
  background: var(--card-bg);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border: 1px solid var(--border-color);
  padding: 0.5rem 0;
  z-index: 50;
  animation: fadeIn 0.1s ease-out;
}

.dropdown-header {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.dropdown-name {
  font-weight: 600;
  color: var(--text-main);
  font-size: 0.9rem;
}

.dropdown-email {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  color: var(--text-main);
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f8fafc;
}

.text-red {
  color: #ef4444;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.2s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
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
}

.theme-toggle:hover {
  background-color: var(--secondary);
}

.text-warning {
  color: #fbbf24; /* Amber 400 */
}

/* Dark Mode fixes for Navbar specific elements */
:global(body.dark-mode) .navbar {
  background-color: rgba(31, 41, 55, 0.95); /* Semi-transparent for modern feel */
  border-bottom-color: var(--border-color);
  backdrop-filter: blur(10px);
}

:global(body.dark-mode) .dropdown-menu {
  background-color: var(--card-bg);
  border-color: var(--border-color);
  box-shadow: var(--shadow-lg);
}

:global(body.dark-mode) .nav-item:hover {
  background-color: rgba(255,255,255,0.08); /* Smoother hover */
  color: #fff;
}

:global(body.dark-mode) .nav-item.active {
  background-color: rgba(16, 185, 129, 0.2); /* Transparent Green */
  color: #34d399; /* Emerald 400 */
}

:global(body.dark-mode) .user-profile:hover {
  background-color: rgba(255,255,255,0.05);
}



:global(body.dark-mode) .dropdown-item:hover {
  background-color: #374151; /* Gray 700 */
}

/* Notification Specific Styles */
.notification-dropdown {
  width: 320px;
  right: -80px; /* Adjust alignment */
}

.notification-dropdown .dropdown-header {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.dropdown-title {
  font-weight: 600;
  color: var(--text-main);
}

.mark-read-btn {
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0;
}

.mark-read-btn:hover {
  text-decoration: underline;
}

.notification-list {
  max-height: 300px;
  overflow-y: auto;
}

.notification-item {
  align-items: flex-start;
  border-bottom: 1px solid var(--border-color);
  padding: 0.75rem 1rem;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item.unread {
  background-color: rgba(16, 185, 129, 0.05); /* Light green tint */
}

.notif-content {
  flex: 1;
}

.notif-text {
  font-size: 0.9rem;
  color: var(--text-main);
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.notif-time {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.unread-dot {
  width: 8px;
  height: 8px;
  background-color: #ef4444;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 6px;
}

.empty-notif {
  padding: 2rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
}

:global(body.dark-mode) .notification-item.unread {
   background-color: rgba(16, 185, 129, 0.1);
}
</style>
