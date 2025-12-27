<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { 
  ArrowRight, 
  Upload, 
  Search, 
  Calendar, 
  Users,
  BookOpen,
  Globe
} from 'lucide-vue-next'
</script>

<template>
  <div class="landing-page">
    <Navbar />
    
    <main>
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container hero-container">
          <div class="hero-badge">
            <span class="badge-icon">🏆</span>
            Platform Publikasi Karya Ilmiah Terpercaya
          </div>
          
          <h1 class="hero-title">
            Bagikan Karya Ilmiah,<br />
            Tingkatkan Dampak Penelitian Anda
          </h1>
          
          <p class="hero-subtitle">
            Jelajah Karya adalah platform online yang memudahkan Anda untuk mempublikasikan karya ilmiah, mencari referensi akademik, dan mengikuti berbagai event akademis untuk meningkatkan kolaborasi dan pertukaran pengetahuan.
          </p>
          
          <div class="hero-actions">
            <router-link to="/register" class="btn btn-primary btn-lg">
              Mulai Sekarang Gratis <ArrowRight :size="18" />
            </router-link>
            <router-link to="/login" class="btn btn-outline btn-lg">
              Jelajahi Karya
            </router-link>
          </div>
          
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-icon-wrapper bg-green-light">
                <BookOpen :size="24" class="text-primary" />
              </div>
              <div class="stat-value">10,000+</div>
              <div class="stat-label">Karya Ilmiah</div>
            </div>
            
            <div class="stat-item">
              <div class="stat-icon-wrapper bg-green-light">
                <Users :size="24" class="text-primary" />
              </div>
              <div class="stat-value">5,000+</div>
              <div class="stat-label">Pengguna Aktif</div>
            </div>
            
            <div class="stat-item">
              <div class="stat-icon-wrapper bg-green-light">
                <Calendar :size="24" class="text-primary" />
              </div>
              <div class="stat-value">100+</div>
              <div class="stat-label">Event per Tahun</div>
            </div>
            
            <div class="stat-item">
              <div class="stat-icon-wrapper bg-green-light">
                <Globe :size="24" class="text-primary" />
              </div>
              <div class="stat-value">50+</div>
              <div class="stat-label">Institusi</div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Features Section -->
      <section class="section features-section bg-light">
        <div class="container">
          <h2 class="section-title">Fitur Unggulan</h2>
          <p class="section-subtitle">
            Berbagai fitur yang dirancang untuk memudahkan aktivitas akademis Anda
          </p>
          
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon bg-green-light">
                <Upload :size="28" class="text-primary" />
              </div>
              <h3>Publikasikan Karya</h3>
              <p>Bagikan karya ilmiah Anda kepada komunitas akademis secara luas dan mudah</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon bg-green-light">
                <Search :size="28" class="text-primary" />
              </div>
              <h3>Cari Referensi</h3>
              <p>Temukan ribuan karya ilmiah dengan sistem pencarian yang terstruktur</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon bg-green-light">
                <Calendar :size="28" class="text-primary" />
              </div>
              <h3>Event Akademik</h3>
              <p>Ikuti berbagai seminar, workshop, dan konferensi akademis terkini</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon bg-green-light">
                <Users :size="28" class="text-primary" />
              </div>
              <h3>Kolaborasi</h3>
              <p>Terhubung dengan peneliti dan akademisi dari berbagai institusi</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- How It Works Section -->
      <section class="section steps-section">
        <div class="container">
          <h2 class="section-title">Cara Kerja</h2>
          <p class="section-subtitle">
            Mulai berbagi karya ilmiah Anda dalam 3 langkah mudah
          </p>
          
          <div class="steps-grid">
            <div class="step-item">
              <div class="step-number">1</div>
              <h3>Daftar Akun</h3>
              <p>Buat akun gratis dengan mengisi informasi dasar Anda</p>
            </div>
            
            <div class="step-item">
              <div class="step-number">2</div>
              <h3>Unggah Karya</h3>
              <p>Upload karya ilmiah Anda dalam format PDF dengan mudah</p>
            </div>
            
            <div class="step-item">
              <div class="step-number">3</div>
              <h3>Bagikan & Kolaborasi</h3>
              <p>Bagikan karya Anda dan mulai berkolaborasi dengan akademisi lain</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container cta-container">
          <h2>Siap Memulai Perjalanan Akademis Anda?</h2>
          <p>Bergabunglah dengan ribuan akademisi dan peneliti yang telah mempublikasikan karya mereka di Jelajah Karya</p>
          <div class="cta-actions">
            <router-link to="/register" class="btn btn-white">Daftar Sekarang</router-link>
            <router-link to="/login" class="btn btn-outline-white">Masuk ke Akun</router-link>
          </div>
        </div>
      </section>
    </main>
    
    <Footer />
  </div>
