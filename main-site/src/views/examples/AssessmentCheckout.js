import Header from "components/Headers/Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link, Redirect } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

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
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { compose } from "redux";
import CheckoutForm from "./CheckoutForm";
// import CardInput from "./CardInput";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const promise = loadStripe(
  "pk_test_51HtHftBFVe6iiRzubscPeA3YkMzsL6xk1u1NfYIKMMz4awpX5Yvg67pM24XYgoW852H69uFCYOycseEWHm3XTFhE00XOWDSlMH"
);
class AssessmentCheckout extends Component {
  state = { Question: false, cart: [], redirect: false };

  toggle = (e) => {
    e.preventDefault();
    this.setState({ Question: !this.state.Question });
  };
  addToCart = (ass) => {
    var cart = this.state.cart;
    cart.push(ass);
    this.setState({ cart });
  };
  removeFromCart = (index) => {
    var cart = this.state.cart;
    cart.splice(index, 1);
    this.setState({ cart });
  };

  render() {
    const { assessments, consultants, uid } = this.props;
    const thisConsultant =
      consultants && consultants.find((con) => con.id === uid);
    console.log(thisConsultant);

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
                  <div style={{ display: "flex" }}>
                    <Link to="/admin/buyassessments" className="text-default ">
                      <i
                        className="fas fa-long-arrow-alt-left "
                        style={{ fontSize: "25px" }}
                      />
                    </Link>
                    <h3 className="ml-3 mb-0 ">Check Out</h3>
                  </div>
                </CardHeader>
                <CardBody>
                  <Row className="mb-6">
                    {assessments &&
                      assessments
                        .filter((ass) =>
                          thisConsultant
                            ? !thisConsultant.buyAssessment.includes(ass.id)
                            : true
                        )
                        .map((ass) => {
                          return (
                            <Col
                              xs={{ size: 12 }}
                              md={{ size: 6 }}
                              lg={{ size: 4 }}
                            >
                              <Card className="shadow border-default">
                                <CardBody>
                                  <h3
                                    style={{ fontWeight: "bold" }}
                                    className="mb-0 text-capitalize"
                                  >
                                    {ass.title}
                                  </h3>
                                  <h5 className="mb-0">{ass.description}</h5>
                                  <h5 className="mb-0">Price : {ass.price}$</h5>
                                  <Row className="mt-5">
                                    <Col className="text-right">
                                      {/* <Button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        this.addToCart(ass);
                                      }}
                                      color="default"
                                      size="sm"
                                    >
                                      Add To Cart
                                    </Button> */}
                                      <Button
                                        style={{ borderRadius: "7rem" }}
                                        color="default"
                                        size="sm"
                                        onClick={this.toggle}
                                      >
                                        Checkout
                                      </Button>
                                      <Modal
                                        isOpen={this.state.Question}
                                        toggle={this.toggle}
                                      >
                                        <ModalHeader toggle={this.toggle}>
                                          Checkout{" "}
                                        </ModalHeader>
                                        <ModalBody>
                                          <Elements stripe={promise}>
                                            <CheckoutForm
                                              amount={ass.price}
                                              assessmentName={ass.title}
                                              assessmentId={ass.id}
                                            />
                                          </Elements>
                                        </ModalBody>
                                      </Modal>
                                    </Col>
                                  </Row>
                                </CardBody>
                              </Card>
                            </Col>
                          );
                        })}
                  </Row>
                  {/* <h3 className=" mb-2 ">Assessment Cart</h3>
                  <Table className="align-items-center  table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Assessment Id</th>
                        <th scope="col"> Title</th>
                        <th scope="col"> Description</th>
                        <th scope="col"> Type</th>
                        <th scope="col"> Version</th>
                        <th scope="col"> Price</th>
                        <th scope="col"> Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.cart &&
                        this.state.cart.map((ass, index) => {
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
                              <td>
                                <Button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    this.removeFromCart(index);
                                  }}
                                  size="sm"
                                  color="white"
                                >
                                  <i className="fas fa-minus-circle  " />
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">Total</span>
                            </Media>
                          </Media>
                        </th>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td>
                          {" "}
                          {this.state.cart.length > 0 &&
                            this.state.cart.reduce(
                              (acc, element) => acc + element.price,
                              0
                            )}
                          $
                        </td>
                      </tr>
                    </tbody>
                  </Table> */}
                  <Row className="mt-5 mb-2">
                    <Col className="text-right"></Col>
                  </Row>{" "}
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
    // editProject: (project, previousP, clientId) =>
    //   dispatch(editProjects(project, previousP, clientId)),
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
)(AssessmentCheckout);
