<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <!-- Navbar -->
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/guests">Invitados</router-link></li>
        </ul>
        <div class="brand">Sebastian - <span>"Hacia las profundidades"</span></div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgb(255, 255, 255);
}

nav ul {
  display: flex;
  list-style-type: none;
  padding: 0;
}

nav ul li {
  margin-right: 1rem;
}

nav a {
  color: rgb(0, 0, 0);
  text-decoration: none;
  font-size: 1.25rem;
}

.brand {
  font-family: 'Dancing Script', cursive;
  color: var(--special);
  color: #000;
  font-size: 1.5rem;
}
</style>
