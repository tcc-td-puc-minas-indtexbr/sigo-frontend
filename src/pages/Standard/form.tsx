import { standardTestData } from "./makeData";
import PageTitle from "components/common/PageTitle";
import Spinner from "components/spinner";
import StandardDto, { emptyStandardDto } from "models/StandardDto";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import StandardService from "services/StandardService";
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
  const { uuid } = useParams<{ uuid?: string }>();
  const isEditingMode = uuid !== undefined;
  const standardService = React.useMemo(() => new StandardService(standardTestData), []);
  const [formData, setFormData] = useState<StandardDto>(emptyStandardDto);
  const [loading, setLoading] = useState(true); //TODO: fix this shit loading and div center inside loading statement

  useEffect(() => {
    async function getStandard() {
      if (uuid !== undefined) {
        const response = await standardService.GetByUuid(uuid);
        setFormData(response ?? emptyStandardDto);
      }

      setLoading(false);
    }

    getStandard();
  }, []);

  return (
    <>
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Gestão de Normas"
          subtitle={`${isEditingMode ? "Editar" : "Adicionar"} norma`}
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
                    {loading ? (
                      <div style={{ textAlign: "center" }}>
                        <Spinner />
                      </div>
                    ) : (
                      <Form>
                        <Row form>
                          <Col md="4" className="form-group">
                            <label htmlFor="feIdentification">Identification</label>
                            <FormInput
                              id="feIdentification"
                              type="text"
                              placeholder="Identification"
                              value={formData.identification}
                              onChange={(e: any) =>
                                setFormData({ ...formData, identification: e.target.value })
                              }
                            />
                          </Col>
                          <Col md="4" className="form-group">
                            <label htmlFor="fePublishDate">Publish Date</label>
                            <FormInput
                              id="fePublishDate"
                              type="text"
                              placeholder="Publish Date"
                              value={formData.publication_date}
                              onChange={(e: any) =>
                                setFormData({ ...formData, publication_date: e.target.value })
                              }
                            />
                          </Col>
                          <Col md="4" className="form-group">
                            <label htmlFor="feValidityStart">Validity Start</label>
                            <FormInput
                              id="feValidityStart"
                              type="text"
                              placeholder="Validity Start"
                              value={formData.validity_start}
                              onChange={(e: any) =>
                                setFormData({ ...formData, validity_start: e.target.value })
                              }
                            />
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="6" className="form-group">
                            <label htmlFor="feTitle">Title</label>
                            <FormInput
                              id="feTitle"
                              placeholder="Title"
                              value={formData.title}
                              onChange={(e: any) =>
                                setFormData({ ...formData, title: e.target.value })
                              }
                            />
                          </Col>

                          <Col md="6" className="form-group">
                            <label htmlFor="feGlobalTitleLanguage">Global Title Language</label>
                            <FormInput
                              id="feGlobalTitleLanguage"
                              placeholder="Global Title Language"
                              value={formData.title_global_language}
                              onChange={(e: any) =>
                                setFormData({
                                  ...formData,
                                  title_global_language: e.target.value,
                                })
                              }
                            />
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="4" className="form-group">
                            <label htmlFor="feComite">Comite</label>
                            <FormInput
                              id="feComite"
                              value={formData.comite}
                              onChange={(e: any) =>
                                setFormData({ ...formData, comite: e.target.value })
                              }
                            />
                          </Col>
                          <Col md="4" className="form-group">
                            <label htmlFor="feObjective">Objective</label>
                            <FormInput
                              id="feObjective"
                              value={formData.objective}
                              onChange={(e: any) =>
                                setFormData({ ...formData, objective: e.target.value })
                              }
                            />
                          </Col>
                          <Col md="2" className="form-group">
                            <label htmlFor="fePages">Pages</label>
                            <FormInput
                              id="fePages"
                              value={formData.pages}
                              onChange={(e: any) =>
                                setFormData({ ...formData, pages: e.target.value })
                              }
                            />
                          </Col>
                          <Col md="2" className="form-group">
                            <label htmlFor="feStatus">Status</label>
                            <FormSelect id="feStatus">
                              <option>Choose...</option>
                              <option>...</option>
                            </FormSelect>
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="3" className="form-group">
                            <label htmlFor="feOrganization">Organization</label>
                            <FormInput
                              id="feOrganization"
                              value={formData.organization}
                              onChange={(e: any) =>
                                setFormData({ ...formData, organization: e.target.value })
                              }
                            />
                          </Col>
                          <Col md="3" className="form-group">
                            <label htmlFor="feLanguage">Language</label>
                            <FormInput
                              id="feLanguage"
                              value={formData.language}
                              onChange={(e: any) =>
                                setFormData({ ...formData, language: e.target.value })
                              }
                            />
                          </Col>
                          <Col md="3" className="form-group">
                            <label htmlFor="fePrice">Price</label>
                            <FormInput
                              id="fePrice"
                              value={formData.price}
                              onChange={(e: any) =>
                                setFormData({ ...formData, price: e.target.value })
                              }
                            />
                          </Col>
                          <Col md="3" className="form-group">
                            <label htmlFor="feCurrency">Currency</label>
                            <FormInput
                              id="feCurrency"
                              value={formData.currency}
                              onChange={(e: any) =>
                                setFormData({ ...formData, currency: e.target.value })
                              }
                            />
                          </Col>
                        </Row>
                        <Button type="submit">{isEditingMode ? "Atualizar" : "Criar"}</Button>
                        {isEditingMode && (
                          <Button className="ml-2" type="button" theme="danger" outline>
                            Excluir
                          </Button>
                        )}
                        <Button
                          className="ml-2"
                          type="button"
                          theme="white"
                          onClick={() => history.goBack()}
                        >
                          Cancelar
                        </Button>
                      </Form>
                    )}
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
