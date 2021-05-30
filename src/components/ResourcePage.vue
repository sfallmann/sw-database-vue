<template>
  <div class="center-column-aligned">
      <ul class="center-column-aligned">
        <router-link v-for="resource in resources" :key="resource.name"
         :to="{
           name: `${$route.name}-details`,
           params: { name: resource.name || resource.title, url: resource.url }
          }">
          {{ resource.name || resource.title }}
        </router-link>
      </ul>
      <hr/>
      <router-link v-if="previous"
        :to="previous">
        Previous
      </router-link>
      <router-link v-if="next"
        :to="next">
        Next
      </router-link>
  </div>
</template>

<script>
export default {
  name: 'ResourcePage',
  computed: {
    next() {
      const meta = this.$store.getters.resourcesMeta[this.$route.name];
      const pageMeta = meta?.find((m) => m.page === this.page);

      if (pageMeta?.next) {
        return { name: this.$route.name, query: { page: this.page + 1 } };
      }
      return null;
    },
    previous() {
      const meta = this.$store.getters.resourcesMeta[this.$route.name];
      const pageMeta = meta?.find((m) => m.page === this.page);
      if (pageMeta?.previous) {
        return { name: this.$route.name, query: { page: this.page - 1 } };
      }
      return null;
    },
    resources() {
      console.log('computed resource');
      const resources = this.$store.getters.resources[this.$route.name];
      return resources?.filter((r) => r.page === this.page) ?? [];
    },
    page() {
      const page = this.$route.query?.page ?? 1;
      return Number(page);
    },
  },
  watch: {
    page: {
      immediate: true,
      handler() {
        this.$store.dispatch('FETCH_RESOURCES', { type: this.$route.name, page: this.page });
      },
    },
  },
};
</script>

<style lang="scss">

</style>
