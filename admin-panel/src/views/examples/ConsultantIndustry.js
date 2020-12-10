import Header from "components/Headers/Header";
import React, { Component } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  Button,
  Form,
  Input,
  CardBody,
  InputGroup,
  InputGroupAddon,
  FormFeedback,
} from "reactstrap";
import {
  addConsultantIndustry,
  editConsultantIndustry,
  deleteConsultantIndustry,
} from "actions/componentsActions";

import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class ConsultantIndustry extends Component {
  state = {
    edit: true,
    industry: "",
    changeIndustry: "",
    search: "",
    pagination: 1,
  };
  addConsultantIndustry = (e) => {
    e.preventDefault();
    var error = false;
    if (!e.target.consultant_industry.value) {
      this.setState({ consultant_industry_error: "Please add Text" });
      error = true;
    } else {
      this.setState({
        consultant_industry_error: "",
        consultant_industry: e.target.consultant_industry.value,
      });
    }
    if (!error) {
      this.props.addConsultantIndustry(e.target.consultant_industry.value);
      e.target.consultant_industry.value = "";
    }
  };
  deleteConsultantIndustry = (industry) => {
    this.props.deleteConsultantIndustry(industry);
  };
  addToEdit = (industry) => {
    this.setState({
      industry: industry,
      edit: false,
      changeIndustry: industry,
    });
  };
  editConsultantIndustry = (e) => {
    e.preventDefault();

    this.props.editConsultantIndustry(
      this.state.changeIndustry,
      e.target.consultant_industry.value
    );
    this.setState({
      edit: true,
      industry: "",
      changeIndustry: "",
    });
  };
  search = (e) => {
    e.preventDefault();
    this.setState({ search: e.target.value });
  };
  render() {
    const { uid, components } = this.props;
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
              <Col>
                <Card className=" shadow ">
                  <CardHeader className=" border-0 ">
                    <h3 className=" mb-0 ">Consultant Industry</h3>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs={{ size: 12 }} className="mb-4">
                        <Card className="shadow border-dark ">
                          <CardBody className=" ">
                            <h3 className=" mb-0 ">Consultant Industry</h3>
                            <p className="text-info">
                              Used to determine Industries Consultants belong to
                            </p>
                            <Form>
                              <InputGroup className="mb-3 ">
                                <Input
                                  onChange={this.search}
                                  name="search"
                                  className=" "
                                  placeholder="Search"
                                />
                                <InputGroupAddon addonType="append">
                                  <Button>
                                    <i className="fas fa-search  " />
                                  </Button>
                                </InputGroupAddon>
                              </InputGroup>
                            </Form>
                            <Form
                              hidden={this.state.edit}
                              onSubmit={this.editConsultantIndustry}
                              className=""
                            >
                              <InputGroup className=" ">
                                <Input
                                  name="consultant_industry"
                                  className=" "
                                  value={this.state.industry}
                                  onChange={(e) => {
                                    e.preventDefault();
                                    this.setState({ industry: e.target.value });
                                  }}
                                />
                                <InputGroupAddon addonType="append">
                                  <Button>EDIT</Button>
                                </InputGroupAddon>
                              </InputGroup>
                            </Form>
                            <Form
                              hidden={!this.state.edit}
                              onSubmit={this.addConsultantIndustry}
                              className=""
                            >
                              <InputGroup className=" ">
                                <Input
                                  name="consultant_industry"
                                  className=" "
                                  placeholder="Industry"
                                  valid={
                                    !this.state.consultant_industry_error &&
                                    this.state.consultant_industry
                                  }
                                  invalid={this.state.consultant_industry_error}
                                />

                                <InputGroupAddon addonType="append">
                                  <Button>ADD</Button>
                                </InputGroupAddon>
                                <FormFeedback>
                                  {this.state.consultant_industry_error}
                                </FormFeedback>
                              </InputGroup>
                            </Form>
                            <Table
                              className="align-items-center  table-flush mt-4"
                              responsive
                            >
                              <thead className="thread-light">
                                <tr>
                                  <th scope="col"> Id</th>
                                  <th scope="col">Industry</th>
                                  <th scope="col">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {components &&
                                  components
                                    .filter(
                                      (comp) =>
                                        comp.id === "consultant_industry"
                                    )
                                    .map((comp) => {
                                      return comp.industries
                                        .filter((industry) => {
                                          if (this.state.search) {
                                            return industry.includes(
                                              this.state.search
                                            );
                                          } else {
                                            return true;
                                          }
                                        })
                                        .splice(
                                          5 * (this.state.pagination - 1),
                                          5
                                        )
                                        .map((industry, i) => {
                                          return (
                                            <tr
                                              hidden={
                                                this.state.changeIndustry ===
                                                industry
                                              }
                                            >
                                              <th scope="row">
                                                <span className="mb-0 text-sm ">
                                                  {i + 1}
                                                </span>
                                              </th>
                                              <td className=""> {industry}</td>
                                              <td>
                                                <Button
                                                  type="button"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    this.addToEdit(industry);
                                                  }}
                                                  size="sm"
                                                  color="white"
                                                >
                                                  <i className="ni ni-settings  " />
                                                </Button>
                                                <Button
                                                  type="button"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    this.deleteConsultantIndustry(
                                                      industry
                                                    );
                                                  }}
                                                  size="sm"
                                                  consultantor="white"
                                                >
                                                  <i className="fas fa-trash  " />
                                                </Button>
                                              </td>
                                            </tr>
                                          );
                                        });
                                    })}
                              </tbody>
                            </Table>
                            <Row className="mt-2">
                              <Col>
                                <Pagination aria-label="Page navigation example">
                                  <PaginationItem>
                                    <PaginationLink
                                      className=" "
                                      previous
                                      disabled={this.state.pagination === 1}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({
                                          pagination: this.state.pagination - 1,
                                        });
                                      }}
                                    />
                                  </PaginationItem>
                                  <PaginationItem>
                                    <PaginationLink className=" " disabled>
                                      {this.state.pagination}
                                    </PaginationLink>
                                  </PaginationItem>
                                  <PaginationItem>
                                    <PaginationLink
                                      className=" "
                                      next
                                      disabled={
                                        components &&
                                        components
                                          .filter(
                                            (comp) =>
                                              comp.id === "consultant_industry"
                                          )[0]
                                          .industries.filter((industry) => {
                                            if (this.state.search) {
                                              return industry.includes(
                                                this.state.search
                                              );
                                            } else {
                                              return true;
                                            }
                                          }).length /
                                          5 <=
                                          this.state.pagination
                                      }
                                      onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({
                                          pagination: this.state.pagination + 1,
                                        });
                                      }}
                                    />
                                  </PaginationItem>
                                </Pagination>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addConsultantIndustry: (industry) =>
      dispatch(addConsultantIndustry(industry)),
    deleteConsultantIndustry: (industry) =>
      dispatch(deleteConsultantIndustry(industry)),
    editConsultantIndustry: (industry, newIndustry) =>
      dispatch(editConsultantIndustry(industry, newIndustry)),
  };
};

export default compose(
  firestoreConnect([{ collection: "components" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(ConsultantIndustry);
