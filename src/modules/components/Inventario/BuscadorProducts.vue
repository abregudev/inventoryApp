<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="flex flex-wrap -mx-4">
        <!-- Sidebar -->
        <div class="w-full md:w-1/4 px-4">
          <div class="bg-white shadow rounded-lg p-6">
            <h3 class="font-bold text-lg mb-4">Categories</h3>
            <ul class="space-y-2">
              <li v-for="category in categories" :key="category.name">
                <a href="#" class="text-gray-600 hover:text-gray-900">{{ category.name }} ({{ category.count }})</a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Product Grid -->
        <div class="w-full md:w-3/4 px-4">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Shop</h1>
            <div class="flex items-center">
              <label for="sort" class="mr-2">Sort by:</label>
              <select id="sort" v-model="sortBy" class="border rounded px-2 py-1">
                <option value="popularity">Popularity</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="product in products" :key="product.id" class="bg-white shadow rounded-lg overflow-hidden">
              <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover">
              <div class="p-4">
                <h3 class="font-bold text-lg mb-2">{{ product.name }}</h3>
                <p class="text-gray-600">${{ product.price.toFixed(2) }}</p>
                <button @click="addToCart(product)" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const categories = ref([
  { name: 'Electricity', count: 6 },
  { name: 'Fasteners', count: 8 },
  { name: 'Lighting', count: 6 },
  { name: 'Other', count: 9 },
  { name: 'Pipes', count: 9 },
]);

const products = ref([
  { id: 1, name: 'Searchlight Portable', price: 120.00, image: 'http://placehold.it/290x258' },
  { id: 2, name: 'Flooring', price: 20.00, image: 'http://placehold.it/290x195' },
  { id: 3, name: 'Pneumatic Coil Hose', price: 18.00, image: 'http://placehold.it/290x258' },
  { id: 4, name: 'Door Hinge Metal', price: 45.00, image: 'http://placehold.it/290x258' },
  { id: 5, name: 'Universal Plug', price: 70.00, image: 'http://placehold.it/290x258' },
  { id: 6, name: 'Drill Tool Kit', price: 22.00, image: 'http://placehold.it/290x258' },
]);

const sortBy = ref('popularity');

const addToCart = (product) => {
  console.log(`Added ${product.name} to cart`);
  // Implement cart logic here
};
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
