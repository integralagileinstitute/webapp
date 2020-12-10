import { v4 as uuidv4 } from "uuid";
import axios from "axios";
export const addClients = (client) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    console.log(client);
    firestore
      .collection("clients")
      .add({
        ...client,
      })
      .then((data) => {
        dispatch({
          type: "ADD_CLIENT_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "ADD_CLIENT_FAIL",
        });
      });
  };
};
export const editClients = (client, clientId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("clients")
      .doc(clientId)
      .update({
        name: client.name,
        industry: client.industry,
      })
      .then((data) => {
        dispatch({
          type: "ADD_CLIENT_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "ADD_CLIENT_FAIL",
        });
      });
  };
};

export const deleteClient = (client) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("clients")
      .doc(client.id)
      .delete()
      .then((data) => {
        dispatch({
          type: "DELETE_CLIENT_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_CLIENT_FAIL",
        });
      });
  };
};
export const addProjects = (project, clientId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("clients")
      .doc(clientId)
      .update({
        projects: firestore.FieldValue.arrayUnion({
          ...project,
          id: uuidv4(),
        }),
      })
      .then((data) => {
        dispatch({
          type: "ADD_PROJECT_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "ADD_PROJECT_FAIL",
        });
      });
  };
};
export const deleteProjects = (project, clientId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("clients")
      .doc(clientId)
      .update({
        projects: firestore.FieldValue.arrayRemove(project),
      })
      .then((data) => {
        dispatch({
          type: "DELETE_PROJECT_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_PROJECT_FAIL",
        });
      });
  };
};

export const editProjects = (project, previousP, clientId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("clients")
      .doc(clientId)
      .update({
        projects: firestore.FieldValue.arrayRemove(previousP),
      })
      .then((data) => {
        firestore
          .collection("clients")
          .doc(clientId)
          .update({
            projects: firestore.FieldValue.arrayUnion({
              ...previousP,
              ...project,
            }),
          });
      })

      .then((data) => {
        dispatch({
          type: "EDIT_PROJECT_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "EDIT_PROJECT_FAIL",
        });
      });
  };
};
export const addAssessment = (
  assessment,
  projectId,
  clientId,
  consultantId
) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("clients")
      .doc(clientId)
      .get()
      .then((data) => {
        var projects = data.data().projects;
        let obj = projects.find((pro) => pro.id === projectId);
        let index = projects.findIndex((pro) => pro.id === projectId);
        if (!obj.assessments.includes(assessment)) {
          obj.assessments.push(assessment);
        }
        projects[index] = obj;
        firestore
          .collection("clients")
          .doc(clientId)
          .update({ projects: projects });
      })
      .then((data) => {
        firestore
          .collection("consultants")
          .doc(consultantId)
          .update({
            buyAssessment: firestore.FieldValue.arrayRemove(assessment),
          });
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

export const deleteAssessment = (assessment, projectId, clientId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("clients")
      .doc(clientId)
      .get()
      .then((data) => {
        var projects = data.data().projects;
        let obj = projects.find((pro) => pro.id === projectId);
        let index = projects.findIndex((pro) => pro.id === projectId);
        if (obj.assessments.includes(assessment)) {
          obj.assessments = obj.assessments.filter((ass) => ass !== assessment);
        }
        projects[index] = obj;
        firestore
          .collection("clients")
          .doc(clientId)
          .update({ projects: projects });
      })

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
export const invite = (
  assessmentId,
  projectId,
  clientId,
  assessmentName,
  consultantName,
  email
) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("invitations")
      .get()
      .then((data) => {
        var error = false;

        data.forEach((doc) => {
          if (
            doc.data().email === email &&
            doc.data().clientId === clientId &&
            doc.data().projectId === projectId &&
            doc.data().assessmentId === assessmentId
          ) {
            error = true;
          }
        });
        if (!error) {
          return firestore.collection("invitations").add({
            assessmentId,
            projectId,
            clientId,
            email,
            answers: [],
            status: "invited",
          });
        } else {
          return null;
        }
      })
      .then((data) => {
        axios.post(
          "https://us-central1-integralassessment.cloudfunctions.net/app/sendInvite",
          {
            email,
            assessment_name: assessmentName,
            consultant_name: consultantName,
          }
        );
      })
      .then((data) => {
        dispatch({
          type: "INVITATION_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "INVITATION_FAIL",
        });
      });
  };
};
