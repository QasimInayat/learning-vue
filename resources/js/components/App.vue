<template>
  <div class="p-6">
    <nav class="mb-4 space-x-4">
      <router-link to="/">Home</router-link>
      <router-link to="/todos">Todos</router-link>
      <router-link to="/about">About Us</router-link>

    </nav>

    <router-view />
  </div>
</template>
