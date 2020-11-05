import Header from "components/Headers/Header";
import React, { Component } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Button,
  Form,
  Label,
  Input,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

class editAssessment extends Component {
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
            <div className="col">
              <Card className=" shadow ">
                <CardHeader className=" border-0 ">
                  <h3 className=" mb-0 ">
                    <i className="ni ni-settings  " />
                    &nbsp; Edit Assessment
                  </h3>
                </CardHeader>
                <CardBody className=" mb-0 ">
                  <Form>
                    <Label>Assessment Title</Label>
                    <Input />
                    <Label>Description</Label>
                    <Input type="textarea" />
                    <Label>Assessment Type</Label>
                    <Input type="select">
                      <option hidden>Type</option>
                      <option>Type 1</option>
                      <option>Type 2</option>
                      <option>Type 3</option>
                    </Input>
                    <Label>Assessment Version</Label>
                    <Input />
                    <Label>Assessment Price</Label>
                    <Input type="number" min={0} />
                    <Button
                      className="mt-2"
                      type="button"
                      color="default"
                      size="md"
                      onClick={this.toggle}
                    >
                      Add Question
                    </Button>
                    <Row>
                      <Col className="text-right">
                        <Button
                          className="mt-2"
                          type="submit"
                          color="default"
                          size="md"
                        >
                          Save Assessment
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                  <Modal isOpen={this.state.Question} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add Question</ModalHeader>
                    <ModalBody>
                      <Form>
                        <Label>Question Text</Label>
                        <Input />

                        <Label>Category</Label>
                        <Input type="select">
                          <option hidden>Category</option>
                          <option>Category 1</option>
                          <option>Category 2</option>
                          <option>Category 3</option>
                        </Input>
                        <Label>Competency</Label>
                        <Input type="select">
                          <option hidden>Competency</option>
                          <option>Competency 1</option>
                          <option>Competency 2</option>
                          <option>Competency 3</option>
                        </Input>
                        <Label>Type</Label>
                        <Input type="select">
                          <option hidden>Type</option>
                          <option>Type 1</option>
                          <option>Type 2</option>
                          <option>Type 3</option>
                        </Input>
                        <Label>Question Help</Label>
                        <Input />
                        <Row className="mt-2">
                          <Col className="text-right">
                            <Button
                              color="default"
                              size="md"
                              onClick={this.toggle}
                            >
                              Add Question
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                  <Row className="mt-4">
                    <Col xs={{ size: 8 }}>
                      <h3 className=" mb-0 ">
                        Question : Dummy question is this ?
                      </h3>
                      <p className="mb-0">Description and stuff goes here</p>
                    </Col>
                    <Col xs={{ size: 4 }} className="text-right">
                      <Button
                        className="mt-2"
                        type="submit"
                        color="default"
                        size="md"
                      >
                        Edit
                      </Button>
                      <Button
                        className="mt-2"
                        type="submit"
                        color="default"
                        size="md"
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col xs={{ size: 8 }}>
                      <h3 className=" mb-0 ">
                        Question : Dummy question is this ?
                      </h3>
                      <p className="mb-0">Description and stuff goes here</p>
                    </Col>
                    <Col xs={{ size: 4 }} className="text-right">
                      <Button
                        className="mt-2"
                        type="submit"
                        color="default"
                        size="md"
                      >
                        Edit
                      </Button>
                      <Button
                        className="mt-2"
                        type="submit"
                        color="default"
                        size="md"
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col xs={{ size: 8 }}>
                      <h3 className=" mb-0 ">
                        Question : Dummy question is this ?
                      </h3>
                      <p className="mb-0">Description and stuff goes here</p>
                    </Col>
                    <Col xs={{ size: 4 }} className="text-right">
                      <Button
                        className="mt-2"
                        type="submit"
                        color="default"
                        size="md"
                      >
                        Edit
                      </Button>
                      <Button
                        className="mt-2"
                        type="submit"
                        color="default"
                        size="md"
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default editAssessment;
