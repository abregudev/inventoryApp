//createRouter esta funcion crea una  nueva instancia en el enrutador
//createWebHistory este metodo crea un historial de navegaciòn utilizando el modo de historial
import { createRouter, createWebHistory } from 'vue-router'
//EStos son componentes importados que representan vistas o layouts que seran usadas en las rutas
import LoginView from '../views/LoginView.vue';
import  Sidebar  from '@/modules/layouts/NavbarLayout.vue';
import ResumenView from '../views/ResumenView.vue';

//Aquí se exporta la instancia del router para que pueda ser usada en la aplicación Vue.
export const router = createRouter({
  //createWebHistory crea un historial web lo que permite navegar por rutas màs limpias
  history: createWebHistory(import.meta.env.BASE_URL),//usa una variable de entorno que contiene la url base de la aplicaciòn
  //DEfine las rutas de la aplicaciòn cada objeto dentro de un array representa una ruta
  routes: [
    {
      path: '/',//esta es la ruta raìz que sera la vista loginView
      name: 'login',//Le da un nombre a la ruta, este nombre se puede usar para navegar dentro de la aplicaciòn
      component: LoginView//este es el componete que se mostrara cuandoe el usuario muestre la ruta
    },
    {
      path: '/sidebar',//define la ruta que utilizarà el componente sidebar como layout
      name: 'sidebar',
      redirect: '/home',// Redirige automaticamente al usuario a /home cuando acceden a sidebar
      component: Sidebar,
      //define rutas hijas que se renderizaran dentro del layout
      children: [ 
        {
          path: '/home',//ruta que se cargara dentro del layout sidebar
          name: 'home',//nombre de la ruta
          component: ResumenView//componenete que se mostrara en la ruta
        },
        {
          path: '/inventario',
          name: 'inventario',
          //son funciones de importaciòn dinamica, significa que el componente no se cargara hasta que el usuario acceda a la ruta 
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
//exportamos el router para que pueda ser utilix¡zado en otras partes de la aplicación
export default router
