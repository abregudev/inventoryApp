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
        <form @submit.prevent="handleSearch" class="relative flex-grow">
          <input
            type="text"
            placeholder="Search..."
            class="w-full pl-3 pr-10 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button type="submit" class="absolute right-0 top-0 mt-2 mr-3">
            <svg
              class="h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>

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
      <nav class="flex items-center">
        <RouterLink to="/cart" class="text-gray-600 hover:text-blue-500 mx-2 relative">
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          <span
            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center"
            >3</span
          >
        </RouterLink>
      </nav>
    </div>

    <!-- Main Menu -->
  </header>

  <main class="flex-1 flex-col">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const menuItems = ref([
  { name: 'Insertar Producto', route: '/nuevoproducto' },
  { name: 'Inventario', route: '/inventario' },
  { name: 'Ventas', route: '/ventas' },
  { name: 'Log Out', route: '/logout' },
]);

const handleSearch = () => {
  // Implement search functionality
  console.log('Search submitted');
};
</script>
