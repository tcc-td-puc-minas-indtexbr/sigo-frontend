import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

const UserActions: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const toggleUserActions = () => setVisible(!visible);

  return (
    <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
      <DropdownToggle caret tag={NavLink} className="text-nowrap px-3" style={{ cursor: "pointer" }}>
        <img
          className="user-avatar rounded-circle mr-2"
          src="https://github.com/allyssonm.png"
          alt="User Avatar"
        />{" "}
        <span className="d-none d-md-inline-block">Sierra Brooks</span>
      </DropdownToggle>
      <Collapse tag={DropdownMenu} right small open={visible} style={{ cursor: "pointer" }}>
        <DropdownItem tag={Link} to="user-profile">
          <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
        <DropdownItem tag={Link} to="edit-user-profile">
          <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem>
        <DropdownItem tag={Link} to="file-manager-list">
          <i className="material-icons">&#xE2C7;</i> Files
          </DropdownItem>
        <DropdownItem tag={Link} to="transaction-history">
          <i className="material-icons">&#xE896;</i> Transactions
          </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to="/" className="text-danger">
          <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
      </Collapse>
    </NavItem>
  );
};

export default UserActions;
