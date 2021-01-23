import Layout from './components/layout';
import Empty from './components/layout/empty';
import Xpto from './pages/Xpto';
import Foo from './pages/Foo';
import Login from './pages/Auth/Login';

export type ComponentRoute = {
  path: string,
  exact?: boolean,
  layout: React.FC,
  component: React.FC
};

const routes: ComponentRoute[] = [
  {
    path: "/",
    exact: true,
    layout: Layout,
    component: Xpto
  },
  {
    path: "/blog-overview",
    layout: Layout,
    component: Foo
  },
  {
    path: "/blog-posts",
    layout: Layout,
    component: Xpto
  },
  {
    path: "/login",
    layout: Empty,
    component: Login
  }
];

export default routes;