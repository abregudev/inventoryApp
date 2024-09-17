<template>
  <div class="bg-white p-8 border rounded-lg shadow-md max-w-2xl mx-auto mt-32">
    <h1 class="text-3xl font-bold mb-6">Ingresar Producto</h1>
    
    <div class="grid grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">CATEGORÍA</label>
        <input v-model="producto.category" type="text" class="w-full p-2 border rounded-md">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">DESCRIPCIÓN</label>
        <input v-model="producto.description" type="text" class="w-full p-2 border rounded-md">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">STOCK</label>
        <input v-model="producto.stock" type="number" class="w-full p-2 border rounded-md">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">PRECIO</label>
        <input v-model="producto.price" type="number" class="w-full p-2 border rounded-md">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">AÑADIR NUEVO STOCK</label>
        <input v-model="nuevoStock" type="number" class="w-full p-2 border rounded-md">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">CÓDIGO</label>
        <input v-model="producto.code" type="text" class="w-full p-2 border rounded-md">
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
//Se utiliza para crear variables reactivas que actualizarán automáticamente la interfaz
import { ref } from 'vue'
//baseUrl: Aquí defines la URL base del servidor (API) que proviene de las variables de entorno configuradas con Vite (VITE_BASE_URL).
const baseUrl = import.meta.env.VITE_BASE_URL;
//producto: Es un objeto reactivo que representa un producto
const producto = ref({
  category: '',
  description: '',
  //el stock y price a 0). Este objeto almacenará la información del producto que se va a ingresar
  stock: 0,
  price: 0,
  code: '',
  image: ''
})
//nuevoStock: Es una variable reactiva que almacena el stock actualizado del producto. Comienza con un valor de 0.
const nuevoStock = ref(0)
//seleccionarImagen: Esta función se llama cuando el usuario selecciona una imagen
const seleccionarImagen = () => {
  // aquí es donde podrías implementar la lógica para manejar la selección de imágenes
  console.log('Seleccionar imagen')
  // Aquí iría la lógica para seleccionar una imagen
}
//ingresarProducto: Se activa cuando el usuario ingresa un producto
const ingresarProducto = () => {
  console.log('Ingresando producto')
  console.log(producto.value)
  console.log('Nuevo stock:', nuevoStock.value)
  //productData: Crea un nuevo objeto que contiene los datos actuales del producto
  const productData = {
    //El operador de propagación (...) copia todas las propiedades del objeto producto en este nuevo objeto.
    ...producto.value,
  }

  // fetch: Realiza una solicitud HTTP al servidor
  //una petición POST a la URL /products/add-product/. Esta solicitud envía los datos del producto en formato JSON al servidor.
  fetch(`${baseUrl}/products/add-product/`, {
    method: 'POST',//metodo post estamos enviando datos nuevos al servidor.
    //Define el tipo de contenido que se envía, en este caso application/json.
    headers: {
      'Content-Type': 'application/json'
    },
    //Convierte el objeto productData en un string JSON para enviarlo al servidor.
    body: JSON.stringify(productData)
  })
  //Aquí se maneja la respuesta de la API.
  .then(response => {
    // Si la respuesta no es correcta, se lanza un error.
    if (!response.ok) {
      throw new Error('Error en la solicitud')
    }
    //Si la respuesta es válida, se convierte en formato JSON
    return response.json()
  })
  //Una vez que la respuesta JSON es recibida, imprime los datos devueltos por el servidor y luego restablece el formulario a su estado inicial
  .then(data => {
    console.log('Respuesta del servidor:', data)
    // Limpiar el formulario después de ingresar el producto
    producto.value = {
      category: '',
      description: '',
      stock: 0,
      price: 0,
      code: '',
      image: ''
    }
    // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito o redirigir a otra página
  })
  // Si ocurre algún error durante la solicitud se captura y se imprime un mensaje de error
  .catch(error => {
    console.error('Hubo un error:', error)
    // Aquí puedes manejar el error, como mostrar un mensaje al usuario
  })
}
</script>