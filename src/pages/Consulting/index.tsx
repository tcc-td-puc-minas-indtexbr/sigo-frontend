import { columnsConfig } from "./config";
import PageTitle from "components/common/PageTitle";
import Table from "components/datatable";
import { Spinner } from "components/spinner";
import { ConsultingModel } from "models/Consulting";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { RoutesPath } from "routes/constants";
import ConsultingService from "services/ConsultingService";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

export default function Consulting() {
  const history = useHistory();
  const [data, setData] = useState<ConsultingModel[]>([]);
  const [loading, setLoading] = useState(true); //TODO: Improve loading when we have an API

  const consultingService = useMemo(() => new ConsultingService(), []);
  const columns = React.useMemo(() => columnsConfig, []);

  useEffect(() => {
    async function getData() {
      const response = await consultingService.getAll();
      setData(response);
      setLoading(false);
    }

    getData();
  }, []);

  const navigateToConsultancy = useCallback((consultingDto: ConsultingModel) => {
    history.push(`${RoutesPath.consulting.form}/${consultingDto.uuid}`);
  }, []);

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
              <CardBody className="p-0 py-3" style={{ overflow: "auto" }}>
                <div style={{ textAlign: "center" }}>
                  {loading ? (
                    <Spinner />
                  ) : data.length > 0 ? (
                    <Table columns={columns} data={data} getTrProps={navigateToConsultancy} />
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
