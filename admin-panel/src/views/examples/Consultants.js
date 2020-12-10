import React from "react";

import {
  Card,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
  Col,
  Button,
  Form,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
// core components
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Header from "components/Headers/Header.js";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { addConsultant } from "actions/consultantActions";
class Consultants extends React.Component {
  state = { modal: false };
  toggle = (e) => {
    e.preventDefault();
    this.setState({ modal: !this.state.modal });
  };
  addConsultant = (e) => {
    e.preventDefault();
    var error = false;
    if (!e.target.first_name.value) {
      this.setState({ first_name_error: "Please Add a First Name" });
      error = true;
    } else {
      this.setState({
        first_name_error: "",
        first_name: e.target.first_name.value,
      });
    }
    if (!e.target.last_name.value) {
      this.setState({ last_name_error: "Please Add a Last Name" });
      error = true;
    } else {
      this.setState({
        last_name_error: "",
        last_name: e.target.last_name.value,
      });
    }
    if (!e.target.title.value) {
      this.setState({ title_error: "Please Add a Title" });
      error = true;
    } else {
      this.setState({
        title_error: "",
        title: e.target.title.value,
      });
    }
    if (e.target.company.value === "Company") {
      this.setState({ company_error: "Please Select a Company" });
      error = true;
    } else {
      this.setState({
        company_error: "",
        company: e.target.company.value,
      });
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
      e.preventDefault();
      const consultant = {
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        title: e.target.title.value,
        company: e.target.company.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };
      this.props.addConsultant(consultant);
      this.toggle(e);
      this.setState({
        title: "",
        title_error: "",
        first_name: "",
        first_name_error: "",
        last_name: "",
        last_name_error: "",
        email: "",
        email_error: "",
        password: "",
        password_error: "",
      });
    }
  };
  render() {
    const { uid, companies, consultants } = this.props;
    if (!uid) {
      return <Redirect to="/auth/login" />;
    } else {
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
                  href="#pablo"
                  onClick={this.toggle}
                  size="md"
                >
                  Add Consultant
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle}>Add Consultant</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={this.addConsultant}>
                      <Label>First Name</Label>
                      <Input
                        name="first_name"
                        valid={
                          !this.state.first_name_error && this.state.first_name
                        }
                        invalid={this.state.first_name_error}
                      />
                      <FormFeedback>{this.state.first_name_error}</FormFeedback>
                      <Label>Last Name</Label>
                      <Input
                        name="last_name"
                        valid={
                          !this.state.last_name_error && this.state.last_name
                        }
                        invalid={this.state.last_name_error}
                      />
                      <FormFeedback>{this.state.last_name_error}</FormFeedback>

                      <Label>Title</Label>
                      <Input
                        name="title"
                        valid={!this.state.title_error && this.state.title}
                        invalid={this.state.title_error}
                      />
                      <FormFeedback>{this.state.title_error}</FormFeedback>

                      <Label>company</Label>
                      <Input
                        name="company"
                        type="select"
                        valid={!this.state.company_error && this.state.company}
                        invalid={this.state.company_error}
                      >
                        <option hidden>Company</option>
                        {companies &&
                          companies.map((company) => {
                            return <option>{company.name}</option>;
                          })}
                      </Input>
                      <FormFeedback>{this.state.company_error}</FormFeedback>
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
                        valid={
                          !this.state.password_error && this.state.password
                        }
                        invalid={this.state.password_error}
                      />
                      <FormFeedback>{this.state.password_error}</FormFeedback>

                      <Row>
                        <Col className="text-right">
                          <Button className=" mt-2" color="default" size="md">
                            Add Consultant
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </ModalBody>
                </Modal>
              </Col>
            </Row>
            {/* Dark table */}
            <Row>
              <div className="col">
                <Card className=" shadow">
                  <CardHeader className=" border-0">
                    <h3 className=" mb-0">Consultants</h3>
                  </CardHeader>
                  <Table className="align-items-center  table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Consultant Id</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Title</th>
                        <th scope="col">Company</th>
                      </tr>
                    </thead>
                    <tbody>
                      {consultants &&
                        consultants.map((con) => {
                          return (
                            <tr>
                              <th scope="row">
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {con.id}
                                    </span>
                                  </Media>
                                </Media>
                              </th>
                              <td> {con.first_name}</td>
                              <td> {con.last_name}</td>
                              <td> {con.title}</td>
                              <td> {con.company}</td>
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
}
const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    companies: state.firestore.ordered.consulting_companies,
    consultants: state.firestore.ordered.consultants,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addConsultant: (consultant) => dispatch(addConsultant(consultant)),
    // deleteQuestion: (question, assessmentId) =>
    //   dispatch(deleteQuestion(question, assessmentId)),
    // editAssessment: (assessment, assessmentId) =>
    //   dispatch(editAssessments(assessment, assessmentId)),
    // deleteCompany: (company) =>
    //   dispatch(deleteCompany(company)),
    // editCompany: (company, newCompany) =>
    //   dispatch(editCompany(company, newCompany)),
  };
};

export default compose(
  firestoreConnect([
    { collection: "consulting_companies" },
    { collection: "consultants" },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(Consultants);
