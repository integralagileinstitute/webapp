import axios from "axios";
export const addConsultant = (credentials) => {
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
        return firestore.collection("consultants").doc(uid).set({
          first_name: credentials.first_name,
          last_name: credentials.last_name,
          title: credentials.title,
          company: credentials.company,
          email: credentials.email,
          buyAssessment: [],
        });
      })
      .then((data) => {
        axios
          .post(
            "https://us-central1-integralassessment.cloudfunctions.net/app/sendMail",
            {
              first_name: credentials.first_name,
              last_name: credentials.last_name,
              password: credentials.password,
              company: credentials.company,
              email: credentials.email,
            }
          )
          .then((res) => {});
      })
      .then((data) => {
        dispatch({
          type: "ADD_CONSULTANT_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "ADD_CONSULTANT_FAIL",
        });
      });
  };
};
