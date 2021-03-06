import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import AddAssessment from "../views/examples/addAssessment.js";
import EditAssessment from "../views/examples/editAssessment.js";

import routes from "routes.js";
import AssessmentType from "views/examples/AssessmentType.js";
import QuestionType from "views/examples/QuestionType.js";
import QuestionCategory from "views/examples/QuestionCategory.js";
import QuestionCompetency from "views/examples/QuestionCompetency.js";
import QuestionDimension from "views/examples/QuestionDimension.js";
import ClientIndustry from "views/examples/ClientIndustry.js";

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
              path="/admin/assessments/addassessment"
              component={AddAssessment}
              key={123}
            />
            <Route
              exact
              path="/admin/assessments/editassessment/:id"
              component={EditAssessment}
              key={1234}
            />
            <Route
              exact
              path="/admin/assessmentcomponents/assessmenttype"
              component={AssessmentType}
              key={1234}
            />
            <Route
              exact
              path="/admin/assessmentcomponents/questiontype"
              component={QuestionType}
              key={1234}
            />
            <Route
              exact
              path="/admin/assessmentcomponents/questioncategory"
              component={QuestionCategory}
              key={1234}
            />
            <Route
              exact
              path="/admin/assessmentcomponents/questioncompetency"
              component={QuestionCompetency}
              key={1234}
            />
            <Route
              exact
              path="/admin/assessmentcomponents/questiondimension"
              component={QuestionDimension}
              key={1234}
            />
            <Route
              exact
              path="/admin/assessmentcomponents/clientindustry"
              component={ClientIndustry}
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
