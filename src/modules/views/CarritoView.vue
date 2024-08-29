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
import { computed, watch } from 'vue';
import { useCartStore } from '../stores/CartStores';

const cartStore = useCartStore();

// Computed property to get the total items in the cart
const totalItems = computed(() => {
  return cartStore.cart.reduce((total, item) => total + item.quantity, 0);
});
// Watcher to detect changes in the cart and update the view
watch(() => cartStore.cart, () => {
  console.log('El carrito ha sido actualizado:', cartStore.cart);
});

// Logging for debugging
//console.log('Desde carrito de compras');

</script>