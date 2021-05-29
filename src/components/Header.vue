<template>
  <nav class="center-column-aligned">
    <span class="title-text">Star Wars Database</span>
    <div class="nav-links">
      <router-link  v-for="link in links" :key="link" class="nav-link"
        :to="{ name: link, params: { resourceType: link } }">
        {{ link.toUpperCase() }}
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppHeader',
  props: ['links'],
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
