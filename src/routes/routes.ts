import { RoutesPath } from "./constants";
import Layout from "components/layout";
import Empty from "components/layout/empty";
import Login from "pages/Auth/Login";
import Consultancy from "pages/Consultancy";
import Home from "pages/Home";
import Standard from "pages/Standard";
import StandardForm from "pages/Standard/form";

export type ComponentRoute = {
  path: string;
  exact?: boolean;
  public?: boolean;
  layout: React.FC;
  component: React.FC;
};

const routes: ComponentRoute[] = [
  {
    path: RoutesPath.index,
    exact: true,
    layout: Layout,
    component: Home,
  },
  {
    path: RoutesPath.standard.index,
    exact: true,
    layout: Layout,
    component: Standard,
  },
  {
    path: RoutesPath.standard.form,
    exact: true,
    layout: Layout,
    component: StandardForm,
  },
  {
    path: `${RoutesPath.standard.form}/:uuid`,
    exact: true,
    layout: Layout,
    component: StandardForm,
  },
  {
    path: RoutesPath.consultancy.index,
    exact: true,
    layout: Layout,
    component: Consultancy,
  },
  {
    path: RoutesPath.login,
    layout: Empty,
    public: true,
    component: Login,
  },
];

export default routes;
