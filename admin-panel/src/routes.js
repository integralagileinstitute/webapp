import Index from "views/Index.js";

import Admins from "views/examples/Admins.js";
import Assessments from "views/examples/Assessments.js";
import ConsultingCompanies from "views/examples/ConsultingCompanies.js";
import Consultants from "views/examples/Consultants.js";
import AssessmentComponents from "views/examples/AssessmentComponents";
import ConsultantIndustry from "views/examples/ConsultantIndustry";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/admins",
    name: "Admins",
    icon: "ni ni-planet text-blue",
    component: Admins,
    layout: "/admin",
  },
  {
    path: "/assessments",
    name: "Assessments",
    icon: "ni ni-pin-3 text-orange",
    component: Assessments,
    layout: "/admin",
  },
  {
    path: "/assessmentcomponents",
    name: "Assessment Components",
    icon: "ni ni-settings text-default",
    component: AssessmentComponents,
    layout: "/admin",
  },
  {
    path: "/consultantindustry",
    name: "Consultant Industries",
    icon: "ni ni-building text-green",
    component: ConsultantIndustry,
    layout: "/admin",
  },
  {
    path: "/consulting-companies",
    name: "Consulting Companies",
    icon: "ni ni-single-02 text-yellow",
    component: ConsultingCompanies,
    layout: "/admin",
  },
  {
    path: "/consultants",
    name: "Consultants",
    icon: "ni ni-bullet-list-67 text-red",
    component: Consultants,
    layout: "/admin",
  },
];
export default routes;
