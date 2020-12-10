import {
  addAssessmentType,
  editAssessmentType,
  deleteAssessmentType,
} from "actions/componentsActions";
import Header from "components/Headers/Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link, Redirect } from "react-router-dom";
// reactstrap components
import {
  Card,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  Button,
  Form,
  Input,
  CardBody,
  InputGroup,
  InputGroupAddon,
  FormFeedback,
} from "reactstrap";
import { compose } from "redux";

export class AssessmentType extends Component {
  state = { edit: true, type: "", changeType: "", search: "", pagination: 1 };
  addAssessmentType = (e) => {
    e.preventDefault();
    var error = false;
    if (!e.target.assessment_type.value) {
      this.setState({ assessment_type_error: "Please add Text" });
      error = true;
    } else {
      this.setState({
        assessment_type_error: "",
        assessment_type: e.target.assessment_type.value,
      });
    }
    if (!error) {
      this.props.addAssessmentType(e.target.assessment_type.value);
      e.target.assessment_type.value = "";
    }
  };
  deleteAssessmentType = (type) => {
    this.props.deleteAssessmentType(type);
  };
  addToEdit = (type) => {
    this.setState({ type: type, edit: false, changeType: type });
  };
  editAssessmentType = (e) => {
    e.preventDefault();

    this.props.editAssessmentType(
      this.state.changeType,
      e.target.assessment_type.value
    );
    this.setState({ edit: true, type: "", changeType: "" });
  };
  search = (e) => {
    e.preventDefault();
    this.setState({ search: e.target.value });
  };
  render() {
    const { uid, components } = this.props;
    if (!uid) {
      return <Redirect to="/auth/login" />;
    } else {
      return (
        <>
          <Header />
          {/* Page content */}
          <Container className="mt--9" fluid>
            <Row>
              <Col>
                <Card className="shadow  ">
                  <CardBody className=" ">
                    <div style={{ display: "flex" }}>
                      <Link
                        to="/admin/assessmentcomponents"
                        className="text-default "
                      >
                        <i
                          className="fas fa-long-arrow-alt-left "
                          style={{ fontSize: "25px" }}
                        />
                      </Link>
                      <h3 className="ml-3 mb-0 ">Assessment Type</h3>
                    </div>
                    <p className="text-info">
                      Used to determine Assessment Type
                    </p>
                    <Form>
                      <InputGroup className="mb-3 ">
                        <Input
                          name="search"
                          onChange={this.search}
                          className=" "
                          placeholder="Search"
                        />
                        <InputGroupAddon addonType="append">
                          <Button>
                            <i className="fas fa-search  " />
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Form>
                    <Form
                      hidden={this.state.edit}
                      onSubmit={this.editAssessmentType}
                      className=""
                    >
                      <InputGroup className=" ">
                        <Input
                          name="assessment_type"
                          className=" "
                          value={this.state.type}
                          onChange={(e) => {
                            e.preventDefault();
                            this.setState({ type: e.target.value });
                          }}
                        />
                        <InputGroupAddon addonType="append">
                          <Button>EDIT</Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Form>

                    <Form
                      hidden={!this.state.edit}
                      onSubmit={this.addAssessmentType}
                      className=""
                    >
                      <InputGroup className=" ">
                        <Input
                          name="assessment_type"
                          className=" "
                          placeholder="Type"
                          valid={
                            !this.state.assessment_type_error &&
                            this.state.assessment_type
                          }
                          invalid={this.state.assessment_type_error}
                        />

                        <InputGroupAddon addonType="append">
                          <Button>ADD</Button>
                        </InputGroupAddon>
                        <FormFeedback>
                          {this.state.assessment_type_error}
                        </FormFeedback>
                      </InputGroup>
                    </Form>
                    <Table
                      className="align-items-center  table-flush mt-4"
                      responsive
                    >
                      <thead className="thread-light">
                        <tr>
                          <th scope="col"> Id</th>
                          <th scope="col">Type</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {components &&
                          components
                            .filter((comp) => comp.id === "assessment_type")
                            .map((comp) => {
                              return comp.types
                                .filter((type) => {
                                  if (this.state.search) {
                                    return type.includes(this.state.search);
                                  } else {
                                    return true;
                                  }
                                })
                                .splice(5 * (this.state.pagination - 1), 5)

                                .map((type, i) => {
                                  return (
                                    <tr hidden={this.state.changeType === type}>
                                      <th scope="row">
                                        <span className="mb-0 text-sm ">
                                          {i + 1}
                                        </span>
                                      </th>
                                      <td className=""> {type}</td>
                                      <td>
                                        <Button
                                          type="button"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            this.addToEdit(type);
                                          }}
                                          size="sm"
                                          color="white"
                                        >
                                          <i className="ni ni-settings  " />
                                        </Button>
                                        <Button
                                          type="button"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            this.deleteAssessmentType(type);
                                          }}
                                          size="sm"
                                          color="white"
                                        >
                                          <i className="fas fa-trash  " />
                                        </Button>
                                      </td>
                                    </tr>
                                  );
                                });
                            })}
                      </tbody>
                    </Table>
                    <Row className="mt-2">
                      <Col>
                        <Pagination aria-label="Page navigation example">
                          <PaginationItem>
                            <PaginationLink
                              className=" "
                              previous
                              disabled={this.state.pagination === 1}
                              onClick={(e) => {
                                e.preventDefault();
                                this.setState({
                                  pagination: this.state.pagination - 1,
                                });
                              }}
                            />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink className=" " disabled>
                              {this.state.pagination}
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink
                              className=" "
                              next
                              disabled={
                                components &&
                                components
                                  .filter(
                                    (comp) => comp.id === "assessment_type"
                                  )[0]
                                  .types.filter((type) => {
                                    if (this.state.search) {
                                      return type.includes(this.state.search);
                                    } else {
                                      return true;
                                    }
                                  }).length /
                                  5 <=
                                  this.state.pagination
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                this.setState({
                                  pagination: this.state.pagination + 1,
                                });
                              }}
                            />
                          </PaginationItem>
                        </Pagination>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
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
    components: state.firestore.ordered.components,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addAssessmentType: (type) => dispatch(addAssessmentType(type)),
    deleteAssessmentType: (type) => dispatch(deleteAssessmentType(type)),
    editAssessmentType: (type, newType) =>
      dispatch(editAssessmentType(type, newType)),
  };
};

export default compose(
  firestoreConnect([{ collection: "components" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(AssessmentType);
