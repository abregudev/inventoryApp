<template>
  <div class="max-w-md mx-auto my-10 p-8 rounded-lg bg-zinc-800 text-white shadow-lg">
    <h1 class="text-3xl font-bold text-center mb-4">Login</h1>

    <label for="username" class="block text-sm font-medium mb-2">Usuario</label>
    <input
      v-model="user"
      type="text"
      id="username"
      placeholder="User"
      class="w-full p-3 rounded-lg bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
    />

    <label for="password" class="block text-sm font-medium mb-2">Contraseña</label>
    <input
      v-model="password"
      type="password"
      id="password"
      placeholder="Password"
      class="w-full p-3 rounded-lg bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
    />

    <button
      @click="enviar"
      class="w-full p-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-700 transition duration-200"
    >
      Iniciar Sesión
    </button>

    <p class="text-center text-sm mt-6">
      ¿No tienes cuenta? <a href="#" class="text-indigo-400 hover:text-indigo-300">Regístrate</a>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import router from '../router';

const user = ref('');
const password = ref("");

const enviar = () => {
  console.log(user.value)
  console.log(password.value)

  const loginData = {
  "user": user.value,
  "password": password.value
}

// Hacer la petición POST usando fetch
fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData )
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

