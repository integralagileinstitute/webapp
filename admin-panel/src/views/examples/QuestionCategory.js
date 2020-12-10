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
  addQuestionCategory,
  editQuestionCategory,
  deleteQuestionCategory,
} from "actions/componentsActions";

import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

export class QuestionCategory extends Component {
  state = {
    edit: true,
    category: "",
    changeCategory: "",
    search: "",
    pagination: 1,
  };
  addQuestionCategory = (e) => {
    e.preventDefault();
    var error = false;
    if (!e.target.question_category.value) {
      this.setState({ question_category_error: "Please add Text" });
      error = true;
    } else {
      this.setState({
        question_category_error: "",
        question_category: e.target.question_category.value,
      });
    }
    if (!error) {
      this.props.addQuestionCategory(e.target.question_category.value);
      e.target.question_category.value = "";
    }
  };
  deleteQuestionCategory = (category) => {
    this.props.deleteQuestionCategory(category);
  };
  addToEdit = (category) => {
    this.setState({
      category: category,
      edit: false,
      changeCategory: category,
    });
  };
  editQuestionCategory = (e) => {
    e.preventDefault();

    this.props.editQuestionCategory(
      this.state.changeCategory,
      e.target.question_category.value
    );
    this.setState({ edit: true, category: "", changeCategory: "" });
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
                      <h3 className="ml-3 mb-0 ">Question Category</h3>
                    </div>{" "}
                    <p className="text-info">
                      Used to determine Question Category
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
                      onSubmit={this.editQuestionCategory}
                      className=""
                    >
                      <InputGroup className=" ">
                        <Input
                          name="question_category"
                          className=" "
                          value={this.state.category}
                          onChange={(e) => {
                            e.preventDefault();
                            this.setState({ category: e.target.value });
                          }}
                        />
                        <InputGroupAddon addonType="append">
                          <Button>EDIT</Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Form>
                    <Form
                      hidden={!this.state.edit}
                      onSubmit={this.addQuestionCategory}
                      className=""
                    >
                      <InputGroup className=" ">
                        <Input
                          name="question_category"
                          className=" "
                          placeholder="Category"
                          valid={
                            !this.state.question_category_error &&
                            this.state.question_category
                          }
                          invalid={this.state.question_category_error}
                        />

                        <InputGroupAddon addonType="append">
                          <Button>ADD</Button>
                        </InputGroupAddon>
                        <FormFeedback>
                          {this.state.question_category_error}
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
                          <th scope="col">Category</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {components &&
                          components
                            .filter((comp) => comp.id === "question_category")
                            .map((comp) => {
                              return comp.categories
                                .filter((category) => {
                                  if (this.state.search) {
                                    return category.includes(this.state.search);
                                  } else {
                                    return true;
                                  }
                                })
                                .splice(5 * (this.state.pagination - 1), 5)
                                .map((category, i) => {
                                  return (
                                    <tr
                                      hidden={
                                        this.state.changeCategory === category
                                      }
                                    >
                                      <th scope="row">
                                        <span className="mb-0 text-sm ">
                                          {i + 1}
                                        </span>
                                      </th>
                                      <td className=""> {category}</td>
                                      <td>
                                        <Button
                                          type="button"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            this.addToEdit(category);
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
                                            this.deleteQuestionCategory(
                                              category
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
                                    (comp) => comp.id === "question_category"
                                  )[0]
                                  .categories.filter((category) => {
                                    if (this.state.search) {
                                      return category.includes(
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
    addQuestionCategory: (category) => dispatch(addQuestionCategory(category)),
    deleteQuestionCategory: (category) =>
      dispatch(deleteQuestionCategory(category)),
    editQuestionCategory: (category, newCategory) =>
      dispatch(editQuestionCategory(category, newCategory)),
  };
};

export default compose(
  firestoreConnect([{ collection: "components" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(QuestionCategory);
