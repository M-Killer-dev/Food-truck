const initialState = {
  update_num: 0,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_MENU":
      return { ...state, update_num: state.update_num + 1 };
    default:
      return state;
  }
}

export default rootReducer;
