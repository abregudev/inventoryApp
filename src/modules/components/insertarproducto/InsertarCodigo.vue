<template>
  <div class="bg-white p-8 max-w-2xl mx-auto mt-8">
    <h1 class="text-3xl font-bold mb-6 text-center">Gestión de Inventario</h1>
    
    <!-- Indicador de fases -->
    <div class="flex justify-between items-center mb-8">
      <div v-for="phase in 2" :key="phase" class="flex flex-col items-center w-[70px]">
        <div 
          :class="[
            'w-8 h-8 rounded-full flex items-center justify-center text-white font-bold',
            currentPhase >= phase ? 'bg-blue-500' : 'bg-gray-300'
        ]"
        >
          {{ phase }}
        </div>
        <span class="text-sm mt-1">{{ getPhaseTitle(phase) }}</span>
      </div>
      <div class="flex-grow h-0.5 bg-gray-300"></div>
    </div>

    <!-- Fase 1: Buscar Producto -->
    <div v-if="currentPhase === 1">
      <div class="mb-6">
        <input
          v-model="searchCode"
          type="text"
          placeholder="Ingrese el código del producto"
          @keypress.enter="searchProduct"
          class="w-full p-3 text-lg border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none text-center"
        >
      </div>
      <div class="text-center">
        <button
          @click="searchProduct"
          class="bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
        >
          Buscar
        </button>
      </div>
    </div>
    <!-- Fase 2: Formulario de Producto (Editar existente o Crear nuevo) -->
    <div v-if="currentPhase === 2">
      <h2 class="text-2xl font-semibold mb-4">{{ isEditMode ? 'Editar Producto Existente' : 'Agregar Nuevo Producto' }}</h2>
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
          <input v-model="producto.category" type="text" class="w-full p-2 border rounded-md">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
          <input v-model="producto.description" type="text" class="w-full p-2 border rounded-md">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Stock Actual</label>
          <input v-model="producto.stock" type="number" class="w-full p-2 border rounded-md bg-gray-100" disabled>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Precio</label>
          <input v-model="producto.price" type="number" class="w-full p-2 border rounded-md">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">{{ isEditMode ? 'Añadir Stock' : 'Stock Inicial' }}</label>
          <input v-model="nuevoStock" type="number" class="w-full p-2 border rounded-md">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Código</label>
          <input v-model="producto.code" type="text" class="w-full p-2 border rounded-md" :disabled="isEditMode">
        </div>
      </div>

      <div class="mt-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Imagen del Producto</label>
        <div
          @click="triggerFileInput"
          class="border-2 border-dashed border-gray-300 rounded-lg p-4 h-48 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        >
          <img v-if="imagePreview" :src="imagePreview" alt="Preview" class="max-h-full max-w-full object-contain" />
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-gray-400">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <input
          ref="fileInput"
          type="file"
          @change="handleImageUpload"
          accept="image/*"
          class="hidden"
        >
      </div>

      <div class="mt-8 text-center">
        <button @click="submitProduct" class="bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-blue-600 transition-colors duration-200">
          {{ isEditMode ? 'Actualizar Producto' : 'Añadir Producto' }}
        </button>
        <button @click="resetForm" class="ml-4 bg-gray-300 text-gray-700 px-6 py-2 rounded-md text-lg font-semibold hover:bg-gray-400 transition-colors duration-200">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue' //Nos permite crear variables reactivas

const baseUrl = import.meta.env.VITE_BASE_URL;//Estamos guardando la URL base de nuestra API en una variable baseURL, import obtiene la URL configurada en un archivo

