<script setup>
import DashboardNavbar from '../components/DashboardNavbar.vue'
import { Search, MapPin, Calendar, Clock, User, Bookmark, Plus, XCircle } from 'lucide-vue-next'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useToast } from '../composables/useToast'

const router = useRouter()
const { addToast } = useToast()
const searchQuery = ref('')
const selectedType = ref('Semua Jenis')
const activeTab = ref('all') // 'all' or 'my-events'

// ... existing code ...

const handleCancel = (event) => {
  if (confirm(`Apakah Anda yakin ingin membatalkan pendaftaran untuk "${event.title}"?`)) {
    const registeredEvents = JSON.parse(localStorage.getItem('registered_events') || '[]')
    const updatedEvents = registeredEvents.filter(id => id !== event.id)
    localStorage.setItem('registered_events', JSON.stringify(updatedEvents))
    
    // Update local state
    event.isRegistered = false
    
    addToast('Pendaftaran berhasil dibatalkan.', 'info')
    
    // Notification
    const notif = {
       id: Date.now(),
       text: `Anda membatalkan pendaftaran event "${event.title}".`,
       time: 'Baru saja',
       read: false, 
       type: 'info'
    }
    const userNotifications = JSON.parse(localStorage.getItem('user_notifications') || '[]')
    userNotifications.unshift(notif)
    localStorage.setItem('user_notifications', JSON.stringify(userNotifications.slice(0, 10)))
  }
}

const handleAction = (event) => {
  // Always navigate to detail page for both registration and viewing details
  router.push(`/events/${event.id}`)
}

const getButtonText = (event) => {
  if (event.isRegistered) return 'Lihat Detail'
  return 'Daftar Sekarang'
}

const eventTypes = [
  'Semua Jenis',
  'Seminar',
  'Workshop',
  'Konferensi',
  'Webinar',
  'Hackathon'
]

const events = ref([
  {
    id: 1,
    title: 'Seminar Nasional Artificial Intelligence 2024',
    description: 'Seminar nasional membahas perkembangan terkini AI dan implementasinya dalam berbagai bidang industri dan akademik.',
    type: 'Seminar',
    date: '2026-12-20',
    time: '09:00 - 16:00 WIB',
    location: 'Jakarta Convention Center',
    image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop',
    participants: 347,
    maxParticipants: 500,
    isRegistered: false,
    status: 'Buka'
  },
  {
    id: 2,
    title: 'Workshop Machine Learning for Beginners',
    description: 'Workshop interaktif untuk pemula yang ingin belajar machine learning dari dasar hingga membuat model sederhana.',
    type: 'Workshop',
    date: '2026-12-25',
    time: '10:00 - 15:00 WIB',
    location: 'Online via Zoom',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop',
    participants: 156,
    maxParticipants: 200,
    isRegistered: true,
    status: 'Terdaftar'
  },
  {
    id: 3,
    title: 'Konferensi Internasional Teknologi Informasi',
    description: 'Konferensi internasional dengan pembicara dari berbagai negara membahas inovasi teknologi masa depan.',
    type: 'Konferensi',
    date: '2026-01-15',
    time: '08:00 - 17:00 WIB',
    location: 'Bandung Institute of Technology',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop',
    participants: 789,
    maxParticipants: 1000,
    isRegistered: false,
    status: 'Buka'
  },
  {
    id: 4,
    title: 'Webinar Cybersecurity Best Practices',
    description: 'Webinar membahas praktik terbaik dalam keamanan siber untuk melindungi sistem dan data pribadi.',
    type: 'Webinar',
    date: '2026-12-18',
    time: '19:00 - 21:00 WIB',
    location: 'Online',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    participants: 245,
    maxParticipants: 300,
    isRegistered: false,
    status: 'Buka'
  },
  {
    id: 5,
    title: 'Hackathon IoT Innovation 2024',
    description: 'Kompetisi hackathon untuk mengembangkan solusi inovatif berbasis Internet of Things untuk smart city.',
    type: 'Hackathon',
    date: '2026-01-20',
    time: '08:00 - 20:00 WIB',
    location: 'Surabaya Tech Hub',
    image: 'https://images.unsplash.com/photo-1504384308090-c54be3855485?q=80&w=1000&auto=format&fit=crop',
    participants: 98,
    maxParticipants: 150,
    isRegistered: false,
    status: 'Buka'
  }
])

