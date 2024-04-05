export const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return "  555 5logout";
    default:
      return state;
  }
};
