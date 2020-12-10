import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { updateProfile } from "actions/profileActions";
class Profile extends React.Component {
  state = {};
  updateProfile = (e) => {
    e.preventDefault();
    var error = false;
    if (!e.target.first_name.value) {
      this.setState({ first_name_error: "Please Enter a First Name" });
      error = true;
    } else {
      this.setState({
        first_name_error: "",
        first_name: e.target.first_name.value,
      });
    }
    if (!e.target.last_name.value) {
      this.setState({ last_name_error: "Please Enter a Last Name" });
      error = true;
    } else {
      this.setState({
        last_name_error: "",
        last_name: e.target.last_name.value,
      });
    }
    if (!e.target.title.value) {
      this.setState({ title_error: "Please Enter a Title" });
      error = true;
    } else {
      this.setState({
        title_error: "",
        title: e.target.title.value,
      });
    }

    if (!error) {
      this.props.updateProfile(
        {
          first_name: e.target.first_name.value,
          last_name: e.target.last_name.value,
          title: e.target.title.value,
        },
        this.props.uid
      );
      this.setState({
        first_name: "",
        first_name_error: "",
        last_name: "",
        last_name_error: "",
        title: "",
        title_error: "",
      });
    }
  };
  render() {
    const { uid, consultants, raters } = this.props;
    const thisConsultant =
      consultants && consultants.find((con) => con.id === uid);
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--9" fluid>
          <Row>
            <Col className="order-xl-1">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Edit Profile</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.updateProfile}>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={
                                thisConsultant && thisConsultant.first_name
                              }
                              name="first_name"
                              placeholder="First Name"
                              type="text"
                              valid={
                                !this.state.first_name_error &&
                                this.state.first_name
                              }
                              invalid={this.state.first_name_error}
                            />
                            <FormFeedback>
                              {this.state.first_name_error}
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="last_name"
                              defaultValue={
                                thisConsultant && thisConsultant.last_name
                              }
                              placeholder="Last Name"
                              type="text"
                              valid={
                                !this.state.last_name_error &&
                                this.state.last_name
                              }
                              invalid={this.state.last_name_error}
                            />
                            <FormFeedback>
                              {this.state.last_name_error}
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-title"
                            >
                              Title
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="title"
                              defaultValue={
                                thisConsultant && thisConsultant.title
                              }
                              placeholder="Title"
                              type="text"
                              valid={
                                !this.state.title_error && this.state.title
                              }
                              invalid={this.state.title_error}
                            />
                            <FormFeedback>
                              {this.state.title_error}
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <Row>
                      <Col className="text-right">
                        <Button color="default" size="md">
                          Save
                        </Button>
                      </Col>
                    </Row>
                    <hr className="my-4" />
                  </Form>
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
    raters: state.firestore.ordered.raters,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (profile, uid) => dispatch(updateProfile(profile, uid)),
  };
};

export default compose(
  firestoreConnect([
    { collection: "users" },
    { collection: "consultants" },
    { collection: "raters" },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(Profile);
