import PageTitle from "components/common/PageTitle";
import Table from "components/datatable";
import Spinner from "components/spinner";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import StandardService from "services/StandardService";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

const _standardService = new StandardService();
const Standard: React.FC = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); //TODO: Improve loading when we have an API

  const columns = React.useMemo(
    () => [
      {
        Header: "Identification",
        accessor: "identification",
      },
      {
        Header: "Publish Date",
        accessor: "publication_date",
      },
      {
        Header: "Validity Start",
        accessor: "validity_start",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Global Title Language",
        accessor: "title_global_language",
      },
      {
        Header: "Comite",
        accessor: "comite",
      },
      {
        Header: "Pages",
        accessor: "pages",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Language",
        accessor: "language",
      },
      {
        Header: "Organization",
        accessor: "organization",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Currency",
        accessor: "currency",
      },
      {
        Header: "Objective",
        accessor: "objective",
      },
    ],
    [],
  );

  useEffect(() => {
    async function getData() {
      const response = await _standardService.GetAll();
      setData(response.data);
      setLoading(false);
    }

    getData();
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
              <Button className="mb-0 mr-1" onClick={() => history.push("/standard-form")}>
                Adicionar Norma
              </Button>
            </CardHeader>
            <Col>
              <CardBody className="p-0 py-3" style={{ overflow: "auto" }}>
                {/* TODO: Make a better alignment component */}
                <div style={{ textAlign: "center" }}>
                  {loading ? (
                    <Spinner />
                  ) : data.length > 0 ? (
                    <Table columns={columns} data={data} />
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
};

export default Standard;
