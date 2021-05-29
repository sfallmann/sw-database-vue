import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import ResourcePage from '../components/ResourcePage.vue';
import ResourceDetails from '../components/ResourceDetails.vue';
import { RESOURCES } from '../constants';

Vue.use(VueRouter);

const ResourcePageRoutes = RESOURCES
  .map((resource) => ({
    path: `/${resource}`, name: resource, component: ResourcePage, props: true,
  }));
const resourceDetailsRoutes = RESOURCES
  .map((resource) => ({
    path: `/${resource}/:name`, name: `${resource}-details`, component: ResourceDetails, props: true,
  }));

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [...ResourcePageRoutes, ...resourceDetailsRoutes],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
