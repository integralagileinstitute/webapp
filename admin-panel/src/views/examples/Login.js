import React from "react";
import { login } from "../../actions/authActions";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  signIn = (e) => {
    e.preventDefault();
    this.props.login({
      email: e.target.email.value,
      password: e.target.password.value,
    });
  };
  render() {
    const { uid, authError } = this.props;
    if (uid) {
      return <Redirect to="/admin/index" />;
    } else {
      return (
        <>
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Sign in </small>
                </div>
                <Form role="form" onSubmit={this.signIn}>
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
                  {authError ? (
                    <h3 className="text-danger"> {authError}</h3>
                  ) : null}
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
}
const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    authError: state.auth.authError,
  };
};
const mapDispatchToProps = (dispatch) => {
  return { login: (credentials) => dispatch(login(credentials)) };
};

export default compose(
  firestoreConnect([{ collection: "users" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
