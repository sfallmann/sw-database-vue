import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';
import './styles/custom.scss';

Vue.config.productionTip = false;

(async function mountApp() {
  const resp = await fetch('https://swapi.dev/api/');
  const json = await resp.json();

  const resourceTypes = Object.keys(json).map((k) => k.toLowerCase());

  new Vue({
    router: createRouter(resourceTypes),
    store: createStore(resourceTypes),
    render: (h) => h(App),
  }).$mount('#app');
}());
