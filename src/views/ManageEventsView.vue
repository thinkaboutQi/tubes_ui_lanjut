<script setup>
import DashboardNavbar from '../components/DashboardNavbar.vue'
import { ArrowLeft, Calendar, MapPin, Edit, Trash2, Eye, Plus } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '../composables/useToast'

const router = useRouter()
const { addToast } = useToast()
const myEvents = ref([])

onMounted(() => {
  loadEvents()
})

const loadEvents = () => {
  const storedEvents = localStorage.getItem('created_events')
  if (storedEvents) {
    try {
      myEvents.value = JSON.parse(storedEvents)
    } catch (e) {
      console.error('Error loading events', e)
    }
  }
}

const goBack = () => {
  router.back()
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

const deleteEvent = (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus event ini? Tindakan ini tidak dapat dibatalkan.')) {
    // Find event to get title for notification
    const eventToDelete = myEvents.value.find(e => e.id === id) || { title: 'Event' }

    // Filter out the event
    const updatedEvents = myEvents.value.filter(event => event.id !== id)
    
    // Update state and localStorage
    myEvents.value = updatedEvents
    localStorage.setItem('created_events', JSON.stringify(updatedEvents)) // Update created list
    addToast('Event berhasil dihapus.', 'info')

    // Add delete notification
    const notif = {
        id: Date.now(),
        text: `Anda telah menghapus event "${eventToDelete.title}".`,
        time: 'Baru saja',
        read: false, 
        type: 'alert'
    }
    const userNotifications = JSON.parse(localStorage.getItem('user_notifications') || '[]')
    userNotifications.unshift(notif)
    localStorage.setItem('user_notifications', JSON.stringify(userNotifications.slice(0, 10)))
    
    // Also remove from registered list if needed, but not strictly necessary for owner
    
    // Also remove from the 'all events' mock persistence if we had one, but currently EventView merges on the fly.
  }
}

const goToEdit = (id) => {
  router.push(`/events/edit/${id}`)
}

const goToDetail = (id) => {
  router.push(`/events/${id}`)
}
</script>

<template>
  <div class="page-container">
    <DashboardNavbar />
    
    <main class="container page-content">
      <button class="back-link" @click="goBack">
        <ArrowLeft :size="20" /> Kembali
      </button>

      <div class="header-section">
        <div class="header-content">
            <div>
                <h1>Kelola Event Saya</h1>
                <p>Lihat, ubah, atau hapus event yang telah Anda buat</p>
            </div>
             <button class="btn-create" @click="router.push('/events/create')">
                <Plus :size="20" /> Buat Event Baru
             </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="myEvents.length === 0" class="empty-state">
        <div class="empty-icon-bg">
            <Calendar :size="48" stroke-width="1.5" />
        </div>
        <h3>Belum Ada Event</h3>
        <p>Anda belum membuat event apapun. Mulai buat event akademik Anda sekarang!</p>
        <button class="btn-primary mt-4" @click="router.push('/events/create')">
            Buat Event Sekarang
        </button>
      </div>

      <!-- Event List -->
      <div v-else class="events-list">
        <div v-for="event in myEvents" :key="event.id" class="manage-card">
          <div class="card-image-wrapper">
             <img :src="event.image" class="card-img" alt="Event Cover" />
             <span class="type-badge">{{ event.type }}</span>
          </div>
          
          <div class="card-content">
            <h2 class="event-title">{{ event.title }}</h2>
            
            <div class="meta-row">
                <div class="meta-item">
                    <Calendar :size="16" /> {{ formatDate(event.date) }}
                </div>
                <div class="meta-item">
                    <MapPin :size="16" /> {{ event.location }}
                </div>
            </div>

            <div class="action-buttons">
                <button class="btn-action btn-detail" @click="goToDetail(event.id)" title="Lihat Detail">
                    <Eye :size="18" /> Detail
                </button>
                <button class="btn-action btn-edit" @click="goToEdit(event.id)" title="Edit Event">
                    <Edit :size="18" /> Edit
                </button>
                <button class="btn-action btn-delete" @click="deleteEvent(event.id)" title="Hapus Event">
                    <Trash2 :size="18" /> Hapus
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
  max-width: 900px;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  padding: 0;
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
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.header-section p {
  color: var(--text-muted);
}

