import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import notifications from './notifications';
import messages from './messages';
import publications from './publications';
import users from './users';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  auth,
  notifications,
  messages,
  publications,
  users
});
