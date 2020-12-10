import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { compose } from "redux";

class DashboardHeader extends React.Component {
  render() {
    const { uid, clients, raters, consultants } = this.props;
    const clientNo =
      clients && clients.filter((cl) => cl.consultantId === uid).length;
    var ProjectNo = 0;
    const thisConsultant =
      consultants && consultants.find((con) => con.id === uid);
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Clients
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {clientNo}
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
                </Col>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Projects
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {clients &&
                              clients
                                .filter((cl) => cl.consultantId === uid)
                                .reduce(
                                  (acc, element) =>
                                    acc + element.projects.length,
                                  0
                                )}
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
                </Col>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Owned Assessments
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {thisConsultant &&
                              thisConsultant.buyAssessment.length}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    authError: state.auth.authError,
    clients: state.firestore.ordered.clients,
    consultants: state.firestore.ordered.consultants,
    raters: state.firestore.ordered.raters,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // updateProfile: (profile, uid) => dispatch(updateProfile(profile, uid)),
  };
};

export default compose(
  firestoreConnect([
    { collection: "users" },
    { collection: "clients" },
    { collection: "raters" },
    { collection: "consultants" },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(DashboardHeader);
