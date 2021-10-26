import { ViteSSG } from 'vite-ssg';
import generatedRoutes from "virtual:generated-pages";
import { setupLayouts } from 'virtual:generated-layouts';
import App from './App.vue';
import './index.css';

const routes = setupLayouts(generatedRoutes);

export const createApp = ViteSSG(
    App,
    { routes },
)