import { app as config } from '../../config';

const LOAD = 'mazmo/publications/LOAD';
const LOAD_SUCCESS = 'mazmo/publications/LOAD_SUCCESS';
const LOAD_FAIL = 'mazmo/publications/LOAD_FAIL';

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
  return globalState.publications && globalState.publications.loaded;
}

export function load() {
  return (dispatch, getState) => {
    return dispatch({
      types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
      promise: (client) => {
        const publications = getState().publications.data;
        let query = {
          q: config.publications.q
        };

        if (publications.length) {
          query = {
            ...query,
            id: publications[publications.length - 1].id
          };
        }

        return client.get('/feed', {
          params: query
        });
      }
    });
  };
}
