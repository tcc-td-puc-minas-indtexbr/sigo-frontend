import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardSubtitle,
  CardBody,
  Button,
  Form,
  FormInput,
  FormGroup
} from "shards-react";

const Login = () => {
  return (
    <Container fluid>
      <Row className="vh-100">
        <Col
          className="mx-auto my-auto"
          lg={{ size: 10 }}
          md={{ size: 9 }}
          sm="12"
          tag="main"
        >
          <Card style={{ maxWidth: "300px" }} className="mx-auto">
            <CardBody>
              <Col className="text-center pb-3">
                <h4 className="pb-2">SIGO</h4>
                <CardSubtitle>Acesse sua conta</CardSubtitle>
              </Col>
              <Form>
                <FormGroup>
                  <label htmlFor="#username">Nome de usuário</label>
                  <FormInput id="#username" placeholder="Nome de usuário" />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="#password">Senha</label>
                  <FormInput type="password" id="#password" placeholder="Senha" />
                </FormGroup>
              </Form>
              <Col className="text-center pt-2">
                <Button pill>Acessar conta</Button>
              </Col>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
