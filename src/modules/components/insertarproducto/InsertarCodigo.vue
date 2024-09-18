<template>
    <div class="bg-white border p-8 rounded-lg shadow-md max-w-md mx-auto mt-32">
      <h1 class="text-3xl font-semibold mb-6 text-center"> Código</h1>
      
      <div class="mb-6">
        <input 
          v-model="code"
          type="text" 
          placeholder="Ingrese el codigo"
          @keypress.enter="codeSubmit"
          class="w-full p-3 text-lg border-b-2 border-gray-300 focus:border-black focus:outline-none text-center"
        >
      </div>
      
      <div class="text-center">
        <button 
          @click="codeSubmit" 
          class="bg-black text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
        >
          Ingresar
        </button>
      </div>
    </div>
</template>
  
<script setup lang="ts">
//ref: Esta función es de Vue y te permite crear una variable reactiva que actualiza su valor
import { ref } from 'vue' 
//baseUrl: Aquí defines la URL base de la API, que viene de las variables de entorno configuradas con Vite (VITE_BASE_URL). 
const baseUrl = import.meta.env.VITE_BASE_URL;
//code: Es una variable reactiva que almacena el código que el usuario ingresa.
// Empieza como un string vacío '' pero se actualizará conforme el usuario ingrese datos.
const code = ref('')
//codeSubmit: Esta función se activa cuando el usuario envía un formulario o hace una acción específica. 
const codeSubmit = () => {
  //console.log(code.value)
  //console.log(`${baseUrl}/products/search-code/${code.value}/`)
  //fetch: Realiza una petición HTTP a la URL formada. En este caso,
  //${baseUrl}/products/search-code/${code.value}/: Es la URL completa de la API, donde code.value es el código que el usuario ha ingresado. 
  fetch(`${baseUrl}/products/search-code/${code.value}/`, {
    method: 'GET',// se usa el método GET para obtener información del servidor.
    headers: {
        'Content-Type': 'application/json'
      },
  })
  //.then(response => {}): Aquí manejas la respuesta de la API. Si todo sale bien, conviertes la respuesta a formato JSON.
  .then(response => {
    //si la respuesta no es correcta lanza un error
    if(!response.ok) {
      throw new Error("Error en la solicitud");
    }
    //si  es válida, la convierte a un formato JSON para poder trabajar con los datos.
    return response.json()
  })
  // Aquí manejas los datos que vienen de la respuesta de la API (los productos encontrados). 
  .then(data => console.log(data))
} 
</script>