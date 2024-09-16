<template>
  <div class="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto mt-24">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Carrito de Compras</h2>
    
    <div v-if="cartItems.length === 0" class="text-center py-8">
      <p class="text-gray-500">Tu carrito está vacío</p>
    </div>
    
    <div v-else>
      <div
        v-for="(item, index) in cartItems"
        :key="item.id"
        class="flex items-center justify-between border-b border-gray-200 py-4"
      >
        <div class="flex items-center">
          <img :src="item.thumbnail" alt="" class="w-16 h-16 object-cover rounded-md mr-4" />
          <div>
            <h3 class="font-semibold text-gray-800">{{ item.title }}</h3>
            <p class="text-sm text-gray-600">{{ item.price }}c/u</p>
          </div>
        </div>
        <div class="flex items-center">
          <button
            @click="decreaseQuantity(index)"
            class="bg-gray-200 text-gray-800 px-2 py-1 rounded-l-md hover:bg-gray-300 transition duration-200"
          >
            -
          </button>
        
          <span class="bg-gray-100 px-4 py-1">{{ quantities[index] }}</span>
          <button
            @click="increaseQuantity(index)"
            class="bg-gray-200 text-gray-800 px-2 py-1 rounded-r-md hover:bg-gray-300 transition duration-200"
          >
            +
          </button>
          <button @click="removeItem(index)" class="ml-4 text-red-500 hover:text-red-700 transition duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      
      <div class="mt-6">
        <div class="flex justify-between mb-2">
          <span class="font-semibold text-gray-600">Subtotal:</span>
          <span class="text-gray-800">S/{{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span class="font-semibold text-gray-600">IGV (18%):</span>
          <span class="text-gray-800">S/{{ tax.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-xl font-bold">
          <span class="text-gray-800">Total:</span>
          <span class="text-green-600">S/{{ total.toFixed(2) }}</span>
        </div>
      </div>
      
      <button
        @click="openPaymentModal"
        class="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Proceder al pago
      </button>
    </div>
  </div>

  <!-- Modal de Pago -->
  <PaymentModal 
    :isOpen="isPaymentModalOpen"
    @close="closePaymentModal"
    @submit="handlePaymentSubmit"
  />
</template>

<script setup lang="ts">
import { useCartStore } from '@/modules/stores/CartStores';
import { computed, ref } from 'vue';
import PaymentModal from './PaymentModal.vue'; // Asegúrate de que la ruta sea correcta

const cartStore = useCartStore();
//console.log(cartStore.cart, 'kasihjgfailwd');
let cartItems = cartStore.cart;

// Variable reactiva para almacenar la cantidad de cada producto
const quantities = ref<number[]>(cartItems.map(item => item.quantity));

const increaseQuantity = (index: number) => {
  quantities.value[index] += 1;
};

const decreaseQuantity = (index: number) => {
  if (quantities.value[index] > 1) {
    quantities.value[index] -= 1;
  }
};

const subtotal = computed(() => {
  return cartItems.reduce((acc, item, index) => acc + item.price * quantities.value[index], 0);
});

const tax = computed(() => subtotal.value * 0.18);

const total = computed(() => subtotal.value + tax.value);

const removeItem = (index: number) => {
  cartItems.splice(index, 1); // Eliminar el item del array de productos
  quantities.value.splice(index, 1); // Eliminar la cantidad asociada
};

// Lógica para el modal de pago
const isPaymentModalOpen = ref(false);

const openPaymentModal = () => {
  isPaymentModalOpen.value = true;
};

const closePaymentModal = () => {
  isPaymentModalOpen.value = false;
};

const handlePaymentSubmit = (paymentData: any) => {
  // Aquí puedes manejar los datos del pago
  console.log('Datos de pago recibidos:', paymentData);
  // Implementa la lógica para procesar el pago
  // Por ejemplo, puedes enviar los datos a tu backend
  // y luego limpiar el carrito si el pago es exitoso
  closePaymentModal();
};
</script>