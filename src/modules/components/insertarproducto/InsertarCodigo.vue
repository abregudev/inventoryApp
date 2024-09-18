<template>
  <div class="bg-white p-8 border rounded-lg shadow-md max-w-2xl mx-auto mt-8">
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
import { ref} from 'vue'

const baseUrl = import.meta.env.VITE_BASE_URL;

const currentPhase = ref(1)
const searchCode = ref('')
const producto = ref({
  category: '',
  description: '',
  stock: 0,
  price: 0,
  code: '',
  image: null as File | null
})
const nuevoStock = ref(0)
const imagePreview = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const isEditMode = ref(false)

const getPhaseTitle = (phase: number) => {
  switch (phase) {
    case 1: return 'Buscar'
    case 2: return 'Producto'
    default: return ''
  }
}

const searchProduct = async () => {
  if (!searchCode.value) {
    alert('Por favor, ingrese un código de producto.')
    return
  }

  try {
    const response = await fetch(`${baseUrl}/products/search-code/${searchCode.value}/`)
    if (response.ok) {
      const data = await response.json()
      producto.value = { ...data, code: searchCode.value }
      if (data.image) {
        imagePreview.value = `${baseUrl}${data.image}`
      }
      isEditMode.value = true
    } else {
      // Producto no encontrado, preparar para crear uno nuevo
      producto.value = {
        category: '',
        description: '',
        stock: 0,
        price: 0,
        code: '',
        image: null
      }
      imagePreview.value = ''
      isEditMode.value = false
    }
    currentPhase.value = 2
  } catch (error) {
    console.error('Error:', error)
    alert('Ocurrió un error al buscar el producto. Por favor, intente de nuevo.')
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    producto.value.image = file
    const reader = new FileReader()
    reader.onload = e => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const submitProduct = async () => {
  const formData = new FormData()
  Object.keys(producto.value).forEach(key => {
    if (key === 'image' && producto.value.image instanceof File) {
      formData.append('image', producto.value.image)
    } else {
      formData.append(key, producto.value[key].toString())
    }
  })
  formData.append('nuevoStock', nuevoStock.value.toString())

  const url = isEditMode.value
    ? `${baseUrl}/products/update-product/${producto.value.code}/`
    : `${baseUrl}/products/add-product/`

  const method = isEditMode.value ? 'PUT' : 'POST'

  try {
    const response = await fetch(url, {
      method: method,
      body: formData
    })
    if (!response.ok) {
      throw new Error('Error en la solicitud')
    }
    const data = await response.json()
    console.log('Respuesta del servidor:', data)
    alert(isEditMode.value ? 'Producto actualizado con éxito' : 'Producto añadido con éxito')
    resetForm()
  } catch (error) {
    console.error('Hubo un error:', error)
    alert('Ocurrió un error al procesar el producto. Por favor, intente de nuevo.')
  }
}

const resetForm = () => {
  currentPhase.value = 1
  searchCode.value = ''
  producto.value = {
    category: '',
    description: '',
    stock: 0,
    price: 0,
    code: '',
    image: null
  }
  nuevoStock.value = 0
  imagePreview.value = ''
  isEditMode.value = false
}
</script>