import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

// eslint-disable-next-line import/prefer-default-export
export function createStore(resourceTypes) {
  return new Vuex.Store({
    state: resourceTypes.reduce((stateObj, type) => {
      const { resources, resourcesMeta } = stateObj;
      resources[type] = [];
      resourcesMeta[type] = [];
      return stateObj;
    }, { resources: {}, resourcesMeta: {}, resourceTypes }),
    mutations,
    actions,
    getters,
  });
}
