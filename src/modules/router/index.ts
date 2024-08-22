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
      component: () => import('@/modules/layouts/SidebarLayout.vue'),
      children: [ 
        {
          path: '/inventario',
          name: 'inventario',
          component: () => import('@/modules/views/InventarioView.vue')
        },
        
        
      ]
    },
  ],
});

export default router
