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
    
    <!-- Paginación -->
    <div class="mt-4 flex justify-between items-center mb-6">
      <button 
        @click="prevPage" 
        :disabled="currentPage === 1" 
        class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Anterior
      </button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages" 
        class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Siguiente
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
          <tr v-for="customer in paginatedCustomers" :key="customer.id" class="hover:bg-gray-50 transition duration-150 ease-in-out">
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
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button @click="viewCustomerDetails(customer)" class="text-blue-600 hover:text-blue-900 mr-3">Ver Detalles</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    

    <!-- Vista móvil -->
    <div class="md:hidden space-y-4">
      <div v-for="customer in paginatedCustomers" :key="customer.id" class="bg-white shadow rounded-lg p-4">
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
            <h2 class="text-2xl font-bold text-gray-900">{{ isEditing ? 'Editar Cliente' : 'Detalles del Cliente' }}</h2>
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
            <div v-for="(value, key) in selectedCustomer" :key="key">
              <template v-if="key !== 'id'">
                <label :for="key" class="block text-sm font-medium text-gray-700 capitalize">{{ key.replace('_', ' ') }}</label>
                <input 
                  :id="key" 
                  v-model="selectedCustomer[key]" 
                  :disabled="!isEditing" 
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  :class="{ 'bg-gray-100': !isEditing }"
                >
              </template>
            </div>
          </div>

          <div class="mt-6 flex justify-end space-x-3">
            <button v-if="!isEditing" @click="startEditing" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Editar
            </button>
            <button v-if="isEditing" @click="saveCustomer" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300">
              Guardar
            </button>
            <button @click="closeModal" class="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para Agregar Cliente -->
    <div v-if="isAddModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Agregar Nuevo Cliente</h2>
            <button @click="closeAddModal" class="text-gray-400 hover:text-gray-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form @submit.prevent="submitNewCustomer" class="space-y-4">
            <div v-for="(value, key) in newCustomer" :key="key">
              <template v-if="key !== 'id'">
                <label :for="key" class="block text-sm font-medium text-gray-700 capitalize">{{ key.replace('_', ' ') }}</label>
                <input 
                  :id="key" 
                  v-model="newCustomer[key]" 
                  :type="key === 'email' ? 'email' : 'text'" 
                  :required="['fullname', 'dni', 'email', 'phone'].includes(key)"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
              </template>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
              <button type="button" @click="closeAddModal" class="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300">
                Cancelar
              </button>
              <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Guardar Cliente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import type { ICustomer } from '../interfaces';
const baseUrl = import.meta.env.VITE_BASE_URL;

const customersData = ref<ICustomer[]>([]);
const searchTerm = ref('');
const isModalOpen = ref(false);
const selectedCustomer = ref<ICustomer | null>(null);
const isAddModalOpen = ref(false);
const isEditing = ref(false);
const newCustomer = ref<ICustomer>({
  id: 0,
  fullname: '',
  dni: '',
  email: '',
  phone: '',
  ruc: '',
  business_name: '',
  address: ''
});

// Paginación
const currentPage = ref(1);
const itemsPerPage = 10;

const filteredCustomers = computed(() => {
  return customersData.value.filter(customer => 
    customer.fullname.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    customer.dni.includes(searchTerm.value) ||
    customer.ruc.includes(searchTerm.value)
  );
});

const totalPages = computed(() => Math.ceil(filteredCustomers.value.length / itemsPerPage));

const paginatedCustomers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredCustomers.value.slice(start, end);
});

const listCustomers = async () => {
  try {
    const response = await fetch(`${baseUrl}/customers/list-customers/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    customersData.value = data;
    console.log("CUSTOMERS", customersData.value);
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
  }
};

const viewCustomerDetails = (customer: ICustomer) => {
  selectedCustomer.value = { ...customer };
  isModalOpen.value = true;
  isEditing.value = false;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedCustomer.value = null;
  isEditing.value = false;
};

const startEditing = () => {
  isEditing.value = true;
};

const saveCustomer = async () => {
  if (!selectedCustomer.value) return;

  try {
    const customerData = { ...selectedCustomer.value };
    delete customerData.id;  // Remove id from the data to be sent

    const response = await fetch(`${baseUrl}/customers/update-customer/${selectedCustomer.value.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerData)
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    const updatedCustomer = await response.json();
    console.log("Cliente actualizado:", updatedCustomer);
    
    // Actualizar la lista de clientes
    await listCustomers();
    
    // Cerrar el modal y resetear el modo de edición
    closeModal();
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    // Aquí podrías mostrar un mensaje de error al usuario
  }
};

const openAddCustomerModal = () => {
  isAddModalOpen.value = true;
};

const closeAddModal = () => {
  isAddModalOpen.value = false;
  // Reiniciar el formulario
  newCustomer.value = {
    id: 0,
    fullname: '',
    dni: '',
    email: '',
    phone: '',
    ruc: '',
    business_name: '',
    address: ''
  };
};

const submitNewCustomer = async () => {
  try {
    const response = await fetch(`${baseUrl}/customers/add-customer/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCustomer.value)
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Cliente agregado:", data);
    
    // Actualizar la lista de clientes
    await listCustomers();
    
    // Cerrar el modal
    closeAddModal();
  } catch (error) {
    console.error('Error al agregar el cliente:', error);
    // Aquí podrías mostrar un mensaje de error al usuario
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

watch(searchTerm, () => {
  currentPage.value = 1;
});

onMounted(() => {
  listCustomers();
});
</script>