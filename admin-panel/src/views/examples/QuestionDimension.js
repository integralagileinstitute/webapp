import Header from "components/Headers/Header";
import React, { Component } from "react";
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
import {
  addQuestionDimension,
  editQuestionDimension,
  deleteQuestionDimension,
} from "actions/componentsActions";

import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

export class QuestionDimension extends Component {
  state = {
    edit: true,
    dimension: "",
    changeDimension: "",
    search: "",
    pagination: 1,
  };
  addQuestionDimension = (e) => {
    e.preventDefault();
    var error = false;
    if (!e.target.question_dimension.value) {
      this.setState({ question_dimension_error: "Please add Text" });
      error = true;
    } else {
      this.setState({
        question_dimension_error: "",
        question_dimension: e.target.question_dimension.value,
      });
    }
    if (!error) {
      this.props.addQuestionDimension(e.target.question_dimension.value);
      e.target.question_dimension.value = "";
    }
  };
  deleteQuestionDimension = (dimension) => {
    this.props.deleteQuestionDimension(dimension);
  };
  addToEdit = (dimension) => {
    this.setState({
      dimension: dimension,
      edit: false,
      changeDimension: dimension,
    });
  };
  editQuestionDimension = (e) => {
    e.preventDefault();

    this.props.editQuestionDimension(
      this.state.changeDimension,
      e.target.question_dimension.value
    );
    this.setState({ edit: true, dimension: "", changeDimension: "" });
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
                <Card className="shadow ">
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
                      <h3 className="ml-3 mb-0 ">Question Dimension</h3>
                    </div>{" "}
                    <p className="text-info">
                      Used to determine Question Dimension
                    </p>
                    <Form>
                      <InputGroup className="mb-3 ">
                        <Input
                          onChange={this.search}
                          name="search"
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
                      onSubmit={this.editQuestionDimension}
                      className=""
                    >
                      <InputGroup className=" ">
                        <Input
                          name="question_dimension"
                          className=" "
                          value={this.state.dimension}
                          onChange={(e) => {
                            e.preventDefault();
                            this.setState({ dimension: e.target.value });
                          }}
                        />
                        <InputGroupAddon addonType="append">
                          <Button>EDIT</Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Form>
                    <Form
                      hidden={!this.state.edit}
                      onSubmit={this.addQuestionDimension}
                      className=""
                    >
                      <InputGroup className=" ">
                        <Input
                          name="question_dimension"
                          className=" "
                          placeholder="Dimension"
                          valid={
                            !this.state.question_dimension_error &&
                            this.state.question_dimension
                          }
                          invalid={this.state.question_dimension_error}
                        />

                        <InputGroupAddon addonType="append">
                          <Button>ADD</Button>
                        </InputGroupAddon>
                        <FormFeedback>
                          {this.state.question_dimension_error}
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
                          <th scope="col">Dimension</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {components &&
                          components
                            .filter((comp) => comp.id === "question_dimension")
                            .map((comp) => {
                              return comp.dimensions
                                .filter((dimension) => {
                                  if (this.state.search) {
                                    return dimension.includes(
                                      this.state.search
                                    );
                                  } else {
                                    return true;
                                  }
                                })
                                .splice(5 * (this.state.pagination - 1), 5)
                                .map((dimension, i) => {
                                  return (
                                    <tr
                                      hidden={
                                        this.state.changeDimension === dimension
                                      }
                                    >
                                      <th scope="row">
                                        <span className="mb-0 text-sm ">
                                          {i + 1}
                                        </span>
                                      </th>
                                      <td className=""> {dimension}</td>
                                      <td>
                                        <Button
                                          type="button"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            this.addToEdit(dimension);
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
                                            this.deleteQuestionDimension(
                                              dimension
                                            );
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
                                    (comp) => comp.id === "question_dimension"
                                  )[0]
                                  .dimensions.filter((dimension) => {
                                    if (this.state.search) {
                                      return dimension.includes(
                                        this.state.search
                                      );
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
    addQuestionDimension: (dimension) =>
      dispatch(addQuestionDimension(dimension)),
    deleteQuestionDimension: (dimension) =>
      dispatch(deleteQuestionDimension(dimension)),
    editQuestionDimension: (dimension, newDimension) =>
      dispatch(editQuestionDimension(dimension, newDimension)),
  };
};

export default compose(
  firestoreConnect([{ collection: "components" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(QuestionDimension);
