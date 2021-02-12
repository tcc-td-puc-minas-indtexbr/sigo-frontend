import React, { useContext } from 'react';
import classNames from 'classnames';
import { Col } from 'shards-react';
import AppContext from '../../../store/AppContext';

import SidebarMainNavbar from './SidebarMainNavbar';
import SidebarSearch from './SidebarSearch';
import SidebarNavItems from './SidebarNavItems';

const MainSidebar: React.FC = () => {
  const { isSidebarVisible } = useContext(AppContext);

  return (
    <Col
      tag="aside"
      className={classNames(
        'main-sidebar',
        'px-0',
        'col-12',
        isSidebarVisible && 'open',
      )}
      lg={{ size: 2 }}
      md={{ size: 3 }}
    >
      <SidebarMainNavbar />
      <SidebarSearch />
      <SidebarNavItems />
    </Col>
  );
};

export default MainSidebar;
