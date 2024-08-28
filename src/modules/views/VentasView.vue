<template>
    <div class=" w-[90%] m-auto mt-24">
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
                <button @click="verDetalles(venta.id)" class="text-indigo-600 hover:text-indigo-900 font-medium">Ver Detalles</button>
              </td>
            </tr>
          </tbody>
        </table>
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
        { id: 1, fecha: '22/08/2024', cliente: 'Wikdke', dni: 'lekdd', ruc: 'ldidd', total: 'S/ 201.00', metodoPago: 'efectivo' },
        { id: 1, fecha: '22/08/2024', cliente: 'Wikdke', dni: 'lekdd', ruc: 'ldidd', total: 'S/ 201.00', metodoPago: 'yape' },
        { id: 1, fecha: '22/08/2024', cliente: 'Wikdke', dni: 'lekdd', ruc: 'ldidd', total: 'S/ 201.00', metodoPago: 'transferencia' },
        { id: 1, fecha: '22/08/2024', cliente: 'Wikdke', dni: 'lekdd', ruc: 'ldidd', total: 'S/ 201.00', metodoPago: 'yape' },
        { id: 1, fecha: '22/08/2024', cliente: 'Wikdke', dni: 'lekdd', ruc: 'ldidd', total: 'S/ 201.00', metodoPago: 'efectivo' },
        { id: 1, fecha: '22/08/2024', cliente: 'Wikdke', dni: 'lekdd', ruc: 'ldidd', total: 'S/ 201.00', metodoPago: 'yape' },
        { id: 1, fecha: '22/08/2024', cliente: 'Wikdke', dni: 'lekdd', ruc: 'ldidd', total: 'S/ 201.00', metodoPago: 'transferencia' },
        { id: 1, fecha: '22/08/2024', cliente: 'Wikdke', dni: 'lekdd', ruc: 'ldidd', total: 'S/ 201.00', metodoPago: 'yape' },
        { id: 1, fecha: '22/08/2024', cliente: 'Wikdke', dni: 'lekdd', ruc: 'ldidd', total: 'S/ 201.00', metodoPago: 'efectivo' },
        { id: 1, fecha: '22/08/2024', cliente: 'Wikdke', dni: 'lekdd', ruc: 'ldidd', total: 'S/ 201.00', metodoPago: 'yape' },
        { id: 1, fecha: '22/08/2024', cliente: 'Wikdke', dni: 'lekdd', ruc: 'ldidd', total: 'S/ 201.00', metodoPago: 'yape' },
        { id: 1, fecha: '22/08/2024', cliente: 'Wikdke', dni: 'lekdd', ruc: 'ldidd', total: 'S/ 201.00', metodoPago: 'transferencia' },
        { id: 1, fecha: '22/08/2024', cliente: 'Wikdke', dni: 'lekdd', ruc: 'ldidd', total: 'S/ 201.00', metodoPago: 'yape' },
        { id: 1, fecha: '22/08/2024', cliente: 'Wikdke', dni: 'lekdd', ruc: 'ldidd', total: 'S/ 201.00', metodoPago: 'efectivo' },
        { id: 2, fecha: '22/08/2024', cliente: 'Sebastian Rodrigo Abregu Aguilera', dni: '70214182', ruc: '213131313', total: 'S/ 90.00', metodoPago: 'efectivo' },
        { id: 3, fecha: '22/08/2024', cliente: 'ruben campo', dni: '123132', ruc: '213213', total: 'S/ 180.00', metodoPago: 'transferencia' },
      ])
  
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
  
      const verDetalles = (id: number) => {
        console.log(`Ver detalles de la venta con ID: ${id}`);
        // Aquí puedes implementar la lógica para mostrar los detalles de la venta
      }
  
      return {
        ventas,
        metodoPagoClase,
        verDetalles
      }
    }
  })
  </script>