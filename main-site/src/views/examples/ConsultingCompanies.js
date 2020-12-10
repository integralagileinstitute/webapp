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
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Header from "components/Headers/Header.js";

class ConsultingCompanies extends React.Component {
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
                Add Company
              </Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Add Company</ModalHeader>
                <ModalBody>
                  <Form>
                    <Label>Name</Label>
                    <Input /> <Label>Description</Label>
                    <Input type="textarea" />
                    <Label>Industry</Label>
                    <Input type="select">
                      <option hidden>Industry</option>
                      <option>Industry 1</option>
                      <option>Industry 2</option>
                      <option>Industry 3</option>
                      <option>Industry 4</option>
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
                      <td>Company 1</td>
                      <td>Company Description</td>
                      <td>Industry 1</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">2</span>
                          </Media>
                        </Media>
                      </th>
                      <td>Company 2</td>
                      <td>Company Description</td>
                      <td>Industry 2</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">3</span>
                          </Media>
                        </Media>
                      </th>
                      <td>Company 3</td>
                      <td>Company Description</td>
                      <td>Industry 3</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">4</span>
                          </Media>
                        </Media>
                      </th>
                      <td>Company 4</td>
                      <td>Company Description</td>
                      <td>Industry 4</td>
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

export default ConsultingCompanies;
