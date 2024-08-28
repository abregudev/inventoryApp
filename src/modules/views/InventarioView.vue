<template>
    <section class="h-[92vh]">
        <div class="w-[1500px] flex flex-row gap-5  justify-center m-auto  mt-20">
            <CategoryProducts/>
            <CardProducts/>
        </div>
    </section>
    
</template>

<script lang="ts" setup>
import CardProducts from '../components/Inventario/CardProducts.vue';
import CategoryProducts from '../components/Inventario/CategoryProducts.vue';
</script>

