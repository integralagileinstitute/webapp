import { loginConsultant } from "actions/authActions";
import { loginRater } from "actions/authActions";
import { login } from "actions/authActions";
import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row,
} from "reactstrap";
import { compose } from "redux";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  login = (e) => {
    e.preventDefault();
    const { consultants, raters } = this.props;
    if (
      consultants &&
      consultants.filter((con) => con.email === e.target.email.value)[0]
    ) {
      this.props.loginConsultant({
        email: e.target.email.value,
        password: e.target.password.value,
      });
    } else {
      if (
        raters &&
        raters.filter((rat) => rat.email === e.target.email.value)[0]
      ) {
        this.props.loginRater({
          email: e.target.email.value,
          password: e.target.password.value,
        });
      } else {
        console.log("User Not Found");
      }
    }
  };
  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign in </small>
              </div>
              <Form onSubmit={this.login} role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="email"
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="password"
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary">
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
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
    loginConsultant: (credentials) => dispatch(loginConsultant(credentials)),
    loginRater: (credentials) => dispatch(loginRater(credentials)),
  };
};

export default compose(
  firestoreConnect([
    { collection: "users" },
    { collection: "consultants" },
    { collection: "raters" },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
