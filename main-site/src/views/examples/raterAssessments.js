import { changeStatus } from "actions/raterActions";
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
  CardBody,
  Media,
  Button,
  Table,
  Progress,
} from "reactstrap";
import { compose } from "redux";
class raterAssessments extends Component {
  state = { Question: false };
  toggle = (e) => {
    e.preventDefault();
    this.setState({ Question: !this.state.Question });
  };
  render() {
    const { uid, assessments, invitations, raters } = this.props;
    const thisRater = raters && raters.find((rat) => rat.id === uid);
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
                  <h3 className="ml-3 mb-0 ">Assessments</h3>
                </CardHeader>

                <CardBody className=" mb-0 ">
                  <Table
                    className="align-items-center  table-flush "
                    responsive
                  >
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Assessment Id</th>
                        <th scope="col"> Tile</th>
                        <th scope="col"> Description</th>
                        <th scope="col"> Progress</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invitations &&
                        invitations
                          .filter((inv) => {
                            return inv.email === thisRater.email;
                          })
                          .map((inv) => {
                            var thisAssessment =
                              assessments &&
                              assessments.find(
                                (ass) => ass.id === inv.assessmentId
                              );
                            return (
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">1</span>
                                    </Media>
                                  </Media>
                                </th>
                                <td>
                                  {" "}
                                  {thisAssessment && thisAssessment.title}
                                </td>
                                <td>
                                  {" "}
                                  {thisAssessment && thisAssessment.description}
                                </td>
                                <td>
                                  <Row className="align-items-center">
                                    <Col lg={{ size: 8 }}>
                                      <Progress
                                        style={{
                                          width: "150px",
                                          height: "2vh",
                                        }}
                                        animated
                                        color="success"
                                        value={
                                          thisAssessment &&
                                          (inv.answers.length /
                                            thisAssessment.questions.length) *
                                            100
                                        }
                                      />
                                    </Col>
                                    <Col lg={{ size: 4 }}>
                                      {thisAssessment &&
                                        Math.round(
                                          (inv.answers.length /
                                            thisAssessment.questions.length) *
                                            100
                                        )}
                                      %
                                    </Col>
                                  </Row>
                                </td>
                                <td>
                                  <Link
                                    to={
                                      "/rater/client/" +
                                      inv.clientId +
                                      "/project/" +
                                      inv.projectId +
                                      "/assessment/" +
                                      inv.assessmentId
                                    }
                                  >
                                    <Button
                                      disabled={
                                        thisAssessment &&
                                        thisAssessment.questions.length ===
                                          inv.answers.length
                                      }
                                      color="default"
                                      size="sm"
                                    >
                                      {thisAssessment &&
                                      thisAssessment.questions.length ===
                                        inv.answers.length
                                        ? "Completed"
                                        : inv.answers.length === 0
                                        ? "Start"
                                        : "Resume"}
                                    </Button>
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
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
    raters: state.firestore.ordered.raters,
    consultants: state.firestore.ordered.consultants,
    invitations: state.firestore.ordered.invitations,
    assessments: state.firestore.ordered.assessments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeStatus: (status, invitationId) =>
      dispatch(changeStatus(status, invitationId)),
    // addAssessment: (ass, projectId, clientId) =>
    //   dispatch(addAssessment(ass, projectId, clientId)),
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
