import io from 'utils/socket';

const LOAD = 'mazmo/messages/LOAD';
const LOAD_SUCCESS = 'mazmo/messages/LOAD_SUCCESS';
const LOAD_FAIL = 'mazmo/messages/LOAD_FAIL';

const OPEN = 'mazmo/messages/OPEN';

const SEND = 'mazmo/messages/SEND';
const SEND_SUCCESS = 'mazmo/messages/SEND_SUCCESS';

const RECEIVED = 'mazmo/messages/RECEIVED';
const READ = 'mazmo/messages/READ';

const initialState = {
  loaded: false,
  loading: false,
  opened: [],
  chats: {}
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
    case SEND:
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.id]: {
            ...state.chats[action.id],
            messages: [
              ...state.chats[action.id].messages,
              {
                sending: true,
                ...action.payload
              }
            ]
          }
        }
      };
    case SEND_SUCCESS:
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.chatId]: {
            ...state.chats[action.chatId],
            messages: [
              ...state.chats[action.chatId].messages.slice(0, action.index),
              {
                ...state.chats[action.chatId].messages[action.index],
                sending: false,
                id: action.id,
                createdAt: action.createdAt
              },
              ...state.chats[action.chatId].messages.slice(action.index + 1)
            ]
          }
        }
      };
    case RECEIVED:
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.message.chat_id]: {
            ...state.chats[action.message.chat_id],
            users: {
              ...state.chats[action.message.chat_id].users,
              [action.myId]: {
                ...state.chats[action.message.chat_id].users[action.myId],
                unread: true
              }
            },
            messages: [
              ...state.chats[action.message.chat_id].messages,
              action.message
            ]
          }
        }
      };
    case READ:
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.chatId]: {
            ...state.chats[action.chatId],
            users: {
              ...state.chats[action.chatId].users,
              [action.myId]: {
                ...state.chats[action.chatId].users[action.myId],
                unread: false
              }
            }
          }
        }
      };
    default:
      return state;
  }
}

export const isLoaded = (globalState) => globalState.messages && globalState.messages.loaded;

export const load = () => {
  return (dispatch, getState) => {
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

    io.on('messages:new', (message) => {
      dispatch({ type: RECEIVED, message, myId: getState().auth.user.id });
    });
  };
};

export const send = (id, content) => {
  return (dispatch, getState) => {
    const index = getState().messages.chats[id].messages.length;
    const me = getState().auth.user;
    const payload = {
      content,
      author: {
        id: me.id,
        userId: me.id,
        username: me.username
      }
    };
    dispatch({ type: SEND, id, payload });
    io.emit('messages:send', { id, content }, (err, result) => {
      if (!err) {
        dispatch({
          type: SEND_SUCCESS,
          chatId: id,
          index,
          id: result.id,
          createdAt: result.createdAt
        });
      }
    });
  };
};

export const read = (id) => {
  return (dispatch, getState) => {
    const me = getState().auth.user;
    dispatch({
      type: READ,
      myId: me.id,
      chatId: id
    });
  };
};

export const open = (chatId) => ({ type: OPEN, id: chatId });
