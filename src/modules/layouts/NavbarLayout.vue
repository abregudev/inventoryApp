<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-2">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <RouterLink to="/">
            <img
              class="h-12 w-auto"
              src="https://i.postimg.cc/ZKJnSw77/inventory-high-resolution-logo-black-transparent.png"
              alt="Inventory"
            />
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <RouterLink class="text-gray-700 hover:text-gray-900 font-medium" to="/home">Dashboard</RouterLink>
          <RouterLink class="text-gray-700 hover:text-gray-900 font-medium" to="/inventario">Productos</RouterLink>
          <RouterLink class="text-gray-700 hover:text-gray-900 font-medium" to="/nuevoproducto">Agregar</RouterLink>
          <RouterLink class="text-gray-700 hover:text-gray-900 font-medium" to="/ventas">Ventas</RouterLink>
        </nav>

        <!-- Search and Cart (Desktop) -->
        <div class="hidden md:flex items-center space-x-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div class="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <RouterLink to="/cart" class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              1
            </span>
          </RouterLink>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMenu"
            class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
          >
            <svg
              v-if="!isMenuOpen"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              v-else
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-if="isMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <RouterLink class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" to="/home">Dashboard</RouterLink>
        <RouterLink class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" to="/inventario">Productos</RouterLink>
        <RouterLink class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" to="/nuevoproducto">Agregar</RouterLink>
        <RouterLink class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" to="/ventas">Ventas</RouterLink>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="px-4 flex items-center space-x-4">
          <div class="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar productos..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div class="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <RouterLink to="/cart" class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              1
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>

  <main class="flex-1 flex-col">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
//Lo utilizamos para crear variables reactivas.
import { ref } from 'vue';
//RouterLink: Componente que se utiliza para crear enlaces de navegación entre diferentes rutas de la aplicación.
//RouterView: Lugar donde se renderizarán los componentes asociados con la ruta actual.
import { RouterLink, RouterView } from 'vue-router';
//isMenuOpen: Es una variable reactiva que indica si el menú está abierto o cerrado.
const isMenuOpen = ref(false);
//toggleMenu: Es una función que cambia el estado del menú
const toggleMenu = () => {
  //Esta línea invierte el valor actual, permitiendo abrir o cerrar el menú cada vez que se llama a la función.
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
