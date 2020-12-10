import Header from "components/Headers/Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Button,
  CardBody,
  Media,
} from "reactstrap";
import { compose } from "redux";

class BuyAssessments extends Component {
  state = { Question: false };
  toggle = (e) => {
    e.preventDefault();
    this.setState({ Question: !this.state.Question });
  };
  render() {
    const { uid, assessments, invitations, consultants } = this.props;
    const thisConsultant =
      consultants && consultants.find((con) => con.id === uid);
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
                  <h3 className=" mb-0 ">Buy Assessments</h3>
                </CardHeader>
                <CardBody>
                  <Row className="mb-2">
                    <Col className="text-right">
                      <Link to="/admin/buyassessments/assessmentCheckout">
                        <Button color="default" size="md">
                          Buy Assessments
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                  <h3 className=" mb-2 ">Owned Assessments</h3>
                  <Table className="align-items-center  table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Assessment Id</th>
                        <th scope="col"> Tile</th>
                        <th scope="col"> Description</th>
                        <th scope="col"> Type</th>
                        <th scope="col"> Version</th>
                        <th scope="col"> Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assessments &&
                        assessments
                          .filter((ass) =>
                            thisConsultant.buyAssessment.includes(ass.id)
                          )
                          .map((ass) => {
                            return (
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        {ass.id}
                                      </span>
                                    </Media>
                                  </Media>
                                </th>
                                <td> {ass.title}</td>
                                <td> {ass.description}</td>
                                <td> {ass.type}</td>
                                <td> {ass.version}</td>
                                <td> {ass.price}$</td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
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
    consultants: state.firestore.ordered.consultants,
    assessments: state.firestore.ordered.assessments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // buyAssessment: (assessmentId, consultantId) =>
    //   dispatch(buyAssessment(assessmentId, consultantId)),
    // addAssessment: (ass, projectId, clientId) =>
    //   dispatch(addAssessment(ass, projectId, clientId)),
    // deleteAssessment: (ass, projectId, clientId) =>
    //   dispatch(deleteAssessment(ass, projectId, clientId)),
  };
};

export default compose(
  firestoreConnect([
    { collection: "consultants" },
    { collection: "assessments" },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(BuyAssessments);
