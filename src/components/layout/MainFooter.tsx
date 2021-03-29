import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Nav, NavItem, NavLink } from "shards-react";

const menuItems = [
  {
    title: "Inicio",
    to: "/",
  },
];

const MainFooter: React.FC = () => (
  <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
    <Container fluid={false}>
      <Row>
        <Nav>
          {menuItems.map((item, idx) => (
            <NavItem key={idx}>
              <NavLink tag={Link} to={item.to}>
                {item.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <span className="copyright ml-auto my-auto mr-2">
          Direitos reservados © {new Date().getFullYear()} IndTexBr
        </span>
      </Row>
    </Container>
  </footer>
);

export default MainFooter;
