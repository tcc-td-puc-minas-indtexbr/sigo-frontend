import SidebarNavItem from "./SidebarNavItem";
import { UserModel } from "models/User";
import React from "react";
import { RoutesPath } from "routes/constants";
import { Nav } from "shards-react";

type Menu = {
  title: string;
  to: string;
  htmlBefore: string;
  htmlAfter: string;
  rolesPermited: string[];
};

const menu = [
  {
    title: "Gestão de Normas",
    to: RoutesPath.standard.index,
    htmlBefore: '<i class="material-icons">table_chart</i>',
    htmlAfter: "",
    rolesPermited: ["standard", "admin"],
  },
  {
    title: "Gestão de Normas - Atualizações",
    to: RoutesPath.standardUpdate.index,
    htmlBefore: '<i class="material-icons">system_update</i>',
    htmlAfter: "",
    rolesPermited: ["standard", "admin"],
  },
  {
    title: "Consultorias e Assessorias",
    to: RoutesPath.consulting.index,
    htmlBefore: '<i class="material-icons">table_view</i>',
    htmlAfter: "",
    rolesPermited: ["consulting", "admin"],
  },
];

const SidebarNavItems: React.FC<{ user: UserModel }> = ({ user }) => {
  function filterByRoles({ rolesPermited }: Menu) {
    return rolesPermited.some((item) => user.roles.includes(item));
  }

  return (
    <div className="nav-wrapper">
      <Nav className="nav--no-borders flex-column">
        {menu.filter(filterByRoles).map((item, idx) => (
          <SidebarNavItem key={idx} item={item} />
        ))}
      </Nav>
    </div>
  );
};

export default SidebarNavItems;
