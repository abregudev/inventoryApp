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
import { ref, onMounted, watch, computed } from 'vue';
import type IProduct from '@/modules/interfaces/IProducts';
import { useCartStore } from '@/modules/stores/CartStores';

const props = defineProps<{
  searchQuery: string;
  selectedCategory: string;
}>();

const emit = defineEmits(['updateCategories']);

const cartStore = useCartStore();
const products = ref<IProduct[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const baseUrl = import.meta.env.VITE_BASE_URL;

const formatPrice = (price: any): string => {
  const numPrice = Number(price);
  return isNaN(numPrice) ? 'N/A' : `$${numPrice.toFixed(2)}`;
};

const getStockClass = (stock: any): string => {
  const numStock = Number(stock);
  if (isNaN(numStock)) return 'bg-gray-100 text-gray-800';
  if (numStock > 10) return 'bg-green-100 text-green-800';
  if (numStock > 0) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

const getStockLabel = (stock: any): string => {
  const numStock = Number(stock);
  if (isNaN(numStock)) return 'Stock desconocido';
  if (numStock > 10) return 'En stock';
  if (numStock > 0) return 'Pocas unidades';
  return 'Agotado';
};

const isInStock = (stock: any): boolean => {
  const numStock = Number(stock);
  return !isNaN(numStock) && numStock > 0;
};

const fetchProducts = async (): Promise<void> => {
  loading.value = true;
  error.value = null;
  try {
    console.log('Iniciando fetchProducts. URL:', `${baseUrl}/products/list-products/`);
    const response = await fetch(`${baseUrl}/products/list-products/`);
    console.log('Respuesta recibida. Status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Datos recibidos:', data);
    if (Array.isArray(data)) {
      products.value = data;
      console.log('Productos procesados:', products.value);
      updateCategories();
    } else {
      throw new Error('Los datos recibidos no son un array');
    }
  } catch (e) {
    console.error('Error al cargar los productos:', e);
    error.value = e instanceof Error ? e.message : 'Error desconocido';
  } finally {
    loading.value = false;
  }
};

const addToCart = (product: IProduct) => {
  if (isInStock(product.stock)) {
    cartStore.addToCart(product);
  }
};

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = props.searchQuery 
      ? product.description.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
        product.code.toLowerCase().includes(props.searchQuery.toLowerCase())
      : true;
    
    const matchesCategory = props.selectedCategory
      ? product.category === props.selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });
});

const updateCategories = () => {
  const uniqueCategories = [...new Set(products.value.map(product => product.category))];
  emit('updateCategories', uniqueCategories);
};

onMounted(() => {
  console.log('Componente CardProducts montado, iniciando fetchProducts');
  fetchProducts();
});

watch([() => props.searchQuery, () => props.selectedCategory], () => {
  console.log('Búsqueda o categoría actualizada:', props.searchQuery, props.selectedCategory);
});
</script>