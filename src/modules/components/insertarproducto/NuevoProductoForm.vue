<template>
  <div class="bg-white p-8 border rounded-lg shadow-md max-w-2xl mx-auto mt-32">
    <h1 class="text-3xl font-bold mb-6">Ingresar Producto</h1>
    
    <div class="grid grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">CATEGORÍA</label>
        <input v-model="producto.categoria" type="text" class="w-full p-2 border rounded-md">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">DESCRIPCIÓN</label>
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
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">AÑADIR NUEVO STOCK</label>
        <input v-model="nuevoStock" type="number" class="w-full p-2 border rounded-md">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">CÓDIGO</label>
        <input v-model="producto.codigo" type="text" class="w-full p-2 border rounded-md">
      </div>
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
      <button @click="ingresarProducto" class="bg-black text-white px-6 py-2 rounded-md text-lg font-semibold">
        AÑADIR
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'


const producto = ref({
  categoria: '',
  descripcion: '',
  stock: 0,
  precio: 0,
  codigo: '',
  imagen: ''
})

const nuevoStock = ref(0)

const seleccionarImagen = () => {
  console.log('Seleccionar imagen')
  // Aquí iría la lógica para seleccionar una imagen
}

const ingresarProducto = () => {
  console.log('Ingresando producto')
  console.log(producto.value)
  console.log('Nuevo stock:', nuevoStock.value)

  const productoData = {
    ...producto.value,
  }

  // Hacer la petición POST usando fetch
  fetch('http://localhost:5000/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productoData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud')
    }
    return response.json()
  })
  .then(data => {
    console.log('Respuesta del servidor:', data)
    // Limpiar el formulario después de ingresar el producto
    producto.value = {
      categoria: '',
      descripcion: '',
      stock: 0,
      precio: 0,
      codigo: '',
      imagen: ''
    }
    // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito o redirigir a otra página
  })
  .catch(error => {
    console.error('Hubo un error:', error)
    // Aquí puedes manejar el error, como mostrar un mensaje al usuario
  })
}
</script>