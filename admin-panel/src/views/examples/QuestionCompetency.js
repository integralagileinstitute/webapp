import Header from "components/Headers/Header";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
// reactstrap components
import {
  addQuestionCompetency,
  editQuestionCompetency,
  deleteQuestionCompetency,
} from "actions/componentsActions";

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
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

export class QuestionCompetency extends Component {
  state = {
    edit: true,
    competency: "",
    changeCompetency: "",
    search: "",
    pagination: 1,
  };
  addQuestionCompetency = (e) => {
    e.preventDefault();
    var error = false;
    if (!e.target.question_competency.value) {
      this.setState({ question_competency_error: "Please add Text" });
      error = true;
    } else {
      this.setState({
        question_competency_error: "",
        question_competency: e.target.question_competency.value,
      });
    }
    if (!error) {
      this.props.addQuestionCompetency(e.target.question_competency.value);
      e.target.question_competency.value = "";
    }
  };
  deleteQuestionCompetency = (competency) => {
    this.props.deleteQuestionCompetency(competency);
  };
  addToEdit = (competency) => {
    this.setState({
      competency: competency,
      edit: false,
      changeCompetency: competency,
    });
  };
  editQuestionCompetency = (e) => {
    e.preventDefault();

    this.props.editQuestionCompetency(
      this.state.changeCompetency,
      e.target.question_competency.value
    );
    this.setState({ edit: true, competency: "", changeCompetency: "" });
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
                      <h3 className="ml-3 mb-0 ">Question Competency</h3>
                    </div>{" "}
                    <p className="text-info">
                      Used to determine Question Competency
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
                      onSubmit={this.editQuestionCompetency}
                      className=""
                    >
                      <InputGroup className=" ">
                        <Input
                          name="question_competency"
                          className=" "
                          value={this.state.competency}
                          onChange={(e) => {
                            e.preventDefault();
                            this.setState({ competency: e.target.value });
                          }}
                        />
                        <InputGroupAddon addonType="append">
                          <Button>EDIT</Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Form>
                    <Form
                      hidden={!this.state.edit}
                      onSubmit={this.addQuestionCompetency}
                      className=""
                    >
                      <InputGroup className=" ">
                        <Input
                          name="question_competency"
                          className=" "
                          placeholder="Competency"
                          valid={
                            !this.state.question_competency_error &&
                            this.state.question_competency
                          }
                          invalid={this.state.question_competency_error}
                        />

                        <InputGroupAddon addonType="append">
                          <Button>ADD</Button>
                        </InputGroupAddon>
                        <FormFeedback>
                          {this.state.question_competency_error}
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
                          <th scope="col">Competency</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {components &&
                          components
                            .filter((comp) => comp.id === "question_competency")
                            .map((comp) => {
                              return comp.competencies
                                .filter((competency) => {
                                  if (this.state.search) {
                                    return competency.includes(
                                      this.state.search
                                    );
                                  } else {
                                    return true;
                                  }
                                })
                                .splice(5 * (this.state.pagination - 1), 5)
                                .map((competency, i) => {
                                  return (
                                    <tr
                                      hidden={
                                        this.state.changeCompetency ===
                                        competency
                                      }
                                    >
                                      <th scope="row">
                                        <span className="mb-0 text-sm ">
                                          {i + 1}
                                        </span>
                                      </th>
                                      <td className=""> {competency}</td>
                                      <td>
                                        <Button
                                          type="button"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            this.addToEdit(competency);
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
                                            this.deleteQuestionCompetency(
                                              competency
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
                                    (comp) => comp.id === "question_compentency"
                                  )[0]
                                  .competencies.filter((competency) => {
                                    if (this.state.search) {
                                      return competency.includes(
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
    addQuestionCompetency: (competency) =>
      dispatch(addQuestionCompetency(competency)),
    deleteQuestionCompetency: (competency) =>
      dispatch(deleteQuestionCompetency(competency)),
    editQuestionCompetency: (competency, newCompetency) =>
      dispatch(editQuestionCompetency(competency, newCompetency)),
  };
};

export default compose(
  firestoreConnect([{ collection: "components" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(QuestionCompetency);
