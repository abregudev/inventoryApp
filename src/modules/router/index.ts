import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/modules/views/LoginView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/sidebar',
      name: 'sidebar',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/modules/views/SidebarLogin.vue')
    }
  ]
})

export default router
