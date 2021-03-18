import { Spinner } from "components/spinner";
import { emptyLoginRequest, LoginRequest } from "models/Request";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
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
import AuthContext from "store/AuthContext";

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const [isLoading, setIsloading] = useState(false);
  const { register, handleSubmit, errors, setError } = useForm<LoginRequest>({
    defaultValues: emptyLoginRequest,
  });

  async function onSubmit(model: LoginRequest) {
    setIsloading(true);

    const isLoginSuccess = await login(model)
      .then((response) => {
        if (!response) {
          setError("email", {});
          setError("password", {});
        }

        return response;
      })
      .finally(() => setIsloading(false));

    if (isLoginSuccess) {
      history.push("/");
    }
  }

  return (
    <Container fluid>
      <Row className="vh-100">
        <Col className="mx-auto my-auto" lg={{ size: 10 }} md={{ size: 9 }} sm="12" tag="main">
          <Card style={{ maxWidth: "300px" }} className="mx-auto">
            <CardBody>
              <Col className="text-center pb-3">
                <h4 className="pb-2">SIGO</h4>
                <CardSubtitle>Acesse sua conta</CardSubtitle>
              </Col>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                  <label htmlFor="email">Email</label>
                  <FormInput
                    id="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                    innerRef={register({ required: true })}
                    invalid={errors.email ? true : false}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="password">Senha</label>
                  <FormInput
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Senha"
                    autoComplete="current-password"
                    innerRef={register({ required: true })}
                    invalid={errors.password ? true : false}
                  />
                  <FormFeedback>Email ou senha incorretos.</FormFeedback>
                </FormGroup>
                <Col className="text-center pt-2">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <Button type="submit" pill>
                      Acessar conta
                    </Button>
                  )}
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
