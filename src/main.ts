import { ViteSSG } from 'vite-ssg';
import { createPinia } from 'pinia';
import generatedRoutes from "virtual:generated-pages";
import { setupLayouts } from 'virtual:generated-layouts';
import App from './App.vue';
import './index.css';

const routes = setupLayouts(generatedRoutes);

export const createApp = ViteSSG(
    App,
    { routes },
    ({ app, initialState }) => {
        const pinia = createPinia();
        app.use(pinia);
    
        if (import.meta.env.SSR) {
            initialState.pinia = pinia.state.value
        } else {
            pinia.state.value = initialState.pinia || {}
        }
    },
);