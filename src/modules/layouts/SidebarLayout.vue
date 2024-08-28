<template>
  <!-- component -->
    <div class="flex">
      <div
        @mouseenter="expanded = true"
        @mouseleave="expanded = false"
        class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[100vh] p-4 shadow-xl shadow-blue-gray-900/5 transition-all duration-500 ease-in-out overflow-hidden"
        :class="expanded ? 'max-w-[20rem]' : 'w-20'"
      >
        <div class="mb-2 p-4 flex items-center justify-center">
          <h5
            class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900"
          >
              <img 
                :class="expanded ? 'w-44' : 'w-[4.5rem]'" 
                :src="expanded ? 'https://i.postimg.cc/ZKJnSw77/inventory-high-resolution-logo-black-transparent.png' : 'https://i.postimg.cc/mZQTX7wb/logo.png'"
                alt="" 
                class="transition-all duration-500"
              >
          </h5>
        </div>
        <nav
          class="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700 flex-grow"
        >
          <RouterLink to="/nuevoproducto"> 
            <div
              class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <div class="grid place-items-center mr-4">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M15 12H12M12 12H9M12 12V9M12 12V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              <span v-show="expanded" class="transition-opacity duration-500" :class="{ 'opacity-0': !expanded, 'opacity-100': expanded }">
                Insertar Producto
              </span>
            </div>
          </RouterLink>

          <RouterLink to="/inventario"> 
            <div
              class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <div class="grid place-items-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  class="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <span v-show="expanded" class="transition-opacity duration-500" :class="{ 'opacity-0': !expanded, 'opacity-100': expanded }">
                Inventario
              </span>
            </div>
          </RouterLink>

          <RouterLink to="/ventas">
            <div
              class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <div class="grid place-items-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  class="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <span v-show="expanded" class="transition-opacity duration-500" :class="{ 'opacity-0': !expanded, 'opacity-100': expanded }">
                Ventas
              </span>
            </div>
          </RouterLink>
        </nav>

        <div
          role="button"
          tabindex="0"
          class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-red-50 hover:bg-opacity-80 focus:bg-red-50 focus:bg-opacity-80 active:bg-red-50 active:bg-opacity-80 hover:text-red-900 focus:text-red-900 active:text-red-900 outline-none mt-auto text-red-600"
        >
          <div class="grid place-items-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              class="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <span v-show="expanded" class="transition-opacity duration-500" :class="{ 'opacity-0': !expanded, 'opacity-100': expanded }">
            Log Out
          </span>
        </div>
      </div>

      <main class="flex-1">
        <router-view>
        </router-view>
      </main>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const expanded = ref(false);
</script>