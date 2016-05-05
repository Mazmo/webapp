const CHG_ICON = 'redux-example/nav/LOAD';

const initialState = {
  icon: 'nav',
  logo: true,
  title: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
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
