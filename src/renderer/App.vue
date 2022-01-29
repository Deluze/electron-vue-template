<template>
  <div id="app">
    <hello></hello>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Hello from './components/Hello.vue'
// import { ipcRenderer } from '@/electron'; //this is the file in /src/renderer/electron.ts, the vite config sets this path, might just have to reference by path like the component?
import { ipcRenderer } from './electron';

export default defineComponent({
  name: 'app',
  components: {
    Hello,
  },
  setup() {
    ipcRenderer.send('message', 'Hello from App.vue!!!!');
  },
})
</script>
