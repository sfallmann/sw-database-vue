import { FETCH_RESOURCES, FETCH_RESOURCE_BY_NAME, FETCH_RESOURCE_TYPES } from './action-types';
import { SET_RESOURCES, SET_RESOURCES_META, SET_RESOURCE_TYPES } from './mutation-types';

export default {
  async [FETCH_RESOURCES]({ commit, state }, payload) {
    const { type, page } = payload;
    const cached = state.resources[type] && state.resources[type].filter((r) => r.page === page);
    console.log('cached', cached);
    if (cached?.length) {
      console.log('cached has length');
      return cached;
    }
    console.log('cached does not have length');
    const resp = await fetch(`https://swapi.dev/api/${type}/?page=${page}`);
    const { results, next, previous } = await resp.json();
    const resources = results.map((r) => ({ ...r, page }));
    commit(SET_RESOURCES, { type, page, resources });
    commit(SET_RESOURCES_META, { type, meta: { page, next: !!next, previous: !!previous } });
    return resources;
  },
  async [FETCH_RESOURCE_BY_NAME]({ state }, payload) {
    const { type, name } = payload;
    const cached = state.resources[type] && state.resources[type].find((r) => r.name === name);
    if (cached) {
      return cached;
    }

    const resp = await fetch(`https://swapi.dev/api/${type}/?name=${name}`);
    const { results } = await resp.json();
    return results[0];
  },
  async [FETCH_RESOURCE_TYPES]({ commit }) {
    const resp = await fetch('https://swapi.dev/api/');
    const json = await resp.json();

    commit(SET_RESOURCE_TYPES, Object.keys(json).map((k) => k.toLowerCase()));
  },
};
