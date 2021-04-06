import { columnsConfig } from "./config";
import PageTitle from "components/common/PageTitle";
import Table from "components/datatable";
import { Spinner } from "components/spinner";
import { StandardUpdateModel } from "models/StandardUpdate";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RoutesPath } from "routes/constants";
import StandardUpdateService from "services/StandardUpdateService";

import { Row, Col, Button, Card, CardBody, CardHeader, Alert } from "shards-react";

export default function StandardUpdateCheck() {
  const history = useHistory();
  const [data, setData] = useState<StandardUpdateModel[]>([]);

  const standardUpdateService = React.useMemo(() => new StandardUpdateService(), []);
  const [alertVisibility, setAlertVisibility] = useState(false);

  const columns = React.useMemo(() => columnsConfig, []);

  const [loading, setLoading] = useState(true);

  const navigateToStandardUpdate = useCallback((standardDto: StandardUpdateModel) => {
    history.push(`${RoutesPath.standardUpdate.form}/${standardDto.uuid}`);
  }, []);

  useEffect(() => {
    async function getData() {
      const response = await standardUpdateService.checkUpdates();
      setData(response);
      setLoading(false);
      setAlertVisibility(true);
    }

    getData();
  }, []);

  return (
    <>
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Gestão de Normas - Pesquisar por novas atualizações"
          subtitle={`Sincronizar norma`}
          className="text-sm-left"
        />
      </Row>
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <Button className="ml-2" type="button" theme="white" onClick={() => history.goBack()}>
                Voltar
              </Button>
            </CardHeader>
            <Col>
              <CardBody className="p-0 py-3" style={{ overflow: "auto" }}>
                <div style={{ textAlign: "center" }}>
                  {loading ? (
                    <Spinner />
                  ) : data.length >= 0 ? (
                    <>
                      <Alert
                        theme="info"
                        dismissible={() => setAlertVisibility(false)}
                        open={alertVisibility}
                      >
                        As atualizações de norma abaixo foram importadas com sucesso!
                      </Alert>
                      <Table columns={columns} data={data} getTrProps={navigateToStandardUpdate} />
                    </>
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
