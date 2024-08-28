import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/modules/views/LoginView.vue'
import  Sidebar  from '@/modules/layouts/NavbarLayout.vue';

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
      component: Sidebar,
      children: [ 
        {
          path: '/inventario',
          name: 'inventario',
          component: () => import('@/modules/views/InventarioView.vue')
        },
        {
          path: '/nuevoproducto',
          name: 'nuevoproducto',
          component: () => import('@/modules/views/InsertarProduto.vue')
        },
        {
          path: '/ventas',
          name: 'ventas',
          component: () => import('@/modules/views/VentasView.vue')
        },
      ]
    },
  ],
});

export default router
