import Logout from "views/examples/Logout.js";
import Login from "views/examples/Login.js";

var authRoutes = [
  {
    path: "/logout",
    name: "Logout",
    icon: "ni ni-key-25 text-info",
    component: Logout,
    layout: "/auth",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
];
export default authRoutes;
