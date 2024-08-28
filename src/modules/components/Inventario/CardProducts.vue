<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mx-10 mt-5">
    <div 
    class="max-w-sm mx-10 mt-5 bg-white shadow-lg rounded-lg overflow-hidden"
    v-for="product in limitedProducts" 
    :key="product.id" 
    >
      <img class="w-full h-48 object-cover" :src="product.thumbnail" alt="Producto">
  
      <div class="p-4" >
        <h2 class="text-xl font-semibold text-gray-800">{{ product.title }}</h2>
        <p class="text-gray-600 mt-2">Precio: {{ product.price }}</p>
        <p class="text-gray-600 mt-2">Stock: {{ product.stock }}</p>
      </div>
    </div>
  </div>
</template>
    
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
interface Product {
  id: number,
  title: string,
  price: number,
  stock: number,
  thumbnail: string,
}
// Variable reactiva para almacenar los productos
const products = ref<Product[]>([]);
// Computed para limitar a 2 productos
const limitedProducts = computed(() => products.value.slice(0, 6));

const fetchProducts = async (): Promise<void> => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    products.value = data.products; // Accede a la propiedad "products"
  } catch (error) {
    console.log('Error al cargar los productos:', error);
  }
};
onMounted( () => {
  fetchProducts();
});
</script>