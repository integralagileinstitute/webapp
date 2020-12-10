import Header from "components/Headers/Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { constants, firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { invite } from "actions/clientActions";
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  Media,
  Table,
  FormFeedback,
} from "reactstrap";
import { compose } from "redux";
class viewAssessment extends Component {
  state = { Question: false, invite: false };
  toggle = (e) => {
    e.preventDefault();
    this.setState({ Question: !this.state.Question });
  };
  inviteToggle = (e) => {
    e.preventDefault();
    this.setState({ invite: !this.state.invite });
  };
  render() {
    const { uid, assessments, invitations, consultants } = this.props;
    const assessmentId = this.props.match.params.id;
    const clientId = this.props.match.params.clientId;
    const projectId = this.props.match.params.projectId;
    const thisAssessment =
      assessments && assessments.find((ass) => ass.id === assessmentId);
    const thisConsultant =
      consultants && consultants.find((con) => con.id === uid);
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--9" fluid>
          {/* forms */}
          <Row>
            <div className="col">
              <Card className=" shadow ">
                <CardHeader className=" border-0 ">
                  <div style={{ display: "flex" }}>
                    <Link
                      to={
                        "/admin/clients/" +
                        clientId +
                        "/viewProject/" +
                        projectId
                      }
                      className="text-default "
                    >
                      <i
                        className="fas fa-long-arrow-alt-left "
                        style={{ fontSize: "25px" }}
                      />
                    </Link>
                    <h3 className="ml-3 mb-0 ">Assessment</h3>
                  </div>
                </CardHeader>

                <CardBody className=" mb-0 ">
                  <Row>
                    <Col className="text-right">
                      <Button
                        className="mb-2 mt-2"
                        type="button"
                        color="default"
                        size="md"
                        onClick={this.inviteToggle}
                      >
                        <i className="fas fa-plus  " />
                        &nbsp; Invite People
                      </Button>
                      <Modal
                        isOpen={this.state.invite}
                        toggle={this.inviteToggle}
                      >
                        <ModalHeader toggle={this.inviteToggle}>
                          Invite People
                        </ModalHeader>
                        <ModalBody>
                          <Form
                            onSubmit={(e) => {
                              e.preventDefault();
                              var error = false;
                              if (
                                !e.target.email.value.includes("@") ||
                                !e.target.email.value.includes(".")
                              ) {
                                this.setState({
                                  email_error: "Invalid Email",
                                });
                                error = true;
                              } else {
                                this.setState({
                                  email_error: "",
                                  email: e.target.email.value,
                                });
                              }
                              console.log(thisAssessment);
                              if (!error) {
                                this.props.invite(
                                  assessmentId,
                                  projectId,
                                  clientId,
                                  thisAssessment.title,
                                  thisConsultant.first_name +
                                    " " +
                                    thisConsultant.first_name,
                                  e.target.email.value
                                );
                                this.inviteToggle(e);
                              }
                            }}
                          >
                            <Label>Email</Label>
                            <Input
                              name="email"
                              type="email"
                              valid={
                                !this.state.email_error && this.state.email
                              }
                              invalid={this.state.email_error}
                            />
                            <FormFeedback>
                              {this.state.email_error}
                            </FormFeedback>

                            <Row className="mt-2">
                              <Col className="text-right">
                                <Button color="default" size="md">
                                  Invite
                                </Button>
                              </Col>
                            </Row>
                          </Form>
                        </ModalBody>
                      </Modal>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <h3 className=" mb-0 ">
                        Title: {thisAssessment && thisAssessment.title}
                      </h3>
                      <h3 className=" mb-0 ">
                        Type: {thisAssessment && thisAssessment.type}
                      </h3>
                      <h3 className=" mb-0 ">
                        Description:{" "}
                        {thisAssessment && thisAssessment.description}
                      </h3>
                    </Col>
                    <Col>
                      <h3 className=" mb-0 ">
                        Version: {thisAssessment && thisAssessment.version}
                      </h3>
                      <h3 className=" mb-0 ">
                        Price: {thisAssessment && thisAssessment.price}$
                      </h3>
                    </Col>
                  </Row>
                  <h3 className="ml-3 mb-2 mt-4">Raters</h3>

                  <Table
                    className="align-items-center  table-flush "
                    responsive
                  >
                    <thead className="thead-light">
                      <tr>
                        <th scope="col"> Rater Id</th>
                        <th scope="col"> Email</th>
                        <th scope="col"> Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invitations &&
                        invitations
                          .filter(
                            (inv) =>
                              inv.assessmentId === assessmentId &&
                              inv.projectId === projectId &&
                              inv.clientId === clientId
                          )
                          .map((inv) => {
                            return (
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        {inv.id}
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td> {inv.email}</td>
                                <td> {inv.status}</td>

                                <td>
                                  <Button
                                    size="sm"
                                    disabled={inv.status !== "invited"}
                                    color={
                                      inv.status === "invited"
                                        ? "white"
                                        : "default"
                                    }
                                    onClick={(e) => {
                                      e.preventDefault();

                                      this.props.invite(
                                        assessmentId,
                                        projectId,
                                        clientId,
                                        thisAssessment.title,
                                        thisConsultant.first_name +
                                          " " +
                                          thisConsultant.first_name,
                                        inv.email
                                      );
                                    }}
                                  >
                                    <i className="fas fa-paper-plane  " />
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </Table>
                </CardBody>
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
    authError: state.auth.authError,
    clients: state.firestore.ordered.clients,
    consultants: state.firestore.ordered.consultants,
    invitations: state.firestore.ordered.invitations,
    assessments: state.firestore.ordered.assessments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    invite: (
      assessmentId,
      projectId,
      clientId,
      assessmentName,
      consultantName,
      email
    ) =>
      dispatch(
        invite(
          assessmentId,
          projectId,
          clientId,
          assessmentName,
          consultantName,
          email
        )
      ),
    // addAssessment: (ass, projectId, clientId) =>
    //   dispatch(addAssessment(ass, projectId, clientId)),
    // deleteAssessment: (ass, projectId, clientId) =>
    //   dispatch(deleteAssessment(ass, projectId, clientId)),
  };
};

export default compose(
  firestoreConnect([
    { collection: "clients" },
    { collection: "consultants" },
    { collection: "invitations" },
    { collection: "assessments" },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(viewAssessment);
