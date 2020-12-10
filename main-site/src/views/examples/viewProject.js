import { deleteAssessment } from "actions/clientActions";
import { addAssessment } from "actions/clientActions";
import Header from "components/Headers/Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Button,
  CardBody,
  Table,
  Media,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormFeedback,
} from "reactstrap";
import { compose } from "redux";
class viewProject extends Component {
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
    const { clients, assessments, consultants, uid } = this.props;
    const thisConsultant =
      consultants && consultants.find((con) => con.id === uid);
    const clientId = this.props.match.params.clientId;
    const projectId = this.props.match.params.id;
    const thisClient = clients && clients.filter((c) => c.id === clientId)[0];
    const thisProject =
      thisClient &&
      thisClient.projects.filter((pro) => pro.id === projectId)[0];

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
                      to={"/admin/clients/viewClient/" + clientId}
                      className="text-default "
                    >
                      <i
                        className="fas fa-long-arrow-alt-left "
                        style={{ fontSize: "25px" }}
                      />
                    </Link>
                    <h3 className="ml-3 mb-0 ">Project</h3>
                  </div>{" "}
                </CardHeader>

                <CardBody className=" mb-0 ">
                  <Row className="mb-2">
                    <Col>
                      <h3 className=" mb-0 ">
                        Name: {thisProject && thisProject.name}
                      </h3>
                      <h3 className=" mb-0 ">
                        Start Date: {thisProject && thisProject.start_date}
                      </h3>
                    </Col>
                    <Col>
                      <h3 className=" mb-0 ">
                        Time Zone: {thisProject && thisProject.time_zone}
                      </h3>
                      <h3 className=" mb-0 ">
                        End Date: {thisProject && thisProject.end_date}
                      </h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-right">
                      <Button
                        className="mb-2 mt-2"
                        color="default"
                        href="#pablo"
                        size="md"
                        onClick={this.toggle}
                      >
                        Add Assessment
                      </Button>

                      <Modal isOpen={this.state.Question} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>
                          Add Assessment
                        </ModalHeader>
                        <ModalBody>
                          <Form
                            onSubmit={(e) => {
                              e.preventDefault();
                              var error = false;
                              if (e.target.assessment.value === "Assessment") {
                                this.setState({
                                  assessment_error:
                                    "Please Select an Assessment",
                                });
                                error = true;
                              } else {
                                this.setState({
                                  assessment_error: "",
                                  assessment: e.target.assessment.value,
                                });
                              }
                              if (!error) {
                                this.props.addAssessment(
                                  e.target.assessment.value,
                                  projectId,
                                  clientId,
                                  thisConsultant.id
                                );
                                this.toggle(e);
                              }
                            }}
                          >
                            <Label>Assessments</Label>
                            <Input
                              name="assessment"
                              type="select"
                              valid={
                                !this.state.assessment_error &&
                                this.state.assessment
                              }
                              invalid={this.state.assessment_error}
                            >
                              <option hidden>Assessment</option>
                              {assessments &&
                                assessments
                                  .filter((ass) =>
                                    thisConsultant
                                      ? thisConsultant.buyAssessment.includes(
                                          ass.id
                                        )
                                      : true
                                  )
                                  .map((ass) => {
                                    return (
                                      <option value={ass.id}>
                                        {ass.title}
                                      </option>
                                    );
                                  })}
                            </Input>
                            <FormFeedback>
                              {this.state.assessment_error}
                            </FormFeedback>

                            <Row className="mt-2">
                              <Col className="text-right">
                                <Button color="default" size="md">
                                  Add Assessment
                                </Button>
                              </Col>
                            </Row>
                          </Form>
                        </ModalBody>
                      </Modal>
                    </Col>
                  </Row>
                  <h3 className="ml-3 mb-2 mt-4">Assessments</h3>

                  <Table
                    className="align-items-center  table-flush "
                    responsive
                  >
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Assessment Id</th>
                        <th scope="col"> Tile</th>
                        <th scope="col"> Description</th>
                        <th scope="col"> Type</th>
                        <th scope="col"> Version</th>
                        <th scope="col"> Price</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assessments &&
                        assessments
                          .filter(
                            (ass) =>
                              thisProject &&
                              thisProject.assessments.includes(ass.id)
                          )
                          .map((ass, index) => {
                            return (
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        {index + 1}
                                      </span>
                                    </Media>
                                  </Media>
                                </th>
                                <td> {ass.title}</td>
                                <td> {ass.description}</td>
                                <td> {ass.type}</td>
                                <td> {ass.version}</td>
                                <td> {ass.price}$</td>
                                <td>
                                  <Button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      this.props.deleteAssessment(
                                        ass.id,
                                        projectId,
                                        clientId
                                      );
                                    }}
                                    size="sm"
                                    color="white"
                                  >
                                    <i className="fas fa-trash  " />
                                  </Button>
                                  <Link
                                    style={{ padding: "0.25rem 0.5rem" }}
                                    to={
                                      "/admin/clients/" +
                                      clientId +
                                      "/viewProject/" +
                                      projectId +
                                      "/viewAssessment/" +
                                      ass.id
                                    }
                                  >
                                    <Button size="sm" color="white">
                                      <i className="fas fa-eye  " />
                                    </Button>
                                  </Link>
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
    assessments: state.firestore.ordered.assessments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // editProject: (project, previousP, clientId) =>
    //   dispatch(editProjects(project, previousP, clientId)),
    addAssessment: (ass, projectId, clientId, consultantId) =>
      dispatch(addAssessment(ass, projectId, clientId, consultantId)),
    deleteAssessment: (ass, projectId, clientId) =>
      dispatch(deleteAssessment(ass, projectId, clientId)),
  };
};

export default compose(
  firestoreConnect([
    { collection: "clients" },
    { collection: "consultants" },
    { collection: "assessments" },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(viewProject);
