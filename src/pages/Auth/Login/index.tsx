import React, { useContext, useState } from 'react';
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
  FormGroup,
  FormFeedback,
} from "shards-react";
import Spinner from '../../../components/spinner';
import AuthContext from '../../../store/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  
  const [isLoading, setIsloading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const setEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, email: e.target.value });

  const setPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, password: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsloading(true);

    const isLoginSuccess = await login(form);

    if (!isLoginSuccess) {
      setIsInvalid(true);
    }

    setIsloading(false);
  };

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
              <Form onSubmit={onSubmit}>
                <FormGroup>
                  <label htmlFor="#email">Email</label>
                  <FormInput
                    autoComplete="email"
                    id="#email"
                    placeholder="Email"
                    onChange={setEmail}
                    required
                    invalid={isInvalid} />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="#password">Senha</label>
                  <FormInput
                    autoComplete="current-password"
                    type="password"
                    id="#password"
                    placeholder="Senha"
                    onChange={setPassword}
                    required
                    invalid={isInvalid} />
                  <FormFeedback>Email ou senha incorretos.</FormFeedback>
                </FormGroup>
                <Col className="text-center pt-2">
                  {
                    isLoading ? <Spinner /> : <Button type="submit" pill>Acessar conta</Button>
                  }
                </Col>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
