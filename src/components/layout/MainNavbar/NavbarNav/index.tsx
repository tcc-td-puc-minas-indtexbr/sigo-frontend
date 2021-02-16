import Notifications from "./Notifications";
import UserActions from "./UserActions";
import React from "react";
import { Nav } from "shards-react";

const NavbarNav: React.FC = () => (
  <Nav navbar className="border-left flex-row">
    <Notifications />
    <UserActions />
  </Nav>
);

export default NavbarNav;
