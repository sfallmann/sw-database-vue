<template>
  <div class="center-column-aligned">
      <ul class="center-column-aligned">
        <router-link v-for="resource in resources" :key="resource.name"
         :to="{
           name: 'resource-details',
           params: { resourceName: resource.name || resource.title, resourceType }
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
      if (this.pageMeta?.next) {
        return { name: 'resource-page', params: { resourceType: this.resourceType }, query: { page: this.page + 1 } };
      }
      return null;
    },
    previous() {
      if (this.pageMeta?.previous) {
        return { name: 'resource-page', params: { resourceType: this.resourceType }, query: { page: this.page - 1 } };
      }
      return null;
    },
    resources() {
      return this.$store.getters.resources
        .find((r) => r.type === this.resourceType)?.items.filter((r) => r.page === this.page) ?? [];
    },
    resourceType() {
      return this.$route.params.resourceType;
    },
    pageMeta() {
      return this.$store.getters.resourcesMeta
        .find((m) => m.type === this.resourceType)?.items.find((m) => m.page === this.page);
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
        this.$store.dispatch('FETCH_RESOURCES', { type: this.resourceType, page: this.page });
      },
    },
  },
};
</script>

<style lang="scss">

</style>
