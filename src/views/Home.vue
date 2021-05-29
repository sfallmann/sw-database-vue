<template>
  <div class="home">
      <app-header :links="links" />
      <hr />
      <div class="center-column-aligned" v-show="$route.name ==='Home'">
        Some message can go here
      </div>
      <router-view :key="$route.name"/>
  </div>
</template>

<script>
import AppHeader from '@/components/Header.vue';
import { RESOURCES } from '../constants';

export default {
  name: 'Home',
  components: {
    AppHeader,
  },
  data() {
    return {
      links: RESOURCES,
    };
  },
};
</script>
<style lang="scss">

.nav-button {
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  margin: 5px;
  padding: 5px;
  width: 200px;
  border-radius: 2px;
  color: black;
  background-color: yellow;
  border: 2px solid black;
  &:hover {
    background-color: lighten(yellow, 35%);
  }
  &:active {
    transform: scale(.95,.95);
  }
}
</style>
