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
} from "reactstrap";
// core components
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Header from "components/Headers/Header.js";

class Consultants extends React.Component {
  state = { modal: false };
  toggle = (e) => {
    e.preventDefault();
    this.setState({ modal: !this.state.modal });
  };
  render() {
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
                href="#pablo"
                onClick={this.toggle}
                size="md"
              >
                Add Consultant
              </Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Add Consultant</ModalHeader>
                <ModalBody>
                  <Form>
                    <Label>First Name</Label>
                    <Input /> <Label>Last Name</Label>
                    <Input />
                    <Label>Title</Label>
                    <Input />
                    <Label>company</Label>
                    <Input type="select">
                      <option hidden>Company</option>
                      <option>Company 1</option>
                      <option>Company 2</option>
                      <option>Company 3</option>
                      <option>Company 4</option>
                    </Input>
                    <Row>
                      <Col className="text-right">
                        <Button
                          className=" mt-2"
                          color="default"
                          href="#pablo"
                          onClick={this.toggle}
                          size="md"
                        >
                          Add Consultant
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </ModalBody>
              </Modal>
            </Col>
          </Row>
          {/* Dark table */}
          <Row>
            <div className="col">
              <Card className=" shadow">
                <CardHeader className=" border-0">
                  <h3 className=" mb-0">Assessments</h3>
                </CardHeader>
                <Table className="align-items-center  table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Consultant Id</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Title</th>
                      <th scope="col">Company</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">1</span>
                          </Media>
                        </Media>
                      </th>
                      <td> Momin</td>
                      <td> Naveed</td>
                      <td> Senior Consultant</td>
                      <td> Dummy Company</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">2</span>
                          </Media>
                        </Media>
                      </th>
                      <td> Momin</td>
                      <td> Naveed</td>
                      <td> Senior Consultant</td>
                      <td> Dummy Company</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">3</span>
                          </Media>
                        </Media>
                      </th>
                      <td> Momin</td>
                      <td> Naveed</td>
                      <td> Senior Consultant</td>
                      <td> Dummy Company</td>
                    </tr>
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

export default Consultants;
