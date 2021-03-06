import MainFooter from "./MainFooter";
import MainNavbar from "./MainNavbar";
import MainSidebar from "./MainSidebar";
import { ReactNodeLike } from "prop-types";
import React from "react";
import { Container, Row, Col } from "shards-react";

type LayoutProps = {
  children?: ReactNodeLike;
};

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
        <MainNavbar />
        <Container className="main-content-container px-4" fluid>
          {children}
        </Container>
        <MainFooter />
      </Col>
    </Row>
  </Container>
);

export default Layout;
