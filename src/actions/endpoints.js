import * as types from '../constants/action_types';
import { retrieveAllSchedules } from '../services/gist';
import { DATA_GIST_ENDPOINT } from '../constants/gist';

export function fetchEndpointsReferences() {
  return (dispatch, getState) => {
    retrieveAllSchedules(DATA_GIST_ENDPOINT).then((data) => {
      dispatch(setEndpointsReferences({ endpointsReferences: JSON.stringify(data) }));
    });
  }
}

export function setEndpointsReferences({ endpointsReferences }) {
  return {
    type: types.SET_FOUND_ENDPOINTS_REFERENCES,
    endpointsReferences,
  }
}
