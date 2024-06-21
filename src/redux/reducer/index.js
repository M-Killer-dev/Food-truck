import _ from "lodash";
const initialState = {
  openModal: false,
  id: null,
  menu_data: [],
  view_mode: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_MENU_ITEM":
      return {
        ...state,
        menu_data: [...state.menu_data, action.payload],
      };
    case "UPDATE_MENU_ITEM":
      let index = _.findIndex(state.menu_data, { id: action.payload.id });
      state.menu_data[index] = action.payload;
      return {
        ...state,
        menu_data: [...state.menu_data],
      };
    case "OPEN_MODAL":
      return { ...state, openModal: true, id: action.payload };
    case "CLOSE_MODAL":
      return { ...state, openModal: false, id: null };
    case "DELETE_MENU":
      _.remove(state.menu_data, { id: action.payload });
      return { ...state, menu_data: [...state.menu_data] };
    case "SET_DATA":
      if (state.menu_data && state.menu_data.length)
        return { ...state, view_mode: false };
      else return { ...state, menu_data: JSON.parse(action.payload) };
    case "SET_VIEW_MODE":
      return { ...state, view_mode: true };
    default:
      return state;
  }
}

export default rootReducer;
