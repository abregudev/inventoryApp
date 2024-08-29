<template>
  <div class="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto mt-24">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Carrito de Compras</h2>
    
    <div v-if="cartItems.length === 0" class="text-center py-8">
      <p class="text-gray-500">Tu carrito está vacío</p>
    </div>
    
    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="flex items-center justify-between border-b border-gray-200 py-4">
        <div class="flex items-center">
          <img :src="item.thumbnail" :alt="item.title" class="w-16 h-16 object-cover rounded-md mr-4">
          <div>
            <h3 class="font-semibold text-gray-800">{{ item.title }}</h3>
            <p class="text-sm text-gray-600">${{ item.price.toFixed(2) }} c/u</p>
          </div>
        </div>
        <div class="flex items-center">
          <button @click="decreaseQuantity(item)" class="bg-gray-200 text-gray-800 px-2 py-1 rounded-l-md hover:bg-gray-300 transition duration-200">
            -
          </button>
          <span class="bg-gray-100 px-4 py-1">{{ item.quantity }}</span>
          <button @click="increaseQuantity(item)" class="bg-gray-200 text-gray-800 px-2 py-1 rounded-r-md hover:bg-gray-300 transition duration-200">
            +
          </button>
          <button @click="removeItem(item)" class="ml-4 text-red-500 hover:text-red-700 transition duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div class="mt-6">
        <div class="flex justify-between mb-2">
          <span class="font-semibold text-gray-600">Subtotal:</span>
          <span class="text-gray-800">${{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span class="font-semibold text-gray-600">IGV (18%):</span>
          <span class="text-gray-800">${{ tax.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-xl font-bold">
          <span class="text-gray-800">Total:</span>
          <span class="text-green-600">${{ total.toFixed(2) }}</span>
        </div>
      </div>
      
      <button @click="openPaymentModal" class="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
        Proceder al pago
      </button>
    </div>
  </div>

  <!-- Modal de Pago -->
  <div v-if="isPaymentModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
    <div class="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Datos de Venta</h2>
      
      <form @submit.prevent="procesarPago">
        <div class="space-y-4">
          <div>
            <label for="nombres" class="block text-sm font-medium text-gray-700">Nombres</label>
            <input type="text" id="nombres" v-model="formData.nombres" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          </div>
          
          <div>
            <label for="dni" class="block text-sm font-medium text-gray-700">DNI</label>
            <input type="text" id="dni" v-model="formData.dni" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          </div>
          
          <div>
            <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
            <input type="tel" id="telefono" v-model="formData.telefono" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          </div>
          
          <div>
            <label for="ruc" class="block text-sm font-medium text-gray-700">RUC</label>
            <input type="text" id="ruc" v-model="formData.ruc" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          </div>
          
          <div>
            <label for="metodoPago" class="block text-sm font-medium text-gray-700">Método de Pago</label>
            <select id="metodoPago" v-model="formData.metodoPago" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <option value="transferencia">Transferencia</option>
              <option value="yape">Yape</option>
              <option value="efectivo">Efectivo</option>
            </select>
          </div>
          
          <div v-if="formData.metodoPago !== 'efectivo'">
            <label for="comprobante" class="block text-sm font-medium text-gray-700">Subir Comprobante</label>
            <input type="file" id="comprobante" @change="handleFileUpload" class="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100
            ">
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button type="button" @click="closePaymentModal" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            Ingresar Venta
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

const cartItems = ref<CartItem[]>([
  { id: 1, title: "Essence Mascara Lash Princess", price: 9.99, quantity: 2, thumbnail: "https://example.com/mascara.jpg" },
  { id: 2, title: "Eyeshadow Palette with Mirror", price: 19.99, quantity: 1, thumbnail: "https://example.com/eyeshadow.jpg" },
]);

const subtotal = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
});

const tax = computed(() => subtotal.value * 0.18);

const total = computed(() => subtotal.value + tax.value);

const increaseQuantity = (item: CartItem) => {
  item.quantity++;
};

const decreaseQuantity = (item: CartItem) => {
  if (item.quantity > 1) {
    item.quantity--;
  }
};

const removeItem = (itemToRemove: CartItem) => {
  cartItems.value = cartItems.value.filter(item => item.id !== itemToRemove.id);
};

// Modal de pago
const isPaymentModalOpen = ref(false);

const formData = ref({
  nombres: '',
  dni: '',
  telefono: '',
  ruc: '',
  metodoPago: 'transferencia',
  comprobante: null as File | null
});

const openPaymentModal = () => {
  isPaymentModalOpen.value = true;
};

const closePaymentModal = () => {
  isPaymentModalOpen.value = false;
};

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    formData.value.comprobante = target.files[0];
  }
};

const procesarPago = () => {
  // Aquí iría la lógica para procesar el pago
  console.log('Datos de venta:', formData.value);
  console.log('Productos en el carrito:', cartItems.value);
  console.log('Total a pagar:', total.value);
  // Implementar lógica de pago aquí
  closePaymentModal();
  // Limpiar el carrito después de procesar el pago
  cartItems.value = [];
};
</script>