import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Clients from "views/examples/Clients.js";
import BuyAssessments from "views/examples/buyAssessments";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/editprofile",
    name: "Edit Profile",
    icon: "ni ni-planet text-blue",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/clients",
    name: "Clients",
    icon: "ni ni-pin-3 text-orange",
    component: Clients,
    layout: "/admin",
  },
  {
    path: "/buyassessments",
    name: "Buy Assessments",
    icon: "ni ni-settings text-default",
    component: BuyAssessments,
    layout: "/admin",
  },
];
export default routes;
