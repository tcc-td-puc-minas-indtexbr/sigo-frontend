import PageTitle from "components/common/PageTitle";
import React from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

const Xpto: React.FC = () => {
  return (
    <>
      <Row noGutters className="page-header py-4">
        <PageTitle title="Gestão de Normas" subtitle="" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <Button className="mb-0 mr-1">Adicionar Norma</Button>
            </CardHeader>
            <Col>
              <CardBody className="p-0 pb-3" styles={{ overflow: "auto" }}>
                XPTO
              </CardBody>
            </Col>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Xpto;
