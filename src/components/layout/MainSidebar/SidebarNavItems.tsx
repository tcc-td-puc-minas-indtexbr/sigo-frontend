import SidebarNavItem from "./SidebarNavItem";
import React from "react";
import { RoutesPath } from "routes/constants";
import { Nav } from "shards-react";

const menu = [
  {
    title: "Gestão de Normas",
    to: RoutesPath.standard.index,
    htmlBefore: '<i class="material-icons">table_chart</i>',
    htmlAfter: "",
  },
  {
    title: "Consultorias e Assessorias",
    to: RoutesPath.consultancy.index,
    htmlBefore: '<i class="material-icons">table_view</i>',
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
