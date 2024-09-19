<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading">Cargando productos...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="filteredProducts.length === 0">No se encontraron productos.</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      >
        <div class="relative">
          <img :src="product.image" :alt="product.code" class="w-full h-48 object-cover" />
          <button class="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <div class="p-4">
          <h3 class="font-bold text-lg mb-2 text-gray-800 truncate">{{ product.description }}</h3>
          <p class="text-sm text-gray-600 mb-2">Código: {{ product.code }}</p>
          <div class="flex justify-between items-center mb-4">
            <span class="text-xl font-bold text-blue-600">{{ formatPrice(product.price) }}</span>
            <span :class="['px-2 py-1 rounded-full text-xs font-bold', getStockClass(product.stock)]">
              {{ getStockLabel(product.stock) }}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">Stock: {{ product.stock }}</span>
            <button
              @click="addToCart(product)"
              :disabled="!isInStock(product.stock)"
              class="flex items-center justify-center bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {{ isInStock(product.stock) ? 'Agregar' : 'Agotado' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref, onMounted, watch, computed } from 'vue'; //ref crea variables reactivas, onMounted se ejecuta despues que el componente se monta, watch permite reaacionar a cambios reactivos y computed crea propiedades computadas
import type IProduct from '@/modules/interfaces/IProducts'; //Importa un tipo llamado IProduct de una interfaz esto se utiliza para definir la estructura de un objeto
import { useCartStore } from '@/modules/stores/CartStores'; //Importa una funciòn que es un store de Pinia utilizado para manejar el estado del carrrito 

const props = defineProps<{ //Define las props del componente usando defineProps
  searchQuery: string; //especifica q el componente espera dos props searchQuery una cadena para buscar productos
  selectedCategory: string; //y selectedCategory una cadena para filtrar productos por categoria
}>();
//Define un emisosr de eventos para el componente permitiendo emitir un evento llamado updateCategories para notificar a los componentes padres sobre cambios en las categorias
const emit = defineEmits(['updateCategories']); 

const cartStore = useCartStore(); //inicializa el store del carrito permitiendo el acceso a metodos y estado relacionados con el carrito
const products = ref<IProduct[]>([]); //Crea una referencia reactiva llamada products inicializada como un array vacio esto contendrà una lista de producutos obtenidos del API
const loading = ref(true); //loanding es un booleano que indica si los datos se estan obteniendo actualmente
const error = ref<string | null>(null); //Una cadena que contendrà cualquier mensaje de error encontrado durante la obtenciòn de datos
//Recupera la URL base para las solicitudes API desde las variables de entorno definidas 
const baseUrl = import.meta.env.VITE_BASE_URL;

