import { createStore } from 'redux';
import busDeparturesReducer from './reducers/bus-departures';

const store = createStore(busDeparturesReducer);

export default store;
