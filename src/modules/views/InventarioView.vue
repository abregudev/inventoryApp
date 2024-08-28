<template>
    <section>
        <div class=" flex flex-row gap-5  justify-center center  mt-20">
            <CategoryProducts/>
            <CardProducts/>
        </div>
    </section>
    
</template>

<script lang="ts" setup>
import CardProducts from '../components/Inventario/CardProducts.vue';
import CategoryProducts from '../components/Inventario/CategoryProducts.vue';
</script>

