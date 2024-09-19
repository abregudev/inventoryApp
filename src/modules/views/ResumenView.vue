<template>
  <div class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
    <div class="mb-8 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800">Dashboard ERP</h1>
      <div class="flex space-x-4">
        <select v-model="selectedLocal" class="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out">
          <option value="Tienda">Tienda</option>
          <option value="Almacén">Almacén</option>
        </select>
        <select v-model="selectedPeriod" class="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out">
          <option value="semana">Semana</option>
          <option value="mes">Mes</option>
          <option value="año">Año</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="(sale, index) in sales" :key="index" class="bg-white rounded-lg shadow-sm p-6 transition duration-300 ease-in-out hover:shadow-md">
        <h2 class="text-sm font-semibold text-gray-600 mb-1">{{ sale.title }}</h2>
        <p class="text-2xl font-bold" :class="sale.color">{{ sale.amount }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <div class="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 transition duration-300 ease-in-out hover:shadow-md">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Tendencia de ventas</h2>
        <Bar :data="chartData" :options="chartOptions" class="h-64" />
      </div>
      <div class="bg-white rounded-lg shadow-sm p-6 transition duration-300 ease-in-out hover:shadow-md">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Productos más vendidos</h2>
        <ul class="space-y-2">
          <li v-for="(product, index) in topProducts" :key="product" class="flex items-center">
            <span class="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm mr-3">{{ index + 1 }}</span>
            {{ product }}
          </li>
        </ul>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="bg-white rounded-lg shadow-sm p-6 transition duration-300 ease-in-out hover:shadow-md">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Productos con poco stock</h2>
        <ul class="space-y-2">
          <li v-for="product in lowStockProducts" :key="product.name" class="flex justify-between items-center">
            <span>{{ product.name }}</span>
            <span class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">{{ product.stock }} unidades</span>
          </li>
        </ul>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-6 transition duration-300 ease-in-out hover:shadow-md">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Clientes frecuentes</h2>
        <div class="grid grid-cols-5 gap-4">
          <div v-for="i in 5" :key="i" class="h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-md flex items-center justify-center text-white font-semibold">
            Cliente {{ i }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default defineComponent({
  name: 'DashboardERP',
  components: { Bar },
  setup() {
    const selectedLocal = ref('Tienda');
    const selectedPeriod = ref('semana');

    const sales = ref([
      { title: 'Venta Diaria', amount: '$ 3,000', color: 'text-blue-600' },
      { title: 'Venta semanal', amount: '$ 12,000', color: 'text-green-600' },
      { title: 'Venta mensual', amount: '$ 30,000', color: 'text-yellow-600' },
      { title: 'Venta Anual', amount: '$ 150,000', color: 'text-red-600' },
    ]);

    const chartData = computed(() => ({
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      datasets: [
        {
          label: 'Ventas diarias',
          data: [1000, 2500, 4200, 3500, 6000, 7200],
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
          borderRadius: 5,
        },
      ],
    }));

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          padding: 10,
          cornerRadius: 5,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value: number) => `$${value.toLocaleString()}`,
          },
        },
      },
    };

    const topProducts = ref(['Producto Premium', 'Oferta Especial', 'Producto Estándar']);
    const lowStockProducts = ref([
      { name: 'Producto A', stock: 10 },
      { name: 'Producto B', stock: 5 },
      { name: 'Producto C', stock: 2 },
    ]);

    return {
      selectedLocal,
      selectedPeriod,
      sales,
      chartData,
      chartOptions,
      topProducts,
      lowStockProducts,
    };
  },
});
</script>