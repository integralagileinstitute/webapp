export const addCompany = (company) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("consulting_companies")
      .add({
        name: company.name,
        description: company.description,
        industry: company.industry,
      })

      .then((data) => {
        dispatch({
          type: "ADD_COMPANY_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "ADD_COMPANY_FAIL",
        });
      });
  };
};
export const editCompany = (company) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("consulting_companies")
      .doc(company.id)
      .update({
        name: company.name,
        description: company.description,
        industry: company.industry,
      })

      .then((data) => {
        dispatch({
          type: "EDIT_COMPANY_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "EDIT_COMPANY_FAIL",
        });
      });
  };
};
