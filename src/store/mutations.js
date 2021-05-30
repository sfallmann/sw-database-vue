import { SET_RESOURCES, SET_RESOURCES_META, SET_RESOURCE_TYPES } from './mutation-types';

export default {
  [SET_RESOURCES](state, payload) {
    const { type, resources } = payload;
    const stateResources = state.resources.find((r) => r.type === type);
    if (stateResources) {
      stateResources.items.push(...resources);
    } else {
      state.resources.push({ type, items: resources });
    }
  },
  [SET_RESOURCES_META](state, payload) {
    const { type, meta } = payload;
    const stateMeta = state.resourcesMeta.find((r) => r.type === type);
    if (stateMeta) {
      stateMeta.items.push(meta);
    } else {
      state.resourcesMeta.push({ type, items: [meta] });
    }
  },
  [SET_RESOURCE_TYPES](state, resourceTypes) {
    state.resourceTypes = resourceTypes;
  },
};
