import Header from "components/Headers/Header";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
// reactstrap components
import {
  Card,
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
  addClientIndustry,
  editClientIndustry,
  deleteClientIndustry,
} from "actions/componentsActions";

import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

export class ClientIndustry extends Component {
  state = {
    edit: true,
    industry: "",
    changeIndustry: "",
    search: "",
    pagination: 1,
  };
  addClientIndustry = (e) => {
    e.preventDefault();
    var error = false;
    if (!e.target.client_industry.value) {
      this.setState({ client_industry_error: "Please add Text" });
      error = true;
    } else {
      this.setState({
        client_industry_error: "",
        client_industry: e.target.client_industry.value,
      });
    }
    if (!error) {
      this.props.addClientIndustry(e.target.client_industry.value);
      e.target.client_industry.value = "";
    }
  };
  deleteClientIndustry = (industry) => {
    this.props.deleteClientIndustry(industry);
  };
  addToEdit = (industry) => {
    this.setState({
      industry: industry,
      edit: false,
      changeIndutry: industry,
    });
  };
  editClientIndustry = (e) => {
    e.preventDefault();

    this.props.editClientIndustry(
      this.state.changeIndutry,
      e.target.client_industry.value
    );
    this.setState({
      edit: true,
      industry: "",
      changeIndutry: "",
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
            <Row>
              <Col>
                <Card className="shadow ">
                  <CardBody className=" ">
                    <div style={{ display: "flex" }}>
                      <Link
                        to="/admin/assessmentcomponents"
                        className="text-default "
                      >
                        <i
                          className="fas fa-long-arrow-alt-left "
                          style={{ fontSize: "25px" }}
                        />
                      </Link>
                      <h3 className="ml-3 mb-0 ">Client Industry</h3>
                    </div>
                    <p className="text-info">
                      Used to determine Client Industry
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
                      onSubmit={this.editClientIndustry}
                      className=""
                    >
                      <InputGroup className=" ">
                        <Input
                          name="client_industry"
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
                      onSubmit={this.addClientIndustry}
                      className=""
                    >
                      <InputGroup className=" ">
                        <Input
                          name="client_industry"
                          className=" "
                          placeholder="Industry"
                          valid={
                            !this.state.client_industry_error &&
                            this.state.client_industry
                          }
                          invalid={this.state.client_industry_error}
                        />

                        <InputGroupAddon addonType="append">
                          <Button>ADD</Button>
                        </InputGroupAddon>
                        <FormFeedback>
                          {this.state.client_industry_error}
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
                            .filter((comp) => comp.id === "client_industry")
                            .map((comp) => {
                              return comp.industries
                                .filter((industry) => {
                                  if (this.state.search) {
                                    return industry.includes(this.state.search);
                                  } else {
                                    return true;
                                  }
                                })
                                .splice(5 * (this.state.pagination - 1), 5)
                                .map((industry, i) => {
                                  return (
                                    <tr
                                      hidden={
                                        this.state.changeIndustry === industry
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
                                            this.deleteClientIndustry(industry);
                                          }}
                                          size="sm"
                                          color="white"
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
                                    (comp) => comp.id === "client_industry"
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
    addClientIndustry: (industry) => dispatch(addClientIndustry(industry)),
    deleteClientIndustry: (industry) =>
      dispatch(deleteClientIndustry(industry)),
    editClientIndustry: (industry, newIndustry) =>
      dispatch(editClientIndustry(industry, newIndustry)),
  };
};

export default compose(
  firestoreConnect([{ collection: "components" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(ClientIndustry);
