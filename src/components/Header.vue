<template>
  <nav class="center-column-aligned header">
    <span class="title-text">Star Wars Database</span>
    <div class="nav">
      <router-link
        v-for="resourceType in resourceTypes" :key="resourceType" class="nav-link hover-higlight"
        :to="{ name: 'resource-page', query: { page: 1 }, params: { resourceType } }">
        {{ resourceType.toUpperCase() }}
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppHeader',
  props: ['resourceTypes'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.header {
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10;
  background-color: black;
  width: 100vw;
  min-width: 700px;
}
.title-text {
  font-family: Star Jedi Rounded;
  font-size: 54px;
  color: gold;
}
.nav {
  padding: 10px;
}
.nav-link {
  padding: 8px;
  min-width: 130px;
  font-family: Arial;
  font-weight: 700;
  font-size: 18px;
  text-decoration: none;
  color: white;
  &:visited {
    color: white;
  }
}
</style>
