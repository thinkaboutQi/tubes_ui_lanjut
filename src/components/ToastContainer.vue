<script setup>
import { useToast } from '../composables/useToast'
import { CheckCircle, AlertCircle, X, Info } from 'lucide-vue-next'

const { toasts, removeToast } = useToast()
</script>

<template>
  <div class="toast-container">
    <TransitionGroup name="toast">
      <div 
        v-for="toast in toasts" 
        :key="toast.id" 
        class="toast-item"
        :class="toast.type"
      >
        <div class="toast-icon">
             <CheckCircle v-if="toast.type === 'success'" :size="20" />
             <AlertCircle v-else-if="toast.type === 'error'" :size="20" />
             <Info v-else :size="20" />
        </div>
        <span class="toast-message">{{ toast.message }}</span>
        <button class="toast-close" @click="removeToast(toast.id)">
            <X :size="16" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.toast-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 300px;
  max-width: 400px;
  border-left: 4px solid;
  animation: slideIn 0.3s ease forwards;
}

.toast-item.success {
  border-left-color: #10b981;
}
.toast-item.success .toast-icon { color: #10b981; }

.toast-item.error {
  border-left-color: #ef4444;
}
.toast-item.error .toast-icon { color: #ef4444; }

.toast-item.info {
  border-left-color: #3b82f6;
}
.toast-item.info .toast-icon { color: #3b82f6; }

.toast-message {
  flex: 1;
  font-size: 0.95rem;
  color: #1e293b;
  font-weight: 500;
}

.toast-close {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
}

.toast-close:hover {
  color: #64748b;
}

/* Transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
