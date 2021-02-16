import PageTitle from "components/common/PageTitle";
import React from "react";
import { Row } from "shards-react";

const Home: React.FC = () => (
  <Row noGutters className="page-header py-4">
    <PageTitle title="Bem vindo!" subtitle="" className="text-sm-left" />
  </Row>
);

export default Home;
