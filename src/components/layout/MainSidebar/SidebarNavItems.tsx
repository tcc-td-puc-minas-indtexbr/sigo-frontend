import React from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";

const menu = [{
  title: "Blog Dashboard",
  to: "/blog-overview",
  htmlBefore: '<i class="material-icons">edit</i>',
  htmlAfter: ""
},
{
  title: "Blog Posts",
  to: "/blog-posts",
  htmlBefore: '<i class="material-icons">vertical_split</i>',
}];

const SidebarNavItems: React.FC = () => {
  return (
    <div className="nav-wrapper">
      <Nav className="nav--no-borders flex-column">
        {menu.map((item, idx) => (
          <SidebarNavItem key={idx} item={item} />
        ))}
      </Nav>
    </div>
  );
}

export default SidebarNavItems;
