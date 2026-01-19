import { createMemoryHistory, createRouter } from 'vue-router'

import Home from "./views/home/Home.vue";
import Experiences from "./views/experiences/Experiences.vue";
import Projects from "./views/projects/Projects.vue";
import About from "./views/contact/About.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/experiences", component: Experiences },
    { path: "/projects", component: Projects },
    { path: "/about", component: About },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
});