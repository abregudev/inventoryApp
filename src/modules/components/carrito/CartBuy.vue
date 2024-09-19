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
//useCartStore: Importa el store de carrito de compras desde CartStores para acceder al carrito.
import { useCartStore } from '@/modules/stores/CartStores';
//computed, ref: Importa las funciones de Vue para manejar valores reactivos y propiedades computadas
import { computed, onMounted, ref, watch } from 'vue';
//PaymentModal: Importa un componente llamado PaymentModal.vue, que probablemente sea una ventana emergente para el pago.
import PaymentModal from './PaymentModal.vue'; // Asegúrate de que la ruta sea correcta

//cartStore: Creas una instancia del store del carrito, lo que te permite interactuar con los datos del carrito.
const cartStore = useCartStore();
//cartItems: Ahora es una propiedad computada que obtiene los datos directamente del store
const cartItems = computed(() => cartStore.cart);

// Función para aumentar la cantidad de un producto
const increaseQuantity = (index: number) => {
  if (index >= 0 && index < cartItems.value.length) {
    const product = cartItems.value[index];
    cartStore.addToCart(product);
  }
};

// Función para disminuir la cantidad de un producto
const decreaseQuantity = (index: number) => {
  if (index >= 0 && index < cartItems.value.length) {
    const product = cartItems.value[index];
    if (product.quantity > 1) {
      cartStore.decreaseQuantity(product)
    }
  }
};

//subtotal: Calcula el total del carrito antes de impuestos.
const subtotal = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
});

//tax: Calcula el 18% del subtotal como impuesto (IGV en algunos países)
const tax = computed(() => subtotal.value * 0.18);
//total: Suma el subtotal y los impuestos para obtener el total final a pagar
const total = computed(() => subtotal.value + tax.value);

//removeItem: Elimina un producto del carrito usando el store
const removeItem = (index: number) => {
  if (index >= 0 && index < cartItems.value.length) {
    const product = cartItems.value[index];
    cartStore.clearItemCart(product.id);
  }
};

// Lógica para el modal de pago
//isPaymentModalOpen: Una variable reactiva que controla si el modal de pago está abierto o cerrado.
const isPaymentModalOpen = ref(false);
//openPaymentModal: Cambia isPaymentModalOpen a true, lo que abre el modal de pago.
const openPaymentModal = () => {
  isPaymentModalOpen.value = true;
};
//closePaymentModal: Cambia isPaymentModalOpen a false, lo que cierra el modal.
const closePaymentModal = () => {
  isPaymentModalOpen.value = false;
};
//handlePaymentSubmit: Esta función maneja los datos del pago (que se reciben como paymentData).
const handlePaymentSubmit = () => {
  // Aquí puedes manejar los datos del pago
  console.log('Pago procesado con éxito');
  // Implementa la lógica para procesar el pago
  // Por ejemplo, puedes enviar los datos a tu backend
  // y luego limpiar el carrito si el pago es exitoso
  closePaymentModal();
  cartStore.clearCart();
};

//GUARDAR CARRITO EN LOCALSTORAGE
//watch es una función que observa cambios en las variables.
watch(
  cartItems,
  (newCartItems) => {
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  },
  { deep: true }
);

//RECUPERAR CARRITO DE LOCALSTORAGE recupera el carrito y las cantidades cuando la pagina se carga o recarga
//esta funcion se ejecuta cuando el componente termina de cargarse es decir cuando esta lista
onMounted(() => {
  cartStore.loadCartFromLocalStorage();
});
</script>