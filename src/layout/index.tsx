import React from "react";
import { ReactNodeLike } from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar";
import MainFooter from "../components/layout/MainFooter";

type LayoutProps = {
  children?: ReactNodeLike
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Container fluid>
    <Row>
      <MainSidebar />
      <Col
        className="main-content p-0"
        lg={{ size: 10, offset: 2 }}
        md={{ size: 9, offset: 3 }}
        sm="12"
        tag="main"
      >
        {/* <MainNavbar /> */}
        {children}
        {/* <MainFooter /> */}
      </Col>
    </Row>
  </Container>
);

export default Layout;
