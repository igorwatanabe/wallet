import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducers';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// store.subscribe(() => console.log('store foi modificada', store.getState()));

if (window.Cypress) {
  window.store = store;
}
export default store;
