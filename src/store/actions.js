import { FETCH_RESOURCES, FETCH_RESOURCE_BY_NAME, FETCH_RESOURCE_TYPES } from './action-types';
import { SET_RESOURCES, SET_RESOURCES_META, SET_RESOURCE_TYPES } from './mutation-types';

const FIVE_MIN = 1000 * 60 * 5;

export default {
  async [FETCH_RESOURCES]({ commit, state }, payload) {
    const { type, page } = payload;
    const cachedResource = state.resources
      .find((r) => r.type === type)?.items.filter((r) => r.page === page);
    const cachedMeta = state.resourcesMeta
      .find((r) => r.type === type)?.items.find((r) => r.page === page);
    const expired = cachedMeta?.timestamp <= new Date().getTime() - FIVE_MIN;

    if (!cachedResource?.length || expired) {
      const resourceType = state.resourceTypes.find((r) => r.name === type);

      if (resourceType?.url) {
        const resp = await fetch(`${resourceType.url}?page=${page}`);

        if (resp.status < 400) {
          const json = await resp.json();
          const { results, next, previous } = json;

          const resources = results.map((r) => ({ ...r, page }));

          commit(SET_RESOURCES, { type, page, resources });
          commit(
            SET_RESOURCES_META,
            {
              type,
              page,
              meta:
            {
              page, next: !!next, previous: !!previous, timestamp: new Date().getTime(),
            },
            },
          );
        } else {
          const error = new Error(`Status code ${resp.status}; could not complete that request`);
          error.code = resp.status;
          throw (error);
        }
      } else {
        throw new Error('The resource you are looking for does not exist');
      }
    }
  },
  async [FETCH_RESOURCE_BY_NAME]({ state }, payload) {
    const { type, name } = payload;

    const cached = state.resources
      .find((r) => r.type === type)?.items.find((r) => r.name === name);

    if (cached) {
      return cached;
    }
    const resourceType = state.resourceTypes.find((r) => r.name === type);

    if (resourceType?.url) {
      const resp = await fetch(`${resourceType.url}?search=${name}`);

      if (resp.status < 400) {
        const { results } = await resp.json();
        return results[0];
      }
      const error = new Error(`Status code ${resp.status}; could not complete that request`);
      error.code = resp.status;
      throw (error);
    }
    throw new Error('The resource you are looking for does not exist');
  },
  async [FETCH_RESOURCE_TYPES]({ commit }) {
    const resp = await fetch('https://swapi.dev/api/');
    const json = await resp.json();

    commit(SET_RESOURCE_TYPES, Object.entries(json).map(([key, value]) => ({
      name: key.toLowerCase(),
      url: value,
    })));
  },
};