</template>

<style scoped>
/* Hero */
.hero-section {
  padding: 5rem 0 4rem;
  text-align: center;
}

.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--secondary);
  color: #15803d; /* Darker Green for text */
  border-radius: 2rem;
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.hero-title {
  font-size: 2.75rem;
  font-weight: 800;
  line-height: 1.2;
  color: #0d2c20; /* Very Dark Green/Black */
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: var(--text-muted);
  max-width: 700px;
  margin-bottom: 2.5rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;
}

.btn-lg {
  padding: 0.875rem 2rem;
  font-size: 1rem;
}

/* Stats */
.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  width: 100%;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.bg-green-light {
  background-color: var(--secondary);
}

.text-primary {
  color: var(--primary);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-muted);
}

/* Features */
.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.feature-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--text-main);
}

.feature-card p {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Steps */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-number {
  width: 64px;
  height: 64px;
  background-color: var(--primary);
  color: white;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 200, 83, 0.3);
}

.step-item h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.step-item p {
  color: var(--text-muted);
  max-width: 300px;
}

/* CTA */
.cta-section {
  background-color: var(--primary);
  padding: 5rem 0;
  text-align: center;
  color: white;
}

.cta-container h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.cta-container p {
  font-size: 1.125rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto 3rem;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.btn-white {
  background-color: white;
  color: var(--primary);
  padding: 0.875rem 2rem;
  font-weight: 600;
  border-radius: var(--radius);
  border: none;
  font-size: 1rem;
}

.btn-white:hover {
  background-color: #f0fdf4;
}

.btn-outline-white {
  background-color: transparent;
  color: white;
  border: 2px solid white;
  padding: 0.875rem 2rem;
  font-weight: 600;
  border-radius: var(--radius);
  font-size: 1rem;
}

.btn-outline-white:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-stats, .features-grid, .steps-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-stats, .features-grid, .steps-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-actions, .cta-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .btn {
    width: 100%;
  }
}

</style>

<style>
/* Dark Mode Overrides - Unscoped for HomeView */
body.dark-mode .landing-page {
  background-color: #0f172a !important;
}

body.dark-mode .hero-title {
  color: #f8fafc !important;
}

body.dark-mode .hero-subtitle {
  color: #cbd5e1 !important;
}

body.dark-mode .hero-badge {
  background-color: rgba(16, 185, 129, 0.2) !important;
  color: #4ade80 !important; /* Brighter Green */
}

body.dark-mode .feature-card {
  background-color: #1e293b !important;
  border-color: #334155 !important;
}

body.dark-mode .feature-card h3 {
  color: #f8fafc !important;
}

body.dark-mode .feature-card p {
  color: #94a3b8 !important;
}

body.dark-mode .bg-light {
  background-color: #0f172a !important; /* Reset light backgrounds to dark */
}

body.dark-mode .bg-green-light {
  background-color: rgba(16, 185, 129, 0.1) !important; /* Transparent green */
}

body.dark-mode .step-number {
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.3) !important;
}

body.dark-mode .step-item h3 {
  color: #f8fafc !important;
}

body.dark-mode .step-item p {
  color: #94a3b8 !important;
}

body.dark-mode .stat-value {
  color: #f8fafc !important;
}

body.dark-mode .stat-label {
  color: #94a3b8 !important;
}

body.dark-mode .cta-section {
  background-color: #1e293b !important; /* Dark Slate */
  border-top: 1px solid #334155;
  color: #f8fafc !important;
}

body.dark-mode .btn-white {
  background-color: #10b981 !important; /* Primary Green for contrast */
  color: white !important;
  border: none !important;
}

body.dark-mode .btn-white:hover {
  background-color: #059669 !important;
}

body.dark-mode .btn-outline-white {
  border-color: #f8fafc !important;
  color: #f8fafc !important;
}

body.dark-mode .btn-outline-white:hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
}
</style>
