import { AsyncStorage } from 'react-native';

import { STORE_KEY_FOR_DATA_GIST } from './constants';

const gistData = JSON.parse(gistResponse.files['infobus_data.json'].content);

        
console.log('Stored a new data on ' + DATA_STORE_KEY);

export function save(storeKey) {
  return AsyncStorage.setItem(storeKey || STORE_KEY_FOR_DATA_GIST, null);
}
