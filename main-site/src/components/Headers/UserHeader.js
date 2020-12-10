import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

// reactstrap components
import { Container, Row, Col } from "reactstrap";
import { compose } from "redux";

class UserHeader extends React.Component {
  render() {
    const { uid, consultants, raters } = this.props;
    const thisConsultant =
      consultants && consultants.find((con) => con.id === uid);

    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" +
              require("assets/img/brand/5131_Integral_Agile_Institute_R_S_logo_01.png") +
              ")",

            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col md="10">
                <h1 className="display-2 text-white text-capitalize">
                  Hello {thisConsultant && thisConsultant.first_name}
                </h1>
                <p className="text-white mt-0 mb-5">
                  This is your profile page. You can manage your profile here.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    authError: state.auth.authError,
    consultants: state.firestore.ordered.consultants,
    raters: state.firestore.ordered.raters,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // logout: () => dispatch(logout()),
  };
};

export default compose(
  firestoreConnect([
    { collection: "users" },
    { collection: "consultants" },
    { collection: "raters" },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(UserHeader);
