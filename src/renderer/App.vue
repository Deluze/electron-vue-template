<script setup lang="ts">
import Hello from './components/Hello.vue'

window.electronAPI.sendMessage('Hello from App.vue!');
</script>

<template>
  <div id="app">
    <Hello/>
  </div>
</template>
