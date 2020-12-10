export const updateProfile = (profile, uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("consultants")
      .doc(uid)
      .update({
        ...profile,
      })
      .then((data) => {
        dispatch({
          type: "UPDATE_PROFILE_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "UPDATE_PROFILE_FAIL",
        });
      });
  };
};
