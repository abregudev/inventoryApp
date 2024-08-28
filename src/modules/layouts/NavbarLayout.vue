<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-2 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <RouterLink to="/">
          <img
            class="w-44 p-3"
            src="https://i.postimg.cc/ZKJnSw77/inventory-high-resolution-logo-black-transparent.png"
            alt=""
          />
        </RouterLink>
      </div>

      <!-- Search Bar -->
      <div class="hidden md:flex flex-grow max-w-md mx-4 items-center">
       <BuscadorProduct/>

        <nav class="bg-gray-100 ml-4">
          <ul class="flex space-x-4">
            <li v-for="item in menuItems" :key="item.route">
              <RouterLink :to="item.route" class="text-gray-700 hover:text-blue-500">
                {{ item.name }}
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
      <!-- Navigation Icons -->
      <CarritoLayout/>
    </div>

  </header>

  <main class="flex-1 flex-col">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import CarritoLayout from './CarritoLayout.vue';
import BuscadorProduct from '../components/Inventario/BuscadorProduct.vue';

const menuItems = ref([
  { name: 'Insertar Producto', route: '/nuevoproducto' },
  { name: 'Inventario', route: '/inventario' },
  { name: 'Ventas', route: '/ventas' },
  { name: 'Log Out', route: '/logout' },
]);


</script>
