<template>
  <div class="bg-white shadow-lg rounded-lg p-4">
    <h3 class="font-bold text-lg mb-3 text-gray-800">Categorías</h3>
    <ul class="space-y-2">
      <li v-for="category in categories" :key="category.name">
        <a href="#" class="flex items-center justify-between p-2 rounded-md text-sm hover:bg-gray-100 transition duration-200">
          <span class="text-gray-700">{{ category.name }}</span>
          <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
            {{ category.count }}
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Category {
  name: string;
  count: number;
}

const categories = ref<Category[]>([]);

const fetchCategories = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/categories/`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    categories.value = data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

onMounted(fetchCategories);
</script>