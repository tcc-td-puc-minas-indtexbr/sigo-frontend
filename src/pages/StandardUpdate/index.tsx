import { columnsConfig } from "./config";
import PageTitle from "components/common/PageTitle";
import Table from "components/datatable";
import { Spinner } from "components/spinner";
import { StandardUpdateModel } from "models/StandardUpdate";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RoutesPath } from "routes/constants";
import StandardUpdateService from "services/StandardUpdateService";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

export default function StandardUpdate() {
  const history = useHistory();
  const [data, setData] = useState<StandardUpdateModel[]>([]);
  const [loading, setLoading] = useState(true);

  const columns = React.useMemo(() => columnsConfig, []);
  const standardUpdateService = React.useMemo(() => new StandardUpdateService(), []);

  useEffect(() => {
    let isSubscribed = true;

    async function getData() {
      const response = await standardUpdateService
        .getAll()
        .then((response) => response.filter((x) => x.synchronized === false));

      if (isSubscribed) {
        setData(response);
        setLoading(false);
      }
    }

    getData();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <>
      <Row noGutters className="page-header py-4">
        <PageTitle title="Gestão de Normas - Atualizações" subtitle="" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <Button
                className="mb-0 mr-1"
                onClick={() => history.push(RoutesPath.standardUpdate.check)}
              >
                Pesquisar por novas atualizações
              </Button>
            </CardHeader>
            <Col>
              <CardBody className="p-0 py-3" style={{ overflow: "auto" }}>
                <div style={{ textAlign: "center" }}>
                  {loading ? (
                    <Spinner />
                  ) : data.length > 0 ? (
                    <Table columns={columns} data={data} getTrProps={() => ({})} />
                  ) : (
                    "Não há atualizações disponíveis"
                  )}
                </div>
              </CardBody>
            </Col>
          </Card>
        </Col>
      </Row>
    </>
  );
}
