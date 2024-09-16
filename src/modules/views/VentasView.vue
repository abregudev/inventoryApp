<template>
  <div class="w-[90%] m-auto mt-24">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Registro de Ventas</h1>
    
    <div class="mb-6 flex space-x-4">
      <div class="relative">
        <input type="date" class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400" />
        <svg class="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      </div>
      <div class="flex-grow relative">
        <input type="text" placeholder="Buscar en todos los campos" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400" />
        <svg class="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
    </div>
    
    <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
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

    <!-- Modal de Detalles de Venta -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div class="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Detalles de la Venta</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div v-if="selectedVenta" class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p><span class="font-semibold">Cliente:</span> {{ selectedVenta.cliente }}</p>
            <p><span class="font-semibold">DNI:</span> {{ selectedVenta.dni }}</p>
            <p><span class="font-semibold">RUC:</span> {{ selectedVenta.ruc }}</p>
          </div>
          <div>
            <p><span class="font-semibold">Fecha:</span> {{ selectedVenta.fecha }}</p>
            <p><span class="font-semibold">Método de Pago:</span> {{ selectedVenta.metodoPago }}</p>
            <p><span class="font-semibold">Total:</span> {{ selectedVenta.total }}</p>
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
            <!-- Aquí deberías iterar sobre los productos de la venta seleccionada -->
            <tr class="border-b">
              <td class="px-4 py-2">PROD001</td>
              <td class="px-4 py-2">Producto de ejemplo</td>
              <td class="px-4 py-2 text-right">1</td>
              <td class="px-4 py-2 text-right">S/ 100.00</td>
              <td class="px-4 py-2 text-right">S/ 100.00</td>
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface Venta {
  id: number;
  fecha: string;
  cliente: string;
  dni: string;
  ruc: string;
  total: string;
  metodoPago: string;
}

export default defineComponent({
  name: 'RegistroVentas',
  setup() {
    const ventas = ref<Venta[]>([
      { id: 1, fecha: '22/08/2024', cliente: 'Wikdke', dni: 'lekdd', ruc: 'ldidd', total: 'S/ 201.00', metodoPago: 'efectivo' },
      { id: 2, fecha: '22/08/2024', cliente: 'Sebastian Rodrigo Abregu Aguilera', dni: '70214182', ruc: '213131313', total: 'S/ 90.00', metodoPago: 'efectivo' },
      { id: 3, fecha: '22/08/2024', cliente: 'ruben campo', dni: '123132', ruc: '213213', total: 'S/ 180.00', metodoPago: 'transferencia' },
      { id: 3, fecha: '22/08/2024', cliente: 'ruben campo', dni: '123132', ruc: '213213', total: 'S/ 180.00', metodoPago: 'yape' },
      { id: 3, fecha: '22/08/2024', cliente: 'ruben campo', dni: '123132', ruc: '213213', total: 'S/ 180.00', metodoPago: 'yape' },
      
      // ... más ventas ...
    ])

    const isModalOpen = ref(false)
    const selectedVenta = ref<Venta | null>(null)

    const metodoPagoClase = (metodo: string): string => {
      switch (metodo) {
        case 'yape':
          return 'bg-purple-100 text-purple-800';
        case 'efectivo':
          return 'bg-green-100 text-green-800';
        case 'transferencia':
          return 'bg-blue-100 text-blue-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    }

    const verDetalles = (venta: Venta) => {
      selectedVenta.value = venta;
      isModalOpen.value = true;
    }

    const closeModal = () => {
      isModalOpen.value = false;
      selectedVenta.value = null;
    }

    const verComprobante = () => {
      console.log('Ver comprobante');
      // Implementar lógica para ver el comprobante
    }

    const descargarComprobante = () => {
      console.log('Descargar comprobante');
      // Implementar lógica para descargar el comprobante
    }

    return {
      ventas,
      metodoPagoClase,
      verDetalles,
      isModalOpen,
      selectedVenta,
      closeModal,
      verComprobante,
      descargarComprobante
    }
  }
})
</script>