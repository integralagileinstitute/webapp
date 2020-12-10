import raterAssessments from "views/examples/raterAssessments";

var raterRoutes = [
  {
    path: "/assessments",
    name: "Assessments",
    icon: "ni ni-settings text-default",
    component: raterAssessments,
    layout: "/rater",
  },
];
export default raterRoutes;
