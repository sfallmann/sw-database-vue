<template>
  <nav class="center-column-aligned">
    <span class="title-text">Star Wars Database</span>
    <div class="nav-links">
      <router-link  v-for="resourceType in resourceTypes" :key="resourceType" class="nav-link"
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
<style scoped lang="scss">
.title-text {
  font-family: Star Jedi Rounded;
  font-size: 44px;
}
.nav-link {
  margin-right: 10px;
}
</style>
