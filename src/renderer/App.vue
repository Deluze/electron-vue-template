<script setup lang="ts">
import Hello from './components/Hello.vue'

window.electron.ipcRenderer.send('message', 'Hello from App.vue!');
</script>

<template>
  <div id="app">
    <Hello/>
  </div>
</template>
