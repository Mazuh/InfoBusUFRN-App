import * as types from '../constants/action_types';

export function fetchEndpointsReferences() {
  return (dispatch, getState) => {
    const endpointsReferences = ['Em frente ao RU', 'Ao lado do Via Direta'];
    dispatch(setEndpointsReferences({endpointsReferences: endpointsReferences}));
  }
}

export function setEndpointsReferences({ endpointsReferences }) {
  return {
    type: types.SET_FOUND_ENDPOINTS_REFERENCES,
    endpointsReferences,
  }
}
