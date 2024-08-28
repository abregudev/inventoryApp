<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-2 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <RouterLink to="/">
          <img
            class="w-44 p-3"
            src="https://i.postimg.cc/ZKJnSw77/inventory-high-resolution-logo-black-transparent.png"
            alt=""
          />
        </RouterLink>
      </div>

      <!-- Search Bar -->
      <div class="flex justify-around">
       <BuscadorProduct/>

        <nav class=" ml-4 ml-20 flex w-[400px] justify-between items-center">
          <RouterLink class="font-meidun" to="/nuevoproducto">Agregar</RouterLink>
          <RouterLink class="font-meidun" to="/inventario">Inventario</RouterLink>
          <RouterLink class="font-meidun" to="/ventas">Ventras</RouterLink>
        </nav>
      </div>
      <!-- Navigation Icons -->
      <CarritoLayout/>
    </div>

  </header>

  <main class="flex-1 flex-col">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import CarritoLayout from './CarritoLayout.vue';
import BuscadorProduct from '../components/Inventario/BuscadorProduct.vue';

</script>
