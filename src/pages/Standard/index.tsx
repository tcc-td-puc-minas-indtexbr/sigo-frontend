import { columnsConfig } from "./config";
import PageTitle from "components/common/PageTitle";
import Table from "components/datatable";
import { Spinner } from "components/spinner";
import { StandardModel } from "models/Standard";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RoutesPath } from "routes/constants";
import StandardService from "services/StandardService";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

export default function Standard() {
  const history = useHistory();
  const [data, setData] = useState<StandardModel[]>([]);
  const [loading, setLoading] = useState(true);

  const columns = React.useMemo(() => columnsConfig, []);
  const standardService = React.useMemo(() => new StandardService(), []);

  useEffect(() => {
    let isSubscribed = true;

    async function getData() {
      const response = await standardService.getAll();

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

  const navigateToStandard = useCallback((standardDto: StandardModel) => {
    history.push(`${RoutesPath.standard.form}/${standardDto.uuid}`);
  }, []);

  return (
    <>
      <Row noGutters className="page-header py-4">
        <PageTitle title="Gestão de Normas" subtitle="" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <Button className="mb-0 mr-1" onClick={() => history.push(RoutesPath.standard.form)}>
                Adicionar
              </Button>
            </CardHeader>
            <Col>
              <CardBody className="p-0 py-3" style={{ overflow: "auto" }}>
                <div style={{ textAlign: "center" }}>
                  {loading ? (
                    <Spinner />
                  ) : data.length > 0 ? (
                    <Table columns={columns} data={data} getTrProps={navigateToStandard} />
                  ) : (
                    "Não há normas cadastradas"
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
