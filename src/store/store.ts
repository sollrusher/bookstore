/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from './reducer';
import { initUser } from './user/user.action';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
console.log(store.getState());
if (store.getState().user.initialized) {
  store.dispatch(initUser());
}

export default store;
