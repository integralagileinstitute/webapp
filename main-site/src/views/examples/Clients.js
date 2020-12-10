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
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { deleteClient } from "actions/clientActions";

class Clients extends React.Component {
  render() {
    const { clients, uid } = this.props;

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--9" fluid>
          <Row>
            <Col className="text-right">
              <Link to="/admin/clients/addClient">
                <Button className=" mb-2" color="white" href="#pablo" size="md">
                  Add Client
                </Button>
              </Link>
            </Col>
          </Row>
          {/* table */}
          <Row>
            <div className="col">
              <Card className=" shadow">
                <CardHeader className=" border-0">
                  <h3 className=" mb-0">Clients</h3>
                </CardHeader>
                <Table className="align-items-center  table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Client Id</th>
                      <th scope="col">Client Name</th>
                      <th scope="col">Client Industry</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients &&
                      clients
                        .filter((client) => client.consultantId === uid)
                        .map((client) => {
                          return (
                            <tr>
                              <th scope="row">
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {client.id}
                                    </span>
                                  </Media>
                                </Media>
                              </th>
                              <td> {client.name}</td>
                              <td> {client.industry}</td>
                              <td>
                                <Link
                                  style={{ padding: "0.25rem 0.5rem" }}
                                  to={"/admin/clients/editClient/" + client.id}
                                >
                                  <Button size="sm" color="white">
                                    <i className="ni ni-settings  " />
                                  </Button>
                                </Link>

                                <Button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    this.props.deleteClient(client);
                                  }}
                                  size="sm"
                                  color="white"
                                >
                                  <i className="fas fa-trash  " />
                                </Button>
                                <Link
                                  style={{ padding: "0.25rem 0.5rem" }}
                                  to={"/admin/clients/viewClient/" + client.id}
                                >
                                  <Button size="sm" color="white">
                                    <i className="fas fa-eye  " />
                                  </Button>
                                </Link>
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
const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    authError: state.auth.authError,
    clients: state.firestore.ordered.clients,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteClient: (client) => dispatch(deleteClient(client)),
  };
};

export default compose(
  firestoreConnect([{ collection: "clients" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(Clients);
