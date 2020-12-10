export const addAssessments = (assessment) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("assessments")
      .add({
        title: assessment.title,
        description: assessment.description,
        price: assessment.price,
        type: assessment.type,
        version: assessment.version,
        questions: assessment.questions,
      })

      .then((data) => {
        dispatch({
          type: "ADD_ASSESSMENT_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "ADD_ASSESSMENT_FAIL",
        });
      });
  };
};
export const editAssessments = (assessment, assessmentId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("assessments")
      .doc(assessmentId)
      .update({
        title: assessment.title,
        description: assessment.description,
        price: assessment.price,
        type: assessment.type,
        version: assessment.version,
      })

      .then((data) => {
        dispatch({
          type: "EDIT_ASSESSMENT_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "EDIT_ASSESSMENT_FAIL",
        });
      });
  };
};
export const deleteAssessment = (assessmentId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("assessments")
      .doc(assessmentId)
      .delete()
      .then((data) => {
        dispatch({
          type: "DELETE_ASSESSMENT_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_ASSESSMENT_FAIL",
        });
      });
  };
};

export const deleteQuestion = (question, assessmentId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("assessments")
      .doc(assessmentId)
      .update({ questions: firestore.FieldValue.arrayRemove(question) })
      .then((data) => {
        dispatch({
          type: "DELETE_QUESTION_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_QUESTION_FAIL",
        });
      });
  };
};

export const addQuestion = (question, assessmentId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("assessments")
      .doc(assessmentId)
      .update({ questions: firestore.FieldValue.arrayUnion(question) })
      .then((data) => {
        dispatch({
          type: "ADD_QUESTION_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "ADD_QUESTION_FAIL",
        });
      });
  };
};
