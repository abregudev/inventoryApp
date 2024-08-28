<template>
  <div class="bg-gray-100 p-8 h h-[92vh]">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Dashboard ERP</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- Selección de Sucursal -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Seleccionar Sucursal</h2>
        <div class="relative">
          <select v-model="sucursalSeleccionada" class="w-full p-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option v-for="sucursal in sucursales" :key="sucursal.id" :value="sucursal.id">
              {{ sucursal.nombre }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Ventas Totales -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Ventas Totales</h2>
        <p class="text-4xl font-bold text-green-600">S/{{ ventasTotales.toLocaleString() }}</p>
      </div>

      <!-- Productos con Poco Stock -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Productos con Poco Stock</h2>
        <ul class="space-y-3">
          <li v-for="producto in productosPocoStock" :key="producto.id" class="flex justify-between items-center bg-red-50 p-3 rounded-md">
            <span class="text-gray-800 font-medium">{{ producto.nombre }}</span>
            <span class="text-red-600 font-semibold">Stock: {{ producto.stock }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Listado de Sucursales -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
      <h2 class="text-2xl font-semibold p-6 bg-gray-50 border-b border-gray-200">Sucursales</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ventas</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="sucursal in sucursales" :key="sucursal.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">{{ sucursal.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ sucursal.nombre }}</td>
              <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">S/{{ sucursal.ventas.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Top 10 Productos Más Vendidos -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <h2 class="text-2xl font-semibold p-6 bg-gray-50 border-b border-gray-200">Top 10 Productos Más Vendidos</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posición</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidades Vendidas</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(producto, index) in topProductos" :key="producto.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{{ index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ producto.nombre }}</td>
              <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{{ producto.unidadesVendidas.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'

interface Sucursal {
  id: number;
  nombre: string;
  ventas: number;
}

interface Producto {
  id: number;
  nombre: string;
  stock: number;
}

interface ProductoVendido {
  id: number;
  nombre: string;
  unidadesVendidas: number;
}

export default defineComponent({
  name: 'DashboardERP',
  setup() {
    const sucursales = ref<Sucursal[]>([
      { id: 1, nombre: 'Sucursal A', ventas: 18000 },
      { id: 2, nombre: 'Sucursal B', ventas: 12000 },
    ]);

    const sucursalSeleccionada = ref(sucursales.value[0].id);

    const productosPocoStock = ref<Producto[]>([
      { id: 1, nombre: 'Producto X', stock: 5 },
      { id: 2, nombre: 'Producto Y', stock: 3 },
      { id: 3, nombre: 'Producto Z', stock: 2 },
    ]);

    const topProductosPorSucursal = ref<{ [key: number]: ProductoVendido[] }>({
      1: [
        { id: 1, nombre: 'Producto A', unidadesVendidas: 100 },
        { id: 2, nombre: 'Producto B', unidadesVendidas: 90 },
        // ... más productos para Sucursal A
      ],
      2: [
        { id: 3, nombre: 'Producto C', unidadesVendidas: 80 },
        { id: 4, nombre: 'Producto D', unidadesVendidas: 70 },
        // ... más productos para Sucursal B
      ],
    });

    const ventasTotales = computed(() => {
      const sucursal = sucursales.value.find(s => s.id === sucursalSeleccionada.value);
      return sucursal ? sucursal.ventas : 0;
    });

    const topProductos = computed(() => {
      return topProductosPorSucursal.value[sucursalSeleccionada.value] || [];
    });

    watch(sucursalSeleccionada, (newValue) => {
      console.log(`Sucursal seleccionada cambiada a: ${newValue}`);
      // Aquí puedes agregar lógica adicional cuando cambie la sucursal seleccionada
    });

    return {
      sucursales,
      sucursalSeleccionada,
      productosPocoStock,
      ventasTotales,
      topProductos,
    }
  }
})
</script>