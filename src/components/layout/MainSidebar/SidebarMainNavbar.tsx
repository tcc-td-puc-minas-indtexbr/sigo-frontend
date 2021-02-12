import React, { useContext } from 'react';
import { Navbar, NavbarBrand } from 'shards-react';
import AppContext from '../../../store/AppContext';

const SidebarMainNavbar: React.FC = () => {
  const { isSidebarVisible, toggleSidebar } = useContext(AppContext);

  return (
    <div className="main-navbar">
      <Navbar
        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
        type="light"
      >
        <NavbarBrand
          className="w-100 mr-0"
          href="#"
          style={{ lineHeight: '25px' }}
        >
          <div className="d-table m-auto">
            <img
              id="main-logo"
              className="d-inline-block align-top mr-1"
              style={{ maxWidth: '25px' }}
              src="https://designrevision.com/demo/shards-dashboard-lite-react/static/media/shards-dashboards-logo.60a85991.svg"
              alt="Shards Dashboard"
            />
            {!isSidebarVisible && (
              <span className="d-none d-md-inline ml-1">
                SIGO Bem Caminhoneiro
              </span>
            )}
          </div>
        </NavbarBrand>
        {/* eslint-disable-next-line */}
        <a
          href="#"
          className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
          onClick={toggleSidebar}
        >
          <i className="material-icons">&#xE5C4;</i>
        </a>
      </Navbar>
    </div>
  );
};

export default SidebarMainNavbar;
