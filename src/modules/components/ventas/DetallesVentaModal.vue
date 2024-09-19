<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
      <div class="flex justify-between items-center p-6 border-b">
        <h2 class="text-2xl font-bold text-gray-800">Detalles de la Venta</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2 text-gray-700">Información del Cliente</h3>
          <p><span class="font-medium">Cliente:</span> {{ sale.cliente }}</p>
          <p><span class="font-medium">DNI:</span> {{ sale.dni }}</p>
          <p><span class="font-medium">Teléfono:</span> {{ sale.telefono }}</p>
          <p><span class="font-medium">RUC:</span> {{ sale.ruc }}</p>
        </div>
        
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2 text-gray-700">Detalles de la Venta</h3>
          <p><span class="font-medium">Fecha:</span> {{ sale.fecha }}</p>
          <p><span class="font-medium">Método de Pago:</span> {{ sale.metodoPago }}</p>
          <p class="text-xl font-bold mt-2">Total: S/ {{ sale.total.toFixed(2) }}</p>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-2 text-gray-700">Productos</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-3 py-2 text-left">Código</th>
                  <th class="px-3 py-2 text-left">Descripción</th>
                  <th class="px-3 py-2 text-right">Cant.</th>
                  <th class="px-3 py-2 text-right">Precio</th>
                  <th class="px-3 py-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in sale.productos" :key="product.codigo" class="border-b">
                  <td class="px-3 py-2">{{ product.codigo }}</td>
                  <td class="px-3 py-2">{{ product.descripcion }}</td>
                  <td class="px-3 py-2 text-right">{{ product.cantidad }}</td>
                  <td class="px-3 py-2 text-right">S/ {{ product.precio.toFixed(2) }}</td>
                  <td class="px-3 py-2 text-right">S/ {{ (product.cantidad * product.precio).toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="p-6 border-t">
        <div class="flex flex-col sm:flex-row justify-between gap-4">
          <button @click="verComprobante" class="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Ver Comprobante
          </button>
          <button @click="descargarComprobante" class="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Descargar Comprobante
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, onMounted } from 'vue';
const baseUrl = import.meta.env.VITE_BASE_URL;

const props = defineProps<{
  isOpen: boolean;
  sale: {
    cliente: string;
    dni: string;
    telefono: string;
    ruc: string;
    fecha: string;
    metodoPago: string;
    total: number;
    productos: Array<{
      codigo: string;
      descripcion: string;
      cantidad: number; 
      precio: number;
    }>;
  };
}>();

const emit = defineEmits(['close', 'verComprobante', 'descargarComprobante']);

const closeModal = () => {
  emit('close');
};

const verComprobante = () => {
  emit('verComprobante');
};

const descargarComprobante = () => {
  emit('descargarComprobante');
};
</script>