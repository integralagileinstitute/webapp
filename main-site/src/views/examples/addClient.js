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
  FormGroup,
  FormFeedback,
} from "reactstrap";
import { compose } from "redux";
import { addClients } from "actions/clientActions";
import { v4 as uuidv4 } from "uuid";
class addClient extends Component {
  state = {
    Question: false,
    assessmentList: [],
    projects: [],
    redirect: false,
  };
  toggle = (e) => {
    e.preventDefault();
    this.setState({ Question: !this.state.Question });
  };
  toggleAssessmentList = (value) => {
    var all = this.state.assessmentList;

    if (!all.includes(value)) {
      all.push(value);
    } else {
      all = all.filter((a) => a != value);
    }
    console.log(this.state.assessmentList);
    this.setState({ assessmentList: all });
  };
  deleteProject = (project) => {
    var projects = this.state.projects;
    projects = projects.filter((pro) => pro !== project);
    this.setState({ projects });
  };
  addProject = (e) => {
    e.preventDefault();
    var projects = this.state.projects;
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
    if (!e.target.start.value) {
      this.setState({ start_error: "Please Enter a Starting date" });
      error = true;
    } else {
      this.setState({
        start_error: "",
        start: e.target.start.value,
      });
    }

    if (!e.target.end.value) {
      this.setState({ end_error: "Please Enter a Ending Date" });
      error = true;
    } else {
      this.setState({
        end_error: "",
        end: e.target.end.value,
      });
    }
    if (e.target.time_zone.value === "Time Zone") {
      this.setState({ time_zone_error: "Please Select a Time Zone" });
      error = true;
    } else {
      this.setState({
        time_zone_error: "",
        time_zone: e.target.time_zone.value,
      });
    }
    if (!error) {
      projects.push({
        id: uuidv4(),
        name: e.target.name.value,
        start_date: e.target.start.value,
        end_date: e.target.end.value,
        time_zone: e.target.time_zone.value,
        assessments: this.state.assessmentList,
      });

      this.setState({ projects });

      this.toggle(e);
    }
  };
  addClient = (e) => {
    e.preventDefault();
    var error = false;
    if (!e.target.name.value) {
      this.setState({ client_name_error: "Please Enter a Name" });
      error = true;
    } else {
      this.setState({
        client_name_error: "",
        client_name: e.target.name.value,
      });
    }
    if (e.target.industry.value === "Industry") {
      this.setState({ industry_error: "Please Enter a industry" });
      error = true;
    } else {
      this.setState({
        industry_error: "",
        industry: e.target.industry.value,
      });
    }
    if (!error) {
      this.props.addClient({
        name: e.target.name.value,
        industry: e.target.industry.value,
        projects: this.state.projects,
        consultantId: this.props.uid,
      });
      this.setState({ redirect: true });
    }
  };
  render() {
    const { components, assessments, consultants, uid } = this.props;
    const thisConsultant =
      consultants && consultants.find((con) => con.id === uid);
    if (this.state.redirect) {
      return <Redirect to="/admin/clients" />;
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
                    <Link to="/admin/clients" className="text-default ">
                      <i
                        className="fas fa-long-arrow-alt-left "
                        style={{ fontSize: "25px" }}
                      />
                    </Link>
                    <h3 className="ml-3 mb-0 ">Add Client</h3>
                  </div>
                </CardHeader>
                <CardBody className=" mb-0 ">
                  <Form onSubmit={this.addClient}>
                    <Label>Client Name</Label>
                    <Input
                      name="name"
                      valid={
                        !this.state.client_name_error && this.state.client_name
                      }
                      invalid={this.state.client_name_error}
                    />
                    <FormFeedback>{this.state.client_name_error}</FormFeedback>
                    <Label>Client Industry</Label>
                    <Input
                      name="industry"
                      type="select"
                      valid={!this.state.industry_error && this.state.industry}
                      invalid={this.state.industry_error}
                    >
                      <option hidden>Industry</option>
                      {components &&
                        components
                          .filter((comp) => comp.id === "client_industry")[0]
                          .industries.map((ind) => {
                            return <option>{ind}</option>;
                          })}
                    </Input>

                    <FormFeedback>{this.state.industry_error}</FormFeedback>
                    <Button
                      className="mt-2"
                      type="button"
                      color="default"
                      size="md"
                      onClick={this.toggle}
                    >
                      Add Project
                    </Button>
                    <Row>
                      <Col className="text-right">
                        <Button
                          className="mt-2"
                          type="submit"
                          color="default"
                          size="md"
                        >
                          Save Client
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                  <Modal isOpen={this.state.Question} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add Project</ModalHeader>
                    <ModalBody>
                      <Form onSubmit={this.addProject}>
                        <Label>Name</Label>
                        <Input
                          name="name"
                          valid={!this.state.name_error && this.state.name}
                          invalid={this.state.name_error}
                        />
                        <FormFeedback>{this.state.name_error}</FormFeedback>
                        <Label>Start Date</Label>
                        <Input
                          name="start"
                          type="date"
                          valid={!this.state.start_error && this.state.start}
                          invalid={this.state.start_error}
                        />
                        <FormFeedback>{this.state.start_error}</FormFeedback>
                        <Label>End Date</Label>
                        <Input
                          name="end"
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
                          <option>-11:00</option>
                          <option>-10:00</option>
                          <option>-9:00</option>
                          <option>-8:00</option>
                          <option>-7:00</option>
                          <option>-6:00</option>
                          <option>-5:00</option>
                          <option>-4:00</option>
                          <option>-3:00</option>
                          <option>-2:00</option>
                          <option>-1:00</option>
                          <option>00:00</option>
                          <option>+1:00</option>
                          <option>+2:00</option>
                          <option>+3:00</option>
                          <option>+4:00</option>
                          <option>+5:00</option>
                          <option>+6:00</option>
                          <option>+7:00</option>
                          <option>+8:00</option>
                          <option>+9:00</option>
                          <option>+10:00</option>
                          <option>+11:00</option>
                          <option>+12:00</option>
                        </Input>
                        <FormFeedback>
                          {this.state.time_zone_error}
                        </FormFeedback>
                        <Row className="mt-2">
                          <Col className="text-right">
                            <Button color="default" size="md" type="submit">
                              Add Project
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                  {this.state.projects.length > 0
                    ? this.state.projects.map((pro) => {
                        return (
                          <Row className="mt-4">
                            <Col xs={{ size: 8 }}>
                              <h3 className=" mb-0 ">{pro.name}</h3>
                              <p className="mb-0">{pro.industry}</p>
                            </Col>
                            <Col xs={{ size: 4 }} className="text-right">
                              <Button
                                className="mt-2"
                                type="button"
                                color="default"
                                size="md"
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.deleteProject(pro);
                                }}
                              >
                                Delete
                              </Button>
                            </Col>
                          </Row>
                        );
                      })
                    : null}
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
    assessments: state.firestore.ordered.assessments,
    consultants: state.firestore.ordered.consultants,
    components: state.firestore.ordered.components,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addClient: (client) => dispatch(addClients(client)),
  };
};

export default compose(
  firestoreConnect([
    { collection: "assessments" },
    { collection: "consultants" },
    { collection: "components" },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(addClient);
