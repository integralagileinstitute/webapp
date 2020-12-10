export const login = (credentials) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((data) => {
        return data.user.uid;
      })
      .then((uid) => {
        return firestore.collection("users").doc(uid).get();
      })
      .then((data) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          id_type: data.data().role,
          uid: data.id,
          error: "",
        });
      })
      .catch((error) => {
        dispatch({
          type: "LOGIN_FAIL",
          id_type: "",
          uid: "",
          error: error,
        });
      });
  };
};
export const logout = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then((data) => {
        dispatch({
          type: "LOGOUT_SUCCESS",
          id_type: "",
          uid: "",
          signup: false,
          error: "",
        });
      });
  };
};
