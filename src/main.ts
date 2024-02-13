import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import { router } from '@/router'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { vuetifyProTipTap } from './plugins/tiptap'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

loadFonts()

// Create vue app
const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

// Use plugins
app.use(vuetify)
app.use(pinia)
app.use(router)
app.use(vuetifyProTipTap)
app.use(Vue3Toastify, {
  autoClose: 4500,
} as ToastContainerOptions);

// fix warning injected property "decorationClasses" is a ref and will be auto-unwrapped
// https://github.com/ueberdosis/tiptap/issues/1719
// app.config.unwrapInjectedRef = true

// Mount vue app
app.mount('#app')
