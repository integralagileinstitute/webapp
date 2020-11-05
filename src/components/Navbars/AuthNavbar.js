import React from "react";
// reactstrap components
import { Navbar, Container } from "reactstrap";

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar
          className="navbar-top navbar-horizontal navbar-dark"
          expand="md"
        >
          <Container className="px-4"></Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
