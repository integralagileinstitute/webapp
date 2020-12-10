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
} from "reactstrap";

class ConsultantIndustry extends Component {
  state = { Question: false };
  toggle = (e) => {
    e.preventDefault();
    this.setState({ Question: !this.state.Question });
  };
  render() {
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
                          <Form className="">
                            <InputGroup className=" ">
                              <Input className=" " placeholder="Industry" />
                              <InputGroupAddon addonType="append">
                                <Button>ADD</Button>
                              </InputGroupAddon>
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
                              <tr>
                                <th scope="row">
                                  <span className="mb-0 text-sm ">1</span>
                                </th>
                                <td className=""> Industry 1</td>
                                <td>
                                  <Button size="sm" color="white">
                                    <i className="ni ni-settings  " />
                                  </Button>
                                  <Button size="sm" color="white">
                                    <i className="fas fa-trash  " />
                                  </Button>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <span className="mb-0 text-sm ">2</span>
                                </th>
                                <td className=""> Industry 2</td>
                                <td>
                                  <Button size="sm" color="white">
                                    <i className="ni ni-settings  " />
                                  </Button>
                                  <Button size="sm" color="white">
                                    <i className="fas fa-trash  " />
                                  </Button>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <span className="mb-0 text-sm ">3</span>
                                </th>
                                <td className=""> Industry 3</td>
                                <td>
                                  <Button size="sm" color="white">
                                    <i className="ni ni-settings  " />
                                  </Button>
                                  <Button size="sm" color="white">
                                    <i className="fas fa-trash  " />
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                          <Row className="mt-2">
                            <Col>
                              <Pagination aria-label="Page navigation example">
                                <PaginationItem>
                                  <PaginationLink
                                    className=" "
                                    previous
                                    href="#"
                                  />
                                </PaginationItem>
                                <PaginationItem>
                                  <PaginationLink className=" " href="#">
                                    1
                                  </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                  <PaginationLink className=" " next href="#" />
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

export default ConsultantIndustry;