//Esta es una funciòn utilitaria que formatea un valor de precio como cadena con dos decimales
const formatPrice = (price: any): string => {
  const numPrice = Number(price); //Convierte el valor price a un numero
  return isNaN(numPrice) ? 'N/A' : `${numPrice.toFixed(2)}`; //Si numPrice es NaN devuelve 'N/A' si es un numero vàlido lo convierte en un string con dos decimales
};
//Esta funcion toma un valor de stock y devuelve una clase de css que cambia el color de fondo y el texto dependiendo de cuanto hay
const getStockClass = (stock: any): string => {
  const numStock = Number(stock); //convierte el stock a un nùmero
  if (isNaN(numStock)) return 'bg-gray-100 text-gray-800'; //si no es un nª devuelve clases para mostrar gris esto significa que no sabe cuanto hay en el stock
  if (numStock > 10) return 'bg-green-100 text-green-800'; //Si el stock es mayor a 10 devuelve clases de pintan de verde (hay suficiente stock)
  if (numStock > 0) return 'bg-yellow-100 text-yellow-800'; //Si hay entre 1 a 10 unidades devuelve clases amarillas (pocas unidades)
  return 'bg-red-100 text-red-800'; //Si no hay stock devuelve clases rojas (agotado)
};
//Esta funciòn devuelve un texto que describe el stock
const getStockLabel = (stock: any): string => {
  const numStock = Number(stock); 
  if (isNaN(numStock)) return 'Stock desconocido';//Si el stock devuelve un numero devuelve stock desconocido
  if (numStock > 10) return 'En stock';//Si el stock es mayor a 10 devuelve en stock
  if (numStock > 0) return 'Pocas unidades';//Si hay entre 1 y 10 unidades, devuelve 'Pocas unidades'.
  return 'Agotado';//Si no hay stock, devuelve 'Agotado'.
};
//ESta funciòn verifica si hay stock disponible
const isInStock = (stock: any): boolean => {
  const numStock = Number(stock);//Convierte el stock a un nùmero
  return !isNaN(numStock) && numStock > 0;//Devuelve true si el stock es un numero valido y mayor a cero, sino devuelve false
};
//ES una funciòn que da una promesa qu adentro hace un fetch
const fetchProducts = async (): Promise<void> => {
  loading.value = true;//Marca que los productos estàn cargando, lo que podrìa mostrar un ìcono de carga
  error.value = null; //Reinicia cualquier error previo que pudiera haber ocurrido
  try {
    console.log('Iniciando fetchProducts. URL:', `${baseUrl}/products/list-products/`); 
    const response = await fetch(`${baseUrl}/products/list-products/`);//Envia una solicitud a la URL que obtiene una lista de productos//await espera que la solicitud termine antes de continuar
    console.log('Respuesta recibida. Status:', response.status);//Muestras mensajes para depurar
    if (!response.ok) { //si la respuesta no es correcta lanza un error
      throw new Error(`HTTP error! status: ${response.status}`); 
    }
    const data = await response.json(); //Convierte la respuesta a formato JSON 
    console.log('Datos recibidos:', data);
    if (Array.isArray(data)) { //Verifica que la respuesta sea un array, si lo es guarda los datos en 
      products.value = data; //products.value y 
      console.log('Productos procesados:', products.value);
      updateCategories(); //Llama a esta funciòn
    } else { //Si la respuesta no es un array 
      throw new Error('Los datos recibidos no son un array');//Imprime este error
    }
  } catch (e) {//Si hay un error en cualquier parte del bloque try se captura aquì y se muestra un mensaje de error
    console.error('Error al cargar los productos:', e);
    error.value = e instanceof Error ? e.message : 'Error desconocido';
  } finally { //Este bloque siempre se ejecuta si hubo un error aquì se usa para marcar 
    loading.value = false;//que la carga se ha terminado
  }
};
//Esra funcion añade un producto al carrito
const addToCart = (product: IProduct) => {
  if (isInStock(product.stock)) {//Solo añade el producto si hay stock disponible
    cartStore.addToCart(product);//Llama a la funciòn que añade el producto al carrito
  }
};
//Aqui tenemos una cajita llamada filteredProducts siempre tendremos los productos que queremos mostrar
const filteredProducts = computed(() => {//En computed calcula automaticamente cuando las variables que utiliza y cambian
  return products.value.filter(product => {//Filtra los productos basandose en la buscaqueda y la categorìa seleccionada uno por uno
    const matchesSearch = props.searchQuery //matchesSearch verifica si la aplicaciòn o el codigo del producto coincide con lo que el usuario esta buscando
      ? product.description.toLowerCase().includes(props.searchQuery.toLowerCase()) || //
        product.code.toLowerCase().includes(props.searchQuery.toLowerCase())
      : true;
    //Verifica si la categoria del producto coincide con la categoria seleccionada por el usuario
    const matchesCategory = props.selectedCategory
      ? product.category === props.selectedCategory
      : true;
    return matchesSearch && matchesCategory;//Si el producto coincide con la busqueda y la categoria lo guardamos en nuestra cajita
  });
});
//Esta parte crea una lista de todas las categorias diferentes que tenemos en nuestros productos y se lo dice a otra parte de nuestro programa
const updateCategories = () => {
  const uniqueCategories = [...new Set(products.value.map(product => product.category))];
  emit('updateCategories', uniqueCategories);
};
//Cuando nuestro programa se inicia escribimos un mensaje y luego vamos a buscar todos los productos
onMounted(() => {
  console.log('Componente CardProducts montado, iniciando fetchProducts');
  fetchProducts();
});
//Estamos atentos si el usuario cambia su bùsquedas o elige una categoria diferente cuando eso pasa escribimos un mensaje para que lo sepamos
watch([() => props.searchQuery, () => props.selectedCategory], () => {
  console.log('Búsqueda o categoría actualizada:', props.searchQuery, props.selectedCategory);
});
</script>