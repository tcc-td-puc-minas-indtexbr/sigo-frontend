import SidebarNavItem from "./SidebarNavItem";
import React from "react";
import { Nav } from "shards-react";

const menu = [
  {
    title: "Gestão de Normas",
    to: "/standard",
    htmlBefore: '<i class="material-icons">table_chart</i>',
    htmlAfter: "",
  },
  {
    title: "Blog Posts",
    to: "/blog-posts",
    htmlBefore: '<i class="material-icons">vertical_split</i>',
  },
];

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
};

export default SidebarNavItems;
