import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import Home from './views/Home.vue'
import Calibrate from './views/Calibrate.vue'
import Capture from './views/Capture.vue'
import { isStandalone } from './stores/pwaUtils'

const vuetify = createVuetify({
    components,
    directives,
})

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                requiresPWA: false,
            }
        },
        {
            path: '/calibrate',
            name: 'calibrate',
            component: Calibrate,
            meta: {
                requiresPWA: true,
            }
        },
        {
            path: '/capture',
            name: 'capture',
            component: Capture,
            meta: {
                requiresPWA: true
            }
        }
    ]
})

router.beforeEach((to, _, next) => {
    if (to.meta.requiresPWA && !isStandalone()) {
        next({name: 'home'});
    } else if (to.name == 'home' && isStandalone()) {
        next({name: 'capture'});
    } else {
        next();
    }
});

const app = createApp(App);
app.use(vuetify);
app.use(router).mount('#app');
