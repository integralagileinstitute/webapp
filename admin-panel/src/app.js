import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { compose } from "redux";
import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";
export class app extends Component {
  render() {
    const { uid } = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/admin"
            render={(props) => (
              <div>
                <AdminLayout {...props} />
              </div>
            )}
          />
          <Route
            path="/auth"
            render={(props) =>
              uid ? (
                <Redirect to="/admin" />
              ) : (
                <div>
                  <AuthLayout {...props} />
                  <Redirect from="/" to="/auth/login" />
                </div>
              )
            }
          />
          <Redirect from="/" to="/auth/login" />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
  };
};

export default compose(
  firestoreConnect([
    { collection: "users" },
    { collection: "products" },
    { collection: "reviews" },
    { collection: "announcements" },
  ]),
  connect(mapStateToProps)
)(app);
