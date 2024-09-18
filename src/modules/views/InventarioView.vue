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

  //Importas el hook onMounted este hook se ejecuta cuandnoe l componente ha sido completamente montado en el DOM 
  import { onMounted } from 'vue';
  //importas un componente desde la carpeta inventario 
  import CategoryProducts from '../components/Inventario/CategoryProducts.vue';
  //Importas un componente llamado cardProducts 
  import CardProducts from '../components/Inventario/CardProducts.vue';
  //Dentro del onMounted has agregado una funciòn que ejecuta conole.log(), 
  //lo que indica que cada vez que el componente sea montado en el DOM mensaje imprimira en consola
  onMounted(() => {
    console.log('Vista de inventario montada');
  });

</script>