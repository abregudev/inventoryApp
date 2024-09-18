<template>
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Registro de Ventas</h1>
    
    <div class="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
      <div class="relative w-full sm:w-auto">
        <input type="date" v-model="selectedDate" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400" />
        <svg class="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      </div>
      <div class="relative flex-grow">
        <input type="text" v-model="searchTerm" placeholder="Buscar por cliente, DNI o RUC" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400" />
        <svg class="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
    </div>
    
    <!-- Vista de escritorio -->
    <div class="hidden md:block overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
      <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
        <thead>
          <tr class="text-left">
            <th class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Fecha</th>
            <th class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Cliente</th>
            <th class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">DNI</th>
            <th class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">RUC</th>
            <th class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Total</th>
            <th class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Método de Pago</th>
            <th class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="venta in ventas" :key="venta.id" class="hover:bg-gray-50">
            <td class="border-b border-gray-200 px-6 py-4">{{ venta.fecha }}</td>
            <td class="border-b border-gray-200 px-6 py-4">{{ venta.cliente }}</td>
            <td class="border-b border-gray-200 px-6 py-4">{{ venta.dni }}</td>
            <td class="border-b border-gray-200 px-6 py-4">{{ venta.ruc }}</td>
            <td class="border-b border-gray-200 px-6 py-4 font-semibold">{{ venta.total }}</td>
            <td class="border-b border-gray-200 px-6 py-4">
              <span :class="metodoPagoClase(venta.metodoPago)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ venta.metodoPago }}
              </span>
            </td>
            <td class="border-b border-gray-200 px-6 py-4">
              <button @click="verDetalles(venta)" class="text-indigo-600 hover:text-indigo-900 font-medium">Ver Detalles</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Vista móvil -->
    <div class="md:hidden space-y-4">
      <div v-for="venta in ventas" :key="venta.id" class="bg-white shadow rounded-lg p-4">
        <div class="flex justify-between items-center mb-2">
          <span class="font-semibold">{{ venta.cliente }}</span>
          <span :class="metodoPagoClase(venta.metodoPago)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
            {{ venta.metodoPago }}
          </span>
        </div>
        <div class="text-sm text-gray-600 mb-2">{{ venta.fecha }}</div>
        <div class="flex justify-between items-center">
          <span class="font-bold">{{ venta.total }}</span>
          <button @click="verDetalles(venta)" class="text-indigo-600 hover:text-indigo-900 font-medium text-sm">Ver Detalles</button>
        </div>
      </div>
    </div>

    <!-- Modal de Detalles de Venta Actualizado -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Detalles de la Venta</h2>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div v-if="selectedVenta" class="space-y-4">
            <p><span class="font-bold">Cliente:</span> {{ selectedVenta.cliente }}</p>
            <p><span class="font-bold">DNI:</span> {{ selectedVenta.dni }}</p>
            <p><span class="font-bold">RUC:</span> {{ selectedVenta.ruc }}</p>
            <p><span class="font-bold">Fecha:</span> {{ selectedVenta.fecha }}</p>
            <p><span class="font-bold">Método de Pago:</span> {{ selectedVenta.metodoPago }}</p>
            <p><span class="font-bold">Total:</span> {{ selectedVenta.total }}</p>
          </div>

          <div class="mt-6">
            <h3 class="text-xl font-bold mb-4">Productos</h3>
            <div class="bg-gray-100 rounded-lg overflow-hidden">
              <table class="w-full text-sm">
                <thead class="bg-gray-200">
                  <tr>
                    <th class="px-4 py-2 text-left">Código</th>
                    <th class="px-4 py-2 text-left">Descripción</th>
                    <th class="px-4 py-2 text-right">Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Aquí deberías iterar sobre los productos de la venta seleccionada -->
                  <tr class="border-b border-gray-200">
                    <td class="px-4 py-2">PROD001</td>
                    <td class="px-4 py-2">Producto de ejemplo</td>
                    <td class="px-4 py-2 text-right">1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="mt-6 space-y-4">
            <button @click="verComprobante" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition duration-300">
              Ver Comprobante de Pago
            </button>
            <button @click="descargarComprobante" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition duration-300">
              Descargar Comprobante
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { defineComponent, ref, computed, onMounted } from 'vue'
const baseUrl = import.meta.env.VITE_BASE_URL;


interface Venta {
  id: number;
  fecha: string;
  cliente: string;
  dni: string;
  ruc: string;
  total: string;
  metodoPago: string;
}


const listSales = async()=>{
  fetch(`${baseUrl}/sales/list-sales/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },

  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    console.log("**************************")
    console.log(response.json());

  })
}

onMounted(()=>{
  listSales();
})






</script>