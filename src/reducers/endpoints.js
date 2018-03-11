/**
 * About bus endpoints.
 */
import createReducer from '../lib/reducer_creation';
import * as types from '../constants/action_types';

export const endpoints = createReducer({}, {
  [types.SET_FOUND_ENDPOINTS_REFERENCES](state, action) {
    return {...state, endpointsReferences: action.endpointsReferences};
  },
});
