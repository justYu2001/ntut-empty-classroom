import { ViteSSG } from 'vite-ssg'
import routes from "virtual:generated-pages";
import App from './App.vue'
import './index.css'

export const createApp = ViteSSG(
    App,
    { routes },
)