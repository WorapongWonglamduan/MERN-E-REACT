export const drawerReducer = (state = false, action) => {
  switch (action.type) {
    case "DRAWER_VISIBLE":
      return action.payload;
    default:
      return state;
  }
};
