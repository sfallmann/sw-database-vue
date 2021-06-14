<template>
  <div class="center-column-aligned">
    <section class="resources-page-content ">
      <div class="data scrollbar" v-if="!loading">
        <ul class="center-column-aligned">
          <router-link v-for="resource in resources"
            :key="resource.name" class="resource-link hover-higlight"
          :to="{
            name: 'resource-details',
            params: { resourceName: resource.name || resource.title, resourceType }
            }">
            {{ resource.name || resource.title }}
          </router-link>
        </ul>
      </div>
      <div v-else class="loading">LOADING...</div>
    </section>

    <footer class='pagination'>
      <div class="previous">
        <router-link
          :to="previous"
          v-if="previous"
        >
          Previous
        </router-link>
      </div>

      <div class="page-num">Page {{ page }}</div>
      <div class="next">
        <router-link
          :to="next"
          v-if="next"
        >
          Next
        </router-link>
      </div>

    </footer>
  </div>
</template>

<script>

export default {
  name: 'ResourcePage',
  data() {
    return {
      loading: false,
    };
  },
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
      async handler() {
        this.loading = true;
        try {
          await this.$store.dispatch('FETCH_RESOURCES', { type: this.resourceType, page: this.page });
          this.loading = false;
        } catch (err) {
          this.loading = false;
          this.$router.replace({ name: 'Home' });
        }
      },
    },
  },
};
</script>

<style lang="scss">
ul {
  padding: 0;

}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-25%, -25%);
  color: gold;
  font-size: 24px;
}
.pagination {
  background-color: black;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px 0 10px 0;
  width: 100%;
  min-width: 700px;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  align-self: end;
  display: flex;
  color: white;
  font-family: Star Jedi;
  font-size: 18px;
}
.page-num {
  text-align: center;
}
.next, .previous {
  padding: 10px;
  width: 100px;
  text-align: center;
  color: white;
  a {
    text-decoration: none;
    &:visited {
      color: white;
    }
  }

}
.data {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-content: space-center;
    max-height: calc(100vh - 280px);
  overflow-y: auto;
}
.resources-page-content {
  position: relative;
  opacity: .9;
  background: black;
  min-width: 450px;
  width: 60vw;
  border-radius: 5px;
  box-shadow: 1px 1px 16px 10px rgba(164,253,255,0.79);

}
.resource-link {
  color: white;
  text-decoration: none;
  transition: transform .1s;
  &:visited {
    color: white;
  }
  &:hover {
    transform: scale(1.25)
  }
  font-weight: 700;
  padding: 8px;
  text-align: left;
}
</style>
