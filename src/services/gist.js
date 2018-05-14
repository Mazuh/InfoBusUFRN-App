import { DATA_GIST_ENDPOINT } from '../constants/gist';

export function retrieveFullDataObject(webEndpoint) {
  return fetch(webEndpoint || DATA_GIST_ENDPOINT).then(
    (fetchedData) => fetchedData.json()
  ).catch((e) => console.log(e))
};
