const initialState = {
  isFetching: false,
  departures: [],
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case 'START_FETCHING_DEPARTURES':
      return { ...state, isFetching: true, };
    case 'SET_FETCHED_DEPARTURES':
      return { ...state, isFetching: false, departures: payload };
    default:
      return state;
  }
};
