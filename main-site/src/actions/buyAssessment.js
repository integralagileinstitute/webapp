export const buyAssessment = (assessmentId, consultantId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("consultants")
      .doc(consultantId)
      .update({
        buyAssessment: firestore.FieldValue.arrayUnion(assessmentId),
      })
      .then((data) => {
        dispatch({
          type: "BUY_ASSESSMENT_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "BUY_ASSESSMENT_FAIL",
        });
      });
  };
};
