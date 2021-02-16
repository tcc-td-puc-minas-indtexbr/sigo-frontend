import Layout from "components/layout";
import Empty from "components/layout/empty";
import Login from "pages/Auth/Login";
import Standard from "pages/Standard";
import StandardForm from "pages/Standard/form";
import Xpto from "pages/Xpto";

export type ComponentRoute = {
  path: string;
  exact?: boolean;
  public?: boolean;
  layout: React.FC;
  component: React.FC;
};

const routes: ComponentRoute[] = [
  {
    path: "/",
    exact: true,
    layout: Layout,
    component: Xpto,
  },
  {
    path: "/standard",
    exact: true,
    layout: Layout,
    component: Standard,
  },
  {
    path: "/standard/form",
    exact: true,
    layout: Layout,
    component: StandardForm,
  },
  {
    path: "/blog-posts",
    layout: Layout,
    component: Xpto,
  },
  {
    path: "/login",
    layout: Empty,
    public: true,
    component: Login,
  },
];

export default routes;
