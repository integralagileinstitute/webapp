import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import EditClient from "../views/examples/editClient.js";
import EditProject from "../views/examples/editProject.js";
import routes from "routes.js";
import AddClient from "../views/examples/addClient.js";
import ViewClient from "../views/examples/viewClient.js";
import ViewProject from "../views/examples/viewProject.js";
import ViewAssessment from "../views/examples/viewAssessment.js";
import AssessmentCheckout from "views/examples/AssessmentCheckout.js";

class Admin extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            exact
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    console.log(this.props.location.pathname);
    return "Brand";
  };
  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "...",
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            {this.getRoutes(routes)}
            <Route
              exact
              path="/admin/clients/addClient"
              component={AddClient}
              key={123}
            />
            <Route
              exact
              path="/admin/clients/viewClient/:id"
              component={ViewClient}
              key={123}
            />
            <Route
              exact
              path="/admin/clients/editClient/:id"
              component={EditClient}
              key={1234}
            />
            <Route
              exact
              path="/admin/clients/:clientId/editProject/:id"
              component={EditProject}
              key={1234}
            />
            <Route
              exact
              path="/admin/clients/:clientId/viewProject/:id"
              component={ViewProject}
              key={1234}
            />
            <Route
              exact
              path="/admin/clients/:clientId/viewProject/:projectId/ViewAssessment/:id"
              component={ViewAssessment}
              key={1234}
            />
            <Route
              exact
              path="/admin/buyassessments/assessmentCheckout"
              component={AssessmentCheckout}
              key={1234}
            />
            <Redirect from="*" to="/admin/index" />
          </Switch>
        </div>
      </>
    );
  }
}

export default Admin;