const currentPhase = ref(1) //Guarda el numero de la fase actual (1,2 o 3) que controla que parte del formulario se muestra
const searchCode = ref('') //Guarda el codigo del producto que el usuario està buscando o ingresando
const producto = ref({ //Esta variable guarda los datos del producto es reactiva por lo que cualquier cambio que hagamos en sus propiedades se vera reflejado en la raìz
  category: '',
  description: '',
  stock: 0,
  price: 0,
  code: '',
  image: '' as string | null
})
const nuevoStock = ref(0) //Almacena el nuevo stock que se va añadir al producto
const imagePreview = ref('') //Guarda la vista previa de la imagen que el usuario selecciona para el producto
const fileInput = ref<HTMLInputElement | null>(null) //fileInput hace referencia al elemento del archivo pero comienza como nulo
const isEditMode = ref(false) //isEditMode indica si estamos editando un producto(true) o añadiendo uno nuevo (false)

const getPhaseTitle = (phase: number) => { //Esta funciòn recibe el numero de la fase y devuelve el tìtulo correspondiente
  switch (phase) {
    case 1: return 'Buscar'
    case 2: return 'Producto'
    default: return '' //aqui nunca a va llegar la fase 
  }
}

const searchProduct = async () => { //funciòn asincròna busca un producto en la base de datos por su còdigo
  if (!searchCode.value) { //verifica si el usuario ha ingresado un còdigo de producto, sino lo hiso muestra una alerta y se detiene la funciòn return
    alert('Por favor, ingrese un código de producto.')
    return
  }
  try { //si el codigo esta presente, envìa una solicitud fetch a la API para buscar un producto con ese còdigo 
    const response = await fetch(`${baseUrl}/products/search-code/${searchCode.value}/`)
    if (response.ok) { //si la respuesta en el API es correcta, 
      const data = await response.json() //convierte la respuesta a formato JSON y actualiza la variable producto con los datos recibidos
      producto.value = { ...data, code: searchCode.value }
      if (data.image) { //si el producto tiene una imagen,
        imagePreview.value = `${baseUrl}${data.image}` //  actualizamos imagePreview
      }
      isEditMode.value = true //luego cambiamos isEditMode a true para indicar que estamos editando un producto 
    } else { 
      prepareNewProduct() //sino llamamos a la funciòn para crear un nuevo producto
    }
    currentPhase.value = 2 //pasamos a la fase dos
  } catch (error) { //sino encontramos un producto o hay un error llamamos a la funciòn
    console.error('Error:', error)
    // prepareNewProduct() para preparar la creaciòn de un nuevo producto
    prepareNewProduct()
  }
}

const prepareNewProduct = () => { //Esta funciòn se llama cuando no encontramos un producto
  producto.value = { //reinicia los valores del producto y prepara la aplicaciòn para que se pueda crear un producto nuevo
    category: '',
    description: '',
    stock: 0,
    price: 0,
    code: searchCode.value,
    image: null
  }
  imagePreview.value = ''
  isEditMode.value = false
  currentPhase.value = 2
}
 //Esta funciòn hace que se haga click automaticamente en el input de archivo para seleccionar una imagen
