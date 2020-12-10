import React from "react";

import {
  Card,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
  Button,
  Col,
  Form,
  Label,
  Input,
} from "reactstrap";

import { Modal, ModalHeader, ModalBody } from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

class Admins extends React.Component {
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
                Add Admin
              </Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Add Admin</ModalHeader>
                <ModalBody>
                  <Form>
                    <Label>Name</Label>
                    <Input /> <Label>Email</Label>
                    <Input /> <Label>Password</Label>
                    <Input />
                    <Row>
                      <Col className="text-right">
                        <Button
                          className=" mt-2"
                          color="default"
                          href="#pablo"
                          onClick={this.toggle}
                          size="md"
                        >
                          Add Admin
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
                  <h3 className="mb-0">Admins</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Admin Id</th>
                      <th scope="col">Admin Name</th>
                      <th scope="col">Admin Email</th>
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
                      <td>Momin</td>
                      <td>mominnaveed1997@gmail.com</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">2</span>
                          </Media>
                        </Media>
                      </th>
                      <td>Ahmad</td>
                      <td>mominnaveed1997@gmail.com</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">3</span>
                          </Media>
                        </Media>
                      </th>
                      <td>Ali</td>
                      <td>mominnaveed1997@gmail.com</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">4</span>
                          </Media>
                        </Media>
                      </th>
                      <td>Mateen</td>
                      <td>mominnaveed1997@gmail.com</td>
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

export default Admins;
