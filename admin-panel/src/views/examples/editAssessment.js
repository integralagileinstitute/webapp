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
import {
  addQuestion,
  deleteQuestion,
  editAssessments,
} from "actions/assessmentActions";

class editAssessment extends Component {
  state = { Question: false, redirect: false };
  toggle = (e) => {
    e.preventDefault();
    this.setState({ Question: !this.state.Question });
  };
  addQuestion = (question, assessmentId) => {
    this.props.addQuestion(question, assessmentId);
  };

  deleteQuestion = (question, assessmentId) => {
    this.props.deleteQuestion(question, assessmentId);
  };
  editAssessment = (assessment, assessmentId) => {
    this.props.editAssessment(assessment, assessmentId);
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/admin/assessments" />;
    }
    const { uid, components, assessments } = this.props;
    const assessmentId = this.props.match.params.id;
    var thisAssessment =
      assessments &&
      assessments.filter((assessment) => assessment.id === assessmentId)[0];
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
              <div className="col">
                <Card className=" shadow ">
                  <CardHeader className=" border-0 ">
                    <div style={{ display: "flex" }}>
                      <Link to="/admin/assessments" className="text-default ">
                        <i
                          className="fas fa-long-arrow-alt-left "
                          style={{ fontSize: "25px" }}
                        />
                      </Link>
                      <h3 className="ml-3 mb-0 ">
                        <i className="ni ni-settings  " />
                        &nbsp; Edit Assessment
                      </h3>
                    </div>{" "}
                  </CardHeader>
                  <CardBody className=" mb-0 ">
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        var error = false;
                        if (!e.target.title.value) {
                          this.setState({ title_error: "Please Add a Title" });
                          error = true;
                        } else {
                          this.setState({
                            title_error: "",
                            title: e.target.title.value,
                          });
                        }
                        if (!e.target.description.value) {
                          this.setState({
                            description_error: "Please Add a Description",
                          });
                          error = true;
                        } else {
                          this.setState({
                            description_error: "",
                            description: e.target.description.value,
                          });
                        }
                        if (!e.target.price.value) {
                          this.setState({
                            price_error: "Please Add some Price",
                          });
                          error = true;
                        } else {
                          this.setState({
                            price_error: "",
                            price: e.target.price.value,
                          });
                        }
                        if (e.target.type.value === "Type") {
                          this.setState({ type_error: "Please Select a type" });
                          error = true;
                        } else {
                          this.setState({
                            type_error: "",
                            type: e.target.type.value,
                          });
                        }
                        if (!e.target.version.value) {
                          this.setState({
                            version_error: "Please Add a Version",
                          });
                          error = true;
                        } else {
                          this.setState({
                            version_error: "",
                            version: e.target.version.value,
                          });
                        }

