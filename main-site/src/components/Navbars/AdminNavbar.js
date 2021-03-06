import { logout } from "actions/authActions";
import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { compose } from "redux";

class AdminNavbar extends React.Component {
  render() {
    const { uid, consultants, raters } = this.props;
    const thisConsultant =
      consultants && consultants.find((con) => con.id === uid);
    console.log(thisConsultant);
    const thisRater = raters && raters.find((con) => con.id === uid);
    console.log(thisRater);
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("assets/img/theme/dummy-avatar.jpg")}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm text-capitalize font-weight-bold">
                        {thisConsultant
                          ? thisConsultant.first_name
                          : thisRater
                          ? ""
                          : ""}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.logout();
                    }}
                  >
                    <i className="ni ni-user-run" />

                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    authError: state.auth.authError,
    consultants: state.firestore.ordered.consultants,
    raters: state.firestore.ordered.raters,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default compose(
  firestoreConnect([
    { collection: "users" },
    { collection: "consultants" },
    { collection: "raters" },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(AdminNavbar);
