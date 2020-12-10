import React from "react";

import {
  Card,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
  Col,
  Button,
  Form,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Header from "components/Headers/Header.js";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { addCompany } from "actions/companyActions";
import { editCompany } from "actions/companyActions";
class ConsultingCompanies extends React.Component {
  state = { modal: false, editModal: "" };
  toggle = (e) => {
    e.preventDefault();
    this.setState({ modal: !this.state.modal });
  };
  editToggle = (value) => {
    if (this.state.editModal !== value) {
      this.setState({ editModal: value });
    } else {
      this.setState({ editModal: "" });
    }
  };

  addCompany = (e) => {
    e.preventDefault();
    var error = false;
    if (!e.target.name.value) {
      this.setState({ name_error: "Please Add a Name" });
      error = true;
    } else {
      this.setState({ name_error: "", name: e.target.name.value });
    }
    if (!e.target.description.value) {
      this.setState({ description_error: "Please Add a Description" });
      error = true;
    } else {
      this.setState({
        description_error: "",
        description: e.target.description.value,
      });
    }
    if (e.target.industry.value === "Industry") {
      this.setState({ industry_error: "Select an Industry" });
      error = true;
    } else {
      this.setState({ industry_error: "", industry: e.target.industry.value });
    }
    if (!error) {
      this.props.addCompany({
        name: e.target.name.value,
        description: e.target.description.value,
        industry: e.target.industry.value,
      });
      this.toggle(e);
      this.setState({
        name: "",
        name_error: "",
        description: "",
        description_error: "",
        industry: "",
        industry_error: "",
      });
    }
  };
  editCompany = (e) => {
    e.preventDefault();
    var error = false;
    if (!e.target.name.value) {
      this.setState({ name_error: "Please Add a Name" });
      error = true;
    } else {
      this.setState({ name_error: "", name: e.target.name.value });
    }
    if (!e.target.description.value) {
      this.setState({ description_error: "Please Add a Description" });
      error = true;
    } else {
      this.setState({
        description_error: "",
        description: e.target.description.value,
      });
    }
    if (e.target.industry.value === "Industry") {
      this.setState({ industry_error: "Select an Industry" });
      error = true;
    } else {
      this.setState({ industry_error: "", industry: e.target.industry.value });
    }
    if (!error) {
      this.props.editCompany({
        id: e.target.id.value,
        name: e.target.name.value,
        description: e.target.description.value,
        industry: e.target.industry.value,
      });
      this.editToggle(e.target.id.value);
      this.setState({
        name: "",
        name_error: "",
        description: "",
        description_error: "",
        industry: "",
        industry_error: "",
      });
    }
  };
  render() {
    const { uid, companies, components } = this.props;
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
                <Button
                  className=" mb-2"
                  color="white"
                  onClick={this.toggle}
                  size="md"
                >
                  Add Company
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle}>Add Company</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={this.addCompany}>
                      <Label>Name</Label>
                      <Input
                        name="name"
                        valid={!this.state.name_error && this.state.name}
                        invalid={this.state.name_error}
                      />
                      <FormFeedback>{this.state.name_error}</FormFeedback>
                      <Label>Description</Label>
                      <Input
                        name="description"
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

                      <Label>Industry</Label>
                      <Input
                        name="industry"
                        type="select"
                        valid={
                          !this.state.industry_error && this.state.industry
                        }
                        invalid={this.state.industry_error}
                      >
                        <option hidden>Industry</option>
                        {components &&
                          components
                            .filter((component) => {
                              return component.id === "consultant_industry";
                            })
                            .map((comp) => {
                              return comp.industries.map((industry) => {
                                return <option>{industry}</option>;
                              });
                            })}
                      </Input>
                      <FormFeedback>{this.state.industry_error}</FormFeedback>
                      <Row>
                        <Col className="text-right">
                          <Button className=" mt-2" color="default" size="md">
                            Add Company
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </ModalBody>
                </Modal>
              </Col>
            </Row>
            {/* Table */}
            <Row>
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <h3 className="mb-0">Consulting Companies</h3>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Company Id</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Company Description</th>
                        <th scope="col">Industry</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companies &&
                        companies.map((company) => {
                          return (
                            <tr>
                              <th scope="row">
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {company.id}
                                    </span>
                                  </Media>
                                </Media>
                              </th>
                              <td>{company.name}</td>
                              <td>{company.description}</td>
                              <td>{company.industry}</td>
                              <td>
                                {" "}
                                <Button
                                  size="sm"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    this.editToggle(company.id);
                                  }}
                                  color="white"
                                >
                                  <i className="ni ni-settings  " />
                                </Button>
                                <Modal
                                  isOpen={this.state.editModal === company.id}
                                  toggle={(e) => {
                                    e.preventDefault();
                                    this.editToggle(company.id);
                                  }}
                                >
                                  <ModalHeader
                                    toggle={(e) => {
                                      e.preventDefault();
                                      this.editToggle(company.id);
                                    }}
                                  >
                                    Edit Company
                                  </ModalHeader>
                                  <ModalBody>
                                    <Form onSubmit={this.editCompany}>
                                      <Input
                                        name="id"
                                        hidden
                                        value={company.id}
                                      />
                                      <Label>Name</Label>
                                      <Input
                                        name="name"
                                        defaultValue={company.name}
                                        valid={
                                          !this.state.name_error &&
                                          this.state.name
                                        }
                                        invalid={this.state.name_error}
                                      />
                                      <FormFeedback>
                                        {this.state.name_error}
                                      </FormFeedback>
                                      <Label>Description</Label>
                                      <Input
                                        name="description"
                                        defaultValue={company.description}
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

                                      <Label>Industry</Label>
                                      <Input
                                        name="industry"
                                        type="select"
                                        valid={
                                          !this.state.industry_error &&
                                          this.state.industry
                                        }
                                        invalid={this.state.industry_error}
                                      >
                                        <option hidden>Industry</option>
                                        {components &&
                                          components
                                            .filter((component) => {
                                              return (
                                                component.id ===
                                                "consultant_industry"
                                              );
                                            })
                                            .map((comp) => {
                                              return comp.industries.map(
                                                (industry) => {
                                                  return (
                                                    <option
                                                      selected={
                                                        industry ===
                                                        company.industry
                                                      }
                                                    >
                                                      {industry}
                                                    </option>
                                                  );
                                                }
                                              );
                                            })}
                                      </Input>
                                      <FormFeedback>
                                        {this.state.industry_error}
                                      </FormFeedback>
                                      <Row>
                                        <Col className="text-right">
                                          <Button
                                            className=" mt-2"
                                            color="default"
                                            size="md"
                                          >
                                            Edit Company
                                          </Button>
                                        </Col>
                                      </Row>
                                    </Form>
                                  </ModalBody>
                                </Modal>
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
    companies: state.firestore.ordered.consulting_companies,
    components: state.firestore.ordered.components,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addCompany: (company) => dispatch(addCompany(company)),
    editCompany: (company) => dispatch(editCompany(company)),
    // deleteCompany: (company) =>
    //   dispatch(deleteCompany(company)),
    // editCompany: (company, newCompany) =>
    //   dispatch(editCompany(company, newCompany)),
  };
};

export default compose(
  firestoreConnect([
    { collection: "consulting_companies" },
    { collection: "components" },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(ConsultingCompanies);
