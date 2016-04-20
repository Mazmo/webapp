const LOAD = 'redux-example/notifications/LOAD';
const LOAD_SUCCESS = 'redux-example/notifications/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/notifications/LOAD_FAIL';

const initialState = {
  loaded: false,
  loading: false
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
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
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
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/users/alert')
  };
}
