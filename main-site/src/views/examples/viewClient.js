import { deleteProjects } from "actions/clientActions";
import { addProjects } from "actions/clientActions";
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
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormFeedback,
} from "reactstrap";
import { compose } from "redux";
class viewClient extends Component {
  state = {
    Question: false,
    assessmentList: [],
    projects: [],
    redirect: false,
  };
  deleteProject = (project) => {
    this.props.deleteProject(project, this.props.match.params.id);
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
      this.props.addProject(
        {
          name: e.target.name.value,
          start_date: e.target.start.value,
          end_date: e.target.end.value,
          time_zone: e.target.time_zone.value,
          assessments: this.state.assessmentList,
        },
        this.props.match.params.id
      );

      this.toggle(e);
    }
  };
  toggle = (e) => {
    e.preventDefault();
    this.setState({ Question: !this.state.Question });
  };
  render() {
    const { clients, assessments, consultants, uid } = this.props;
    const thisConsultant =
      consultants && consultants.find((con) => con.id === uid);
    const clientId = this.props.match.params.id;
    const thisClient =
      clients && clients.filter((client) => client.id === clientId)[0];

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
                    <h3 className="ml-3 mb-0 "> Client</h3>
                  </div>
                </CardHeader>

                <CardBody className=" mb-0 ">
                  <Row className="mb-2">
                    <Col>
                      <h3 className=" mb-0 ">
                        Name : {thisClient && thisClient.name}
                      </h3>
                    </Col>
                    <Col>
                      <h3 className=" mb-0 ">
                        Industry : {thisClient && thisClient.industry}
                      </h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-right">
                      <Button
                        className=" mb-2"
                        color="default"
                        href="#pablo"
                        size="md"
                        onClick={this.toggle}
                      >
                        Add Project
                      </Button>

                      <Modal isOpen={this.state.Question} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>
                          Add Project
                        </ModalHeader>
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
                              valid={
                                !this.state.start_error && this.state.start
                              }
                              invalid={this.state.start_error}
                            />
                            <FormFeedback>
                              {this.state.start_error}
                            </FormFeedback>

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
                                !this.state.time_zone_error &&
                                this.state.time_zone
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
                    </Col>
                  </Row>
                  <Table className="align-items-center  table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Project Id</th>
                        <th scope="col">Project Name</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Time Zone</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {thisClient && thisClient.projects.length > 0
                        ? thisClient.projects.map((pro) => {
                            return (
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        {pro.id}
                                      </span>
                                    </Media>
                                  </Media>
                                </th>
                                <td> {pro.name}</td>
                                <td> {pro.start_date}</td>
                                <td> {pro.end_date}</td>
                                <td> {pro.time_zone}</td>
                                <td>
                                  <Link
                                    style={{ padding: "0.25rem 0.5rem" }}
                                    to={
                                      "/admin/clients/" +
                                      clientId +
                                      "/editProject/" +
                                      pro.id
                                    }
                                  >
                                    <Button size="sm" color="white">
                                      <i className="ni ni-settings  " />
                                    </Button>
                                  </Link>

                                  <Button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      this.deleteProject(pro);
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
                                      pro.id
                                    }
                                  >
                                    <Button size="sm" color="white">
                                      <i className="fas fa-eye  " />
                                    </Button>
                                  </Link>
                                </td>
                              </tr>
                            );
                          })
                        : null}
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
    addProject: (project, clientId) => dispatch(addProjects(project, clientId)),
    deleteProject: (project, clientId) =>
      dispatch(deleteProjects(project, clientId)),
    // editClient: (client, clientId) => dispatch(editClients(client, clientId)),
  };
};

export default compose(
  firestoreConnect([
    { collection: "clients" },
    { collection: "consultants" },
    { collection: "assessments" },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(viewClient);
