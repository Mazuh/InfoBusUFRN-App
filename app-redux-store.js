import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import busDeparturesReducer from './reducers/bus-departures';

const store = createStore(busDeparturesReducer, applyMiddleware(thunk));

export default store;
