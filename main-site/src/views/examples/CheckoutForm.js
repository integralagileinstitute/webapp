import React, { useState } from "react";
import axios from "axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CardInput from "./CardInput";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
// import { addSubscriptions } from "actions/stripeActions";
import { Button } from "reactstrap";
import { buyAssessment } from "actions/buyAssessment";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Redirect } from "react-router-dom";

const CheckoutForm = (props) => {
  const [redirect, setRedirect] = useState(false);
  const [dis, setDis] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { assessmentId, consultants, uid } = props;
  const thisConsultant =
    consultants && consultants.find((con) => con.id === uid);
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.

    setDis(true);
    const cardElement = elements.getElement(CardElement);
    var token = await stripe.createToken(cardElement);
    var sendToken = token && token.token;

    console.log(thisConsultant);
    console.log(props);
    if (thisConsultant) {
      axios
        .post(
          "https://us-central1-integralassessment.cloudfunctions.net/chargeUser",
          {
            amount: props.amount * 100,
            description: `${
              thisConsultant.first_name + " " + thisConsultant.last_name
            } has bought ${props.assessmentName}`,
            stripeToken: sendToken,
            email: thisConsultant.email,
          }
        )
        .then((result) => {
          props.buyAssessment(assessmentId, thisConsultant.id);
        })
        .then((data) => {
          setRedirect(true);
          setDis(false);
        })
        .catch((error) => {
          setDis(false);
          console.log(error);
        });
    }
  };
  if (redirect) {
    return <Redirect from="/" to="/admin/buyassessments" />;
  }
  return (
    <form className="text-center  text-dark" onSubmit={handleSubmit}>
      <CardInput />
      <Button className="mt-2" color="primary" disabled={!stripe || dis}>
        {dis ? (
          <Loader type="TailSpin" color="#00BFFF" height={20} width={20} />
        ) : (
          "Buy"
        )}
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    authError: state.auth.authError,
    consultants: state.firestore.ordered.consultants,
    assessments: state.firestore.ordered.assessments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    buyAssessment: (assessmentId, consultantId) =>
      dispatch(buyAssessment(assessmentId, consultantId)),
    // addAssessment: (ass, projectId, clientId) =>
    //   dispatch(addAssessment(ass, projectId, clientId)),
    // deleteAssessment: (ass, projectId, clientId) =>
    //   dispatch(deleteAssessment(ass, projectId, clientId)),
  };
};

export default compose(
  firestoreConnect([
    { collection: "consultants" },
    { collection: "assessments" },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(CheckoutForm);
