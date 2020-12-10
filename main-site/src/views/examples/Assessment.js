import Header from "components/Headers/Header";
import React, { Component } from "react";
import { Steps } from "antd";
import Rating from "react-rating";
import "antd/dist/antd.css";
import "./rating.css";
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  Progress,
  Button,
  FormFeedback,
  Input,
  FormText,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { addAnswer, changeStatus } from "actions/raterActions";
import { editAnswer } from "actions/raterActions";
const { Step } = Steps;
class raterAssessments extends Component {
  state = { Question: false, answer: 0, moveIndex: 0 };
  toggle = (e) => {
    e.preventDefault();
    this.setState({ Question: !this.state.Question });
  };
  componentDidMount() {
    const { uid, assessments, invitations, raters } = this.props;
    const thisRater = raters && raters.find((rat) => rat.id === uid);
    const clientId = this.props.match.params.clientId;
    const projectId = this.props.match.params.projectId;
    const assessmentId = this.props.match.params.assessmentId;
    const thisAssessment =
      assessments && assessments.find((ass) => ass.id === assessmentId);
    const thisInvitation =
      invitations &&
      invitations.find((inv) => {
        return (
          thisRater &&
          inv.email === thisRater.email &&
          inv.assessmentId === assessmentId &&
          inv.projectId === projectId &&
          inv.clientId === clientId
        );
      });

    if (
      thisAssessment &&
      thisInvitation &&
      thisAssessment.questions.length === thisInvitation.answers.length
    ) {
      this.props.changeStatus("completed", thisInvitation.id);
    }
  }
  render() {
    const { uid, assessments, invitations, raters } = this.props;
    const thisRater = raters && raters.find((rat) => rat.id === uid);
    const clientId = this.props.match.params.clientId;
    const projectId = this.props.match.params.projectId;
    const assessmentId = this.props.match.params.assessmentId;
    const thisAssessment =
      assessments && assessments.find((ass) => ass.id === assessmentId);
    const thisInvitation =
      invitations &&
      invitations.find((inv) => {
        return (
          thisRater &&
          inv.email === thisRater.email &&
          inv.assessmentId === assessmentId &&
          inv.projectId === projectId &&
          inv.clientId === clientId
        );
      });
    var dimensions = [];
    console.log(this.state.answer);
    if (thisAssessment && thisAssessment.questions) {
      for (var i = 0; i < thisAssessment.questions.length; i++) {
        if (!dimensions.includes(thisAssessment.questions[i].dimension))
          dimensions = dimensions.concat(thisAssessment.questions[i].dimension);
      }
    }
    if (
      thisAssessment &&
      thisInvitation &&
      thisAssessment.questions.length === thisInvitation.answers.length
    ) {
      this.props.changeStatus("completed", thisInvitation.id);
      return <Redirect to="/rater/projects/assessments" />;
    }
    if (thisInvitation && thisInvitation.status === "invited") {
      this.props.changeStatus("accepted", thisInvitation.id);
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
                      to="/rater/projects/assessments"
                      className="text-default "
                    >
                      <i
                        className="fas fa-long-arrow-alt-left "
                        style={{ fontSize: "25px" }}
                      />
                    </Link>
                    <h3 className="ml-3 mb-0 ">Assessment</h3>
                  </div>{" "}
                </CardHeader>

                <CardBody className=" mb-0 ">
                  <Row>
                    <Col className="text-center">
                      <h5>Progress</h5>
                      <Progress
                        style={{ width: "100%", height: "4vh" }}
                        animated
                        color="success"
                        value={
                          thisAssessment &&
                          thisInvitation &&
                          (thisInvitation.answers.length /
                            thisAssessment.questions.length) *
                            100
                        }
                      ></Progress>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <Steps
                        current={
                          thisAssessment && thisInvitation && dimensions
                            ? dimensions.findIndex((dim) => {
                                return (
                                  dim ===
                                  thisAssessment.questions[
                                    thisInvitation.answers.length +
                                      this.state.moveIndex
                                  ].dimension
                                );
                              })
                            : 0
                        }
                      >
                        {dimensions.map((dim, index) => {
                          return (
                            <Step
                              title={
                                thisAssessment && thisInvitation && dimensions
                                  ? dimensions.findIndex((dim) => {
                                      return (
                                        dim ===
                                        thisAssessment.questions[
                                          thisInvitation.answers.length +
                                            this.state.moveIndex
                                        ].dimension
                                      );
                                    }) > index
                                    ? "Finished"
                                    : dimensions.findIndex((dim) => {
                                        return (
                                          dim ===
                                          thisAssessment.questions[
                                            thisInvitation.answers.length +
                                              this.state.moveIndex
                                          ].dimension
                                        );
                                      }) < index
                                    ? "Waiting"
                                    : "In Progress"
                                  : 0
                              }
                              description={dim}
                            />
                          );
                        })}
                        {/* <Step title="Finished" description="Dimension 1" />
                        <Step title="In Progress" description="Dimension 2 " />
                        <Step title="Waiting" description="dimension 3" /> */}
                      </Steps>
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col>
                      <h3>
                        Question{" "}
                        {thisInvitation &&
                          thisInvitation.answers.length +
                            1 +
                            this.state.moveIndex}
                        :{" "}
                        {thisAssessment &&
                          thisInvitation &&
                          thisAssessment.questions[
                            thisInvitation.answers.length + this.state.moveIndex
                          ].text}
                      </h3>
                      <h4>
                        Hint :{" "}
                        {thisAssessment &&
                          thisInvitation &&
                          thisAssessment.questions[
                            thisInvitation.answers.length + this.state.moveIndex
                          ].help}
                      </h4>
                      <h4 className="text-danger">
                        *** Answer should be between 1 to 10
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1-Disagree
                        5-Not Sure 10-Strongly Agree
                      </h4>
                      <Rating
                        style={{
                          width: "100%",
                          textAlign: "center",
                          marginBottom: "2vh",
                          marginTop: "5vh",
                        }}
                        emptySymbol={
                          <i className="fas fa-circle rating-hollow" />
                        }
                        onChange={(value) => {
                          this.setState({ answer: value });
                        }}
                        initialRating={
                          this.state.answer === 0
                            ? thisInvitation &&
                              thisInvitation.answers[
                                thisInvitation.answers.length +
                                  this.state.moveIndex
                              ]
                              ? thisInvitation.answers[
                                  thisInvitation.answers.length +
                                    this.state.moveIndex
                                ]
                              : this.state.answer
                            : this.state.answer
                        }
                        fullSymbol={<i className="fas fa-circle rating-full" />}
                        start={0}
                        stop={10}
                      />
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "center",
                        }}
                        className="mb-6"
                      >
                        <h3 className="rating-number">&nbsp;1</h3>
                        <h3 className="rating-number">&nbsp;2</h3>
                        <h3 className="rating-number">&nbsp;3</h3>
                        <h3 className="rating-number">&nbsp;4</h3>
                        <h3 className="rating-number">&nbsp;5</h3>
                        <h3 className="rating-number">&nbsp;6</h3>
                        <h3 className="rating-number">&nbsp;7</h3>
                        <h3 className="rating-number">&nbsp;8</h3>
                        <h3 className="rating-number">&nbsp;9</h3>
                        <h3 className="rating-number">10</h3>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-left">
                      <Button
                        color="default"
                        disabled={
                          !(
                            thisInvitation &&
                            thisInvitation.answers.length +
                              this.state.moveIndex >
                              0
                          )
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          if (
                            thisInvitation &&
                            thisInvitation.answers.length +
                              this.state.moveIndex >
                              0
                          ) {
                            this.setState({
                              moveIndex: this.state.moveIndex - 1,
                            });
                          }
                        }}
                      >
                        Previous
                      </Button>
                    </Col>
                    <Col className="text-right">
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          if (this.state.answer != 0) {
                            if (this.state.moveIndex < 0) {
                              this.props.editAnswer(
                                this.state.moveIndex,
                                this.state.answer,
                                thisInvitation.id
                              );
                              this.setState({
                                answer: 0,
                                moveIndex: this.state.moveIndex + 1,
                              });
                            } else {
                              this.props.addAnswer(
                                this.state.answer,
                                thisInvitation.id
                              );
                              this.setState({ answer: 0 });
                            }
                          } else {
                            if (this.state.moveIndex < 0) {
                              this.props.editAnswer(
                                this.state.moveIndex,
                                thisInvitation.answers[
                                  thisInvitation.answers.length +
                                    this.state.moveIndex
                                ],
                                thisInvitation.id
                              );
                              this.setState({
                                answer: 0,
                                moveIndex: this.state.moveIndex + 1,
                              });
                            }
                          }
                        }}
                        color="default"
                        size="md"
                      >
                        {thisAssessment &&
                        thisInvitation &&
                        thisAssessment.questions.length - 1 ===
                          thisInvitation.answers.length + this.state.moveIndex
                          ? "Finish"
                          : "Next"}
                      </Button>
                    </Col>
                  </Row>
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
    raters: state.firestore.ordered.raters,
    consultants: state.firestore.ordered.consultants,
    invitations: state.firestore.ordered.invitations,
    assessments: state.firestore.ordered.assessments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addAnswer: (answer, invitationId) =>
      dispatch(addAnswer(answer, invitationId)),
    editAnswer: (index, answer, invitationId) =>
      dispatch(editAnswer(index, answer, invitationId)),
    changeStatus: (status, invitationId) =>
      dispatch(changeStatus(status, invitationId)),
    // deleteAssessment: (ass, projectId, clientId) =>
    //   dispatch(deleteAssessment(ass, projectId, clientId)),
  };
};

export default compose(
  firestoreConnect([
    { collection: "raters" },
    { collection: "consultants" },
    { collection: "invitations" },
    { collection: "assessments" },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(raterAssessments);
