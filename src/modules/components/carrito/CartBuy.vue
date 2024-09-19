<template>
  <div class="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto flex flex-col" style="height: 80vh;">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Carrito de Compras</h2>

    <div v-if="cartItems.length === 0" class="flex-grow flex items-center justify-center">
      <p class="text-gray-500">Tu carrito está vacío</p>
    </div>

    <div v-else class="flex flex-col h-[65vh]">
      <!-- Lista de productos desplazable -->
      <div class="flex-grow overflow-y-auto mb-6">
        <div
          v-for="(item, index) in cartItems"
          :key="item.id"
          class="flex items-center justify-between border-b border-gray-200 py-4"
        >
          <div class="flex items-center">
            <img :src="item.image" alt="" class="w-16 h-16 object-cover rounded-md mr-4" />
            <div>
              <h3 class="font-semibold text-gray-800">{{ item.code }}</h3>
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
            
            <span class="bg-gray-100 px-4 py-1">{{ item.quantity }}</span>

            <button
              @click="increaseQuantity(index)"
              class="bg-gray-200 text-gray-800 px-2 py-1 rounded-r-md hover:bg-gray-300 transition duration-200"
            >
              +
            </button>
            <button
              @click="removeItem(index)"
              class="ml-4 text-red-500 hover:text-red-700 transition duration-200"
            >
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
      </div>

      <!-- Resumen y botón de pago (fijos en la parte inferior) -->
      <div class="mt-auto">
        <div class="mb-4">
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
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Proceder al pago
        </button>
      </div>
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
// El script se mantiene igual que en tu código original
import { useCartStore } from '@/modules/stores/CartStores';
import { computed, onMounted, ref, watch } from 'vue';
import PaymentModal from './PaymentModal.vue';

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cart);

const increaseQuantity = (index: number) => {
  if (index >= 0 && index < cartItems.value.length) {
    const product = cartItems.value[index];
    cartStore.addToCart(product);
  }
};

const decreaseQuantity = (index: number) => {
  if (index >= 0 && index < cartItems.value.length) {
    const product = cartItems.value[index];
    if (product.quantity > 1) {
      cartStore.decreaseQuantity(product)
    }
  }
};

const subtotal = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
});

const tax = computed(() => subtotal.value * 0.18);
const total = computed(() => subtotal.value + tax.value);

const removeItem = (index: number) => {
  if (index >= 0 && index < cartItems.value.length) {
    const product = cartItems.value[index];
    cartStore.clearItemCart(product.id);
  }
};

const isPaymentModalOpen = ref(false);
const openPaymentModal = () => {
  isPaymentModalOpen.value = true;
};
const closePaymentModal = () => {
  isPaymentModalOpen.value = false;
};
const handlePaymentSubmit = () => {
  console.log('Pago procesado con éxito');
  closePaymentModal();
  cartStore.clearCart();
};

watch(
  cartItems,
  (newCartItems) => {
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  },
  { deep: true }
);

onMounted(() => {
  cartStore.loadCartFromLocalStorage();
});
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  display: none;
}
</style>