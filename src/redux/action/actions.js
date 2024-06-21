export const add_menu = (data) => ({
  type: "ADD_MENU",
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
