<template>
  <section class="min-h-screen py-8">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold  mb-8 ">Inventario</h1>
      
      <div class="mb-6 relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar productos..."
          class="w-full px-4 py-2 border border-gray rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button class="absolute right-3 top-2 text-gray-400 ">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      <div class="mb-6">
        <button @click="toggleCategories" class="flex items-center justify-between w-full bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-50 transition duration-300">
          <span class="font-semibold text-blue-700">Categorías</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" :class="{ 'transform rotate-180': showCategories }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-if="showCategories" class="mt-2 bg-white p-4 rounded-lg shadow-lg">
          <div class="flex flex-wrap gap-2">
            <button 
              @click="selectCategory('')"
              class="px-3 py-1 rounded-full text-sm transition duration-300"
              :class="selectedCategory === '' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-blue-700 hover:bg-gray-300'"
            >
              Todas
            </button>
            <button 
              v-for="category in categories" 
              :key="category"
              @click="selectCategory(category)"
              class="px-3 py-1 rounded-full text-sm transition duration-300"
              :class="selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-blue-700 hover:bg-gray-300'"
            >
              {{ category }}
            </button>
          </div>
        </div>
      </div>

      <CardProducts 
        :searchQuery="searchQuery" 
        :selectedCategory="selectedCategory"
        @update-categories="updateCategories"
      />
    </div>

    <RouterLink to="/cart" class="fixed bottom-10 right-10 bg-blue-600 text-white rounded-full p-3 shadow-lg z-10 hover:bg-blue-700 transition duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <span 
        v-if="totalQuantity > 0"
        class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
        {{ totalQuantity }}
      </span>
    </RouterLink>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CardProducts from '../components/Inventario/CardProducts.vue';
import { useCartStore } from '../stores/CartStores';

const cartStore = useCartStore();
const searchQuery = ref('');
const showCategories = ref(false);
const selectedCategory = ref('');
const categories = ref<string[]>([]);

const totalQuantity = computed(() => {
  return cartStore.cart.reduce((sum, item) => sum + item.quantity, 0);
});

const toggleCategories = () => {
  showCategories.value = !showCategories.value;
};

const selectCategory = (category: string) => {
  selectedCategory.value = category;
};

const updateCategories = (newCategories: string[]) => {
  categories.value = newCategories;
};
</script>