import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link, Redirect } from "react-router-dom";
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { compose } from "redux";

class DashboardHeader extends React.Component {
  render() {
    const {
      uid,
      assessments,
      users,
      consulting_companies,
      consultants,
    } = this.props;
    if (!uid) {
      return <Redirect to="/auth/login" />;
    } else {
      return (
        <>
          <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
            <Container fluid>
              <div className="header-body">
                {/* Card stats */}
                <Row>
                  <Col lg="6" xl="3">
                    <Link to="/admin/admins">
                      <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Admins
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {users &&
                                  users.filter((user) => user.role === "admin")
                                    .length}
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                <i className="fas fa-user" />
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Link>
                  </Col>
                  <Col lg="6" xl="3">
                    <Link to="/admin/assessments">
                      <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Assessments
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {assessments && assessments.length}
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                <i className="fas fa-chart-pie" />
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Link>
                  </Col>
                  <Col lg="6" xl="3">
                    <Link to="/admin/consultants">
                      <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Consultants
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {consultants && consultants.length}
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                <i className="fas fa-users" />
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Link>
                  </Col>
                  <Col lg="6" xl="3">
                    <Link to="/admin/consulting-companies">
                      <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Companies
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {consulting_companies &&
                                  consulting_companies.length}
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                <i className="fas fa-percent" />
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Link>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        </>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    assessments: state.firestore.ordered.assessments,
    users: state.firestore.ordered.users,
    consulting_companies: state.firestore.ordered.consulting_companies,
    consultants: state.firestore.ordered.consultants,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // addAssessment: (assessment) => dispatch(addAssessments(assessment)),
    // deleteCompany: (company) =>
    //   dispatch(deleteCompany(company)),
    // editCompany: (company, newCompany) =>
    //   dispatch(editCompany(company, newCompany)),
  };
};

export default compose(
  firestoreConnect([
    { collection: "assessments" },
    { collection: "users" },
    { collection: "consulting_companies" },
    { collection: "consultants" },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(DashboardHeader);
