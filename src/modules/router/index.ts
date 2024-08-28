import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue';
import  Sidebar  from '@/modules/layouts/NavbarLayout.vue';
import ResumenView from '../views/ResumenView.vue';

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
      redirect: '/home',
      component: Sidebar,
      children: [ 
        {
          path: '/home',
          name: 'home',
          component: ResumenView
        },
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
        {
          path: '/cart',
          name: 'cart',
          component: () => import('@/modules/components/carrito/CartBuy.vue')
        }
      ]
    },
  ],
});

export default router
