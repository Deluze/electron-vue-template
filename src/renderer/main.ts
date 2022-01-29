import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

let test: string = "huh";
console.log(test);

app.mount('#app');
