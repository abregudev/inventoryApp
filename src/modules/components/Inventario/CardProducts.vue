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
//importas la interface IProduct que define la estructura de un producto 
import type IProduct from '@/modules/interfaces/IProducts';
//useCartStore: Importa el store de carrito de compras (usando Pinia) desde CartStores
import { useCartStore } from '@/modules/stores/CartStores';
//computed, onMounted, ref: Importas las funciones reactivas de Vue
import { computed, onMounted, ref } from 'vue'; 
//cartStore: Aquí creas una instancia del store de carrito de compras, lo que te permite acceder a las funciones y datos definidos en ese store
const cartStore = useCartStore();
// Declaras una variable reactiva que serà un array de products
const products = ref<IProduct[]>([]);//ref([]): Inicializa esta referencia como un array vacío.
// limitedProducts: Esta propiedad computada toma los primeros 6 productos del array products usando slice(0, 6)
const limitedProducts = computed(() => products.value.slice(0, 6));//computed(() => ...): Se asegura de que cuando el valor de products cambie
//fetchProducts: Esta función asíncrona hace una petición a la API
const fetchProducts = async (): Promise<void> => {
  //try  intenta ejecutar el codigo
  try {
    //await fetch Envía una solicitud a la API.
    const response = await fetch('https://dummyjson.com/products');
    //await response.json(): Convierte la respuesta en un objeto JSON para poder trabajar con los datos recibidos.
    const data = await response.json();
    //products.value = data.products: Una vez recibidos los datos, asigna el array de productos a la variable reactiva products
    products.value = data.products; // Accede a la propiedad "products"
    //catch: Captura errores en caso de que ocurra un problema en try
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