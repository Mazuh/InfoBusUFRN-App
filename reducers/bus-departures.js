const initialState = {
  isFetching: false,
  busEndpoints: [],
  supportedAppVersions: [],
  appMessage: {},
  appUpdateWarning: {},
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case '@DEPARTURES/START_FETCHING':
      return { ...state, isFetching: true, error: false };
    case '@DEPARTURES/SET_FAILED':
      return { ...state, isFetching: false, error: payload || true };
    case '@DEPARTURES/SET_FETCHED':
      return {
        ...state,
        isFetching: false,
        error: false,
        busEndpoints: payload.busEndpoints,

      };
    default:
      return state;
  }
};
