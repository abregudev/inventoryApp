<template>
  <div class="flex justify-center py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="product in limitedProducts"
        :key="product.id"
        class="shadow rounded-lg overflow-hidden"
      >
        <img :src="product.thumbnail" alt="producto" class="h-48 object-cover" />
        <div class="p-4">
          <h3 class="font-bold text-lg mb-2">{{ product.title }}</h3>
          <p class="text-gray-600">Precio: ${{ product.price }}</p>
          <p class="text-gray-600 mt-2">Stock: {{ product.stock }}</p>
          <button
            @click="addToCart(product)"
            class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart 
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type IProduct from '@/modules/interfaces/IProducts';
import { useCartStore } from '@/modules/stores/CartStores';
import { computed, onMounted, ref } from 'vue'; 



const cartStore = useCartStore();
// Variable reactiva para almacenar los productos
const products = ref<IProduct[]>([]);
// Computed para limitar a 2 productos
const limitedProducts = computed(() => products.value.slice(0, 6));
const fetchProducts = async (): Promise<void> => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    //console.log(data);
    products.value = data.products; // Accede a la propiedad "products"
  } catch (error) {
    console.log('Error al cargar los productos:', error);
  }
};

onMounted(() => {
  fetchProducts();
});

const addToCart = (product: IProduct) => {
  cartStore.addToCart(product);
  // console.log(`${product.title} ha sido agregado al carrito.`);
  // console.log('Productos en el carrito: ', cartStore.cart);
};


</script>
