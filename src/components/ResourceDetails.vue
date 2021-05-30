<template>
  <section class="resource-details scrollbar">
    <div v-for="entry in details" :key="entry.key" class='detail'>
      <p class="detail-key">{{ entry.label }}</p>
      <code
        class="detail-value">{{ entry.value }}</code>
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
    const resourceType = this.$store.getters.resourceTypes
      .find((r) => r.name === this.resourceType);
    try {
      const resp = await this.$store.dispatch('FETCH_RESOURCE_BY_NAME', { type: this.resourceType, name: this.resourceName });
      if (resp) {
        this.resource = resp;
      } else {
        this.$router.replace({ name: 'resource-page', params: { resourceType: resourceType.name, resourceName: '' }, query: { page: 1 } });
      }
    } catch (err) {
      this.$router.replace({ name: 'Home' });
    }
  },
  computed: {
    details() {
      return Object.entries(this.resource).filter(([key]) => !['created', 'edited', 'url', 'page'].includes(key))
        .map(([key, value]) => {
          const label = key.replace(/_/g, ' ');
          return { key, label, value };
        });
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
<style lang="scss">
  .resource-details {
    margin-left: 15px;
    margin-right: 15px;
    background-color: black;
    opacity: .9;
    padding: 15px;
    color: white;
    border-radius: 5px;
    box-shadow: 1px 1px 16px 10px rgba(164,253,255,0.79);
    overflow-y: auto;
    max-height: calc(100vh - 280px);
  }
  .detail {
    display: flex;
    text-align: left;
  }
  .detail-key {
    min-width: 240px;
    text-transform: capitalize;
  }
  .detail-value {
    color: $lightgreen;
  }
  .detail-value, .detail-key {
    margin: 0;
    padding: 5px 10px 5px 10px;
    font-size: 16px;
    font-weight: 700;
    text-align: left;
  }
</style>
