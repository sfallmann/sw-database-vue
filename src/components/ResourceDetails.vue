<template>
  <section class="resource-details">
    <div v-for="entry in details" :key="entry.key" class='detail'>
      <div class="detail-key">{{ entry.key }}</div>: <div>{{ entry.value }}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ResourceDetails',
  data() {
    return {
      resource: {},
    };
  },
  props: ['url'],
  async mounted() {
    this.resource = await this.$store.dispatch('FETCH_RESOURCE_BY_NAME', { type: this.resourceType, name: this.resourceName });
  },
  computed: {
    details() {
      return Object.entries(this.resource).filter(([key]) => !['created', 'edited', 'url', 'page'].includes(key))
        .map(([key, value]) => ({ key, value }));
    },
    resourceType() {
      return this.$route.params.resourceType;
    },
    resourceName() {
      return this.$route.params.resourceName;
    },
  },
};
</script>
<style scoped lang="scss">
  .detail {
    display: flex;
  }
  .detail-key {
    text-align: left;
    width: 200px;
  }
</style>
