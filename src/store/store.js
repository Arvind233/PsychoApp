import { createStore } from 'redux';
import cartReducer from '../reducers/rootReducer';

const store = createStore(cartReducer);

export default store;
