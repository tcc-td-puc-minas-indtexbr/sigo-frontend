import { RoutesPath } from "./constants";
import Layout from "components/layout";
import Empty from "components/layout/empty";
import Login from "pages/Auth/Login";
import Consulting from "pages/Consulting";
import ConsultingForm from "pages/Consulting/form";
import Home from "pages/Home";
import Standard from "pages/Standard";
import StandardForm from "pages/Standard/form";
import StandardUpdate from "pages/StandardUpdate";
import StandardUpdateForm from "pages/StandardUpdate/form";
import StandardUpdateCheck from "pages/StandardUpdate/check";

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
    path: RoutesPath.standardUpdate.index,
    exact: true,
    layout: Layout,
    component: StandardUpdate,
  },
  {
    path: RoutesPath.standardUpdate.form,
    exact: true,
    layout: Layout,
    component: StandardUpdateForm,
  },
  {
    path: RoutesPath.standardUpdate.check,
    exact: true,
    layout: Layout,
    component: StandardUpdateCheck,
  },
  {
    path: `${RoutesPath.standardUpdate.form}/:uuid`,
    exact: true,
    layout: Layout,
    component: StandardUpdateForm,
  },
  {
    path: RoutesPath.consulting.index,
    exact: true,
    layout: Layout,
    component: Consulting,
  },
  {
    path: RoutesPath.consulting.form,
    exact: true,
    layout: Layout,
    component: ConsultingForm,
  },
  {
    path: `${RoutesPath.consulting.form}/:uuid`,
    exact: true,
    layout: Layout,
    component: ConsultingForm,
  },
  {
    path: RoutesPath.login,
    layout: Empty,
    public: true,
    component: Login,
  },
];

export default routes;
