<template>
  <div class="flex h-screen bg-gray-100">
    <div class="w-1/2 flex items-center justify-center">
      <div class="w-2/3 max-w-md">
        <div class="mb-8">
          <img
            class="w-[250px] p-5 m-auto"
            src="https://i.postimg.cc/ZKJnSw77/inventory-high-resolution-logo-black-transparent.png"
            alt=""
          />
          <p class="text-gray-600">Porfavor completa el formulario para poder ingresar.</p>
        </div>

        <form @submit.prevent="enviar"  class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email ID</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              
              <input
                for="username"
                type="text"
                id="username"
                v-model="user"
                required
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Email ID"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1 relative rounded-md shadow-sm">             
              <input
                for="password"
                type="password"
                id="password"
                v-model="password"
                required
                class="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Password"/>
            </div>
          </div>

          <div class="flex items-center justify-center">
            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">by: Bucefalo INC</a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Enviar</button>
          </div>
        </form>

        <div class="mt-6 text-center">
          <span class="text-gray-600">No tienes una cuenta? </span>
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Registrate</a>
        </div>
      </div>
    </div>
    <!-- Right side - Illustration -->
    <div class="w-1/2 flex items-center justify-center">
      <div class="w-[650px]">
        <img
          src="https://i.postimg.cc/vHyVfNnn/login.png"
          alt="Illustration"
          class="w-full h-auto"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">//especifico que seria con composition API de vue 3 con la opcion setup
//ref declara variables reactivas estas permien que vue actualice automaticamente el dom cuando sus valores cambian
import { ref } from 'vue'
//Importaas nerutador definido en un archivo router esto te permite navegar entre diferentes rutas en tu aplicaciòn
import router from '../router';
//Accedes a ua variable de entorno (VITE_BASE_URL) que es la URL de la base del API 
const baseUrl = import.meta.env.VITE_BASE_URL;
//declarando una variable reactiva user y password que inicialmente es una cadena vacìa 
const user = ref('');
const password = ref("");
//Declaro una funcion llamada enviar que se ejecutarà cuando el usuario envie el formulario de inicio de sesiòn
const enviar = () => {
  //creamos un objeto llamado loginData que contiene valores de user y password de las dos variables reactivas user y password
  const loginData = {
  //value es necesario porque ref crea un objeto reactivo y su valor es accedible atravez de value
  "user": user.value,
  "password": password.value
}
  //Se realiza una solicitud HTTP post usando fetch la url de la solicitud es la concatenaciòn de la variable baseURL y la ruta
  fetch(`${baseUrl}/login/`, {
      //este mètodo se usa para enviar datos al servidor
      method: 'POST',
      //se configura el tipo del contenido de la solicitud como application/json lo que indica que los datos enviados seran en formato json
      headers: {
        'Content-Type': 'application/json'
      },
      //Aquì se envian los datos de inicio de sesiòn convertidos ne formato json
      body: JSON.stringify(loginData)
    })
    //Despues que la solicitud se haya enviado el còdigo entra en la primera funciòn then
    .then(response => {
      //si la respuesta no es exitosa lanzarà un error
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      //si la ruta es exitosa, rediriges al usuario a la ruta /sidebar
      router.push('/sidebar')
      //convertimos la respuesta en formato json para poder usarlo en el siguiente bloque
      return response.json();
    })
    //Aquì se maneja la respuesta exitosa del servidor
    .then(data => {
      console.log('Respuesta del servidor:', data);
      // Manejar la respuesta exitosa
    })
    //si ocurre un error en cualquier parte de la solicitud el còdigo entra en la funciòn catch
    .catch(error => {
      console.error('Hubo un error:', error);
      // Manejar el error
    });
  };

</script>
