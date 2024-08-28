<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="product in limitedProducts" :key="product.id"
           class="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
        <img :src="product.thumbnail" :alt="product.title" 
             class="w-full h-64 object-cover object-center" />
        <div class="p-6">
          <h3 class="font-bold text-xl mb-2 text-gray-800">{{ product.title }}</h3>
          <div class="flex justify-between items-center mb-4">
            <p class="text-green-600 font-semibold text-lg">
              ${{ product.price.toFixed(2) }}
            </p>
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Stock: {{ product.stock }}
            </span>
          </div>
          <button class="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

interface Product {
  id: number;
  title: string;
  price: number;
  stock: number;
  thumbnail: string;
}

const products = ref<Product[]>([]);
const limitedProducts = computed(() => products.value.slice(0, 6));

const fetchProducts = async (): Promise<void> => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    products.value = data.products;
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
};

onMounted(() => {
  fetchProducts();
});
</script>