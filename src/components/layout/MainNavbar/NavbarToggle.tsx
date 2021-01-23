import React, { useContext } from "react";
import AppContext from '../../../store/AppContext';

const NavbarToggle: React.FC = () => {
  const { toggleSidebar } = useContext(AppContext);

  return (
    <nav className="nav">
      <a href="#" onClick={toggleSidebar} className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center">
        <i className="material-icons">&#xE5D2;</i>
      </a>
    </nav>
  );
}

export default NavbarToggle;
