import React, { Component } from "react";
import AdminLayout from "layouts/Admin.js";
import RaterLayout from "layouts/Rater.js";
import AuthLayout from "layouts/Auth.js";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

export class app extends Component {
  render() {
    const { uid, id_type } = this.props;
    return (
      <BrowserRouter>
        {uid ? (
          id_type === "rater" ? (
            <Switch>
              {" "}
              <Route
                path="/rater"
                render={(props) => (
                  <div>
                    <RaterLayout {...props} />
                  </div>
                )}
              />
              <Redirect from="*" to="/rater/projects" />
            </Switch>
          ) : (
            <Switch>
              <Route
                path="/admin"
                render={(props) => (
                  <div>
                    <AdminLayout {...props} />
                  </div>
                )}
              />
              <Redirect from="*" to="/admin/index" />
            </Switch>
          )
        ) : (
          <Switch>
            <Route
              path="/auth"
              render={(props) => (
                <div>
                  <AuthLayout {...props} />
                </div>
              )}
            />
            <Redirect from="/" to="/auth/login" />
          </Switch>
        )}
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    id_type: state.auth.id_type,
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
