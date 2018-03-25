import * as types from '../constants/action_types';
import { retrieveFullDataObject } from '../services/gist';
import { DATA_GIST_ENDPOINT } from '../constants/gist';

export function setEndpointsReferences(endpointsReferences) {
  return {
    type: types.SET_ENDPOINTS_REFERENCES,
    endpointsReferences,
  }
}
