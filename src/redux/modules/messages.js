import io from 'utils/socket';

const LOAD = 'mazmo/messages/LOAD';
const LOAD_SUCCESS = 'mazmo/messages/LOAD_SUCCESS';
const LOAD_FAIL = 'mazmo/messages/LOAD_FAIL';

const OPEN = 'mazmo/messages/OPEN';

const initialState = {
  loaded: false,
  loading: false,
  opened: []
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
        list: action.list,
        chats: action.chats
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case OPEN:
      return {
        ...state,
        opened: [
          { id: action.id, state: 'OPEN' },
          ...state.opened
        ]
      };
    default:
      return state;
  }
}

export const isLoaded = (globalState) => globalState.messages && globalState.messages.loaded;

export const load = () => {
  return (dispatch) => {
    dispatch({ type: LOAD });
    io.emit('messages:load', (err, result) => {
      if (err) {
        dispatch({ type: LOAD_FAIL, error: err.msg });
      } else {
        const list = [];
        const chats = {};
        result.map((chat) => {
          list.push(chat.id);
          chats[chat.id] = chat;
        });
        dispatch({ type: LOAD_SUCCESS, list, chats });
      }
    });
  };
};

export const open = (chatId) => ({ type: OPEN, id: chatId });
