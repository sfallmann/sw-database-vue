import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import ResourcePage from '../components/ResourcePage.vue';
import ResourceDetails from '../components/ResourceDetails.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/:resourceType',
          name: 'resource-page',
          component: ResourcePage,
        },
        {
          path: '/:resourceType/:resourceName',
          name: 'resource-details',
          component: ResourceDetails,
        },
      ],
    },

  ],
});
