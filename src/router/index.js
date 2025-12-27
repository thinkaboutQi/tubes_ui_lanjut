import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
        {
            path: '/forgot-password',
            name: 'forgot-password',
            component: ForgotPasswordView
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/DashboardView.vue')
        },
        {
            path: '/my-works',
            name: 'my-works',
            component: () => import('../views/MyWorksView.vue')
        },
        {
            path: '/my-works/upload',
            name: 'upload-work',
            component: () => import('../views/UploadWorkView.vue')
        },
        {
            path: '/my-works/:id',
            name: 'work-detail',
            component: () => import('../views/WorkDetailView.vue')
        },
        {
            path: '/my-works/edit/:id',
            name: 'edit-work',
            component: () => import('../views/UploadWorkView.vue')
        },
        {
            path: '/explore',
            name: 'explore',
            component: () => import('../views/ExploreView.vue')
        },
        {
            path: '/bookmarks',
            name: 'bookmarks',
            component: () => import('../views/BookmarkView.vue')
        },
        {
            path: '/events/create',
            name: 'create-event',
            component: () => import('../views/CreateEventView.vue')
        },
        {
            path: '/events/manage',
            name: 'manage-events',
            component: () => import('../views/ManageEventsView.vue')
        },
        {
            path: '/events/edit/:id',
            name: 'edit-event',
            component: () => import('../views/CreateEventView.vue')
        },
        {
            path: '/events',
            name: 'events',
            component: () => import('../views/EventView.vue')
        },
        {
            path: '/events/:id',
            name: 'event-detail',
            component: () => import('../views/EventDetailView.vue')
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/ProfileView.vue')
        }
    ]
})

export default router