                        if (!error) {
                          const assessment = {
                            title: e.target.title.value,
                            description: e.target.description.value,
                            price: e.target.price.value,
                            type: e.target.type.value,
                            version: e.target.version.value,
                          };
                          this.editAssessment(assessment, assessmentId);
                          this.setState({
                            redirect: true,
                            title: "",
                            title_error: "",
                            description: "",
                            description_error: "",
                            price: "",
                            price_error: "",
                            type: "",
                            type_error: "",
                            version: "",
                            version_error: "",
                          });
                        }
                      }}
                    >
                      <Label>Assessment Title</Label>
                      <Input
                        name="title"
                        defaultValue={thisAssessment && thisAssessment.title}
                        valid={!this.state.title_error && this.state.title}
                        invalid={this.state.title_error}
                      />
                      <FormFeedback>{this.state.title_error}</FormFeedback>
                      <Label>Assessment Description</Label>
                      <Input
                        name="description"
                        defaultValue={
                          thisAssessment && thisAssessment.description
                        }
                        type="textarea"
                        valid={
                          !this.state.description_error &&
                          this.state.description
                        }
                        invalid={this.state.description_error}
                      />
                      <FormFeedback>
                        {this.state.description_error}
                      </FormFeedback>
                      <Label>Assessment Type</Label>
                      <Input
                        name="type"
                        type="select"
                        valid={!this.state.type_error && this.state.type}
                        invalid={this.state.type_error}
                      >
                        <option hidden>Type</option>
                        {components &&
                          components
                            .filter((component) => {
                              return component.id === "assessment_type";
                            })
                            .map((comp) => {
                              return comp.types.map((type) => {
                                return (
                                  <option
                                    selected={
                                      thisAssessment &&
                                      thisAssessment.type === type
                                    }
                                  >
                                    {type}
                                  </option>
                                );
                              });
                            })}
                      </Input>
                      <FormFeedback>{this.state.type_error}</FormFeedback>

                      <Label>Assessment Version</Label>
                      <Input
                        name="version"
                        defaultValue={thisAssessment && thisAssessment.version}
                        valid={!this.state.version_error && this.state.version}
                        invalid={this.state.version_error}
                      />
                      <FormFeedback>{this.state.version_error}</FormFeedback>
                      <Label>Assessment Price</Label>
                      <Input
                        name="price"
                        defaultValue={thisAssessment && thisAssessment.price}
                        type="number"
                        min={0}
                        valid={!this.state.price_error && this.state.price}
                        invalid={this.state.price_error}
                      />
                      <FormFeedback>{this.state.price_error}</FormFeedback>
                      <Button
                        className="mt-2"
                        type="button"
                        color="default"
                        size="md"
                        onClick={this.toggle}
                      >
                        Add Question
                      </Button>
                      <Row>
                        <Col className="text-right">
                          <Button
                            className="mt-2"
                            type="submit"
                            color="default"
                            size="md"
                          >
                            Save Assessment
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                    <Modal isOpen={this.state.Question} toggle={this.toggle}>
                      <ModalHeader toggle={this.toggle}>
                        Add Question
                      </ModalHeader>
                      <ModalBody>
                        <Form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            var error = false;
                            if (e.target.dimension.value === "Dimension") {
                              this.setState({
                                dimension_error: "Please Select a Dimension",
                              });
                              error = true;
                            } else {
                              this.setState({
                                dimension_error: "",
                                dimension: e.target.dimension.value,
                              });
                            }
                            if (e.target.category.value === "Category") {
                              this.setState({
                                category_error: "Please Select a Category",
                              });
                              error = true;
                            } else {
                              this.setState({
                                category_error: "",
                                category: e.target.category.value,
                              });
                            }
                            if (e.target.competency.value === "Competency") {
                              this.setState({
                                competency_error: "Please Select a Competency",
                              });
                              error = true;
                            } else {
                              this.setState({
                                competency_error: "",
                                competency: e.target.competency.value,
                              });
                            }
                            if (e.target.type.value === "Type") {
                              this.setState({
                                question_type_error: "Please Select a Type",
                              });
                              error = true;
                            } else {
                              this.setState({
                                question_type_error: "",
                                question_type: e.target.type.value,
                              });
                            }
                            if (!e.target.text.value) {
                              this.setState({
                                text_error: "Please add Question Text",
                              });
                              error = true;
                            } else {
                              this.setState({
                                text_error: "",
                                text: e.target.text.value,
                              });
                            }
                            if (!error) {
                              const question = {
                                dimension: e.target.dimension.value,
                                text: e.target.text.value,
                                category: e.target.category.value,
                                competency: e.target.competency.value,
                                type: e.target.type.value,
                                help: e.target.help.value,
                              };
                              this.addQuestion(question, assessmentId);
                              this.setState({
                                dimension: "",
                                dimension_error: "",
                                text: "",
                                text_error: "",
                                category: "",
                                category_error: "",
                                competency: "",
                                competency_error: "",
                                question_type: "",
                                question_type_error: "",
                              });

                              this.toggle(e);
                            }
                          }}
                        >
                          <Label>Question Dimension</Label>
                          <Input
                            name="dimension"
                            type="select"
                            valid={
                              !this.state.dimension_error &&
                              this.state.dimension
                            }
                            invalid={this.state.dimension_error}
                          >
                            <option hidden>Dimension</option>
                            {components &&
                              components
                                .filter((component) => {
                                  return component.id === "question_dimension";
                                })
                                .map((comp) => {
                                  return comp.dimensions.map((dimension) => {
                                    return <option>{dimension}</option>;
                                  });
                                })}
                          </Input>
                          <FormFeedback>
                            {this.state.dimension_error}
                          </FormFeedback>

                          <Label>Question Text</Label>
                          <Input
                            name="text"
                            valid={!this.state.text_error && this.state.text}
                            invalid={this.state.text_error}
                          />
                          <FormFeedback>{this.state.text_error}</FormFeedback>

                          <Label>Category</Label>
                          <Input
                            name="category"
                            type="select"
                            valid={
                              !this.state.category_error && this.state.category
                            }
                            invalid={this.state.category_error}
                          >
                            <option hidden>Category</option>
                            {components &&
                              components
                                .filter((component) => {
                                  return component.id === "question_category";
                                })
                                .map((comp) => {
                                  return comp.categories.map((category) => {
                                    return <option>{category}</option>;
                                  });
                                })}
                          </Input>
                          <FormFeedback>
                            {this.state.category_error}
                          </FormFeedback>

                          <Label>Competency</Label>
                          <Input
                            name="competency"
                            type="select"
                            valid={
                              !this.state.competency_error &&
                              this.state.competency
                            }
                            invalid={this.state.competency_error}
                          >
                            <option hidden>Competency</option>
                            {components &&
                              components
                                .filter((component) => {
                                  return component.id === "question_competency";
                                })
                                .map((comp) => {
                                  return comp.competencies.map((competency) => {
                                    return <option>{competency}</option>;
                                  });
                                })}
                          </Input>
                          <FormFeedback>
                            {this.state.competency_error}
                          </FormFeedback>

                          <Label>Type</Label>
                          <Input
                            name="type"
                            type="select"
                            valid={
                              !this.state.question_type_error &&
                              this.state.question_type
                            }
                            invalid={this.state.question_type_error}
                          >
                            <option hidden>Type</option>
                            {components &&
                              components
                                .filter((component) => {
                                  return component.id === "question_type";
                                })
                                .map((comp) => {
                                  return comp.types.map((type) => {
                                    return <option>{type}</option>;
                                  });
                                })}
                          </Input>
                          <FormFeedback>
                            {this.state.question_type_error}
                          </FormFeedback>

                          <Label>Question Help</Label>
                          <Input name="help" />
                          <Row className="mt-2">
                            <Col className="text-right">
                              <Button color="default" size="md">
                                Add Question
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </ModalBody>
                    </Modal>
                    {thisAssessment && thisAssessment.questions.length > 0
                      ? thisAssessment.questions.map((question) => {
                          return (
                            <Row className="mt-4">
                              <Col xs={{ size: 8 }}>
                                <h3 className=" mb-0 ">
                                  Question : {question.text}
                                </h3>
                                <p className="mb-0">Help : {question.help}</p>
                              </Col>
                              <Col xs={{ size: 4 }} className="text-right">
                                <Button
                                  className="mt-2"
                                  type="button"
                                  color="default"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    this.deleteQuestion(question, assessmentId);
                                  }}
                                  size="md"
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
}
const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    components: state.firestore.ordered.components,
    assessments: state.firestore.ordered.assessments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addQuestion: (question, assessmentId) =>
      dispatch(addQuestion(question, assessmentId)),
    deleteQuestion: (question, assessmentId) =>
      dispatch(deleteQuestion(question, assessmentId)),
    editAssessment: (assessment, assessmentId) =>
      dispatch(editAssessments(assessment, assessmentId)),

    // deleteCompany: (company) =>
    //   dispatch(deleteCompany(company)),
    // editCompany: (company, newCompany) =>
    //   dispatch(editCompany(company, newCompany)),
  };
};

export default compose(
  firestoreConnect([
    { collection: "components" },
    { collection: "assessments" },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(editAssessment);
