import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarNavItems from "./SidebarNavItems";
import SidebarSearch from "./SidebarSearch";
import AppContext from "../../../store/AppContext";
import classNames from "classnames";
import React, { useContext } from "react";
import { Col } from "shards-react";
import AuthContext from "store/AuthContext";

const MainSidebar: React.FC = () => {
  const { isSidebarVisible } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  if (user.name === "") return <></>;

  return (
    <Col
      tag="aside"
      className={classNames("main-sidebar", "px-0", "col-12", isSidebarVisible && "open")}
      lg={{ size: 2 }}
      md={{ size: 3 }}
    >
      <SidebarMainNavbar />
      <SidebarNavItems user={user} />
    </Col>
  );
};

export default MainSidebar;
