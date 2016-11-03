import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  App,
  Home,
  Landing,
  Compose,
  ProfileContainer,
  ProfileInfo,
  ProfileAlbums,
  Messenger,
  NotFound
} from 'containers';
import MessengerNew from 'containers/Messenger/New';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute getComponent={(nextState, cb) => {
        function isAuth() {
          const { auth: { user }} = store.getState();
          if (!user) {
            cb(null, Landing);
          } else {
            cb(null, Home);
          }
        }

        if (!isAuthLoaded(store.getState())) {
          store.dispatch(loadAuth()).then(isAuth);
        } else {
          isAuth();
        }
      }} />

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="compose" component={Compose} />
        <Route path="messenger/new" component={MessengerNew} />
        <Route path="messenger/:id" component={Messenger} />
      </Route>

      { /* Routes */ }
      <Route path="/:username" component={ProfileContainer}>
        <IndexRoute component={ProfileInfo} />
        <Route path="/:username/info" component={ProfileInfo} />
        <Route path="/:username/albums" component={ProfileAlbums} />
      </Route>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
