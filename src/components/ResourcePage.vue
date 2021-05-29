<template>
  <div class="center-column-aligned">
      <ul class="center-column-aligned">
        <router-link v-for="resource in resources" :key="resource.name"
         :to="{
           name: `${resourceType}-details`,
           params: { name: resource.name, url: resource.url }
          }">
          {{ resource.name }}
        </router-link>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'ResourcePage',
  props: ['resourceType'],
  data() {
    return {
      resources: [],
    };
  },
  async mounted() {
    const resp = await fetch(`https://swapi.dev/api/${this.resourceType}`);
    const { results } = await resp.json();
    this.resources = results;
  },
};
</script>

<style lang="scss">

</style>
