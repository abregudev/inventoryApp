<template>
  <div class="bg-white shadow-lg rounded-lg p-4">
    <h3 class="font-bold text-lg mb-3 text-gray-800">Categorías</h3>
    <ul class="space-y-2">
      <li v-for="category in categories" :key="category.name">
        <a href="#" class="flex items-center justify-between p-2 rounded-md text-sm hover:bg-gray-100 transition duration-200">
          <span class="text-gray-700">{{ category.name }}</span>
          <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
            {{ category.count }}
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
//Importa dos fuciones ref crea referencias reactivas y onMounted es un hook de ciclo de vida y se ejecuta cuando el componente se ha montado en el DOM
import { ref, onMounted } from 'vue';

interface Category { //Define una interfaz y en su estructura define como debe ser un objeto de tipo category
  name: string;
  count: number;
}
//Se crea una referncia llamada categories 
const categories = ref<Category[]>([]); //<Category[]> indica que este arreglo contendrà objetos que cumplan con la interfaz category

const fetchCategories = async () => { //esta funcion se encarga de obtener las categorias desde un servidor
  try { //donde se intentará ejecutar el código que puede lanzar excepciones.
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/categories/`); //Aquì se realiza una peticiòn //${import.meta.env.VITE_BASE_URL}/products/categories/ utilia una variable de entorno para contruir la URL desde donde se obtendràn las categorias
    if (!response.ok) { //Si la respuesta del servidor no fue exitosa 
      throw new Error('Network response was not ok'); //lanza este error
    }
    const data = await response.json(); //Si la respuesta feu exitosa convierte el cuerpo de la respuesta en un objeto JSON
    categories.value = data; //Asigna los datos obtenidos a la propiedad value de la referencia reactiva categories.
  } catch (error) { //Captura cualquuier error que ocurra dentro del bloque try
    console.error('Error fetching categories:', error); //Imprime la informacion sobre el error que ocurrio al intentar obtener las categories
  }
};
//LLama a la funciòn cuando el componente se monta significa que tan pronto el componente este listo y visible en el DOM se ejecutarà esta funciòn para obtener las categories del servidor
onMounted(fetchCategories);
</script>