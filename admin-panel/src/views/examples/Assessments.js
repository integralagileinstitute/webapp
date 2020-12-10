import React from "react";
import { Link, Redirect } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { deleteAssessment } from "actions/assessmentActions";
class Assessments extends React.Component {
  deleteAssessment = (assessmentId) => {
    this.props.deleteAssessment(assessmentId);
  };
  render() {
    const { uid, assessments } = this.props;
    if (!uid) {
      return <Redirect to="/auth/login" />;
    } else {
      return (
        <>
          <Header />
          {/* Page content */}
          <Container className="mt--9" fluid>
            <Row>
              <Col className="text-right">
                <Link to="/admin/assessments/addAssessment">
                  <Button
                    className=" mb-2"
                    color="white"
                    href="#pablo"
                    size="md"
                  >
                    Add Assessment
                  </Button>
                </Link>
              </Col>
            </Row>
            {/* table */}
            <Row>
              <div className="col">
                <Card className=" shadow">
                  <CardHeader className=" border-0">
                    <h3 className=" mb-0">Assessments</h3>
                  </CardHeader>
                  <Table className="align-items-center  table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Assessment Id</th>
                        <th scope="col">Assessment Name</th>
                        <th scope="col">Assessment Description</th>
                        <th scope="col">Assessment Price</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assessments &&
                        assessments.map((assessment) => {
                          return (
                            <tr>
                              <th scope="row">
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {assessment.id}
                                    </span>
                                  </Media>
                                </Media>
                              </th>
                              <td> {assessment.title}</td>
                              <td> {assessment.description}</td>
                              <td>{assessment.price}$</td>
                              <td>
                                <Link
                                  style={{ padding: "0.25rem 0.5rem" }}
                                  to={
                                    "/admin/assessments/editAssessment/" +
                                    assessment.id
                                  }
                                >
                                  <Button size="sm" color="white">
                                    <i className="ni ni-settings  " />
                                  </Button>
                                </Link>

                                <Button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    this.deleteAssessment(assessment.id);
                                  }}
                                  size="sm"
                                  color="white"
                                >
                                  <i className="fas fa-trash  " />
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
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
    assessments: state.firestore.ordered.assessments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteAssessment: (assessmentId) =>
      dispatch(deleteAssessment(assessmentId)),
    // deleteCompany: (company) =>
    //   dispatch(deleteCompany(company)),
    // editCompany: (company, newCompany) =>
    //   dispatch(editCompany(company, newCompany)),
  };
};

export default compose(
  firestoreConnect([{ collection: "assessments" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(Assessments);