onMounted(() => {
  // Sync with localStorage to ensure status is up to date when returning from detail view
  const registeredEvents = JSON.parse(localStorage.getItem('registered_events') || '[]')
  
  // Update events registered status
  events.value = events.value.map(e => ({
    ...e,
    isRegistered: registeredEvents.includes(e.id)
  }))

  // Load created events
  const createdEvents = JSON.parse(localStorage.getItem('created_events') || '[]')
  if (createdEvents.length > 0) {
    // Apply registration check to created events too
    const updatedCreatedEvents = createdEvents.map(e => ({
      ...e,
      isRegistered: registeredEvents.includes(e.id)
    }))
    events.value = [...events.value, ...updatedCreatedEvents]
  }
})

const filteredEvents = computed(() => {
  return events.value.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = selectedType.value === 'Semua Jenis' || event.type === selectedType.value
    
    // Tab filter
    const matchesTab = activeTab.value === 'all' || (activeTab.value === 'my-events' && event.isRegistered)
    
    return matchesSearch && matchesType && matchesTab
  })
})

const getProgressWidth = (current, max) => {
  return `${(current / max) * 100}%`
}

const goToDetail = (id) => {
  router.push(`/events/${id}`)
}

</script>

<template>
  <div class="page-container">
    <DashboardNavbar />
    
    <main class="container page-content">
      <div class="header-section">
        <div class="header-content">
          <div>
             <h1>Event Akademik</h1>
             <p>Temukan dan ikuti berbagai event akademik yang menarik</p>
          </div>
          <div class="header-actions">
             <button class="btn-manage" @click="router.push('/events/manage')">
                 Kelola Event
             </button>
             <button class="btn-create" @click="router.push('/events/create')">
                <Plus :size="20" /> Buat Event
             </button>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tabs-container">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'all' }"
          @click="activeTab = 'all'"
        >
          Semua Event
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'my-events' }"
          @click="activeTab = 'my-events'"
        >
          Event Saya
        </button>
      </div>

      <div class="search-filters">
        <div class="search-bar">
          <Search class="search-icon" :size="20" />
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Cari event..." 
          />
        </div>
        
        <div class="dropdown-wrapper">
          <select v-model="selectedType" class="filter-select">
            <option v-for="type in eventTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
      </div>

      <div class="events-grid">
        <div v-for="event in filteredEvents" :key="event.id" class="event-card" @click="goToDetail(event.id)">
          <div class="card-image">
            <img :src="event.image" :alt="event.title">
            <div class="card-badges">
              <span class="type-badge" :class="event.type.toLowerCase()">{{ event.type }}</span>
              <span v-if="event.isRegistered" class="status-badge registered">Terdaftar</span>
            </div>
          </div>
          
          <div class="card-content">
            <h2 class="event-title">{{ event.title }}</h2>
            <p class="event-desc">{{ event.description }}</p>
            
            <div class="event-details">
              <div class="detail-item">
                <Calendar :size="16" class="detail-icon" />
                <span>{{ event.date }}</span>
              </div>
              <div class="detail-item">
                <Clock :size="16" class="detail-icon" />
                <span>{{ event.time }}</span>
              </div>
              <div class="detail-item">
                <MapPin :size="16" class="detail-icon" />
                <span>{{ event.location }}</span>
              </div>
              <div class="detail-item">
                <User :size="16" class="detail-icon" />
                <span>{{ event.participants }}/{{ event.maxParticipants }} peserta</span>
              </div>
            </div>

            <div class="progress-container">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: getProgressWidth(event.participants, event.maxParticipants) }"></div>
              </div>
              <span class="progress-text">{{ Math.round((event.participants / event.maxParticipants) * 100) }}% terisi</span>
            </div>

            <div class="action-buttons-wrapper">
              <button class="action-btn" @click.stop="handleAction(event)">
                Lihat Detail
              </button>
            </div>
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
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.header-section {
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-section h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-main); /* Was #1e293b */
  margin-bottom: 0.5rem;
}

