import Header from "components/Headers/Header";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardHeader,
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
import {
  addClientIndustry,
  editClientIndustry,
  deleteClientIndustry,
  addQuestionDimension,
  editQuestionDimension,
  deleteQuestionDimension,
  addQuestionCategory,
  editQuestionCategory,
  deleteQuestionCategory,
  addQuestionType,
  editQuestionType,
  deleteQuestionType,
  addAssessmentType,
  editAssessmentType,
  deleteAssessmentType,
  addQuestionCompetency,
  editQuestionCompetency,
  deleteQuestionCompetency,
} from "actions/componentsActions";

class AssessmentComponents extends Component {
  state = {
    editAT: true,
    editQT: true,
    editQC: true,
    editQCM: true,
    editQD: true,
    edit: true,
    type: "",
    changeType: "",
    category: "",
    changeCategory: "",
    competency: "",
    changeCompetency: "",
    dimension: "",
    changeDimension: "",
    industry: "",
    changeIndustry: "",
    searchAT: "",
    searchQT: "",
    searchQC: "",
    searchQCM: "",
    searchQD: "",
    search: "",
    paginationAT: 1,
    paginationQT: 1,
    paginationQC: 1,
    paginationQCM: 1,
    paginationQD: 1,
    pagination: 1,
  };
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
  addToEditAT = (type) => {
    this.setState({ type: type, editAT: false, changeType: type });
  };
  editAssessmentType = (e) => {
    e.preventDefault();

    this.props.editAssessmentType(
      this.state.changeType,
      e.target.assessment_type.value
    );
    this.setState({ editAT: true, type: "", changeType: "" });
  };
  searchAT = (e) => {
    e.preventDefault();
    this.setState({ searchAT: e.target.value });
  };
  addQuestionType = (e) => {
    e.preventDefault();
    var error = false;
    if (!e.target.question_type.value) {
      this.setState({ question_type_error: "Please add Text" });
      error = true;
    } else {
      this.setState({
        question_type_error: "",
        question_type: e.target.question_type.value,
      });
    }
    if (!error) {
      this.props.addQuestionType(e.target.question_type.value);
      e.target.question_type.value = "";
    }
  };
  deleteQuestionType = (type) => {
    this.props.deleteQuestionType(type);
  };
  addToEditQT = (type) => {
    this.setState({ type: type, editQT: false, changeType: type });
  };
  editQuestionType = (e) => {
    e.preventDefault();

    this.props.editQuestionType(
      this.state.changeType,
      e.target.question_type.value
    );
    this.setState({ editQT: true, type: "", changeType: "" });
  };
  searchQT = (e) => {
    e.preventDefault();
    this.setState({ searchQT: e.target.value });
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
  addToEditQC = (category) => {
    this.setState({
      category: category,
      editQC: false,
      changeCategory: category,
    });
  };
  editQuestionCategory = (e) => {
    e.preventDefault();

    this.props.editQuestionCategory(
      this.state.changeCategory,
      e.target.question_category.value
    );
    this.setState({ editQC: true, category: "", changeCategory: "" });
  };
  searchQC = (e) => {
    e.preventDefault();
    this.setState({ searchQC: e.target.value });
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
  addToEditQCM = (competency) => {
    this.setState({
      competency: competency,
      editQCM: false,
      changeCompetency: competency,
    });
  };
  editQuestionCompetency = (e) => {
    e.preventDefault();

    this.props.editQuestionCompetency(
      this.state.changeCompetency,
      e.target.question_competency.value
    );
    this.setState({ editQCM: true, competency: "", changeCompetency: "" });
  };
  searchQCM = (e) => {
    e.preventDefault();
    this.setState({ searchQCM: e.target.value });
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
  addToEditQD = (dimension) => {
    this.setState({
      dimension: dimension,
      editQD: false,
      changeDimension: dimension,
    });
  };
  editQuestionDimension = (e) => {
    e.preventDefault();

    this.props.editQuestionDimension(
      this.state.changeDimension,
      e.target.question_dimension.value
    );
    this.setState({ editQD: true, dimension: "", changeDimension: "" });
  };
  searchQD = (e) => {
    e.preventDefault();
    this.setState({ searchQD: e.target.value });
  };
  addClientIndustry = (e) => {
    e.preventDefault();
    var error = false;
    if (!e.target.client_industry.value) {
      this.setState({ client_industry_error: "Please add Text" });
      error = true;
    } else {
      this.setState({
        client_industry_error: "",
        client_industry: e.target.client_industry.value,
      });
    }
    if (!error) {
      this.props.addClientIndustry(e.target.client_industry.value);
      e.target.client_industry.value = "";
    }
  };
  deleteClientIndustry = (industry) => {
    this.props.deleteClientIndustry(industry);
  };
  addToEdit = (industry) => {
    this.setState({
      industry: industry,
      edit: false,
      changeIndutry: industry,
    });
  };
  editClientIndustry = (e) => {
    e.preventDefault();

    this.props.editClientIndustry(
      this.state.changeIndutry,
      e.target.client_industry.value
    );
    this.setState({ edit: true, industry: "", changeIndutry: "" });
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
            {/* forms */}
            <Row>
              <Col>
                <Card className=" shadow ">
                  <CardHeader className=" border-0 ">
                    <h3 className=" mb-0 ">Assessment Components</h3>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs={{ size: 12 }} lg={{ size: 6 }} className="mb-4">
                        <Card className="shadow border-dark ">
                          <CardBody className=" ">
                            <div style={{ display: "flex" }}>
                              <h3 className=" mb-0 ">Assessment Type</h3>
                              <Link
                                className="ml-2"
                                to="/admin/assessmentcomponents/assessmenttype"
                              >
                                <Button color="white" size="sm">
                                  <i className="fas fa-eye" />
                                </Button>
                              </Link>
                            </div>
                            <p className="text-info">
                              Used to determine Assessment Type
                            </p>
                            <Form>
                              <InputGroup className="mb-3 ">
                                <Input
                                  name="searchAT"
                                  className=" "
                                  onChange={this.searchAT}
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
                              hidden={this.state.editAT}
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
                              hidden={!this.state.editAT}
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
                                    .filter(
                                      (comp) => comp.id === "assessment_type"
                                    )
                                    .map((comp) => {
                                      return comp.types
                                        .filter((type) => {
                                          if (this.state.searchAT) {
                                            return type.includes(
                                              this.state.searchAT
                                            );
                                          } else {
                                            return true;
                                          }
                                        })
                                        .splice(
                                          5 * (this.state.paginationAT - 1),
                                          5
                                        )

                                        .map((type, i) => {
                                          return (
                                            <tr
                                              hidden={
                                                this.state.changeType === type
                                              }
                                            >
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
                                                    this.addToEditAT(type);
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
                                                    this.deleteAssessmentType(
                                                      type
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
                                      disabled={this.state.paginationAT === 1}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({
                                          paginationAT:
                                            this.state.paginationAT - 1,
                                        });
                                      }}
                                    />
                                  </PaginationItem>
                                  <PaginationItem>
                                    <PaginationLink className=" " disabled>
                                      {this.state.paginationAT}
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
                                            (comp) =>
                                              comp.id === "assessment_type"
                                          )[0]
                                          .types.filter((type) => {
                                            if (this.state.search) {
                                              return type.includes(
                                                this.state.search
                                              );
                                            } else {
                                              return true;
                                            }
                                          }).length /
                                          5 <=
                                          this.state.paginationAT
                                      }
                                      onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({
                                          paginationAT:
                                            this.state.paginationAT + 1,
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
                      <Col xs={{ size: 12 }} lg={{ size: 6 }} className="mb-4">
                        <Card className="shadow border-dark">
                          <CardBody className=" ">
                            <div style={{ display: "flex" }}>
                              <h3 className=" mb-0 ">Question Type</h3>
                              <Link
                                className="ml-2"
                                to="/admin/assessmentcomponents/questiontype"
                              >
                                <Button color="white" size="sm">
                                  <i className="fas fa-eye" />
                                </Button>
                              </Link>
                            </div>
                            <p className="text-info">
                              Used to determine Question Type
                            </p>
                            <Form>
                              <InputGroup className="mb-3 ">
                                <Input
                                  name="searchQT"
                                  className=" "
                                  onChange={this.searchQT}
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
                              hidden={this.state.editQT}
                              onSubmit={this.editQuestionType}
                              className=""
                            >
                              <InputGroup className=" ">
                                <Input
                                  name="question_type"
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
                              hidden={!this.state.editQT}
                              onSubmit={this.addQuestionType}
                              className=""
                            >
                              <InputGroup className=" ">
                                <Input
                                  name="question_type"
                                  className=" "
                                  placeholder="Type"
                                  valid={
                                    !this.state.question_type_error &&
                                    this.state.question_type
                                  }
                                  invalid={this.state.question_type_error}
                                />

                                <InputGroupAddon addonType="append">
                                  <Button>ADD</Button>
                                </InputGroupAddon>
                                <FormFeedback>
                                  {this.state.question_type_error}
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
                                    .filter(
                                      (comp) => comp.id === "question_type"
                                    )
                                    .map((comp) => {
                                      return comp.types
                                        .filter((type) => {
                                          if (this.state.searchQT) {
                                            return type.includes(
                                              this.state.searchQT
                                            );
                                          } else {
                                            return true;
                                          }
                                        })
                                        .splice(
                                          5 * (this.state.paginationQT - 1),
                                          5
                                        )

                                        .map((type, i) => {
                                          return (
                                            <tr
                                              hidden={
                                                this.state.changeType === type
                                              }
                                            >
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
                                                    this.addToEditQT(type);
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
                                                    this.deleteQuestionType(
                                                      type
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
                                      disabled={this.state.paginationQT === 1}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({
                                          paginationQT:
                                            this.state.paginationQT - 1,
                                        });
                                      }}
                                    />
                                  </PaginationItem>
                                  <PaginationItem>
                                    <PaginationLink className=" " disabled>
                                      {this.state.paginationQT}
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
                                            (comp) =>
                                              comp.id === "question_type"
                                          )[0]
                                          .types.filter((type) => {
                                            if (this.state.search) {
                                              return type.includes(
                                                this.state.search
                                              );
                                            } else {
                                              return true;
                                            }
                                          }).length /
                                          5 <=
                                          this.state.paginationQT
                                      }
                                      onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({
                                          paginationQT:
                                            this.state.paginationQT + 1,
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
                      <Col xs={{ size: 12 }} lg={{ size: 6 }} className="mb-4">
                        <Card className="shadow border-dark">
                          <CardBody className=" ">
                            <div style={{ display: "flex" }}>
                              <h3 className=" mb-0 ">Question Category</h3>
                              <Link
                                className="ml-2"
                                to="/admin/assessmentcomponents/questioncategory"
                              >
                                <Button color="white" size="sm">
                                  <i className="fas fa-eye" />
                                </Button>
                              </Link>
                            </div>
                            <p className="text-info">
                              Used to determine Question Category
                            </p>
                            <Form>
                              <InputGroup className="mb-3 ">
                                <Input
                                  name="searchQC"
                                  className=" "
                                  onChange={this.searchQC}
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
                              hidden={this.state.editQC}
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
                              hidden={!this.state.editQC}
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
                                    .filter(
                                      (comp) => comp.id === "question_category"
                                    )
                                    .map((comp) => {
                                      return comp.categories
                                        .filter((category) => {
                                          if (this.state.searchQC) {
                                            return category.includes(
                                              this.state.searchQC
                                            );
                                          } else {
                                            return true;
                                          }
                                        })
                                        .splice(
                                          5 * (this.state.paginationQC - 1),
                                          5
                                        )

                                        .map((category, i) => {
                                          return (
                                            <tr
                                              hidden={
                                                this.state.changeCategory ===
                                                category
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
                                                    this.addToEditQC(category);
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
                                      disabled={this.state.paginationQC === 1}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({
                                          paginationQC:
                                            this.state.paginationQC - 1,
                                        });
                                      }}
                                    />
                                  </PaginationItem>
                                  <PaginationItem>
                                    <PaginationLink className=" " disabled>
                                      {this.state.paginationQC}
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
                                            (comp) =>
                                              comp.id === "question_category"
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
                                          this.state.paginationQC
                                      }
                                      onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({
                                          paginationQC:
                                            this.state.paginationQC + 1,
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
                      <Col xs={{ size: 12 }} lg={{ size: 6 }} className="mb-4">
                        <Card className="shadow border-dark">
                          <CardBody className=" ">
                            <div style={{ display: "flex" }}>
                              <h3 className=" mb-0 ">Question Competency</h3>
                              <Link
                                className="ml-2"
                                to="/admin/assessmentcomponents/questioncompetency"
                              >
                                <Button color="white" size="sm">
                                  <i className="fas fa-eye" />
                                </Button>
                              </Link>
                            </div>
                            <p className="text-info">
                              Used to determine Question Competency
                            </p>
                            <Form>
                              <InputGroup className="mb-3 ">
                                <Input
                                  name="searchQCM"
                                  className=" "
                                  onChange={this.searchQCM}
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
                              hidden={this.state.editQCM}
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
                                    this.setState({
                                      competency: e.target.value,
                                    });
                                  }}
                                />
                                <InputGroupAddon addonType="append">
                                  <Button>EDIT</Button>
                                </InputGroupAddon>
                              </InputGroup>
                            </Form>
                            <Form
                              hidden={!this.state.editQCM}
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
                                    .filter(
                                      (comp) =>
                                        comp.id === "question_competency"
                                    )
                                    .map((comp) => {
                                      return comp.competencies
                                        .filter((competency) => {
                                          if (this.state.searchQCM) {
                                            return competency.includes(
                                              this.state.searchQCM
                                            );
                                          } else {
                                            return true;
                                          }
                                        })
                                        .splice(
                                          5 * (this.state.paginationQCM - 1),
                                          5
                                        )

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
                                              <td className="">
                                                {" "}
                                                {competency}
                                              </td>
                                              <td>
                                                <Button
                                                  type="button"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    this.addToEditQCM(
                                                      competency
                                                    );
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
                                      disabled={this.state.paginationQCM === 1}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({
                                          paginationQCM:
                                            this.state.paginationQCM - 1,
                                        });
                                      }}
                                    />
                                  </PaginationItem>
                                  <PaginationItem>
                                    <PaginationLink className=" " disabled>
                                      {this.state.paginationQCM}
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
                                            (comp) =>
                                              comp.id === "question_competency"
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
                                          this.state.paginationQCM
                                      }
                                      onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({
                                          paginationQCM:
                                            this.state.paginationQCM + 1,
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
                      <Col xs={{ size: 12 }} lg={{ size: 6 }} className="mb-4">
                        <Card className="shadow border-dark ">
                          <CardBody className=" ">
                            <div style={{ display: "flex" }}>
                              <h3 className=" mb-0 ">Question Dimension</h3>
                              <Link
                                className="ml-2"
                                to="/admin/assessmentcomponents/questiondimension"
                              >
                                <Button color="white" size="sm">
                                  <i className="fas fa-eye" />
                                </Button>
                              </Link>
                            </div>
                            <p className="text-info">
                              Used to determine Question Dimension
                            </p>
                            <Form>
                              <InputGroup className="mb-3 ">
                                <Input
                                  name="searchQD"
                                  onChange={this.searchQD}
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
                              hidden={this.state.editQD}
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
                                    this.setState({
                                      dimension: e.target.value,
                                    });
                                  }}
                                />
                                <InputGroupAddon addonType="append">
                                  <Button>EDIT</Button>
                                </InputGroupAddon>
                              </InputGroup>
                            </Form>
                            <Form
                              hidden={!this.state.editQD}
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
                                    .filter(
                                      (comp) => comp.id === "question_dimension"
                                    )
                                    .map((comp) => {
                                      return comp.dimensions
                                        .filter((dimension) => {
                                          if (this.state.searchQD) {
                                            return dimension.includes(
                                              this.state.searchQD
                                            );
                                          } else {
                                            return true;
                                          }
                                        })
                                        .splice(
                                          5 * (this.state.paginationQD - 1),
                                          5
                                        )

                                        .map((dimension, i) => {
                                          return (
                                            <tr
                                              hidden={
                                                this.state.changeDimension ===
                                                dimension
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
                                                    this.addToEditQD(dimension);
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
                                      disabled={this.state.paginationQD === 1}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({
                                          paginationQD:
                                            this.state.paginationQD - 1,
                                        });
                                      }}
                                    />
                                  </PaginationItem>
                                  <PaginationItem>
                                    <PaginationLink className=" " disabled>
                                      {this.state.paginationQD}
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
                                            (comp) =>
                                              comp.id === "question_dimension"
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
                                          this.state.paginationQD
                                      }
                                      onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({
                                          paginationQD:
                                            this.state.paginationQD + 1,
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

                      <Col xs={{ size: 12 }} lg={{ size: 6 }} className="mb-4">
                        <Card className="shadow border-dark ">
                          <CardBody className=" ">
                            <div style={{ display: "flex" }}>
                              <h3 className=" mb-0 ">Client Industry</h3>
                              <Link
                                className="ml-2"
                                to="/admin/assessmentcomponents/clientindustry"
                              >
                                <Button color="white" size="sm">
                                  <i className="fas fa-eye" />
                                </Button>
                              </Link>
                            </div>
                            <p className="text-info">
                              Used to determine Client Industry
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
                              onSubmit={this.editClientIndustry}
                              className=""
                            >
                              <InputGroup className=" ">
                                <Input
                                  name="client_industry"
                                  className=" "
                                  value={this.state.industry}
                                  onChange={(e) => {
                                    e.preventDefault();
                                    this.setState({ industry: e.target.value });
                                  }}
                                />
                                <InputGroupAddon addonType="append">
                                  <Button>EDIT</Button>
                                </InputGroupAddon>
                              </InputGroup>
                            </Form>
                            <Form
                              hidden={!this.state.edit}
                              onSubmit={this.addClientIndustry}
                              className=""
                            >
                              <InputGroup className=" ">
                                <Input
                                  name="client_industry"
                                  className=" "
                                  placeholder="Industry"
                                  valid={
                                    !this.state.client_industry_error &&
                                    this.state.client_industry
                                  }
                                  invalid={this.state.client_industry_error}
                                />

                                <InputGroupAddon addonType="append">
                                  <Button>ADD</Button>
                                </InputGroupAddon>
                                <FormFeedback>
                                  {this.state.client_industry_error}
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
                                  <th scope="col">Industry</th>
                                  <th scope="col">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {components &&
                                  components
                                    .filter(
                                      (comp) => comp.id === "client_industry"
                                    )
                                    .map((comp) => {
                                      return comp.industries
                                        .filter((industry) => {
                                          if (this.state.search) {
                                            return industry.includes(
                                              this.state.search
                                            );
                                          } else {
                                            return true;
                                          }
                                        })
                                        .splice(
                                          5 * (this.state.pagination - 1),
                                          5
                                        )

                                        .map((industry, i) => {
                                          return (
                                            <tr
                                              hidden={
                                                this.state.changeIndustry ===
                                                industry
                                              }
                                            >
                                              <th scope="row">
                                                <span className="mb-0 text-sm ">
                                                  {i + 1}
                                                </span>
                                              </th>
                                              <td className=""> {industry}</td>
                                              <td>
                                                <Button
                                                  type="button"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    this.addToEdit(industry);
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
                                                    this.deleteClientIndustry(
                                                      industry
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
                                            (comp) =>
                                              comp.id === "client_industry"
                                          )[0]
                                          .industries.filter((industry) => {
                                            if (this.state.search) {
                                              return industry.includes(
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
    addClientIndustry: (industry) => dispatch(addClientIndustry(industry)),
    deleteClientIndustry: (industry) =>
      dispatch(deleteClientIndustry(industry)),
    editClientIndustry: (industry, newIndustry) =>
      dispatch(editClientIndustry(industry, newIndustry)),
    addQuestionDimension: (dimension) =>
      dispatch(addQuestionDimension(dimension)),
    deleteQuestionDimension: (dimension) =>
      dispatch(deleteQuestionDimension(dimension)),
    editQuestionDimension: (dimension, newDimension) =>
      dispatch(editQuestionDimension(dimension, newDimension)),
    addQuestionCategory: (category) => dispatch(addQuestionCategory(category)),
    deleteQuestionCategory: (category) =>
      dispatch(deleteQuestionCategory(category)),
    editQuestionCategory: (category, newCategory) =>
      dispatch(editQuestionCategory(category, newCategory)),
    addQuestionType: (type) => dispatch(addQuestionType(type)),
    deleteQuestionType: (type) => dispatch(deleteQuestionType(type)),
    editQuestionType: (type, newType) =>
      dispatch(editQuestionType(type, newType)),
    addAssessmentType: (type) => dispatch(addAssessmentType(type)),
    deleteAssessmentType: (type) => dispatch(deleteAssessmentType(type)),
    editAssessmentType: (type, newType) =>
      dispatch(editAssessmentType(type, newType)),
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
)(AssessmentComponents);
