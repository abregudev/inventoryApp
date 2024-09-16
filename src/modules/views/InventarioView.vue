<template>
  <section class="bg-gray-100 min-h-screen py-8">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Inventario</h1>
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Columna izquierda: Categorías y Productos -->
        <div class="lg:w-3/4">
          <div class="flex flex-col md:flex-row gap-8">
            <!-- Categorías -->
            <div class="md:w-1/4">
              <CategoryProducts class="sticky top-8" />
            </div>
            
            <!-- Productos -->
            <div class="md:w-3/4">
              <CardProducts />
            </div>
          </div>
        </div>
        
        <!-- Columna derecha: Carrito de Compras (fijo) -->
        <div class="lg:w-1/4">
          <div class="sticky top-8">
            
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import CategoryProducts from '../components/Inventario/CategoryProducts.vue';
import CardProducts from '../components/Inventario/CardProducts.vue';
//import CartBuy from '../components/carrito/CartBuy.vue';

onMounted(() => {
  console.log('Vista de inventario montada');
});
</script>