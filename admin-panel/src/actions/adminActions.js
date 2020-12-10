export const addAdmin = (credentials) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((data) => {
        return data.user.uid;
      })
      .then((uid) => {
        return firestore.collection("users").doc(uid).set({
          name: credentials.name,
          email: credentials.email,
          role: "admin",
        });
      })
      .then((data) => {
        dispatch({
          type: "ADD_ADMIN_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "ADD_ADMIN_FAIL",
        });
      });
  };
};
