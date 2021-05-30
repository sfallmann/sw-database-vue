import { SET_RESOURCES, SET_RESOURCES_META, SET_RESOURCE_TYPES } from './mutation-types';

export default {
  [SET_RESOURCES](state, payload) {
    const { type, resources } = payload;
    if (state.resources[type]) {
      state.resources[type].push(...resources);
    } else {
      state.resources[type] = [...resources];
    }
  },
  [SET_RESOURCES_META](state, payload) {
    const { type, meta } = payload;
    const storedMeta = state.resourcesMeta[type] ?? [];

    state.resourcesMeta[type] = [...storedMeta, meta];
  },
  [SET_RESOURCE_TYPES](state, resourceTypes) {
    state.resourceTypes = resourceTypes;
  },
};
