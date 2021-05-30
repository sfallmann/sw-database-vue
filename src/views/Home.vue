<template>
  <div class="home" v-if="resourceTypes.length">
      <app-header :resourceTypes="resourceTypes"  />
      <div class="app-content">
        <div class="center-column-aligned" v-show="$route.name ==='Home'">
          Some message can go here
        </div>
        <router-view :key="$route.fullPath"/>
      </div>
  </div>
</template>

<script>
import AppHeader from '@/components/Header.vue';

export default {
  name: 'Home',
  components: {
    AppHeader,
  },
  computed: {
    resourceTypes() {
      return this.$store.getters.resourceTypes
        .map((r) => r.name);
    },
  },
};
</script>
<style lang="scss">
.home {
  min-width: 700px;
}
.app-content {
  padding-top: 160px;
}
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
