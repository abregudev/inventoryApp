<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center"
  >
    <div class="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
      <!-- Añadimos un encabezado con botón de cierre -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Datos de Venta</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <form @submit.prevent="enviarFormulario">
        <div class="space-y-4">
          <div>
            <label for="nombres" class="block text-sm font-medium text-gray-700">Nombres</label>
            <input
              type="text"
              id="nombres"
              v-model="customerData.fullname"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label for="dni" class="block text-sm font-medium text-gray-700">DNI</label>
            <input
              type="text"
              id="dni"
              v-model="customerData.dni"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              v-model="customerData.phone"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label for="ruc" class="block text-sm font-medium text-gray-700">RUC</label>
            <input
              type="text"
              id="ruc"
              v-model="customerData.ruc"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label for="metodoPago" class="block text-sm font-medium text-gray-700"
              >Método de Pago</label
            >
            <select
              id="metodoPago"
              v-model="paymentData.metodoPago"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="transferencia">Transferencia</option>
              <option value="yape">Yape</option>
              <option value="efectivo">Efectivo</option>
            </select>
          </div>

          <div v-if="paymentData.metodoPago !== 'efectivo'">
            <label for="comprobante" class="block text-sm font-medium text-gray-700"
              >Subir Comprobante</label
            >
            <input
              type="file"
              id="comprobante"
              class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              @change="handleFileUpload"
              />
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            Enviar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/modules/stores/CartStores';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const baseUrl = import.meta.env.VITE_BASE_URL;

const cartStore = useCartStore()
cartStore.loadCartFromLocalStorage();

// Usa storeToRefs para obtener una referencia reactiva al carrito
const { cart } = storeToRefs(cartStore);

const props = defineProps<{
  isOpen: boolean;
}>();

// Definimos los eventos que este componente puede emitir
const emit = defineEmits(['close', 'submit']);

const customerData = ref({
  fullname: '',
  dni: '',
  phone: '',
  ruc: '',
});

const paymentData = ref({
  metodoPago: 'transferencia',
  comprobante: null as File | null,
})

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    paymentData.value.comprobante = target.files[0];
  }
};

// Nueva función para cerrar el modal
const closeModal = () => {
  emit('close');
};

const enviarFormulario = async () => {
  console.log('Datos del formulario:', customerData.value);

  const salesData = {
    customer:{
      ...customerData.value,
    },
    products: cart.value.map(item => ({
      id: item.id,
      image: item.image,
      code: item.code,
      description: item.description,
      price: item.price,
      category: item.category,
      stock: item.stock,
      quantity: item.quantity
    })),
    payment:{
      ...paymentData.value,
    }
  }

  console.log(salesData)

  try{
    const response = await fetch(`${baseUrl}/sales/add-sales/`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(salesData)
    });
    
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    console.log(response)
    
    // Emitir evento de envío exitoso
    emit('submit');
    
    // Cerrar el modal
    closeModal();
    
    // Limpiar el carrito
    cartStore.clearCart();
    
  }catch(error){
    console.error('Hubo un error:', error);
  }
};
</script>