import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap"
import '@fortawesome/fontawesome-free/css/all.css';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'; // Importar los estilos de los iconos

const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'dark',
    },
    icons: {
      iconfont: 'mdi', // 'mdi' | 'mdiSvg' | 'md' | 'fa' | 'fa4'
    },
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia).use(router).use(vuetify).mount('#app')
