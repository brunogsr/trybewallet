import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducers/index';

const store = createStore(rootReducer, composeWithDevTools());

export default store;

// https://gist.github.com/ANDREHORMAN1994/dbcd4e60b0737a70f819c7dfab4c02b5

if (window.Cypress) {
  window.store = store;
}
