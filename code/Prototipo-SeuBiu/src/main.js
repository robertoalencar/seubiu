import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = 'http://localhost:3020';


const router = new VueRouter({ routes,
 mode: 'history' });

import { store } from './store';

new Vue({
  el: '#app',
   router,
   store,
  render: h => h(App)
})
