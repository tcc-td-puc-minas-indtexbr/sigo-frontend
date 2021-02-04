import React from 'react';
import { MDBDataTable } from 'mdbreact';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "shards-react";

import { columnsConfig } from './standard-config';
import { data } from './data';
import PageTitle from 'components/common/PageTitle';

const Foo: React.FC = () => {
  const treta = data;
  return (
    <>
      <Row noGutters className="page-header py-4">
        <PageTitle title="Gestão de Normas" subtitle="" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <Button className="mb-2 mr-1">
                Adicionar Norma
              </Button>              
            </CardHeader>
            <Col>
              <CardBody className="p-0 pb-3">
                <MDBDataTable
                  className="table-responsive-md"
                  striped
                  bordered
                  hover
                  data={{
                    columns: columnsConfig,
                    data: [{ identification: "asasas" }]
                  }}
                />
              </CardBody>
            </Col>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Foo;