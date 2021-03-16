import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
} from "shards-react";
import AuthContext from "store/AuthContext";

const UserActions: React.FC = () => {
  const { logout, user } = useContext(AuthContext);
  const history = useHistory();
  const [visible, setVisible] = useState(false);

  const toggleUserActions = () => setVisible(!visible);

  const signout = () => {
    logout();
    history.push("/login");
  };

  return (
    <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
      <DropdownToggle
        caret
        tag={NavLink}
        className="text-nowrap px-3"
        style={{ cursor: "pointer" }}
      >
        <img
          className="user-avatar rounded-circle mr-2"
          src="https://capenetworks.com/static/images/testimonials/user-icon.svg"
          alt="User Avatar"
        />{" "}
        <span className="d-none d-md-inline-block">{user.name}</span>
      </DropdownToggle>
      <Collapse tag={DropdownMenu} right small open={visible} style={{ cursor: "pointer" }}>
        <DropdownItem onClick={signout} className="text-danger">
          <i className="material-icons text-danger">&#xE879;</i> Encerrar sessão
        </DropdownItem>
      </Collapse>
    </NavItem>
  );
};

export default UserActions;
