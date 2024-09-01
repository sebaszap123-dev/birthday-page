<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4">
      <nav class="flex justify-between items-center py-4">
        <div class="brand text-xl sm:text-2xl font-cursive text-primary">
          Sebastian - <span class="text-tertiary">"Hacia las profundidades"</span>
        </div>

        <!-- Hamburger menu button -->
        <button @click="toggleMenu" class="sm:hidden text-primary">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        <!-- Desktop menu -->
        <ul class="hidden sm:flex space-x-4">
          <li>
            <RouterLink to="/" class="text-primary hover:text-tertiary transition-colors"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/guests" class="text-primary hover:text-tertiary transition-colors"
              >Invitados</RouterLink
            >
          </li>
        </ul>
      </nav>

      <!-- Mobile menu -->
      <div v-if="isMenuOpen" class="sm:hidden">
        <ul class="py-2">
          <li class="py-2">
            <RouterLink
              @click="toggleMenu"
              to="/"
              class="block text-primary hover:text-tertiary transition-colors"
              >Home</RouterLink
            >
          </li>
          <li class="py-2">
            <RouterLink
              @click="toggleMenu"
              to="/guests"
              class="block text-primary hover:text-tertiary transition-colors"
              >Invitados</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </header>
  <body>
    <RouterView />
  </body>
</template>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
