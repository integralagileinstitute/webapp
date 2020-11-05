import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";

import Header from "components/Headers/Header.js";

class Assessments extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--9" fluid>
          <Row>
            <Col className="text-right">
              <Link to="/admin/assessments/addAssessment">
                <Button className=" mb-2" color="white" href="#pablo" size="md">
                  Add Assessment
                </Button>
              </Link>
            </Col>
          </Row>
          {/* table */}
          <Row>
            <div className="col">
              <Card className=" shadow">
                <CardHeader className=" border-0">
                  <h3 className=" mb-0">Assessments</h3>
                </CardHeader>
                <Table className="align-items-center  table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Assessment Id</th>
                      <th scope="col">Assessment Name</th>
                      <th scope="col">Assessment Description</th>
                      <th scope="col">Assessment Price</th>
                      <th scope="col">Action</th>
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
                      <td> First Assessment</td>
                      <td> Dummy Description</td>
                      <td>5$</td>
                      <td>
                        <Link
                          style={{ padding: "0.25rem 0.5rem" }}
                          to="/admin/assessments/editAssessment"
                        >
                          <Button size="sm" color="white">
                            <i className="ni ni-settings  " />
                          </Button>
                        </Link>

                        <Button size="sm" color="white">
                          <i className="fas fa-trash  " />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">2</span>
                          </Media>
                        </Media>
                      </th>
                      <td> Second Assessment</td>
                      <td> Dummy Description</td>
                      <td>5$</td>
                      <td>
                        <Link
                          style={{ padding: "0.25rem 0.5rem" }}
                          to="/admin/assessments/editAssessment"
                        >
                          <Button size="sm" color="white">
                            <i className="ni ni-settings  " />
                          </Button>
                        </Link>
                        <Button size="sm" color="white">
                          <i className="fas fa-trash  " />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">3</span>
                          </Media>
                        </Media>
                      </th>
                      <td> Third Assessment</td>
                      <td> Dummy Description</td>
                      <td>5$</td>
                      <td>
                        <Link
                          style={{ padding: "0.25rem 0.5rem" }}
                          to="/admin/assessments/editAssessment"
                        >
                          <Button size="sm" color="white">
                            <i className="ni ni-settings  " />
                          </Button>
                        </Link>
                        <Button size="sm" color="white">
                          <i className="fas fa-trash  " />
                        </Button>
                      </td>
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

export default Assessments;
