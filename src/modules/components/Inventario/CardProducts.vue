<template>
  <div class="flex justify-center py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="shadow rounded-lg overflow-hidden"
      >
        <img :src="product.image" alt="producto" class="h-48 object-cover" />
        <div class="p-4">
          <h3 class="font-bold text-lg mb-2">{{ product.code }}</h3>
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
//importas la interface IProduct que define la estructura de un producto 
import type IProduct from '@/modules/interfaces/IProducts';
//useCartStore: Importa el store de carrito de compras (usando Pinia) desde CartStores
import { useCartStore } from '@/modules/stores/CartStores';
//computed, onMounted, ref: Importas las funciones reactivas de Vue
import { onMounted, ref } from 'vue'; 
const baseUrl = import.meta.env.VITE_BASE_URL;



const cartStore = useCartStore();
// Variable reactiva para almacenar los productos
const products = ref<IProduct[]>([]);
// Computed para limitar a 2 productos
// const limitedProducts = computed(() => products.value.slice(0, 6));

const fetchProducts = async (): Promise<void> => {
  //try  intenta ejecutar el codigo
  try {

    const response = await fetch(`${baseUrl}/products/list-products/`);
    const data = await response.json();
    console.log(data)
    //console.log(data);
    products.value = data; // Accede a la propiedad "products"
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
};
//onMounted: Este hook de Vue ejecuta la función fetchProducts cuando el componente ha sido montado en el DOM. 
onMounted(() => {
  //Así te aseguras de que los productos se carguen automáticamente al abrir la página.
  fetchProducts();
});

//addToCart: Esta función recibe un producto como parámetro y lo agrega al carrito usando la función addToCart del cartStore.
const addToCart = (product: IProduct) => {
  //Llama a la función addToCart del store, lo que actualiza el estado del carrito de compras y almacena el producto seleccionado.
  cartStore.addToCart(product);
  // console.log(`${product.title} ha sido agregado al carrito.`);
  // console.log('Productos en el carrito: ', cartStore.cart);
};

</script>