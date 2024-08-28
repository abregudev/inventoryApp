<!-- <template>
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
 -->

 <template>
  <div class="flex h-screen bg-gray-100">
    <!-- Left side - Login form -->
    <div class="w-1/2 flex items-center justify-center">
      <div class="w-2/3 max-w-md">
        <div class="mb-8">
          <img class="w-[250px] p-5 m-auto" src="https://i.postimg.cc/ZKJnSw77/inventory-high-resolution-logo-black-transparent.png" alt="">
          <p class="text-gray-600">Porfavor completa el formulario para poder ingresar.</p>
        </div>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email ID</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail class="h-5 w-5 text-gray-400" />
              </div>
              <input type="email" id="email" v-model="email" required
                     class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                     placeholder="Enter Email ID" />
            </div>
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock class="h-5 w-5 text-gray-400" />
              </div>
              <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required
                     class="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                     placeholder="Enter Password" />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button type="button" @click="togglePasswordVisibility" class="text-gray-400 hover:text-gray-500 focus:outline-none">
                  <Eye v-if="!showPassword" class="h-5 w-5" />
                  <EyeOff v-else class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" type="checkbox" v-model="rememberMe"
                     class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">Recuerdame.. </label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">by: Bucefalo INC</a>
            </div>
          </div>
          
          <div>
            <button type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Ingresar
            </button>
          </div>
        </form>
        
        <div class="mt-6 text-center">
          <span class="text-gray-600">No tienes una cuenta? </span>
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Registrate</a>
        </div>
      </div>
    </div>
    
    <!-- Right side - Illustration -->
    <div class="w-1/2  flex items-center justify-center">
      <div class="w-[650px]">
        <img src="https://i.postimg.cc/vHyVfNnn/login.png" alt="Illustration" class="w-full h-auto" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Mail, Lock, Eye, EyeOff } from 'lucide-vue-next'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleSubmit = () => {
  // Aquí iría la lógica de inicio de sesión
  console.log('Login attempt', { email: email.value, password: password.value, rememberMe: rememberMe.value })
}
</script>