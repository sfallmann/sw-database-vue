import { SET_RESOURCES, SET_RESOURCES_META, SET_RESOURCE_TYPES } from './mutation-types';

export default {
  [SET_RESOURCES](state, payload) {
    const { type, resources, page } = payload;
    const stateResources = state.resources.find((r) => r.type === type);
    if (stateResources) {
      const filtered = stateResources.items.filter((i) => i.page !== page);
      stateResources.items = [...filtered, ...resources];
    } else {
      state.resources.push({ type, items: resources });
    }
  },
  [SET_RESOURCES_META](state, payload) {
    const { type, meta, page } = payload;
    const stateMeta = state.resourcesMeta.find((r) => r.type === type);
    if (stateMeta) {
      const filtered = stateMeta.items.filter((i) => i.page !== page);
      stateMeta.items = [...filtered, meta];
    } else {
      state.resourcesMeta.push({ type, items: [meta] });
    }
  },
  [SET_RESOURCE_TYPES](state, resourceTypes) {
    state.resourceTypes = resourceTypes;
  },
};
