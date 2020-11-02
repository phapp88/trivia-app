import { createStore } from 'redux';
import triviaReducer from './reducers/triviaReducer';

const store = createStore(triviaReducer);

export default store;
