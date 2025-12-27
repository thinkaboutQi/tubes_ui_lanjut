<script setup>
import { BookOpen } from 'lucide-vue-next'
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="brand-header">
             <div class="logo-icon">
               <BookOpen :size="18" color="white" />
             </div>
             <span>Jelajah Karya</span>
          </div>
          <p class="brand-desc">
            Platform publikasi karya ilmiah untuk meningkatkan kolaborasi akademis
          </p>
        </div>
        
        <div class="footer-col">
          <h4>Platform</h4>
          <ul>
            <li><a href="#">Tentang Kami</a></li>
            <li><a href="#">Fitur</a></li>
            <li><a href="#">Harga</a></li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h4>Dukungan</h4>
          <ul>
            <li><a href="#">Bantuan</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Kontak</a></li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privasi</a></li>
            <li><a href="#">Syarat & Ketentuan</a></li>
            <li><a href="#">Lisensi</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2024 Jelajah Karya. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #0f172a; /* Slate 900 */
  color: #94a3b8; /* Slate 400 */
  padding-top: 4rem;
  padding-bottom: 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.brand-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: #f8fafc; /* White/Slate 50 */
  font-weight: 600;
  font-size: 1.1rem;
}

.logo-icon {
  background-color: var(--primary);
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}

.brand-desc {
  max-width: 300px;
  line-height: 1.5;
  font-size: 0.95rem;
}

.footer-col h4 {
  color: #f8fafc;
  margin-bottom: 1.25rem;
  font-size: 1rem;
}

.footer-col ul {
  list-style: none;
}

.footer-col ul li {
  margin-bottom: 0.75rem;
}

.footer-col ul li a {
  font-size: 0.95rem;
  transition: color 0.2s;
}

.footer-col ul li a:hover {
  color: white;
}

.footer-bottom {
  border-top: 1px solid #334155;
  padding-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
