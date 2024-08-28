<template>
  <div class="">
    <main class="container mx-auto px-4 py-8">
      <div class="flex flex-wrap -mx-4">
        <div class="w-full px-4">
          <div class="bg-white shadow rounded-lg p-6 w-30">
            <h3 class="font-bold text-lg mb-4">Categories</h3>
            <ul class="space-y-2">
              <li v-for="category in categories" :key="category.name">
                <a href="#" class="text-gray-600 hover:text-gray-900">{{ category.name }} ({{ category.count }})</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
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