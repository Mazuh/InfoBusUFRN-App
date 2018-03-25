import { DATA_GIST_ENDPOINT } from '../constants/gist';

export const retrieveFullDataObject = (webEndpoint) => (
  fetch(webEndpoint || DATA_GIST_ENDPOINT).then(
    (fetchedData) => fetchedData.json()
  ).catch((e) => console.log(e))
);