.header-section p {
  color: var(--text-muted); /* Was #64748b */
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.btn-manage {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-manage:hover {
  background-color: var(--secondary);
  color: var(--text-main);
  border-color: var(--border-color);
}

.btn-create {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #10b981;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-create:hover {
  background-color: #059669;
}

.search-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-bar {
  flex: 1;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
}

.search-bar input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s;
  background-color: var(--card-bg);
  color: var(--text-main);
}

/* Tabs */
.tabs-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.tab-btn {
  background: none;
  border: none;
  padding: 0.75rem 0.5rem;
  color: var(--text-muted);
  font-weight: 500;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}

.tab-btn:hover {
  color: var(--text-main);
}

.tab-btn.active {
  color: #10b981;
  font-weight: 600;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #10b981;
}

.filter-select {
  padding: 0.875rem 2.5rem 0.875rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background-color: var(--card-bg);
  color: var(--text-main);
  font-size: 0.95rem;
  cursor: pointer;
  outline: none;
  min-width: 200px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
}

.filter-select:focus {
  border-color: #10b981;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.event-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.2s;
  cursor: pointer;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.card-image {
  height: 200px;
  width: 100%;
  position: relative;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-badges {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
}

.type-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

.type-badge.seminar { background-color: #10b981; }
.type-badge.workshop { background-color: #10b981; }
.type-badge.konferensi { background-color: #10b981; }
.type-badge.webinar { background-color: #10b981; }
.type-badge.hackathon { background-color: #10b981; }

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: white;
  color: #10b981;
}

.card-content {
  padding: 1.5rem;
}

.event-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.event-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2; /* Standard property */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.detail-icon {
  color: #10b981;
}

.progress-container {
  margin-bottom: 1.5rem;
}

.progress-bar {
  height: 0.5rem;
  background-color: #e2e8f0;
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background-color: #10b981;
  border-radius: 9999px;
}

.progress-text {
  font-size: 0.8rem;
  color: var(--text-muted);
}


.action-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-buttons-wrapper {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.action-btn {
  flex: 1; /* Make it fill available space */
}

.btn-cancel-reg {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background-color: transparent;
  border: 1px solid #ef4444;
  color: #ef4444;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel-reg:hover {
  background-color: #fef2f2;
}

:global(body.dark-mode) .btn-cancel-reg {
  border-color: #ef4444;
  color: #ef4444;
  background-color: rgba(239, 68, 68, 0.05);
}

:global(body.dark-mode) .btn-cancel-reg:hover {
  background-color: rgba(239, 68, 68, 0.2);
}

.action-btn:hover {
  background-color: #059669;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #10b981;
  color: #10b981;
}

.btn-outline:hover {
  background-color: #f0fdf4;
}

/* Dark Mode Styles */
/* Dark Mode Styles */
:global(body.dark-mode) .page-container {
  background-color: #0f172a !important; /* Force overrides */
}

:global(body.dark-mode) .header-section h1 {
  color: var(--text-main) !important;
}

:global(body.dark-mode) .header-section p {
  color: var(--text-muted) !important;
}

:global(body.dark-mode) .btn-manage {
  background-color: var(--card-bg);
  border-color: var(--border-color);
  color: var(--text-main) !important;
}

:global(body.dark-mode) .btn-manage:hover {
  background-color: #374151; /* specific dark hover */
}

:global(body.dark-mode) .search-bar input {
  background-color: var(--card-bg);
  border-color: var(--border-color);
  color: var(--text-main) !important;
}

:global(body.dark-mode) .filter-select {
  background-color: var(--card-bg);
  border-color: var(--border-color);
  color: var(--text-main) !important;
}

:global(body.dark-mode) .event-card {
  background-color: var(--card-bg);
  border-color: var(--border-color);
}

:global(body.dark-mode) .event-card:hover {
  background-color: #1f2937; /* slightly lighter than card-bg usually */
}

:global(body.dark-mode) .event-title {
  color: var(--text-main) !important;
}

:global(body.dark-mode) .event-desc,
:global(body.dark-mode) .detail-item,
:global(body.dark-mode) .progress-text {
  color: var(--text-muted) !important;
}

:global(body.dark-mode) .progress-bar {
  background-color: #374151;
}

:global(body.dark-mode) .tab-btn {
  color: var(--text-muted);
}

:global(body.dark-mode) .tab-btn:hover {
  color: var(--text-main);
}

:global(body.dark-mode) .tab-btn.active {
  color: #10b981;
}

:global(body.dark-mode) .btn-outline {
  border-color: #10b981;
  color: #10b981;
  background-color: transparent;
}

:global(body.dark-mode) .btn-outline:hover {
  background-color: rgba(16, 185, 129, 0.1);
}

:global(body.dark-mode) .action-btn {
  /* Keep primary color but ensure text is white for contrast */
  color: white; 
}

:global(body.dark-mode) .action-btn.btn-outline {
  /* Specific override for outline version usually "Lihat Detail" */
  color: #10b981;
  border-color: #10b981;
  background-color: transparent;
}

:global(body.dark-mode) .action-btn:hover {
  background-color: #059669;
}
</style>
