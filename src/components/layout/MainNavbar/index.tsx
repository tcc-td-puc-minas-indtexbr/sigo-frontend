import NavbarNav from "./NavbarNav";
import NavbarSearch from "./NavbarSearch";
import NavbarToggle from "./NavbarToggle";
import classNames from "classnames";
import React from "react";
import { Container, Navbar } from "shards-react";

const MainNavbar: React.FC = () => {
  return (
    <div className={classNames("main-navbar", "bg-white", "sticky-top")}>
      <Container fluid className="p-0">
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
          <NavbarToggle />
          <NavbarNav />
        </Navbar>
      </Container>
    </div>
  );
};

export default MainNavbar;
