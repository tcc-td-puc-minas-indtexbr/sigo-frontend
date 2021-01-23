import React from "react";
import classNames from "classnames";
import { Container, Navbar } from "shards-react";

import NavbarSearch from "./NavbarSearch";
import NavbarNav from "./NavbarNav";
import NavbarToggle from "./NavbarToggle";

const MainNavbar: React.FC = () => {
  return (
    <div className={classNames(
      "main-navbar",
      "bg-white",
      "sticky-top"
    )}>
      <Container fluid className="p-0">
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
          <NavbarSearch />
          <NavbarNav />
          <NavbarToggle />
        </Navbar>
      </Container>
    </div>
  );
};

export default MainNavbar;
