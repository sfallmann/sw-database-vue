import RESOURCES from '../constants';

export default RESOURCES.reduce((stateObj, type) => {
  const { resources, resourcesMeta } = stateObj;
  resources[type] = [];
  resourcesMeta[type] = [];
  return stateObj;
}, { resources: {}, resourcesMeta: {}, resourceTypes: [] });
