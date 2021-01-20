import Layout from './layout';
import Xpto from './pages/Xpto';
import Foo from './pages/Foo';

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
  }
];

export default routes;