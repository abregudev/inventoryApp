<template>
  <div class="bg-white shadow-lg rounded-lg p-6">
    <h3 class="font-bold text-xl mb-4 text-gray-800">Categorías</h3>
    <ul class="space-y-3">
      <li v-for="category in categories" :key="category.name" 
          class="transition duration-300 ease-in-out transform hover:scale-105">
        <a href="#" class="flex items-center justify-between p-3 rounded-md bg-gray-50 hover:bg-gray-100">
          <span class="text-gray-700 font-medium">{{ category.name }}</span>
          <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {{ category.count }}
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const categories = ref([
  { name: 'DTF', count: 6 },
  { name: 'DTG', count: 8 },
  { name: 'UV-DTF', count: 6 },
  { name: 'LASER', count: 9 },
  { name: 'PLANCHADO', count: 9 },
]);
</script>