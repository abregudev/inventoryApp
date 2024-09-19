<template>
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
    <h1 class="text-4xl font-bold mb-8 text-gray-800">Gestión de Clientes</h1>
    
    <div class="mb-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
      <div class="relative flex-grow">
        <input 
          v-model="searchTerm" 
          type="text" 
          placeholder="Buscar por nombre, DNI o RUC" 
          class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-150 ease-in-out"
        />
        <svg class="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <button 
        @click="openAddCustomerModal" 
        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center shadow-lg"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Agregar Cliente
      </button>
    </div>
    
    <!-- Vista de escritorio -->
    <div class="hidden md:block overflow-hidden bg-white rounded-lg shadow-xl">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DNI</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RUC</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="customer in filteredCustomers" :key="customer.id" class="hover:bg-gray-50 transition duration-150 ease-in-out">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <img class="h-10 w-10 rounded-full" :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(customer.fullname)}&background=random`" alt="" />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ customer.fullname }}</div>
                  <div class="text-sm text-gray-500">{{ customer.email }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ customer.dni }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ customer.ruc }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ customer.phone }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="viewCustomerDetails(customer)" class="text-blue-600 hover:text-blue-900 mr-3">Ver Detalles</button>
              <button @click="editCustomer(customer)" class="text-indigo-600 hover:text-indigo-900">Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Vista móvil -->
    <div class="md:hidden space-y-4">
      <div v-for="customer in filteredCustomers" :key="customer.id" class="bg-white shadow rounded-lg p-4">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center">
            <img class="h-10 w-10 rounded-full mr-3" :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(customer.fullname)}&background=random`" alt="" />
            <div>
              <div class="text-sm font-medium text-gray-900">{{ customer.fullname }}</div>
              <div class="text-sm text-gray-500">{{ customer.email }}</div>
            </div>
          </div>
          <button @click="viewCustomerDetails(customer)" class="text-blue-600 hover:text-blue-900 text-sm font-medium">
            Ver Detalles
          </button>
        </div>
        <div class="mt-2 text-sm text-gray-600">
          <p>DNI: {{ customer.dni }}</p>
          <p>RUC: {{ customer.ruc }}</p>
          <p>Teléfono: {{ customer.phone }}</p>
        </div>
      </div>
    </div>

    <!-- Modal de Detalles del Cliente -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Detalles del Cliente</h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div v-if="selectedCustomer" class="space-y-4">
            <div class="flex items-center justify-center mb-4">
              <img class="h-24 w-24 rounded-full" :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedCustomer.fullname)}&size=96&background=random`" alt="" />
            </div>
            <p><span class="font-semibold">Nombre:</span> {{ selectedCustomer.fullname }}</p>
            <p><span class="font-semibold">DNI:</span> {{ selectedCustomer.dni }}</p>
            <p><span class="font-semibold">RUC:</span> {{ selectedCustomer.ruc }}</p>
            <p><span class="font-semibold">Email:</span> {{ selectedCustomer.email }}</p>
            <p><span class="font-semibold">Teléfono:</span> {{ selectedCustomer.phone }}</p>
            <p><span class="font-semibold">Dirección:</span> {{ selectedCustomer.address }}</p>
            <p><span class="font-semibold">Nombre del Negocio:</span> {{ selectedCustomer.business_name }}</p>
          </div>

          <div class="mt-6 flex justify-end space-x-3">
            <button @click="editCustomer(selectedCustomer)" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Editar
            </button>
            <button @click="closeModal" class="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import type { ICustomer } from '../interfaces';
const baseUrl = import.meta.env.VITE_BASE_URL;

// Datos ficticios
const customersData = ref<ICustomer[]>([]);
  
  // {
  //   id: 1,
  //   fullname: "Juan Pérez",
  //   dni: "12345678",
  //   email: "juan.perez@email.com",
  //   phone: "987654321",
  //   ruc: "10123456789",
  //   business_name: "Tienda Juan",
  //   address: "Av. Principal 123"
  // }
const searchTerm = ref('');
const isModalOpen = ref(false);
const selectedCustomer = ref<ICustomer | null>(null);

const filteredCustomers = computed(() => {
  return customersData.value.filter(customer => 
    customer.fullname.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    customer.dni.includes(searchTerm.value) ||
    customer.ruc.includes(searchTerm.value)
  );
});


const listCustomers = async()=>{

  try{
    const response = await fetch(`${baseUrl}/customers/list-customers/`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },

    });
    if (!response.ok){
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    customersData.value = data;
    console.log("CUSTOMERS", customersData.value)

  }catch(error){
    console.error('Error al obtener las ventas:', error);
  }
}


const viewCustomerDetails = (customer: ICustomer) => {
  selectedCustomer.value = customer;
  isModalOpen.value = true;
}

const closeModal = () => {
  isModalOpen.value = false;
  selectedCustomer.value = null;
}

const editCustomer = (customer: ICustomer) => {
  console.log('Editar cliente:', customer);
  // Implementar lógica para editar cliente
}

const openAddCustomerModal = () => {
  console.log('Abrir modal para agregar cliente');
  // Implementar lógica para abrir modal de agregar cliente
}

onMounted(()=>{
  listCustomers()
})

</script>