const triggerFileInput = () => {
  fileInput.value?.click()
}
// Declaraba una  constante llamada que contendrà que contendrà una funciòn 
const handleImageUpload = (event: Event) => { //este evento se dispara cuando el usuario suaba una imagen a traves del elemento input
  //event.target se refiere al elemento que disparo el evento en este caso el input de tipo archivo
  const target = event.target as HTMLInputElement //indica que estamos seguros de que target es un elemento HTML de tipe input
  if (target.files && target.files[0]) { //comprueba si hay archivos seleccionados en el input y si almenos hay un archivo seleccionado si ambos osn verdaderos 
    const file = target.files[0] // Aquì la constante file almacena el primer archivo seleccionado por el ususario y accede al primer archivo
    const reader = new FileReader() //Creamos una nueva instancia del objeto fileReader este objeto permite leer el contenido de archivos seleccionados
    reader.onload = e => { //Asignamos una funciòn que se ejecutarà cuando la lectura del archivo se complete :e--> significa un evento
      const result = e.target?.result //Obtenemos el resultado de la lectura e.target?.result accede a la propiedad result es el objeto y target es un operador que evita errores
      if (typeof result === 'string') { //Verificamos si en resultado es una cadena 
        imagePreview.value = result //Aquì asignamos un resultado a una propiedad lllamada value de un objeto llamado imagePreview
        producto.value.image = result // Guardamos la imagen como base64 string
      }
    }
    //Este mètodo inicia la lectura del archivo especificado (file) el resultado serà un data URL que presenta el contenido de un archivo
    reader.readAsDataURL(file)
  }
}
//Funciòn asincrona que se llama cuando el usuario decide añadir o actualizar un producto
const submitProduct = async () => {
  if (!producto.value.code) { //Verifica si hay un codigo ingresado sino hay muestra un alerta y define la funciòn 
    alert('Por favor, ingrese un código de producto.')
    return
  }
  //Prepara los datos del producto que vamos a enviar 
  const productData = {
    ...producto.value, //HAce una copia de producto se usa .value para traer sus valores
    stock: isEditMode.value ? producto.value.stock + Number(nuevoStock.value) : Number(nuevoStock.value) //suma el stock actual al stock nuevo
  }
  //esta constante contendra la direcciòn a la que se enviarà la solicitud
  const url = isEditMode.value //Este es un valor boolean q indica si el formulario esta en modo de ediciòn 
    ? `${baseUrl}/products/update-product/${producto.value.code}/` //Si isEditMode.value es true, se construye la URL para actualizar un producto existente, utilizando el código del producto para identificarlo.
    : `${baseUrl}/products/add-product/`//si isEditMode.value es false se construye la URL para agregar un nuevo producto
  //Esta constante almacenarà el mètodo HTTP a usar
  const method = isEditMode.value ? 'PUT' : 'POST' //si estamos en modo de ediciòn , se utilizara PUT para actualizar sino se utilizarà POST para crear

  try { //Aquì se intentara ejecutar el còdigo que puede lanzar excepciones.
    const response = await fetch(url, { //se realiza una solicitud HTTP utilizando la funcion fetch
      method: method, //utiliza el mètodo definido anteriormente (PUT o POST)
      headers: { //Estable el tipo de contenido de la solicitud como JSON indicando que se esta enviando un objeto JSON
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData) //Convierte el objeto productData que contiene los datos del producto en una cadena JSON para enviarlo en el cuerpo de la solicitud
    })
    if (!response.ok) { //Comprueba si la respuesta del servidor no fue exitosa 
      throw new Error('Error en la solicitud') //Lanza este error con este mensaje
    }
    const data = await response.json() // si la respuesta fue exitosa se covierte el cuerpo de la respuesta en un objeto json y se guarda en data
    console.log('Respuesta del servidor:', data) //Imprime en console los datos del servidor para la depuraciòn
    //Muestra un mensaje al usuario si el producto fue actualizado o añadido exitosamente dependiendo del modo actual
    alert(isEditMode.value ? 'Producto actualizado con éxito' : 'Producto añadido con éxito') 
    resetForm() //llama a esta funciòn que probablemente restablece los campos del formulario en su estado inicial
  } catch (error) { //Captura cualquier error que ocurra dentro del bloque try
    console.error('Hubo un error:', error)
    alert('Ocurrió un error al procesar el producto. Por favor, intente de nuevo.')
  }
}
//declara una funciòn llamada resetForm 
const resetForm = () => {
  currentPhase.value = 1 //restablece la variable llamada currentPhase utilizada para controlar las etapas o fases del formulario
  searchCode.value = '' //Limpia cualquier còdigo de bùsqueda almacenado 
  producto.value = { //Restablece todas las propiedades del objeto producto asegurandose que todos los campos esten vacios
    category: '',
    description: '',
    stock: 0,
    price: 0,
    code: '',
    image: null
  }
  nuevoStock.value = 0 //Restablece una variable relacionada con el stock a cero
  imagePreview.value = '' //Limpia cualquier vista previa de imagen almacenada 
  isEditMode.value = false //Cambia el modo a no ediciòn indicando que ahora estamos listo para creae un nuevo producto
}
</script>