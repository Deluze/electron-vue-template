<template>
  <div id="app">
    <hello></hello>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Hello from './components/Hello.vue'
import { ipcRenderer } from '@/electron';


export default defineComponent({
  name: 'app',
  components: {
    Hello,
  },
  setup() {
    ipcRenderer.send('message', 'Hello from App.vue!');
  },
})
</script>
