import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Products from "./components/Products";
import Cart from "./components/Cart";

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Products
        },
        {
            path: '/warenkorb',
            component: Cart
        }
    ],
    mode: 'history'
});

new Vue({
    router,
  render: h => h(App),
}).$mount('#app')
