import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import pictureReducer from './reducers/picture_reducer';

const middleware = [thunk];

const rootReducer = combineReducers({
	pictureReducer,
});

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
