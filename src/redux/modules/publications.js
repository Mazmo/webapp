import { app as config } from '../../config';

const LOAD = 'mazmo/publications/LOAD';
const LOAD_SUCCESS = 'mazmo/publications/LOAD_SUCCESS';
const LOAD_FAIL = 'mazmo/publications/LOAD_FAIL';

const CREATE_COMMENT = 'mazmo/publications/CREATE_COMMENT';
const CREATE_COMMENT_SUCCESS = 'mazmo/publications/CREATE_COMMENT_SUCCESS';
const CREATE_COMMENT_FAIL = 'mazmo/publications/CREATE_COMMENT_FAIL';

const initialState = {
  loaded: false,
  loading: false,
  creatingComment: false,
  data: []
};

export default function reducer(state = initialState, action = {}) {
  function getIndex(publicationId) {
    let index = 0;
    state.data.map((publication, i) => {
      if (publication.id === publicationId) {
        index = i;
      }
    });

    return index;
  }

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
    case CREATE_COMMENT:
      return {
        ...state,
        creatingComment: true
      };
    case CREATE_COMMENT_SUCCESS:
      const index = getIndex(action.result.publication.id);
      console.log(index);
      return {
        ...state,
        creatingComment: false,
        data: [
          ...state.data.slice(0, index),
          {
            ...action.result.publication,
            comments: [
              ...state.data[index].comments,
              action.result
            ]
          },
          ...state.data.slice(index + 1)
        ]
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

export function createComment(publicationId, comment) {
  return {
    types: [CREATE_COMMENT, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAIL],
    promise: (client) => client.post(`/publications/${publicationId}/comments`, {
      data: {
        comment
      }
    })
  };
}
