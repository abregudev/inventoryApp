<template>
  <input
    v-model="input"
    class="ml-12 bg-transparent shadow-none outline-none p-2 border rounded-lg border-black mt-5"
    type="text"
    name=""
    id=""
    placeholder="Inserte code"
  />

  <button @click="searchCode" class="ml-12 mt-4 p-2 bg-blue-500 text-white rounded-lg">
    <div class="w-4 h-4 border-2 border-white rounded-full relative">
      <div class="w-2 h-0.5 bg-white absolute top-3 left-3 transform rotate-45"></div>
    </div>
  </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// Define un ref para capturar el valor del input
const input = ref('');

const searchCode = () => {
  const inputValue: any = {
    inputValue: input.value,
  };
  
  console.log(inputValue.value);

  fetch('http://localhost:8000/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputValue),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      //router.push('/sidebar')
      return response.json();
    })
    .then((data) => {
      console.log('Respuesta del servidor:', data);
      // Manejar la respuesta exitosa
    })
    .catch((error) => {
      console.error('Hubo un error:', error);
      // Manejar el error
    });
};
</script>
