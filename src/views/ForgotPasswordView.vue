<script setup>
import { BookOpen, Mail, ArrowLeft } from 'lucide-vue-next'
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="card-header-nav">
        <router-link to="/login" class="back-link">
          <ArrowLeft :size="16" /> Kembali
        </router-link>
      </div>
      
      <div class="auth-header">
        <div class="logo-wrapper">
          <div class="logo-icon">
            <BookOpen :size="24" color="white" />
          </div>
          <h1>Jelajah Karya</h1>
        </div>
        <h2>Reset Password</h2>
        <p>Masukkan email Anda dan kami akan mengirimkan link untuk reset password</p>
      </div>

      <form class="auth-form" @submit.prevent>
        <div class="form-group">
          <label>Email</label>
          <div class="input-wrapper">
            <Mail class="input-icon" :size="20" />
            <input type="email" placeholder="email@example.com" />
          </div>
        </div>

        <button class="btn btn-primary btn-block">Kirim Link Reset</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--secondary); /* Light Green */
  padding: 1rem;
}

.auth-card {
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 450px;
  box-shadow: var(--shadow-lg);
  position: relative;
}

.card-header-nav {
  margin-bottom: 1.5rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--primary);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.logo-icon {
  background-color: var(--primary);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.logo-wrapper h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0d2c20;
}

.auth-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 0.75rem;
}

.auth-header p {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
  max-width: 80%;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-main);
  font-weight: 500;
  font-size: 0.95rem;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.input-wrapper input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.input-wrapper input:focus {
  border-color: var(--primary);
}

.btn-block {
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
}
</style>
