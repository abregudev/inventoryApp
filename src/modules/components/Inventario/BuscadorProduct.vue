<template>
  <form @submit.prevent="handleSearch" class="relative flex-grow">
    <input
      v-model="input"
      name=""
      id=""
      type="text"
      placeholder="Inserte code..."
      class="w-full pl-3 pr-10 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
    />
    <button 
    @click="searchCode"
    type="submit" 
    class="absolute right-0 top-0 mt-2 mr-3">
      <svg
        class="h-6 w-6 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    </button>
  </form>
</template>

<script lang="ts" setup>
//esta constante almacena la url base para las peticiones de la API
const baseUrl = import.meta.env.VITE_BASE_URL;//Aquì accedes a una variable de entorno definida en t archivo de configuraciòn

//handleSearch: es una funcion simple que se ejecuta cuando se realiza una busqueda 
const handleSearch = () => {
  // Implementar la funcionalidad de búsqueda
  console.log('Search submitted');
};
//importa la funciòn ref que se utiliza para declarar variables reactivas 
import { ref } from 'vue';
//Esta variable reactiva almacenara el valor que el usuario ingrese en este campo de busqueda
const input = ref('');//crea una referencia vacia cuyo valor inicial es una cadena vacia
//Esta funcion se ejecuta cuando el usuario busca algo toma el valor ingresado en el campo y lo envia a una API para procesarlo
const searchCode = () => {
  //ESte es un objeto que contiene el valor ingresado por el usuario en el input
  const inputValue: any = {//:any Este es un tipo dinamico permitiendo que el inputVAlue pueda tener cualquier estructura de datos
    //input.value Accede al valor actual de la referencia input que almacena lo que el usuario ingreso
    inputValue: input.value,
  };
  // imprime el valor del usuario ingresado para verificar si esta capturando correctamente antes de hacer la peticion al API
  console.log(inputValue.value);
  //Usa la funcion fetch para realizar una solicitud HTTP envia una peticion post a la url de baseURL concatenada sa search
  fetch(`${baseUrl}/search/`, {
    method: 'POST',//envia informacion al servidor 
    headers: {//Aquì especificas el tipo de contenido que se esta enviando en este caso es un JSON
      'Content-Type': 'application/json',
    },
    //Convierte el objeto inputValue en una cadena JSON y lo envia como el cuerpo de la solicitud post
    body: JSON.stringify(inputValue),
  })
  //Este bloque maneja la respuesta de la API 
    .then((response) => {
      //si la respuesta no es correcta lanza un error
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      //si la respuesta es correcta convierte los datos recibidos en un objeto JSON
      return response.json();
    })
    //este bloque se ejecuta cuando la cob¡version a JSON es exitosa 
    .then((data) => {
      console.log('Respuesta del servidor:', data);//imprime los datos recibidos del servidor para depurar o verificar la respuesta
      // Manejar la respuesta exitosa
    })
    //Si ocurre un error en algun punto de la solicitud este bloque se ejecuta
    .catch((error) => {
      console.error('Hubo un error:', error);
      // Imprime un mensaje de error para informar que hubo un problema en la solicitud 
    });
};
</script>

