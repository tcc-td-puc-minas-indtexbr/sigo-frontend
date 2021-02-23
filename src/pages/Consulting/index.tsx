import PageTitle from "components/common/PageTitle";
import React from "react";
import { useHistory } from "react-router-dom";
import { RoutesPath } from "routes/constants";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

const Consultancy: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <Row noGutters className="page-header py-4">
        <PageTitle title="Consultorias e Assessorias" subtitle="" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <Button
                className="mb-0 mr-1"
                onClick={() => history.push(RoutesPath.consulting.form)}
              >
                Adicionar
              </Button>
            </CardHeader>
            <Col>
              <CardBody className="p-0 pb-3" styles={{ overflow: "auto" }}>
                Consultorias e Assessorias
              </CardBody>
            </Col>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Consultancy;
