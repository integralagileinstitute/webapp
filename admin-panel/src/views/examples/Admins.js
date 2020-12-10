import React from "react";

import {
  Card,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
  Button,
  Col,
  Form,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";

import { Modal, ModalHeader, ModalBody } from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { addAdmin } from "../../actions/adminActions";

class Admins extends React.Component {
  state = { modal: false };
  toggle = (e) => {
    e.preventDefault();
    this.setState({ modal: !this.state.modal });
  };
  addAdmin = (e) => {
    e.preventDefault();
    var error = false;
    if (!e.target.name.value) {
      this.setState({ name_error: "Please Add a Name" });
      error = true;
    } else {
      this.setState({ name_error: "", name: e.target.name.value });
    }
    if (
      !e.target.email.value ||
      !e.target.email.value.includes("@") ||
      !e.target.email.value.includes(".")
    ) {
      this.setState({ email_error: "Invalid email" });
      error = true;
    } else {
      this.setState({ email_error: "", email: e.target.email.value });
    }
    if (!e.target.password.value || e.target.password.value.length < 8) {
      this.setState({ password_error: "Password must contain 8 characters" });
      error = true;
    } else {
      this.setState({ password_error: "", password: e.target.password.value });
    }
    if (!error) {
      this.props.addAdmin({
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      });
      this.toggle(e);
      this.setState({
        name: "",
        name_error: "",
        email: "",
        email_error: "",
        password: "",
        password_error: "",
      });
    }
  };
  render() {
    const { users } = this.props;

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--9" fluid>
          <Row>
            <Col className="text-right">
              <Button
                className=" mb-2"
                color="white"
                onClick={this.toggle}
                size="md"
              >
                Add Admin
              </Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Add Admin</ModalHeader>
                <ModalBody>
                  <Form onSubmit={this.addAdmin}>
                    <Label>Name</Label>
                    <Input
                      name="name"
                      valid={!this.state.name_error && this.state.name}
                      invalid={this.state.name_error}
                    />
                    <FormFeedback>{this.state.name_error}</FormFeedback>

                    <Label>Email</Label>
                    <Input
                      name="email"
                      type="email"
                      valid={!this.state.email_error && this.state.email}
                      invalid={this.state.email_error}
                    />
                    <FormFeedback>{this.state.email_error}</FormFeedback>

                    <Label>Password</Label>
                    <Input
                      name="password"
                      type="password"
                      valid={!this.state.password_error && this.state.password}
                      invalid={this.state.password_error}
                    />
                    <FormFeedback>{this.state.password_error}</FormFeedback>

                    <Row>
                      <Col className="text-right">
                        <Button className=" mt-2" color="default" size="md">
                          Add Admin
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </ModalBody>
              </Modal>
            </Col>
          </Row>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Admins</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Admin Id</th>
                      <th scope="col">Admin Name</th>
                      <th scope="col">Admin Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users
                        .filter((user) => user.role === "admin")
                        .map((user) => {
                          return (
                            <tr>
                              <th scope="row">
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {user.id}
                                    </span>
                                  </Media>
                                </Media>
                              </th>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                            </tr>
                          );
                        })}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    users: state.firestore.ordered.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addAdmin: (credentials) => dispatch(addAdmin(credentials)),
  };
};

export default compose(
  firestoreConnect([{ collection: "users" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(Admins);
