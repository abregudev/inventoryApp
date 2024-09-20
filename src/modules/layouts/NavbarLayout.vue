<template>
  <!-- Barra de navegación superior para escritorio -->
  <header class="bg-white shadow-md fixed top-0 left-0 right-0 z-50 hidden md:block">
    <div class="container mx-auto px-4 py-2">
      <div class="flex items-center justify-between">
        <RouterLink to="/home" class="flex-shrink-0">
          <img class="h-10 w-auto" src="https://i.postimg.cc/sx1BhQgM/inventory-high-resolution-logo-black-transparent.png" alt="Inventory">
        </RouterLink>
        <nav class="flex space-x-8">
          <RouterLink class="flex items-center text-gray-700 hover:text-gray-900 font-medium" to="/home">
            <FontAwesomeIcon icon="tachometer-alt" class="mr-2" /> Dashboard
          </RouterLink>
          <RouterLink class="flex items-center text-gray-700 hover:text-gray-900 font-medium" to="/inventario">
            <FontAwesomeIcon icon="box" class="mr-2" /> Productos
          </RouterLink>
          <RouterLink class="flex items-center text-gray-700 hover:text-gray-900 font-medium" to="/nuevoproducto">
            <FontAwesomeIcon icon="plus-circle" class="mr-2" /> Agregar
          </RouterLink>
          <RouterLink class="flex items-center text-gray-700 hover:text-gray-900 font-medium" to="/ventas">
            <FontAwesomeIcon icon="shopping-cart" class="mr-2" /> Ventas
          </RouterLink>
          <RouterLink class="flex items-center text-gray-700 hover:text-gray-900 font-medium" to="/customers">
            <FontAwesomeIcon icon="users" class="mr-2" /> Clientes
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>

  <!-- Barra lateral para móviles -->
  <div class="md:hidden fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
    <nav :class="{'h-auto': isExpanded, 'h-16': !isExpanded}" class="bg-white rounded-full shadow-lg py-4 px-2 flex flex-col items-center space-y-6 transition-all duration-300 overflow-hidden">
      <button @click="toggleMenu" class="text-blue-600 hover:text-blue-300">
        <FontAwesomeIcon :icon="isExpanded ? 'chevron-up' : 'chevron-down'" />
      </button>
      <RouterLink class="flex items-center text-gray-700 hover:text-gray-900 font-medium" to="/home">
        <FontAwesomeIcon icon="tachometer-alt" />
      </RouterLink>
      <RouterLink class="flex items-center text-gray-700 hover:text-gray-900 font-medium" to="/inventario">
        <FontAwesomeIcon icon="box" />
      </RouterLink>
      <RouterLink class="flex items-center text-gray-700 hover:text-gray-900 font-medium" to="/nuevoproducto">
        <FontAwesomeIcon icon="plus-circle" />
      </RouterLink>
      <RouterLink class="flex items-center text-gray-700 hover:text-gray-900 font-medium" to="/ventas">
        <FontAwesomeIcon icon="shopping-cart" />
      </RouterLink>
      <RouterLink class="flex items-center text-gray-700 hover:text-gray-900 font-medium" to="/customers">
        <FontAwesomeIcon icon="users" />
      </RouterLink>
    </nav>
  </div>

  <main class="flex-1 flex-col pt-10 md:pt-12">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTachometerAlt, faBox, faPlusCircle, faShoppingCart, faUsers, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

// Agregar los iconos a la biblioteca
library.add(faTachometerAlt, faBox, faPlusCircle, faShoppingCart, faUsers, faChevronUp, faChevronDown);

const isExpanded = ref(false);

const toggleMenu = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<style scoped>
nav {
  transition: height 0.3s ease;
}
</style>