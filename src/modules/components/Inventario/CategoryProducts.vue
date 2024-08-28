<template>
  <div class=" bg-gray-100">
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

// const products = ref([
//   { id: 1, name: 'Searchlight Portable', price: 120.00, image: 'http://placehold.it/290x258' },
//   { id: 2, name: 'Flooring', price: 20.00, image: 'http://placehold.it/290x195' },
//   { id: 3, name: 'Pneumatic Coil Hose', price: 18.00, image: 'http://placehold.it/290x258' },
//   { id: 4, name: 'Door Hinge Metal', price: 45.00, image: 'http://placehold.it/290x258' },
//   { id: 5, name: 'Universal Plug', price: 70.00, image: 'http://placehold.it/290x258' },
//   { id: 6, name: 'Drill Tool Kit', price: 22.00, image: 'http://placehold.it/290x258' },
// ]);

// const sortBy = ref('popularity');

// const addToCart = (product) => {
//   console.log(`Added ${product.name} to cart`);
//   // Implement cart logic here
// };
</script>






<!-- <template>
  <input
    v-model="input"
    class="ml-12 bg-transparent shadow-none outline-none p-2 border rounded-lg border-black mt-5"
    type="text"
    name=""
    id=""
    placeholder="Inserte code"
  />

  <button @click="searchCode" class="ml-12 mt-4 p-2 bg-blue-500 text-white rounded-lg">
    <div class="w-4 h-4 border-2 border-white rounded-full relative">
      <div class="w-2 h-0.5 bg-white absolute top-3 left-3 transform rotate-45"></div>
    </div>
  </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// Define un ref para capturar el valor del input
const input = ref('');

const searchCode = () => {
  const inputValue: any = {
    inputValue: input.value,
  };
  
  console.log(inputValue.value);

  fetch('http://localhost:8000/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputValue),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      //router.push('/sidebar')
      return response.json();
    })
    .then((data) => {
      console.log('Respuesta del servidor:', data);
      // Manejar la respuesta exitosa
    })
    .catch((error) => {
      console.error('Hubo un error:', error);
      // Manejar el error
    });
};
</script> -->
