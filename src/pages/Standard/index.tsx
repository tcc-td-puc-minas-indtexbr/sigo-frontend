import React from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "shards-react";

import PageTitle from 'components/common/PageTitle';
import Table from './table';
import makeData from './makeData';

const Foo: React.FC = () => {

  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Visits',
        accessor: 'visits',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress',
      },
    ],
    []
  )

  const data = React.useMemo(() => makeData(1000), [])

  return (
    <>
      <Row noGutters className="page-header py-4">
        <PageTitle title="Gestão de Normas" subtitle="" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <Button className="mb-0 mr-1">
                Adicionar Norma
              </Button>
            </CardHeader>
            <Col>
              <CardBody className="p-0 py-3" style={{ overflow: 'auto' }}>
                <Table columns={columns} data={data} />
              </CardBody>
            </Col>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Foo;