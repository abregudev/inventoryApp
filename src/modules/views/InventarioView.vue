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
          @edit-product="openEditProductModal"
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

    <!-- Modal Agregar/Editar Producto -->
    <div v-if="showProductModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900">{{ isEditMode ? 'Editar Producto' : 'Agregar Nuevo Producto' }}</h3>
            <button @click="closeProductModal" class="text-gray-400 hover:text-gray-500">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Fase 1: Buscar o Insertar Código -->
          <div v-if="currentPhase === 1">
            <div class="mb-4">
              <input
                v-model="searchCode"
                type="text"
                placeholder="Ingrese el código del producto"
                @keyup.enter="searchProduct"
                class="w-full p-2 text-lg border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none text-center"
              >
            </div>
            <div class="flex justify-between">
              <button
                @click="searchProduct"
                class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
              >
                Buscar
              </button>
              <button
                @click="insertNewCode"
                class="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors duration-200"
              >
                Insertar Nuevo
              </button>
            </div>
          </div>

          <!-- Fase 2: Formulario de Producto -->
          <form v-if="currentPhase === 2" @submit.prevent="submitProduct" class="mt-2">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Código</label>
              <input v-model="producto.code" type="text" class="w-full p-2 border rounded-md bg-gray-100" disabled>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <input v-model="producto.description" type="text" class="w-full p-2 border rounded-md" :disabled="isEditMode">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Precio</label>
              <input v-model="producto.price" type="number" step="0.01" class="w-full p-2 border rounded-md" :disabled="isEditMode">
            </div>
            <div v-if="isEditMode" class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Stock Actual</label>
              <input v-model="producto.stock" type="number" class="w-full p-2 border rounded-md bg-gray-100" disabled>
            </div>
            <div v-if="isEditMode" class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Modificar Stock</label>
              <div class="flex items-center">
                <button type="button" @click="decrementStock" class="bg-red-500 text-white px-3 py-1 rounded-l-md">-</button>
                <input v-model="stockChange" type="number" class="w-full p-2 border-t border-b text-center">
                <button type="button" @click="incrementStock" class="bg-green-500 text-white px-3 py-1 rounded-r-md">+</button>
              </div>
            </div>
            <div v-if="!isEditMode" class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Stock Inicial</label>
              <input v-model="stockChange" type="number" class="w-full p-2 border rounded-md">
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Número de Comprobante</label>
              <input v-model="receiptNumber" type="text" class="w-full p-2 border rounded-md">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre del responsable</label>
              <input v-model="responsiblePerson" type="text" class="w-full p-2 border rounded-md">
            </div>
            <div class="flex justify-between mt-4">
              <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors duration-200">
                {{ isEditMode ? 'Actualizar' : 'Añadir' }}
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
const currentPhase = ref(1);
const searchCode = ref('');
const isEditMode = ref(false);
const producto = ref({
  category: '',
  description: '',
  stock: 0,
  price: 0,
  code: '',
  image: null as string | null
});
const stockChange = ref(0);
const receiptNumber = ref('');
const responsiblePerson = ref('');
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
  currentPhase.value = 1;
  isEditMode.value = false;
};

const openEditProductModal = (productCode: string) => {
  resetProductForm();
  searchCode.value = productCode;
  showProductModal.value = true;
  currentPhase.value = 1;
  isEditMode.value = true;
  searchProduct();
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
  stockChange.value = 0;
  receiptNumber.value = '';
  responsiblePerson.value = '';
  searchCode.value = '';
  currentPhase.value = 1;
};

const searchProduct = async () => {
  if (!searchCode.value) {
    alert('Por favor, ingrese un código de producto.');
    return;
  }
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/search-code/${searchCode.value}/`);
    if (response.ok) {
      const data = await response.json();
      producto.value = { ...data, code: searchCode.value };
      isEditMode.value = true;
      currentPhase.value = 2;
    } else {
      isEditMode.value = false;
      producto.value = {
        category: '',
        description: '',
        stock: 0,
        price: 0,
        code: searchCode.value,
        image: null
      };
      currentPhase.value = 2;
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un error al buscar el producto. Por favor, intente de nuevo.');
  }
};

const insertNewCode = async () => {
  if (!searchCode.value) {
    alert('Por favor, ingrese un código de producto.');
    return;
  }
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/search-code/${searchCode.value}/`);
    if (response.ok) {
      // Si el producto existe, lo cargamos para edición
      const data = await response.json();
      producto.value = { ...data, code: searchCode.value };
      isEditMode.value = true;
      currentPhase.value = 2;
      alert('El producto ya existe. Se ha cargado para edición.');
    } else {
      // Si el producto no existe, preparamos para crear uno nuevo
      isEditMode.value = false;
      producto.value = {
        category: '',
        description: '',
        stock: 0,
        price: 0,
        code: searchCode.value,
        image: null
      };
      currentPhase.value = 2;
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un error al verificar el producto. Por favor, intente de nuevo.');
  }
};

const incrementStock = () => {
  stockChange.value++;
};

const decrementStock = () => {
  if (stockChange.value > 0) {
    stockChange.value--;
  }
};

const submitProduct = async () => {
  if (!producto.value.code) {
    alert('Por favor, ingrese un código de producto.');
    return;
  }

  const productData = isEditMode.value
    ? {
        stock_change: Number(stockChange.value),
        receipt_number: receiptNumber.value,
        responsible_person: responsiblePerson.value
      }
    : {
        ...producto.value,
        stock: Number(stockChange.value),
        price: Number(producto.value.price),
        receipt_number: receiptNumber.value,
        responsible_person: responsiblePerson.value
      };

  console.log("Data to be sent to the backend:", productData);

  try {
    const url = isEditMode.value
      ? `${import.meta.env.VITE_BASE_URL}/products/update-stock/${producto.value.code}/`
      : `${import.meta.env.VITE_BASE_URL}/products/add-product/`;
    const method = isEditMode.value ? 'PUT' : 'POST';

    // Simulación de envío al backend
    console.log(`Enviando ${method} request a ${url}`);
    console.log('Datos enviados:', JSON.stringify(productData));

    // Aquí iría la llamada real al backend
    // const response = await fetch(url, {
    //   method: method,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(productData)
    // });
    // if (!response.ok) throw new Error('Failed to process product');
    // const data = await response.json();
    // console.log('Product processed:', data);

    // Simulación de respuesta exitosa
    console.log('Simulación: Producto procesado exitosamente');

    alert(isEditMode.value ? 'Stock actualizado con éxito' : 'Producto añadido con éxito');
    closeProductModal();
    
    // Forzar la actualización de la lista de productos
    productListKey.value += 1;
  } catch (error) {
    console.error('Error processing product:', error);
    alert('Ocurrió un error al procesar el producto. Por favor, intente de nuevo.');
  
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>