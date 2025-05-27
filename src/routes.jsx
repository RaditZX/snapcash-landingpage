import { Home, Profile, SignIn, SignUp } from "@/pages";

export const routes = [
  {
    name: "home",
    path: "/home",
    href: "#home",
    element: <Home />,
  },
  {
    name: "about",
    path: "/about",
    href: "#about",
    element: ""
  },
  {
    name: "profile",
    path: "/profile",
    href: "#profile",
    element: "",
  },
  {
    name: "cara-pakai",
    path: "/social-media",
    href: "#cara-pakai",
    element: "",
  },

];

export default routes;
