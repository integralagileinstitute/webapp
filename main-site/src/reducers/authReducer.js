const initState = {
  authError: "",
  uid: "",
  id_type: "",
  signup: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        uid: action.uid,
        id_type: action.id_type,
        authError: "",
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        uid: "",
        id_type: "",
        authError: action.error.message,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        authError: "",
        uid: "",
        id_type: "",
        signup: false,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        uid: action.uid,
        id_type: action.id_type,
        authError: "",
        signup: action.signup,
      };
    case "SIGNUP_FAIL":
      return {
        ...state,
        uid: "",
        id_type: "",
        authError: action.error.message,
      };

    default:
      return state;
  }
};

export default authReducer;
