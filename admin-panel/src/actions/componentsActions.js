export const addAssessmentType = (type) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("components")
      .doc("assessment_type")
      .update({ types: firestore.FieldValue.arrayUnion(type) })

      .then((data) => {
        dispatch({
          type: "ADD_ASSESSMENT_TYPE_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "ADD_ASSESSMENT_TYPE_FAIL",
        });
      });
  };
};
export const editAssessmentType = (type, newType) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("components")
      .doc("assessment_type")
      .update({ types: firestore.FieldValue.arrayRemove(type) })
      .then((data) => {
        firestore
          .collection("components")
          .doc("assessment_type")

          .update({ types: firestore.FieldValue.arrayUnion(newType) })

          .then((data) => {
            dispatch({
              type: "EDIT_ASSESSMENT_TYPE_SUCCESS",
            });
          })
          .catch((error) => {
            dispatch({
              type: "EDIT_ASSESSMENT_TYPE_FAIL",
            });
          });
      });
  };
};
export const deleteAssessmentType = (type) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("components")
      .doc("assessment_type")
      .update({ types: firestore.FieldValue.arrayRemove(type) })
      .then((data) => {
        dispatch({
          type: "DELETE_ASSESSMENT_TYPE_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_ASSESSMENT_TYPE_FAIL",
        });
      });
  };
};
export const addQuestionType = (type) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("components")
      .doc("question_type")
      .update({ types: firestore.FieldValue.arrayUnion(type) })

      .then((data) => {
        dispatch({
          type: "ADD_QUESTION_TYPE_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "ADD_QUESTION_TYPE_FAIL",
        });
      });
  };
};
export const editQuestionType = (type, newType) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("components")
      .doc("question_type")
      .update({ types: firestore.FieldValue.arrayRemove(type) })
      .then((data) => {
        firestore
          .collection("components")
          .doc("question_type")

          .update({ types: firestore.FieldValue.arrayUnion(newType) })

          .then((data) => {
            dispatch({
              type: "EDIT_QUESTION_TYPE_SUCCESS",
            });
          })
          .catch((error) => {
            dispatch({
              type: "EDIT_QUESTION_TYPE_FAIL",
            });
          });
      });
  };
};
export const deleteQuestionType = (type) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("components")
      .doc("question_type")
      .update({ types: firestore.FieldValue.arrayRemove(type) })
      .then((data) => {
        dispatch({
          type: "DELETE_QUESTION_TYPE_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_QUESTION_TYPE_FAIL",
        });
      });
  };
};
export const addQuestionCompetency = (competency) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("components")
      .doc("question_competency")
      .update({ competencies: firestore.FieldValue.arrayUnion(competency) })

      .then((data) => {
        dispatch({
          type: "ADD_QUESTION_COMPETENCY_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "ADD_QUESTION_COMPETENCY_FAIL",
        });
      });
  };
};
export const editQuestionCompetency = (competency, newCompetency) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("components")
      .doc("question_competency")
      .update({ competencies: firestore.FieldValue.arrayRemove(competency) })
      .then((data) => {
        firestore
          .collection("components")
          .doc("question_competency")

          .update({
            competencies: firestore.FieldValue.arrayUnion(newCompetency),
          })

          .then((data) => {
            dispatch({
              type: "EDIT_QUESTION_COMPETENCY_SUCCESS",
            });
          })
          .catch((error) => {
            dispatch({
              type: "EDIT_QUESTION_COMPETENCY_FAIL",
            });
          });
      });
  };
};
export const deleteQuestionCompetency = (competency) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("components")
      .doc("question_competency")
      .update({ competencies: firestore.FieldValue.arrayRemove(competency) })
      .then((data) => {
        dispatch({
          type: "DELETE_QUESTION_COMPETENCY_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_QUESTION_COMPETENCY_FAIL",
        });
      });
  };
};
export const addQuestionCategory = (category) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("components")
      .doc("question_category")
      .update({ categories: firestore.FieldValue.arrayUnion(category) })

      .then((data) => {
        dispatch({
          type: "ADD_QUESTION_CATEGORY_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "ADD_QUESTION_CATEGORY_FAIL",
        });
      });
  };
};
export const editQuestionCategory = (category, newCategory) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("components")
      .doc("question_category")
      .update({ categories: firestore.FieldValue.arrayRemove(category) })
      .then((data) => {
        firestore
          .collection("components")
          .doc("question_category")

          .update({
            categories: firestore.FieldValue.arrayUnion(newCategory),
          })

          .then((data) => {
            dispatch({
              type: "EDIT_QUESTION_CATEGORY_SUCCESS",
            });
          })
          .catch((error) => {
            dispatch({
              type: "EDIT_QUESTION_CATEGORY_FAIL",
            });
          });
      });
  };
};
export const deleteQuestionCategory = (category) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("components")
      .doc("question_category")
      .update({ categories: firestore.FieldValue.arrayRemove(category) })
      .then((data) => {
        dispatch({
          type: "DELETE_QUESTION_CATEGORY_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_QUESTION_CATEGORY_FAIL",
        });
      });
  };
};

