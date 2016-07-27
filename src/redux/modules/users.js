const LOAD = 'mazmo/users/LOAD';
const LOAD_SUCCESS = 'mazmo/users/LOAD_SUCCESS';
const LOAD_FAIL = 'mazmo/users/LOAD_FAIL';

const ADD_USERS = 'mazmo/users/ADD_USERS';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        [action.username]: {
          loading: true
        }
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        [action.username]: {
          loading: false,
          ...action.result
        }
      };
    case LOAD_FAIL:
      return {
        ...state,
        [action.username]: {
          loading: false,
          laodError: action.error
        }
      };
    case ADD_USERS:
      return {
        ...state,
        ...action.result
      };
    default:
      return state;
  }
}

export const isLoaded = (globalState, username) => (globalState.users && globalState.users[username]);

export const load = (username) => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  username,
  promise: (client) => client.get(`/users/${username}`)
});

export const add = (users) => {
  const result = {};
  users.map((user) => {
    result[user.username] = user;
  });
  return { type: ADD_USERS, result };
};
