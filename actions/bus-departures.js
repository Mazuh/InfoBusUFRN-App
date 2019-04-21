import axios from 'axios';

const DEPARTURES_DATA_GIST_URL = 'https://gist.githubusercontent.com/Mazuh/e10c07f1abb580c143557d8ed8427bbd/raw/2a227ea93d5ea6bb06210dbc5bfb896f737a71ea/infobus_data.json';

function parseGistResponse(response) {
  const { data: { meta, content } } = response;
  return {
    supportedAppVersions: meta.supportedMobileVersions,
    busEndpoints: content.busEndpoints,
    appMessage: content.mobileMessage,
    appUpdateWarning: content.mobileUpdateWarning,
  };
}

export const fetchDepartures = () => (dispatch) => {
  dispatch({ type: '@DEPARTURES/START_FETCHING' });
  axios.get(DEPARTURES_DATA_GIST_URL)
    .then(parseGistResponse)
    .then(payload => dispatch({ type: '@DEPARTURES/SET_FETCHED', payload }))
    .catch(error => dispatch({ type: '@DEPARTURES/SET_FAILED', payload: error }));
};

export const selectReference = reference => ({
  type: '@DEPARTURES/SELECT_REFERENCE',
  payload: reference,
});

export const unselectReference = () => ({ type: '@DEPARTURES/UNSELECT_REFERENCE' });
