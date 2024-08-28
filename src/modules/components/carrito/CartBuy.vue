<template>
    <div class="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto mt-24">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Carrito de Compras</h2>
      
      <div v-if="cartItems.length === 0" class="text-center py-8">
        <p class="text-gray-500">Tu carrito está vacío</p>
      </div>
      
      <div v-else>
        <div v-for="item in cartItems" :key="item.id" class="flex items-center justify-between border-b border-gray-200 py-4">
          <div class="flex items-center">
            <img :src="item.thumbnail" :alt="item.title" class="w-16 h-16 object-cover rounded-md mr-4">
            <div>
              <h3 class="font-semibold text-gray-800">{{ item.title }}</h3>
              <p class="text-sm text-gray-600">${{ item.price.toFixed(2) }} c/u</p>
            </div>
          </div>
          <div class="flex items-center">
            <button @click="decreaseQuantity(item)" class="bg-gray-200 text-gray-800 px-2 py-1 rounded-l-md hover:bg-gray-300 transition duration-200">
              -
            </button>
            <span class="bg-gray-100 px-4 py-1">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)" class="bg-gray-200 text-gray-800 px-2 py-1 rounded-r-md hover:bg-gray-300 transition duration-200">
              +
            </button>
            <button @click="removeItem(item)" class="ml-4 text-red-500 hover:text-red-700 transition duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <div class="mt-6">
          <div class="flex justify-between mb-2">
            <span class="font-semibold text-gray-600">Subtotal:</span>
            <span class="text-gray-800">${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="font-semibold text-gray-600">IGV (18%):</span>
            <span class="text-gray-800">${{ tax.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-xl font-bold">
            <span class="text-gray-800">Total:</span>
            <span class="text-green-600">${{ total.toFixed(2) }}</span>
          </div>
        </div>
        
        <button class="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
          Proceder al pago
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  
  interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    thumbnail: string;
  }
  
  const cartItems = ref<CartItem[]>([
    { id: 1, title: "Essence Mascara Lash Princess", price: 9.99, quantity: 2, thumbnail: "https://example.com/mascara.jpg" },
    { id: 2, title: "Eyeshadow Palette with Mirror", price: 19.99, quantity: 1, thumbnail: "https://example.com/eyeshadow.jpg" },
    
  ]);
  
  const subtotal = computed(() => {
    return cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
  });
  
  const tax = computed(() => subtotal.value * 0.18);
  
  const total = computed(() => subtotal.value + tax.value);
  
  const increaseQuantity = (item: CartItem) => {
    item.quantity++;
  };
  
  const decreaseQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      item.quantity--;
    }
  };
  
  const removeItem = (itemToRemove: CartItem) => {
    cartItems.value = cartItems.value.filter(item => item.id !== itemToRemove.id);
  };
  </script>