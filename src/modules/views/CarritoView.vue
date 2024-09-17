<template>
       <nav class="flex items-center">
        <RouterLink to="/cart" class="text-gray-600 hover:text-blue-500 mx-2 relative">
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <span
            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            {{ totalItems  }}
          </span>
        </RouterLink>
      </nav>
</template>

<script lang="ts" setup>
//Se importad evue para crear proipedades computadas reacctivas
//Watch se importa para observar cambios en las propiedades reactivas y ejecutar lògica cuando estos cambios ocurren 
import { computed, watch } from 'vue';
//se importa desde el archivo CartStores que contiene la lògica del carrito de compras 
import { useCartStore } from '../stores/CartStores';
//se llama la funciòn useCartStore() para acceder al estado global del carrito
const cartStore = useCartStore();

//Esto crea una propiedad computada que calcula el numero total de articulos en el carrito
const totalItems = computed(() => {
  //aquì se usa el mètodo reduce para sumar todas las cantidades de los productos en el carrito
  //la funcion reduce toma dos argumentos : total-> acumula la cantidad de los productos  y item.quantity-> la cantidad de cada producto en el carrito
  return cartStore.cart.reduce((total, item) => total + item.quantity, 0);
});
//Esta observando el array cartStore.cart cada vez que el carrito del contenido cambia la funcion se ejecuta
watch(() => cartStore.cart, () => {
  //cuando detecta un cambio imprime en console indicando que el carrito a sido modificado
  console.log('El carrito ha sido actualizado:', cartStore.cart);
});
// Registro para depurar
//console.log('Desde carrito de compras');

</script>