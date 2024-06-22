export const add_menu_item = (data) => ({
  type: "ADD_MENU_ITEM",
  payload: data,
});

export const update_menu_item = (data) => ({
  type: "UPDATE_MENU_ITEM",
  payload: data,
});

export const open_modal = (open_id) => ({
  type: "OPEN_MODAL",
  payload: open_id,
});

export const close_modal = () => ({
  type: "CLOSE_MODAL",
});

export const delete_menu = (delete_id) => ({
  type: "DELETE_MENU",
  payload: delete_id,
});

export const set_menu_data = (data) => ({
  type: "SET_DATA",
  payload: data,
});

export const set_view_mode = () => ({
  type: "SET_VIEW_MODE",
});

export const show_header = () => ({
  type: "SHOW_HEADER",
});