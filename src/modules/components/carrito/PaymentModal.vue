<template>
    <div v-if="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
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
            <button type="button" @click="cerrarModal" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
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
  import { ref, watch } from 'vue';
  
  const props = defineProps<{
    isOpen: boolean
  }>();
  
  const emit = defineEmits(['close', 'submit']);
  
  const formData = ref({
    nombres: '',
    dni: '',
    telefono: '',
    ruc: '',
    metodoPago: 'transferencia',
    comprobante: null as File | null
  });
  
  const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      formData.value.comprobante = target.files[0];
    }
  };
  
  const procesarPago = () => {
    // Aquí iría la lógica para procesar el pago
    console.log('Datos de venta:', formData.value);
    emit('submit', formData.value);
  };
  
  const cerrarModal = () => {
    emit('close');
  };
  
  watch(() => props.isOpen, (newValue) => {
    if (newValue) {
      // Resetear el formulario cuando se abre el modal
      formData.value = {
        nombres: '',
        dni: '',
        telefono: '',
        ruc: '',
        metodoPago: 'transferencia',
        comprobante: null
      };
    }
  });
  </script>