<template>
    <div v-if="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div class="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Detalles de la Venta</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
  
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p><span class="font-semibold">Cliente:</span> {{ sale.cliente }}</p>
            <p><span class="font-semibold">DNI:</span> {{ sale.dni }}</p>
            <p><span class="font-semibold">Teléfono:</span> {{ sale.telefono }}</p>
            <p><span class="font-semibold">RUC:</span> {{ sale.ruc }}</p>
          </div>
          <div>
            <p><span class="font-semibold">Fecha:</span> {{ sale.fecha }}</p>
            <p><span class="font-semibold">Método de Pago:</span> {{ sale.metodoPago }}</p>
            <p><span class="font-semibold">Total:</span> S/ {{ sale.total.toFixed(2) }}</p>
          </div>
        </div>
  
        <h3 class="text-xl font-semibold mb-4">Productos</h3>
        <table class="w-full mb-6">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 text-left">Código</th>
              <th class="px-4 py-2 text-left">Descripción</th>
              <th class="px-4 py-2 text-right">Cantidad</th>
              <th class="px-4 py-2 text-right">Precio</th>
              <th class="px-4 py-2 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in sale.productos" :key="product.codigo" class="border-b">
              <td class="px-4 py-2">{{ product.codigo }}</td>
              <td class="px-4 py-2">{{ product.descripcion }}</td>
              <td class="px-4 py-2 text-right">{{ product.cantidad }}</td>
              <td class="px-4 py-2 text-right">S/ {{ product.precio.toFixed(2) }}</td>
              <td class="px-4 py-2 text-right">S/ {{ (product.cantidad * product.precio).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
  
        <div class="flex justify-between">
          <button @click="verComprobante" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Ver Comprobante de Pago
          </button>
          <button @click="descargarComprobante" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Descargar Comprobante
          </button>
        </div>
  
        <button @click="closeModal" class="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Cerrar
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
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