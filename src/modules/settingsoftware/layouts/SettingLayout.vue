<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Inventario Administrador
          </h2>
          <div class="flex justify-center mt-4 space-x-2">
            <div v-for="(step, index) in 3" :key="index" 
                 :class="[
                   'h-2 w-2 rounded-full',
                   currentStep === index + 1 ? 'bg-blue-600' : 'bg-gray-300'
                 ]">
            </div>
          </div>
        </div>
        <h3 class="mt-2 text-center text-2xl font-bold text-gray-700">
          Inicio de Configuracion para Tu Negocio
        </h3>
        <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="company-name" class="sr-only">Company Name</label>
              <input id="company-name" name="company" type="text" required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                     placeholder="Nombre de Negocio" v-model="formData.companyName">
            </div>
            <div>
              <label for="industry" class="sr-only"></label>
              <select id="industry" name="industry" required
                      class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      v-model="formData.industry">
                <option value="" disabled selected>Industria o Sector</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="services">Services</option>
                <!-- Add more options as needed -->
              </select>
            </div>
            <div>
              <label for="stores" class="sr-only">Number of Stores or Branches</label>
              <input id="stores" name="stores" type="number" required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                     placeholder="Numero de Tiendas o Sucursales" v-model="formData.stores">
            </div>
            <div>
              <label for="warehouse" class="sr-only">Main Warehouse Location</label>
              <input id="warehouse" name="warehouse" type="text" required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                     placeholder="Ubicacion de el Almacen Principal" v-model="formData.warehouseLocation">
            </div>
          </div>
  
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="import-data" name="import-data" type="checkbox"
                     class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                     v-model="formData.importData">
              <label for="import-data" class="ml-2 block text-sm text-gray-900">
                Import existing data
              </label>
            </div>
          </div>
  
          <div>
            <button  type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  
  const currentStep = ref(1);
  const formData = reactive({
    companyName: '',
    industry: '',
    stores: '',
    warehouseLocation: '',
    inventoryType: '',
    importData: false
  });
  
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    // and move to the next step or complete the setup process
    currentStep.value++;
    if (currentStep.value > 5) {
      // Setup complete, navigate to main application
      console.log('Setup complete');
    }
  };
  </script>