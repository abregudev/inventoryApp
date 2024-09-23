<template>
  <div class="container mx-auto px-4 py-8 relative">
    <!-- Botón flotante de edición (ahora a la izquierda) -->
    <button
      @click="toggleEditMode"
      class="fixed bottom-8 left-8 bg-blue-600 text-white rounded-full p-4 shadow-lg z-20 hover:bg-blue-700 transition duration-300"
    >
      <PencilIcon v-if="!editMode" class="h-6 w-6" />
      <XMarkIcon v-else class="h-6 w-6" />
    </button>

    <div v-if="loading">Cargando productos...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="filteredProducts.length === 0">No se encontraron productos.</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl relative"
      >
        <div class="relative">
          <img :src="product.image" :alt="product.code" class="w-full h-48 object-cover" />
          <!-- Botón de edición -->
          <button 
            v-if="editMode"
            @click="openEditModal(product)" 
            class="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            <PencilIcon class="h-5 w-5 text-blue-500" />
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
              v-if="!editMode"
              @click="addToCart(product)"
              :disabled="!isInStock(product.stock)"
              class="flex items-center justify-center bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCartIcon class="h-4 w-4 mr-1" />
              {{ isInStock(product.stock) ? 'Agregar' : 'Agotado' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de edición (sin cambios) -->
    <div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Editar Producto</h3>
          <form @submit.prevent="submitEdit" class="mt-2 text-left">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <input v-model="editingProduct.description" type="text" class="w-full p-2 border rounded-md">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Precio</label>
              <input v-model="editingProduct.price" type="number" step="0.01" class="w-full p-2 border rounded-md">
            </div>
            <div class="flex justify-between mt-4">
              <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors duration-200">
                Actualizar
              </button>
              <button type="button" @click="deleteProduct" class="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors duration-200">
                Eliminar
              </button>
              <button type="button" @click="closeEditModal" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400 transition-colors duration-200">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// El script permanece sin cambios
import { ref, onMounted, watch, computed } from 'vue';
import type IProduct from '@/modules/interfaces/IProduct';
import { useCartStore } from '@/modules/stores/CartStores';
import { HeartIcon, PencilIcon, ShoppingCartIcon, XMarkIcon } from '@heroicons/vue/24/outline';

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

const showEditModal = ref(false);
const editingProduct = ref<IProduct | null>(null);
const editMode = ref(false);

const formatPrice = (price: any): string => {
  const numPrice = Number(price);
  return isNaN(numPrice) ? 'N/A' : `${numPrice.toFixed(2)}`;
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

const toggleEditMode = () => {
  editMode.value = !editMode.value;
};

const openEditModal = (product: IProduct) => {
  editingProduct.value = { ...product };
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editingProduct.value = null;
};

const submitEdit = async () => {
  if (!editingProduct.value) return;

  const updatedProduct = {
    ...editingProduct.value,
    price: Number(editingProduct.value.price)
  };

  console.log("Datos a enviar al backend para actualización:", updatedProduct);

  try {
    const response = await fetch(`${baseUrl}/products/update-product/${editingProduct.value.code}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct)
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el producto');
    }

    const updatedData = await response.json();
    console.log('Producto actualizado:', updatedData);

    // Actualizar el producto en la lista local
    const index = products.value.findIndex(p => p.code === updatedData.code);
    if (index !== -1) {
      products.value[index] = updatedData;
    }

    closeEditModal();
    alert('Producto actualizado con éxito');
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    alert('Ocurrió un error al actualizar el producto. Por favor, intente de nuevo.');
  }
};

const deleteProduct = async () => {
  if (!editingProduct.value) return;

  if (!confirm('¿Está seguro de que desea eliminar este producto?')) return;

  try {
    const response = await fetch(`${baseUrl}/products/delete-product/${editingProduct.value.code}/`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el producto');
    }

    console.log('Producto eliminado:', editingProduct.value.code);

    // Eliminar el producto de la lista local
    products.value = products.value.filter(p => p.code !== editingProduct.value?.code);

    closeEditModal();
    alert('Producto eliminado con éxito');
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    alert('Ocurrió un error al eliminar el producto. Por favor, intente de nuevo.');
  }
};

onMounted(() => {
  console.log('Componente CardProducts montado, iniciando fetchProducts');
  fetchProducts();
});

watch([() => props.searchQuery, () => props.selectedCategory], () => {
  console.log('Búsqueda o categoría actualizada:', props.searchQuery, props.selectedCategory);
});
</script>