<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4">
        <h1 class="text-3xl font-bold text-gray-800">Productos</h1>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="md:flex md:space-x-4 mb-6">
          <!-- Buscador -->
          <div class="md:w-2/3 mb-4 md:mb-0">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar productos..."
                class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              />
              <button class="absolute right-3 top-2 text-gray-400 hover:text-blue-500 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Selector de categorías -->
          <div class="md:w-1/3">
            <div class="relative" ref="categoryDropdown">
              <button 
                @click="toggleCategories" 
                class="w-full flex items-center justify-between bg-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition duration-300"
              >
                <span class="font-semibold text-gray-700">{{ selectedCategory || 'Categorías' }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" :class="{ 'transform rotate-180': showCategories }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="showCategories" class="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button 
                  @click="selectCategory('')"
                  class="w-full px-4 py-2 text-left hover:bg-gray-100 transition duration-300"
                  :class="selectedCategory === '' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'"
                >
                  Todas las categorías
                </button>
                <button 
                  v-for="category in categories" 
                  :key="category"
                  @click="selectCategory(category)"
                  class="w-full px-4 py-2 text-left hover:bg-gray-100 transition duration-300"
                  :class="selectedCategory === category ? 'bg-blue-50 text-blue-700' : 'text-gray-700'"
                >
                  {{ category }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Lista de productos -->
        <CardProducts 
          :searchQuery="searchQuery" 
          :selectedCategory="selectedCategory"
          @update-categories="updateCategories"
        />
      </div>
    </main>

    <!-- Botón del carrito -->
    <RouterLink to="/cart" class="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg z-10 hover:bg-blue-700 transition duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <span 
        v-if="totalQuantity > 0"
        class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
      >
        {{ totalQuantity }}
      </span>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import CardProducts from '../components/Inventario/CardProducts.vue';
import { useCartStore } from '../stores/CartStores';

const cartStore = useCartStore();
const searchQuery = ref('');
const showCategories = ref(false);
const selectedCategory = ref('');
const categories = ref<string[]>([]);
const categoryDropdown = ref(null);

const totalQuantity = computed(() => {
  return cartStore.cart.reduce((sum, item) => sum + item.quantity, 0);
});

const toggleCategories = () => {
  showCategories.value = !showCategories.value;
};

const selectCategory = (category: string) => {
  selectedCategory.value = category;
  showCategories.value = false;
};

const updateCategories = (newCategories: string[]) => {
  categories.value = newCategories;
};

const handleClickOutside = (event: MouseEvent) => {
  if (categoryDropdown.value && !categoryDropdown.value.contains(event.target)) {
    showCategories.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>