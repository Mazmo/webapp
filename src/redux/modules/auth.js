import { add as addToUsers } from 'redux/modules/users';

const LOAD = 'mazmo/auth/LOAD';
const LOAD_SUCCESS = 'mazmo/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'mazmo/auth/LOAD_FAIL';

const LOGIN = 'mazmo/auth/LOGIN';
const LOGIN_SUCCESS = 'mazmo/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'mazmo/auth/LOGIN_FAIL';

const LOGOUT = 'mazmo/auth/LOGOUT';
const LOGOUT_SUCCESS = 'mazmo/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'mazmo/auth/LOGOUT_FAIL';

const initialState = {
  loaded: false,
  loggingIn: false,
  loggingOut: false
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
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

function doLogin(client, dispatch, data) {
  return client.post('/login', {
    data
  }).then((result) => {
    if (__CLIENT__) {
      document.cookie = 'phpsessid=' + result.sessid;
      document.cookie = 'jwt=' + result.jwt;
    }

    const users = [];
    Object.keys(result.follow_lists).map((i) => {
      Object.keys(result.follow_lists[i].users).map((j) => {
        users.push(result.follow_lists[i].users[j]);
      });
    });
    dispatch(addToUsers(users));

    return result;
  });
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return (dispatch) => {
    return dispatch({
      types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
      promise: (client) => {
        if (client.getReq()) {
          const phpsessid = client.getReq().cookies.phpsessid;
          const jwt = client.getReq().cookies.jwt;

          if (phpsessid || jwt) {
            const data = {
              phpsessid,
              jwt
            };
            return doLogin(client, dispatch, data);
          }
        }

        return Promise.resolve();
      }
    });
  };
}

export function login(username, password) {
  return (dispatch) => {
    return dispatch({
      types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
      promise: (client) => {
        const data = {
          username,
          password
        };
        return doLogin(client, dispatch, data);
      }
    });
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: () => {
      if (__CLIENT__) {
        document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
        document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
        document.cookie = 'password=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
        document.cookie = 'phpsessid=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
      }
      return Promise.resolve();
    }
  };
}
