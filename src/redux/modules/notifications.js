import { app as config } from '../../config';

const LOAD = 'redux-example/notifications/LOAD';
const LOAD_SUCCESS = 'redux-example/notifications/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/notifications/LOAD_FAIL';

const initialState = {
  loaded: false,
  loading: false,
  data: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: state.data.concat(action.result)
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.notifications && globalState.notifications.loaded;
}

export function load() {
  return (dispatch, getState) => {
    return dispatch({
      types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
      promise: (client) => {
        const notifications = getState().notifications.data;
        let query = {
          q: config.notifications.q
        };

        if (notifications.length) {
          query = {
            ...query,
            after: notifications[notifications.length - 1].id,
          };
        }

        return client.get('/users/alerts', {
          params: query
        });
      }
    });
  };
}
