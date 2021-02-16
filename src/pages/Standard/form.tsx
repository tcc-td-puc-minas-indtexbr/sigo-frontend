import PageTitle from "components/common/PageTitle";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormSelect,
  Button,
  Card,
  CardBody,
} from "shards-react";

const StandardForm: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Gestão de Normas"
          subtitle="Adicionar nova norma"
          className="text-sm-left"
        />
      </Row>

      <Card small className="mb-4">
        <Col>
          <CardBody className="p-0 py-3">
            <ListGroup flush>
              <ListGroupItem className="p-0">
                <Row>
                  <Col>
                    <Form>
                      <Row form>
                        <Col md="4" className="form-group">
                          <label htmlFor="feIdentification">Identification</label>
                          <FormInput
                            id="feIdentification"
                            type="text"
                            placeholder="Identification"
                          />
                        </Col>
                        <Col md="4" className="form-group">
                          <label htmlFor="fePublishDate">Publish Date</label>
                          <FormInput id="fePublishDate" type="text" placeholder="Publish Date" />
                        </Col>
                        <Col md="4" className="form-group">
                          <label htmlFor="feValidityStart">Validity Start</label>
                          <FormInput
                            id="feValidityStart"
                            type="text"
                            placeholder="Validity Start"
                          />
                        </Col>
                      </Row>
                      <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="feTitle">Title</label>
                          <FormInput id="feTitle" placeholder="Title" />
                        </Col>

                        <Col md="6" className="form-group">
                          <label htmlFor="feGlobalTitleLanguage">Global Title Language</label>
                          <FormInput
                            id="feGlobalTitleLanguage"
                            placeholder="Global Title Language"
                          />
                        </Col>
                      </Row>
                      <Row form>
                        <Col md="4" className="form-group">
                          <label htmlFor="feInputCity">Comite</label>
                          <FormInput id="feInputCity" />
                        </Col>
                        <Col md="4" className="form-group">
                          <label htmlFor="feInputCity">Objective</label>
                          <FormInput id="feInputCity" />
                        </Col>
                        <Col md="2" className="form-group">
                          <label htmlFor="feInputZip">Pages</label>
                          <FormInput id="feInputZip" />
                        </Col>
                        <Col md="2" className="form-group">
                          <label htmlFor="feInputState">Status</label>
                          <FormSelect id="feInputState">
                            <option>Choose...</option>
                            <option>...</option>
                          </FormSelect>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md="3" className="form-group">
                          <label htmlFor="feInputZip">Organization</label>
                          <FormInput id="feInputZip" />
                        </Col>
                        <Col md="3" className="form-group">
                          <label htmlFor="feInputCity">Language</label>
                          <FormInput id="feInputCity" />
                        </Col>
                        <Col md="3" className="form-group">
                          <label htmlFor="feInputCity">Price</label>
                          <FormInput id="feInputCity" />
                        </Col>
                        <Col md="3" className="form-group">
                          <label htmlFor="feInputCity">Currency</label>
                          <FormInput id="feInputCity" />
                        </Col>
                      </Row>
                      <Button type="submit">Criar</Button>
                      <Button
                        className="ml-2"
                        type="button"
                        theme="white"
                        onClick={() => history.goBack()}
                      >
                        Cancelar
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </Col>
      </Card>
    </>
  );
};

export default StandardForm;