.btn-create {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #10b981;
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  text-decoration: none;
  font-size: 0.95rem;
}

.btn-create:hover {
  background-color: #059669;
}

/* Empty State */
.empty-state {
    text-align: center;
    background: var(--card-bg);
    padding: 4rem 2rem;
    border-radius: 1rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    color: var(--text-muted); /* Was #64748b */
    border: 1px solid var(--border-color);
}

.empty-icon-bg {
    width: 80px;
    height: 80px;
    background-color: var(--bg-main); /* Was #f1f5f9 - use var for theme support */
    color: var(--text-muted);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
}

.empty-state h3 {
    color: var(--text-main); /* Was #1e293b */
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
}

.mt-4 { margin-top: 1.5rem; }

.btn-primary {
    background-color: #10b981;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
}

/* List */
.events-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.manage-card {
    background: var(--card-bg);
    border-radius: 1rem;
    overflow: hidden;
    display: flex;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.card-image-wrapper {
    width: 200px;
    position: relative;
    flex-shrink: 0;
}

.card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.type-badge {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    background: rgba(0,0,0,0.6);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
 backdrop-filter: blur(4px);
}

.card-content {
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.event-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-main); /* Was #1e293b */
    margin-bottom: 0.75rem;
}

.meta-row {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-muted); /* Was #64748b */
    font-size: 0.9rem;
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.action-buttons {
    display: flex;
    gap: 0.75rem;
}

.btn-action {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s;
}

.btn-detail {
    background-color: #eff6ff;
    color: #3b82f6;
    border-color: #dbeafe;
}
.btn-detail:hover { background-color: #dbeafe; }

.btn-edit {
    background-color: #fff7ed;
    color: #f97316;
     border-color: #ffedd5;
}
.btn-edit:hover { background-color: #ffedd5; }

.btn-delete {
    background-color: #fef2f2;
    color: #ef4444;
     border-color: #fee2e2;
}
.btn-delete:hover { background-color: #fee2e2; }

@media (max-width: 640px) {
    .manage-card {
        flex-direction: column;
    }
    .card-image-wrapper {
        width: 100%;
        height: 150px;
    }
    .meta-row {
        flex-direction: column;
        gap: 0.5rem;
    }
    .action-buttons {
        flex-direction: column; /* Stack buttons on mobile */
    }
    .btn-action {
        justify-content: center;
    }
}

/* Dark Mode Styles */
:global(body.dark-mode) .page-container {
  background-color: #0f172a !important;
}

:global(body.dark-mode) .header-section h1 {
  color: var(--text-main) !important;
}

:global(body.dark-mode) .header-section p {
  color: var(--text-muted) !important;
}

:global(body.dark-mode) .manage-card {
  background-color: var(--card-bg);
  border-color: var(--border-color);
}

:global(body.dark-mode) .event-title {
  color: var(--text-main) !important;
}

:global(body.dark-mode) .meta-row {
  color: var(--text-muted) !important;
}

:global(body.dark-mode) .empty-state {
  background-color: var(--card-bg);
  box-shadow: var(--shadow-md);
}

:global(body.dark-mode) .empty-state h3 {
  color: var(--text-main) !important;
}

:global(body.dark-mode) .empty-icon-bg {
  background-color: var(--bg-main);
  color: var(--text-muted);
}

/* Dark Mode Action Buttons */
:global(body.dark-mode) .btn-detail {
  background-color: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.2);
}

:global(body.dark-mode) .btn-edit {
  background-color: rgba(249, 115, 22, 0.1);
  border-color: rgba(249, 115, 22, 0.2);
}

:global(body.dark-mode) .btn-delete {
  background-color: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.2);
}

/* Dark Mode Hover States */
:global(body.dark-mode) .btn-detail:hover {
  background-color: rgba(59, 130, 246, 0.2);
}

:global(body.dark-mode) .btn-edit:hover {
  background-color: rgba(249, 115, 22, 0.2);
}

:global(body.dark-mode) .btn-delete:hover {
  background-color: rgba(239, 68, 68, 0.2);
}
</style>
