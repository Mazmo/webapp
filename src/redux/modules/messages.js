import io from 'utils/socket';

const LOAD = 'mazmo/messages/LOAD';
const LOAD_SUCCESS = 'mazmo/messages/LOAD_SUCCESS';
const LOAD_FAIL = 'mazmo/messages/LOAD_FAIL';

const OPEN = 'mazmo/messages/OPEN';

const SEND = 'mazmo/messages/SEND';
const SEND_SUCCESS = 'mazmo/messages/SEND_SUCCESS';

const RECEIVED = 'mazmo/messages/RECEIVED';
const READ = 'mazmo/messages/READ';

const TYPING_START = 'mazmo/messages/TYPING_START';
const TYPING_END = 'mazmo/messages/TYPING_END';

const initialState = {
  loaded: false,
  loading: false,
  opened: [],
  list: [],
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
        list: [
          ...state.list,
          ...action.list
        ],
        chats: {
          ...state.chats,
          ...action.chats
        }
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
    case TYPING_START:
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.data.chatId]: {
            ...state.chats[action.data.chatId],
            users: {
              ...state.chats[action.data.chatId].users,
              [action.data.userId]: {
                ...state.chats[action.data.chatId].users[action.data.userId],
                typing: true
              }
            }
          }
        }
      };
    case TYPING_END:
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.data.chatId]: {
            ...state.chats[action.data.chatId],
            users: {
              ...state.chats[action.data.chatId].users,
              [action.data.userId]: {
                ...state.chats[action.data.chatId].users[action.data.userId],
                typing: false
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

export const isIdLoaded = (globalState, id) => globalState.messages && globalState.messages.chats[id];

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
    io.on('messages:typing:start', (data) => {
      const chat = getState().messages.chats[data.chatId];
      if (chat && chat.users[data.userId]) {
        dispatch({ type: TYPING_START, data });
      }
    });
    io.on('messages:typing:end', (data) => {
      const chat = getState().messages.chats[data.chatId];
      if (chat && chat.users[data.userId]) {
        dispatch({ type: TYPING_END, data });
      }
    });
  };
};

export const loadById = (id) => {
  return (dispatch) => {
    io.emit('messenger:getChatById', id, (err, result) => {
      if (err) {
        dispatch({ type: LOAD_FAIL, error: err.msg });
      } else {
        if (!result.messages) {
          result.messages = [];
        }
        dispatch({
          type: LOAD_SUCCESS,
          chats: { [result.id]: result },
          list: []
        });
      }
    });
  };
};

export const loadByUsername = (username, cb) => {
  return (dispatch) => {
    io.emit('messenger:getChatByUsername', username, (err, result) => {
      if (err) {
        dispatch({ type: LOAD_FAIL, error: err.msg });
        cb(err);
      } else {
        if (!result.messages) {
          result.messages = [];
        }
        dispatch({
          type: LOAD_SUCCESS,
          chats: { [result.id]: result },
          list: []
        });
        cb(null, result.id);
      }
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
    io.emit('messages:read', { id });
    const me = getState().auth.user;
    dispatch({
      type: READ,
      myId: me.id,
      chatId: id
    });
  };
};

export const open = (chatId) => ({ type: OPEN, id: chatId });
