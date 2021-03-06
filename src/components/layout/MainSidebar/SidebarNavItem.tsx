import React, { useContext } from "react";
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavItem, NavLink } from "shards-react";
import AppContext from "store/AppContext";

type NavItemProps = {
  title: string;
  to: string;
  htmlBefore?: string;
  htmlAfter?: string;
};

const SidebarNavItem: React.FC<{ item: NavItemProps }> = ({ item }) => {
  const { toggleSidebar } = useContext(AppContext);

  return (
    <NavItem>
      <NavLink tag={RouteNavLink} to={item.to} onClick={() => toggleSidebar(false)}>
        {item.htmlBefore && (
          <div
            className="d-inline-block item-icon-wrapper"
            dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
          />
        )}
        {item.title && <span>{item.title}</span>}
        {item.htmlAfter && (
          <div
            className="d-inline-block item-icon-wrapper"
            dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
          />
        )}
      </NavLink>
    </NavItem>
  );
};

export default SidebarNavItem;
