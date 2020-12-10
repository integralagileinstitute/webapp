import Header from "components/Headers/Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link, Redirect } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Button,
  Form,
  Label,
  Input,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  FormFeedback,
} from "reactstrap";
import { compose } from "redux";
import { editProjects } from "actions/clientActions";
import { addAssessment } from "actions/clientActions";
import { deleteAssessment } from "actions/clientActions";
class editProject extends Component {
  state = { Question: false };
  toggle = (e) => {
    e.preventDefault();
    this.setState({ Question: !this.state.Question });
  };
  editProject = (project, thisProject, clientId) => {
    this.props.editProject(project, thisProject, clientId);
    this.setState({ redirect: true });
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
    if (this.state.redirect) {
      return <Redirect to={"/admin/clients/viewClient/" + clientId} />;
    }
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
                    <h3 className="ml-3 mb-0 ">
                      <i className="ni ni-settings  " />
                      &nbsp; Edit Project
                    </h3>
                  </div>
                </CardHeader>
                <CardBody className=" mb-0 ">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      var error = false;
                      if (!e.target.name.value) {
                        this.setState({ name_error: "Please Enter a Name" });
                        error = true;
                      } else {
                        this.setState({
                          name_error: "",
                          name: e.target.name.value,
                        });
                      }
                      if (!e.target.start_date.value) {
                        this.setState({
                          start_date_error: "Please Enter a Starting date",
                        });
                        error = true;
                      } else {
                        this.setState({
                          start_date_error: "",
                          start_date: e.target.start_date.value,
                        });
                      }

                      if (!e.target.end_date.value) {
                        this.setState({
                          end_date_error: "Please Enter a Ending Date",
                        });
                        error = true;
                      } else {
                        this.setState({
                          end_date_error: "",
                          end_date: e.target.end_date.value,
                        });
                      }
                      if (e.target.time_zone.value === "Time Zone") {
                        this.setState({
                          time_zone_error: "Please Select a Time Zone",
                        });
                        error = true;
                      } else {
                        this.setState({
                          time_zone_error: "",
                          time_zone: e.target.time_zone.value,
                        });
                      }
                      if (!error) {
                        this.editProject(
                          {
                            name: e.target.name.value,
                            start_date: e.target.start_date.value,
                            end_date: e.target.end_date.value,
                            time_zone: e.target.time_zone.value,
                          },
                          thisProject,
                          clientId
                        );
                      }
                    }}
                  >
                    <Label>Project Name</Label>
                    <Input
                      name="name"
                      defaultValue={thisProject && thisProject.name}
                      valid={!this.state.name_error && this.state.name}
                      invalid={this.state.name_error}
                    />
                    <FormFeedback>{this.state.name_error}</FormFeedback>
                    <Label>Start Date </Label>
                    <Input
                      name="start_date"
                      defaultValue={thisProject && thisProject.start_date}
                      type="date"
                      valid={!this.state.start_error && this.state.start}
                      invalid={this.state.start_error}
                    />
                    <FormFeedback>{this.state.start_error}</FormFeedback>
                    <Label>End Date </Label>
                    <Input
                      name="end_date"
                      defaultValue={thisProject && thisProject.end_date}
                      type="date"
                      valid={!this.state.end_error && this.state.end}
                      invalid={this.state.end_error}
                    />
                    <FormFeedback>{this.state.end_error}</FormFeedback>

                    <Label>Time Zone</Label>
                    <Input
                      name="time_zone"
                      type="select"
                      valid={
                        !this.state.time_zone_error && this.state.time_zone
                      }
                      invalid={this.state.time_zone_error}
                    >
                      <option hidden>Time Zone</option>
                      {[
                        "-11:00",
                        "-10:00",
                        "-9:00",
                        "-8:00",
                        "-7:00",
                        "-6:00",
                        "-5:00",
                        "-4:00",
                        "-3:00",
                        "-2:00",
                        "-1:00",
                        "00:00",
                        "+1:00",
                        "+2:00",
                        "+3:00",
                        "+4:00",
                        "+5:00",
                        "+6:00",
                        "+7:00",
                        "+8:00",
                        "+9:00",
                        "+10:00",
                        "+11:00",
                        "+12:00",
                      ].map((time) => {
                        return (
                          <option
                            selected={
                              thisProject && thisProject.time_zone === time
                            }
                          >
                            {time}
                          </option>
                        );
                      })}
                    </Input>
                    <FormFeedback>{this.state.time_zone_error}</FormFeedback>
                    {/* 
                    <Button
                      className="mt-2"
                      type="button"
                      color="default"
                      size="md"
                      onClick={this.toggle}
                    >
                      Add Assessment
                    </Button> */}
                    <Row>
                      <Col className="text-right">
                        <Button
                          className="mt-2"
                          type="submit"
                          color="default"
                          size="md"
                        >
                          Save Project
                        </Button>
                      </Col>
                    </Row>
                  </Form>
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
                              assessment_error: "Please Select an Assessment",
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
                              clientId
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
                                  <option value={ass.id}>{ass.title}</option>
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
                  {thisProject &&
                    thisProject.assessments.map((ass) => {
                      return (
                        <Row className="mt-4">
                          <Col xs={{ size: 8 }}>
                            <h3 className=" mb-0 ">{ass}</h3>
                          </Col>
                          <Col xs={{ size: 4 }} className="text-right">
                            <Button
                              className="mt-2"
                              type="button"
                              color="default"
                              size="md"
                              onClick={(e) => {
                                e.preventDefault();
                                this.props.deleteAssessment(
                                  ass,
                                  projectId,
                                  clientId,
                                  thisConsultant.id
                                );
                              }}
                            >
                              Delete
                            </Button>
                          </Col>
                        </Row>
                      );
                    })}
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
    editProject: (project, previousP, clientId) =>
      dispatch(editProjects(project, previousP, clientId)),
    addAssessment: (ass, projectId, clientId, consultantId) =>
      dispatch(addAssessment(ass, projectId, clientId, consultantId)),
    deleteAssessment: (ass, projectId, clientId) =>
      dispatch(deleteAssessment(ass, projectId, clientId)),
  };
};

export default compose(
  firestoreConnect([
    { collection: "clients" },
    { collection: "assessments" },
    { collection: "consultants" },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(editProject);