export const addQuestionDimension = (dimension) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("components")
      .doc("question_dimension")
      .update({ dimensions: firestore.FieldValue.arrayUnion(dimension) })

      .then((data) => {
        dispatch({
          type: "ADD_QUESTION_DIMENSION_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "ADD_QUESTION_DIMENSION_FAIL",
        });
      });
  };
};
export const editQuestionDimension = (dimension, newDimension) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("components")
      .doc("question_dimension")
      .update({ dimensions: firestore.FieldValue.arrayRemove(dimension) })
      .then((data) => {
        firestore
          .collection("components")
          .doc("question_dimension")

          .update({
            dimensions: firestore.FieldValue.arrayUnion(newDimension),
          })

          .then((data) => {
            dispatch({
              type: "EDIT_QUESTION_DIMENSION_SUCCESS",
            });
          })
          .catch((error) => {
            dispatch({
              type: "EDIT_QUESTION_DIMENSION_FAIL",
            });
          });
      });
  };
};
export const deleteQuestionDimension = (dimension) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("components")
      .doc("question_dimension")
      .update({ dimensions: firestore.FieldValue.arrayRemove(dimension) })
      .then((data) => {
        dispatch({
          type: "DELETE_QUESTION_DIMENSION_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_QUESTION_DIMENSION_FAIL",
        });
      });
  };
};
export const addClientIndustry = (industry) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("components")
      .doc("client_industry")
      .update({ industries: firestore.FieldValue.arrayUnion(industry) })

      .then((data) => {
        dispatch({
          type: "ADD_CLIENT_INDUSTRY_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "ADD_CLIENT_INDUSTRY_FAIL",
        });
      });
  };
};
export const editClientIndustry = (industry, newIndustry) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("components")
      .doc("client_industry")
      .update({ industries: firestore.FieldValue.arrayRemove(industry) })
      .then((data) => {
        firestore
          .collection("components")
          .doc("client_industry")

          .update({
            industries: firestore.FieldValue.arrayUnion(newIndustry),
          })

          .then((data) => {
            dispatch({
              type: "EDIT_CLIENT_INDUSTRY_SUCCESS",
            });
          })
          .catch((error) => {
            dispatch({
              type: "EDIT_CLIENT_INDUSTRY_FAIL",
            });
          });
      });
  };
};
export const deleteClientIndustry = (industry) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("components")
      .doc("client_industry")
      .update({ industries: firestore.FieldValue.arrayRemove(industry) })
      .then((data) => {
        dispatch({
          type: "DELETE_CLIENT_INDUSTRY_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_CLIENT_INDUSTRY_FAIL",
        });
      });
  };
};

export const addConsultantIndustry = (industry) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("components")
      .doc("consultant_industry")
      .update({ industries: firestore.FieldValue.arrayUnion(industry) })

      .then((data) => {
        dispatch({
          type: "ADD_CONSULTANT_INDUSTRY_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "ADD_CONSULTANT_INDUSTRY_FAIL",
        });
      });
  };
};
export const editConsultantIndustry = (industry, newIndustry) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("components")
      .doc("consultant_industry")
      .update({ industries: firestore.FieldValue.arrayRemove(industry) })
      .then((data) => {
        firestore
          .collection("components")
          .doc("consultant_industry")

          .update({
            industries: firestore.FieldValue.arrayUnion(newIndustry),
          })

          .then((data) => {
            dispatch({
              type: "EDIT_CONSULTANT_INDUSTRY_SUCCESS",
            });
          })
          .catch((error) => {
            dispatch({
              type: "EDIT_CONSULTANT_INDUSTRY_FAIL",
            });
          });
      });
  };
};
export const deleteConsultantIndustry = (industry) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("components")
      .doc("consultant_industry")
      .update({ industries: firestore.FieldValue.arrayRemove(industry) })
      .then((data) => {
        dispatch({
          type: "DELETE_CONSULTANT_INDUSTRY_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_CONSULTANT_INDUSTRY_FAIL",
        });
      });
  };
};
