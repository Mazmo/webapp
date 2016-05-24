const CHG_ICON = 'mazmo/nav/CHG_ICON';
const CHG_TITLE = 'mazmo/nav/CHG_TITLE';
const CHG_ACTION = 'mazmo/nav/CHG_ACTION';

const initialState = {
  icon: 'nav',
  title: null,
  action: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHG_ICON:
      return {
        ...state,
        icon: action.icon
      };
    case CHG_TITLE:
      return {
        ...state,
        title: action.title
      };
    case CHG_ACTION:
      return {
        ...state,
        action: action.action
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.messages && globalState.messages.loaded;
}

export function chgIcon(icon) {
  return { type: CHG_ICON, icon };
}

export function chgTitle(title) {
  return { type: CHG_TITLE, title };
}

export function chgAction(action) {
  return { type: CHG_ACTION, action };
}
