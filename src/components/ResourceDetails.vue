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
    const resp = await fetch(this.url);
    this.resource = await resp.json();
  },
  computed: {
    details() {
      return Object.entries(this.resource).filter(([key]) => !['created', 'edited', 'url'].includes(key))
        .map(([key, value]) => ({ key, value }));
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
