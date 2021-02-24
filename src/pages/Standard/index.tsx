import { columnsConfig } from "./config";
import { standardTestData } from "./makeData";
import PageTitle from "components/common/PageTitle";
import Table from "components/datatable";
import Spinner from "components/spinner";
import StandardDto from "models/StandardDto";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RoutesPath } from "routes/constants";
import StandardService from "services/StandardService";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

export default function Standard() {
  const history = useHistory();
  const [data, setData] = useState<StandardDto[]>([]);
  const [loading, setLoading] = useState(true); //TODO: Improve loading when we have an API

  const columns = React.useMemo(() => columnsConfig, []);
  const standardService = React.useMemo(() => new StandardService(standardTestData), []);

  useEffect(() => {
    async function getData() {
      const response = await standardService.GetAll();
      setData(response.data);
      setLoading(false);
    }

    getData();
  }, []);

  const navigateToStandard = useCallback((standardDto: StandardDto) => {
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
                    "No data found"
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
