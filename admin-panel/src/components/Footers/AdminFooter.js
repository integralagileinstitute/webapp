/*eslint-disable*/
import React from "react";

// reactstrap components
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2018
              <a
                className="font-weight-bold ml-1"
                href="/"
                rel="noopener noreferrer"
                target="_blank"
              >
                argon
              </a>
            </div>
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem>
                <NavLink href="/" rel="noopener noreferrer" target="_blank">
                  argon
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/" rel="noopener noreferrer" target="_blank">
                  About Us
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/" rel="noopener noreferrer" target="_blank">
                  Blog
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/" rel="noopener noreferrer" target="_blank">
                  MIT License
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
