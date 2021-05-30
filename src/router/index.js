import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import ResourcePage from '../components/ResourcePage.vue';
import ResourceDetails from '../components/ResourceDetails.vue';

Vue.use(VueRouter);

// eslint-disable-next-line import/prefer-default-export
export function createRouter(resources) {
  const resourcePageRoutes = resources
    .map((resource) => ({
      path: `/${resource}`, name: resource, component: ResourcePage,
    }));
  const resourceDetailsRoutes = resources
    .map((resource) => ({
      path: `/${resource}/:name`, name: `${resource}-details`, component: ResourceDetails,
    }));

  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        children: [...resourcePageRoutes, ...resourceDetailsRoutes],
      },
    ],
  });
}
