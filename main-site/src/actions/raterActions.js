export const addAnswer = (answer, InvitationId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("invitations")
      .doc(InvitationId)
      .get()
      .then((data) => {
        var newAns = data.data().answers;
        newAns.push(answer);
        return firestore
          .collection("invitations")
          .doc(InvitationId)
          .update({ answers: newAns });
      })
      .then((data) => {
        dispatch({
          type: "ADD_ANSWER_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "ADD_ANSWER_FAIL",
        });
      });
  };
};
export const editAnswer = (index, answer, InvitationId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("invitations")
      .doc(InvitationId)
      .get()
      .then((data) => {
        var newAns = data.data().answers;
        newAns[newAns.length + index] = answer;
        return firestore
          .collection("invitations")
          .doc(InvitationId)
          .update({ answers: newAns });
      })
      .then((data) => {
        dispatch({
          type: "EDIT_ANSWER_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "EDIT_ANSWER_FAIL",
        });
      });
  };
};
export const changeStatus = (status, InvitationId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("invitations")
      .doc(InvitationId)
      .update({
        status: status,
      })
      .then((data) => {
        dispatch({
          type: "CHANGE_STATUS_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "CHANGE_STATUS_FAIL",
        });
      });
  };
};
