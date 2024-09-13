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

<script setup>
import { ref } from 'vue'
import router from '../router';

const baseUrl = import.meta.env.VITE_BASE_URL;

const user = ref('');
const password = ref("");

const enviar = () => {

  const loginData = {
  "user": user.value,
  "password": password.value

}
// Hacer la petición POST usando fetch

  fetch(`${baseUrl}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      router.push('/sidebar')
      return response.json();
    })
    .then(data => {
      console.log('Respuesta del servidor:', data);
      // Manejar la respuesta exitosa
    })
    .catch(error => {
      console.error('Hubo un error:', error);
      // Manejar el error
    });
  };

</script>
