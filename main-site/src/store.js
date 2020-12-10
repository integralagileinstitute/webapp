import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { getFirebase } from "react-redux-firebase";
import rootReducer from "./reducers/rootReducer";
import { firebaseConfig } from "./firebase";
import firebase from "./firebase";

const saveToLocalStorage = (state) => {
  const serializedUid = JSON.stringify(state.auth.uid);
  localStorage.setItem("auth", serializedUid);
  const serializedType = JSON.stringify(state.auth.id_type);
  localStorage.setItem("id_type", serializedType);
};

const checkLocalStorage = () => {
  const serializedUid = localStorage.getItem("auth");
  const serializedType = localStorage.getItem("id_type");
  if (serializedUid === null) return undefined;
  return {
    auth: {
      uid: JSON.parse(serializedUid),
      id_type: JSON.parse(serializedType),
    },
  };
};

export const store = createStore(
  rootReducer,
  checkLocalStorage(),

  composeWithDevTools(
    compose(
      applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
      reduxFirestore(firebase, firebaseConfig)
    )
  )
);

store.subscribe(() => saveToLocalStorage(store.getState()));
