<template>
  <div class="bg-white border p-8 rounded-lg shadow-md max-w-md mx-auto mt-32">
    <h1 class="text-3xl font-semibold mb-6 text-center">Ingrese Código</h1>

    <div class="mb-6">
      <input
        v-model="codigo"
        type="text"
        placeholder="#EJEMPLO"
        class="w-full p-3 text-lg border-b-2 border-gray-300 focus:border-black focus:outline-none text-center uppercase"
      />
    </div>

    <div class="text-center">
      <button
        @click="ingresarCodigo"
        class="bg-black text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
      >
        Ingresar
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IngresarCodigo',
  setup() {
    const codigo = ref('');

    const ingresarCodigo = () => {
      // Aquí iría la lógica para procesar el código ingresado
      console.log('Código ingresado:', codigo.value);
      // Puedes añadir aquí la lógica para validar o enviar el código
    };

    return {
      codigo,
      ingresarCodigo,
    };
  },
});
</script>
