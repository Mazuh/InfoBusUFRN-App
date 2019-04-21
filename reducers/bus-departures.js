const initialState = {
  isFetching: false,
  busEndpoints: [],
  supportedAppVersions: [],
  appMessage: {},
  appUpdateWarning: {},
  selectedReference: null,
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case '@DEPARTURES/START_FETCHING':
      return { ...state, isFetching: true, error: false };
    case '@DEPARTURES/SET_FAILED':
      return { ...state, isFetching: false, error: payload || '?' };
    case '@DEPARTURES/SET_FETCHED':
      return {
        ...state,
        isFetching: false,
        error: false,
        busEndpoints: payload.busEndpoints,

      };
    case '@DEPARTURES/SELECT_REFERENCE':
      return {
        ...state,
        selectedReference: state.busEndpoints.find(it => it.reference === payload) || null,
      };
    case '@DEPARTURES/UNSELECT_REFERENCE':
      return { ...state, selectedReference: null };
    default:
      return state;
  }
};
