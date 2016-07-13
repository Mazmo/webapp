import { app as config } from '../../config';

const LOAD = 'mazmo/publications/LOAD';
const LOAD_SUCCESS = 'mazmo/publications/LOAD_SUCCESS';
const LOAD_FAIL = 'mazmo/publications/LOAD_FAIL';

const CREATE = 'mazmo/publications/CREATE';
const CREATE_SUCCESS = 'mazmo/publications/CREATE_SUCCESS';
const CREATE_FAIL = 'mazmo/publications/CREATE_FAIL';

const CREATE_COMMENT = 'mazmo/publications/CREATE_COMMENT';
const CREATE_COMMENT_SUCCESS = 'mazmo/publications/CREATE_COMMENT_SUCCESS';
const CREATE_COMMENT_FAIL = 'mazmo/publications/CREATE_COMMENT_FAIL';

const CREATE_PUB_REACTION = 'mazmo/publications/CREATE_PUB_REACTION';
const CREATE_PUB_REACTION_SUCCESS = 'mazmo/publications/CREATE_PUB_REACTION_SUCCESS';
const CREATE_PUB_REACTION_FAIL = 'mazmo/publications/CREATE_PUB_REACTION_FAIL';

const CREATE_CMNT_REACTION = 'mazmo/publications/CREATE_CMNT_REACTION';
const CREATE_CMNT_REACTION_SUCCESS = 'mazmo/publications/CREATE_CMNT_REACTION_SUCCESS';
const CREATE_CMNT_REACTION_FAIL = 'mazmo/publications/CREATE_CMNT_REACTION_FAIL';

const LOAD_PUB_REACTIONS = 'mazmo/publications/LOAD_PUB_REACTIONS';
const LOAD_PUB_REACTIONS_SUCCESS = 'mazmo/publications/LOAD_PUB_REACTIONS_SUCCESS';
const LOAD_PUB_REACTIONS_FAIL = 'mazmo/publications/LOAD_PUB_REACTIONS_FAIL';

const initialState = {
  loaded: false,
  loading: false,
  creating: false,
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
  function getCommentIndex(publicationIndex, commentId) {
    let index = 0;
    state.data[publicationIndex].comments.map((comment, i) => {
      if (comment.id === commentId) {
        index = i;
      }
    });

    return index;
  }

  let index = 0;
  let cmntIndex = 0;

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
    case CREATE:
      return {
        ...state,
        creating: true,
        creatingError: null
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        creating: false
      };
    case CREATE_FAIL:
      return {
        ...state,
        creating: false,
        creatingError: action.error.error
      };
    case CREATE_COMMENT:
      return {
        ...state,
        creatingComment: true
      };
    case CREATE_COMMENT_SUCCESS:
      index = getIndex(action.result.publication.id);
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
    case CREATE_PUB_REACTION:
      index = getIndex(action.publicationId);
      return {
        ...state,
        data: [
          ...state.data.slice(0, index),
          {
            ...state.data[index],
            reacting: true
          },
          ...state.data.slice(index + 1)
        ]
      };
    case CREATE_PUB_REACTION_SUCCESS:
      index = getIndex(action.publicationId);
      return {
        ...state,
        data: [
          ...state.data.slice(0, index),
          action.result,
          ...state.data.slice(index + 1)
        ]
      };
    case CREATE_PUB_REACTION_FAIL:
      index = getIndex(action.publicationId);
      return {
        ...state,
        data: [
          ...state.data.slice(0, index),
          {
            ...state.data[index],
            reacting: false
          },
          ...state.data.slice(index + 1)
        ]
      };
    case CREATE_CMNT_REACTION:
      index = getIndex(action.publicationId);
      cmntIndex = getCommentIndex(index, action.commentId);
      return {
        ...state,
        data: [
          ...state.data.slice(0, index),
          {
            ...state.data[index],
            comments: [
              ...state.data[index].comments.slice(0, cmntIndex),
              {
                ...state.data[index].comments[cmntIndex],
                reacting: true
              },
              ...state.data[index].comments.slice(cmntIndex + 1)
            ]
          },
          ...state.data.slice(index + 1)
        ]
      };
    case CREATE_CMNT_REACTION_SUCCESS:
      index = getIndex(action.publicationId);
      cmntIndex = getCommentIndex(index, action.commentId);
      return {
        ...state,
        data: [
          ...state.data.slice(0, index),
          {
            ...state.data[index],
            comments: [
              ...state.data[index].comments.slice(0, cmntIndex),
              action.result,
              ...state.data[index].comments.slice(cmntIndex + 1)
            ]
          },
          ...state.data.slice(index + 1)
        ]
      };
    case CREATE_CMNT_REACTION_FAIL:
      index = getIndex(action.publicationId);
      cmntIndex = getCommentIndex(index, action.commentId);
      return {
        ...state,
        data: [
          ...state.data.slice(0, index),
          {
            ...state.data[index],
            comments: [
              ...state.data[index].comments.slice(0, cmntIndex),
              {
                ...state.data[index].comments[cmntIndex],
                reacting: false
              },
              ...state.data[index].comments.slice(cmntIndex + 1)
            ]
          },
          ...state.data.slice(index + 1)
        ]
      };
    case LOAD_PUB_REACTIONS:
      index = getIndex(action.publicationId);
      return {
        ...state,
        data: [
          ...state.data.slice(0, index),
          {
            ...state.data[index],
            reactions: {
              loading: true,
              error: null,
              data: null
            }
          },
          ...state.data.slice(index + 1)
        ]
      };
    case LOAD_PUB_REACTIONS_SUCCESS:
      index = getIndex(action.publicationId);
      return {
        ...state,
        data: [
          ...state.data.slice(0, index),
          {
            ...state.data[index],
            reactions: {
              loading: false,
              error: null,
              data: action.result
            }
          },
          ...state.data.slice(index + 1)
        ]
      };
    case LOAD_PUB_REACTIONS_FAIL:
      index = getIndex(action.publicationId);
      return {
        ...state,
        data: [
          ...state.data.slice(0, index),
          {
            ...state.data[index],
            reactions: {
              loading: false,
              error: action.result,
              data: null
            }
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
          const lastPublication = publications[publications.length - 1];
          const t = lastPublication.created_at.date.split(/[- :]/);
          const date = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
          query = {
            ...query,
            id: lastPublication.id,
            time: date.getTime()
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

export function reactToPublication(publicationId, reactionType) {
  return {
    publicationId,
    types: [CREATE_PUB_REACTION, CREATE_PUB_REACTION_SUCCESS, CREATE_PUB_REACTION_FAIL],
    promise: (client) => client.post(`/publications/${publicationId}/spanks`, {
      data: {
        type: reactionType
      }
    })
  };
}

export function reactToComment(publicationId, commentId, reactionType) {
  return {
    publicationId,
    commentId,
    types: [CREATE_CMNT_REACTION, CREATE_CMNT_REACTION_SUCCESS, CREATE_CMNT_REACTION_FAIL],
    promise: (client) => client.post(`/publications/${publicationId}/comments/${commentId}/spanks`, {
      data: {
        type: reactionType
      }
    })
  };
}

export function loadReactions(publicationId) {
  return {
    publicationId,
    types: [LOAD_PUB_REACTIONS, LOAD_PUB_REACTIONS_SUCCESS, LOAD_PUB_REACTIONS_FAIL],
    promise: (client) => client.get(`/publications/${publicationId}/spanks`)
  };
}

export const create = (payload) => ({
  types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
  promise: (client) => client.post(`/publications`, {
    data: {
      ...payload
    }
  })
});
