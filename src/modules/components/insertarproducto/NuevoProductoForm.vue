<template>
    <div class="bg-white p-8 border rounded-lg shadow-md max-w-2xl mx-auto mt-32">
      <h1 class="text-3xl font-bold mb-6">Ingresar Producto</h1>
      
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">CATEGORIA</label>
          <input v-model="producto.categoria" type="text" class="w-full p-2 border rounded-md">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">DESCRIPCION</label>
          <input v-model="producto.descripcion" type="text" class="w-full p-2 border rounded-md">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">STOCK</label>
          <input v-model="producto.stock" type="number" class="w-full p-2 border rounded-md">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">PRECIO</label>
          <input v-model="producto.precio" type="number" class="w-full p-2 border rounded-md">
        </div>
      </div>
      
      <div class="mt-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">AÑADIR NUEVO STOCK</label>
        <input v-model="nuevoStock" type="number" class="w-full p-2 border rounded-md">
      </div>
      
      <div class="mt-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">IMAGEN</label>
        <div 
          @click="seleccionarImagen" 
          class="border-2 border-dashed border-gray-300 rounded-lg p-4 h-48 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-gray-400">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>
      
      <div class="mt-8 text-center">
        <button @click="actualizarProducto" class="bg-black text-white px-6 py-2 rounded-md text-lg font-semibold">
          INGRESAR
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  
  export default defineComponent({
    name: 'ActualizarProducto',
    setup() {
      const producto = ref({
        categoria: 'DTF',
        descripcion: 'TINTA DTF CYAN',
        stock: 140,
        precio: 90
      })
      
      const nuevoStock = ref(0)
      
      const seleccionarImagen = () => {
        // Aquí iría la lógica para seleccionar una imagen
        console.log('Seleccionar imagen')
        // Ejemplo de cómo podrías abrir un selector de archivos:
        // const input = document.createElement('input');
        // input.type = 'file';
        // input.accept = 'image/*';
        // input.onchange = (event) => {
        //   const file = event.target.files[0];
        //   // Aquí puedes manejar el archivo seleccionado
        // };
        // input.click();
      }
      
      const actualizarProducto = () => {
        // Aquí iría la lógica para actualizar el producto
        console.log('Producto actualizado', producto.value, 'Nuevo stock:', nuevoStock.value)
      }
      
      return {
        producto,
        nuevoStock,
        seleccionarImagen,
        actualizarProducto
      }
    }
  })
  </script>