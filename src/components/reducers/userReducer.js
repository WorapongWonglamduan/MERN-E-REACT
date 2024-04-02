export const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return "login ";
    case "LOGOUT":
      return "logout";
    default:
      return state;
  }
};
