<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4">
        <h1 class="text-3xl font-bold text-gray-800">Productos</h1>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="md:flex md:space-x-4 mb-6">
          <!-- Buscador -->
          <div class="md:w-1/2 mb-4 md:mb-0">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar productos..."
                class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              />
              <button class="absolute right-3 top-2 text-gray-400 hover:text-blue-500 transition duration-300">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>

          <!-- Selector de categorías -->
          <div class="md:w-1/4">
            <div class="relative" ref="categoryDropdown">
              <button 
                @click="toggleCategories" 
                class="w-full flex items-center justify-between bg-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition duration-300"
              >
                <span class="font-semibold text-gray-700">{{ selectedCategory || 'Categorías' }}</span>
                <i class="fas fa-chevron-down text-gray-500" :class="{ 'transform rotate-180': showCategories }"></i>
              </button>
              <div v-if="showCategories" class="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button 
                  @click="selectCategory('')"
                  class="w-full px-4 py-2 text-left hover:bg-gray-100 transition duration-300"
                  :class="selectedCategory === '' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'"
                >
                  Todas las categorías
                </button>
                <button 
                  v-for="category in categories" 
                  :key="category"
                  @click="selectCategory(category)"
                  class="w-full px-4 py-2 text-left hover:bg-gray-100 transition duration-300"
                  :class="selectedCategory === category ? 'bg-blue-50 text-blue-700' : 'text-gray-700'"
                >
                  {{ category }}
                </button>
              </div>
            </div>
          </div>

          <!-- Botón Agregar Producto -->
          <div class="md:w-1/4">
            <button 
              @click="openAddProductModal"
              class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition duration-300"
            >
              <i class="fas fa-plus mr-2"></i>Agregar Producto
            </button>
          </div>
        </div>

        <!-- Lista de productos -->
        <CardProducts 
          :searchQuery="searchQuery" 
          :selectedCategory="selectedCategory"
          @update-categories="updateCategories"
          :key="productListKey"
        />
      </div>
    </main>

    <!-- Botón del carrito -->
    <RouterLink to="/cart" class="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg z-10 hover:bg-blue-700 transition duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <span 
        v-if="totalQuantity > 0"
        class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
      >
        {{ totalQuantity }}
      </span>
    </RouterLink>

    <!-- Modal Agregar Producto -->
    <div v-if="showProductModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Agregar Nuevo Producto</h3>
          <form @submit.prevent="submitProduct" class="mt-2 text-left">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <input v-model="producto.category" type="text" class="w-full p-2 border rounded-md">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <input v-model="producto.description" type="text" class="w-full p-2 border rounded-md">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Stock Inicial</label>
              <input v-model="producto.stock" type="number" class="w-full p-2 border rounded-md">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Precio</label>
              <input v-model="producto.price" type="number" step="0.01" class="w-full p-2 border rounded-md">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Código</label>
              <input v-model="producto.code" type="text" class="w-full p-2 border rounded-md">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Imagen del Producto</label>
              <div
                @click="triggerFileInput"
                class="border-2 border-dashed border-gray-300 rounded-lg p-4 h-32 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              >
                <img v-if="imagePreview" :src="imagePreview" alt="Preview" class="max-h-full max-w-full object-contain" />
                <i v-else class="fas fa-plus text-4xl text-gray-400"></i>
              </div>
              <input
                ref="fileInput"
                type="file"
                @change="handleImageUpload"
                accept="image/*"
                class="hidden"
              >
            </div>
            <div class="flex justify-between mt-4">
              <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors duration-200">
                Añadir
              </button>
              <button type="button" @click="closeProductModal" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400 transition-colors duration-200">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import CardProducts from '../components/Inventario/CardProducts.vue';
import { useCartStore } from '../stores/CartStores';

const cartStore = useCartStore();
const searchQuery = ref('');
const showCategories = ref(false);
const selectedCategory = ref('');
const categories = ref<string[]>([]);
const categoryDropdown = ref(null);

const showProductModal = ref(false);
const producto = ref({
  category: '',
  description: '',
  stock: 0,
  price: 0,
  code: '',
  image: null as string | null
});
const imagePreview = ref('');
const fileInput = ref<HTMLInputElement | null>(null);

// Nuevo: Clave para forzar la actualización del componente CardProducts
const productListKey = ref(0);

const totalQuantity = computed(() => {
  return cartStore.cart.reduce((sum, item) => sum + item.quantity, 0);
});

const toggleCategories = () => {
  showCategories.value = !showCategories.value;
};

const selectCategory = (category: string) => {
  selectedCategory.value = category;
  showCategories.value = false;
};

const updateCategories = (newCategories: string[]) => {
  categories.value = newCategories;
};

const handleClickOutside = (event: MouseEvent) => {
  if (categoryDropdown.value && !categoryDropdown.value.contains(event.target)) {
    showCategories.value = false;
  }
};

const openAddProductModal = () => {
  resetProductForm();
  showProductModal.value = true;
};

const closeProductModal = () => {
  showProductModal.value = false;
  resetProductForm();
};

const resetProductForm = () => {
  producto.value = {
    category: '',
    description: '',
    stock: 0,
    price: 0,
    code: '',
    image: null
  };
  imagePreview.value = '';
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        imagePreview.value = result;
        producto.value.image = result;
      }
    };
    reader.readAsDataURL(file);
  }
};

const submitProduct = async () => {
  if (!producto.value.code) {
    alert('Por favor, ingrese un código de producto.');
    return;
  }

  const productData = {
    ...producto.value,
    stock: Number(producto.value.stock),
    price: Number(producto.value.price)
  };

  console.log("Data to be sent to the backend:", productData);

  try {
    // Aquí deberías hacer la llamada a tu API para agregar el producto
    // Por ejemplo:
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/add-product/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Failed to add product');
    const data = await response.json();
    console.log('Product added:', data);

    alert('Producto añadido con éxito');
    closeProductModal();
    
    // Forzar la actualización de la lista de productos
    productListKey.value += 1;
  } catch (error) {
    console.error('Error adding product:', error);
    alert('Ocurrió un error al agregar el producto. Por favor, intente de nuevo.');
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>