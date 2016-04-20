import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import notifications from './notifications';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  auth,
  notifications,
});
