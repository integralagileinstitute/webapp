export const loginConsultant = (credentials) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((data) => {
        return data.user.uid;
      })
      .then((data) => {
        return firestore.collection("consultants").doc(data).get();
      })
      .then((data) => {
        console.log(data);
        dispatch({
          type: "LOGIN_SUCCESS",
          id_type: "consultant",
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
export const loginRater = (credentials) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((data) => {
        return data.user.uid;
      })
      .then((data) => {
        return firestore.collection("raters").doc(data).get();
      })
      .then((data) => {
        console.log(data);
        dispatch({
          type: "LOGIN_SUCCESS",
          id_type: "rater",
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
export const signup = (credentials) => {
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
        firestore
          .collection("raters")
          .doc(uid)
          .set({
            role: "rater",
            email: credentials.email,
          })
          .then((data) => {
            dispatch({
              type: "SIGNUP_SUCCESS",
              id_type: "rater",
              uid: uid,
              error: "",
            });
          })
          .catch((error) => {
            dispatch({
              type: "SIGNUP_FAIL",
              id_type: "",
              uid: "",
              error: error,
            });
          });
      })
      .catch((error) => {
        dispatch({
          type: "SIGNUP_FAIL",
          id_type: "",
          uid: "",
          error: error,
        });
      });
  };
};
