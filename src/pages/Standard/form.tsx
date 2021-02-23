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
                            <label htmlFor="feIdentification">Identificação</label>
                            <FormInput
                              id="feIdentification"
                              type="text"
                              placeholder="Identificação"
                              value={formData.identification}
                              onChange={(e: any) =>
                                setFormData({ ...formData, identification: e.target.value })
                              }
                            />
                          </Col>
                          <Col md="4" className="form-group">
                            <label htmlFor="fePublishDate">Data de Publicação</label>
                            <FormInput
                              id="fePublishDate"
                              type="text"
                              placeholder="Data de Publicação"
                              value={formData.publication_date}
                              onChange={(e: any) =>
                                setFormData({ ...formData, publication_date: e.target.value })
                              }
                            />
                          </Col>
                          <Col md="4" className="form-group">
                            <label htmlFor="feValidityStart">Data de Válidade</label>
                            <FormInput
                              id="feValidityStart"
                              type="text"
                              placeholder="Data de Válidade"
                              value={formData.validity_start}
                              onChange={(e: any) =>
                                setFormData({ ...formData, validity_start: e.target.value })
                              }
                            />
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="6" className="form-group">
                            <label htmlFor="feTitle">Título</label>
                            <FormInput
                              id="feTitle"
                              placeholder="Título"
                              value={formData.title}
                              onChange={(e: any) =>
                                setFormData({ ...formData, title: e.target.value })
                              }
                            />
                          </Col>

                          <Col md="6" className="form-group">
                            <label htmlFor="feGlobalTitleLanguage">Título Global</label>
                            <FormInput
                              id="feGlobalTitleLanguage"
                              placeholder="Título Global"
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
                            <label htmlFor="feComite">Comitê</label>
                            <FormInput
                              id="feComite"
                              placeholder="Comitê"
                              value={formData.comite}
                              onChange={(e: any) =>
                                setFormData({ ...formData, comite: e.target.value })
                              }
                            />
                          </Col>
                          <Col md="4" className="form-group">
                            <label htmlFor="feObjective">Objetivo</label>
                            <FormInput
                              id="feObjective"
                              placeholder="Objetivo"
                              value={formData.objective}
                              onChange={(e: any) =>
                                setFormData({ ...formData, objective: e.target.value })
                              }
                            />
                          </Col>
                          <Col md="2" className="form-group">
                            <label htmlFor="fePages">Páginas</label>
                            <FormInput
                              id="fePages"
                              placeholder="Páginas"
                              value={formData.pages}
                              type="number"
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
                              <option>XPTÓ</option>
                            </FormSelect>
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="3" className="form-group">
                            <label htmlFor="feOrganization">Organização</label>
                            <FormInput
                              id="feOrganization"
                              placeholder="Organização"
                              value={formData.organization}
                              onChange={(e: any) =>
                                setFormData({ ...formData, organization: e.target.value })
                              }
                            />
                          </Col>
                          <Col md="3" className="form-group">
                            <label htmlFor="feLanguage">Idioma</label>
                            <FormInput
                              id="feLanguage"
                              placeholder="Idioma"
                              value={formData.language}
                              onChange={(e: any) =>
                                setFormData({ ...formData, language: e.target.value })
                              }
                            />
                          </Col>
                          <Col md="3" className="form-group">
                            <label htmlFor="fePrice">Preço</label>
                            <FormInput
                              id="fePrice"
                              placeholder="Preço"
                              value={formData.price}
                              onChange={(e: any) =>
                                setFormData({ ...formData, price: e.target.value })
                              }
                            />
                          </Col>
                          <Col md="3" className="form-group">
                            <label htmlFor="feCurrency">Moeda</label>
                            <FormSelect id="feCurrency">
                              <option>BRL</option>
                              <option>USD</option>
                              <option>EUR</option>
                              <option>PLN</option>
                            </FormSelect>
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
