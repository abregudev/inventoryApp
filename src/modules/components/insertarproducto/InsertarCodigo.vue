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
import { ref } from 'vue' 
const baseUrl = import.meta.env.VITE_BASE_URL;

const code = ref('')

const codeSubmit = () => {
  const codeInfo = code

  console.log(codeInfo.value)

  code.value = ''

  fetch(`${baseUrl}/products/search-code/${code.value}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => {
    if(!response.ok) {
      throw new Error("Error en la solicitud");
    }
    return response.json()
  })
  .then(data => console.log(data))
} 
</script>