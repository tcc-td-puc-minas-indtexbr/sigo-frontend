import PageTitle from "components/common/PageTitle";
import { Spinner } from "components/spinner";
import { StandardModel, emptyStandardModel } from "models/Standard";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
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
  DatePicker,
} from "shards-react";
import { DatePickerWrapper } from "shared/styles";

export default function StandardForm() {
  const history = useHistory();
  const { addToast } = useToasts();
  const { uuid } = useParams<{ uuid?: string }>();
  const isEditingMode = uuid !== undefined;

  const standardService = React.useMemo(() => new StandardService(), []);
  const [formData, setFormData] = useState<StandardModel>(emptyStandardModel);
  const [loading, setLoading] = useState({
    dataLoading: true,
    buttonsClicked: false,
  });

  const toogleButtonsClicked = (isClicked: boolean) =>
    setLoading({ ...loading, buttonsClicked: isClicked });

  useEffect(() => {
    async function loadStandard() {
      if (uuid !== undefined) {
        await standardService
          .get(uuid)
          .then((response) => setFormData(response))
          .catch((err) => {
            addToast("Não foi possível exibir o registro selecionado.", { appearance: "error" });
            history.goBack();
          });
      }

      setLoading({ ...loading, dataLoading: false });
    }

    loadStandard();
  }, []);

  async function submitForm(e: SyntheticEvent) {
    e.preventDefault();

    const service = isEditingMode
      ? () => standardService.update(formData.uuid, formData)
      : () => standardService.create(formData);

    executeAsync(service, `Registro ${isEditingMode ? "atualizado" : "salvo"} com sucesso!`);
  }

  async function deleteRecord(e: SyntheticEvent) {
    e.preventDefault();

    executeAsync(() => standardService.delete(formData.uuid), "Registro excluído com sucesso!");
  }

  async function executeAsync<T>(
    execute: () => Promise<T>,
    successMessage: string,
    errorMessage?: string,
  ) {
    try {
      toogleButtonsClicked(true);
      return await execute()
        .then(() => addToast(successMessage, { appearance: "success" }))
        .then(() => history.goBack());
    } catch (error) {
      addToast(errorMessage || "Alguma coisa deu errado 😟", { appearance: "error" });
    } finally {
      toogleButtonsClicked(false);
    }
  }

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
                    {loading.dataLoading ? (
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
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormData({ ...formData, identification: e.target.value })
                              }
                            />
                          </Col>
                          <Col md="4" className="form-group">
                            <label htmlFor="fePublishDate">Data de Publicação</label>
                            <DatePickerWrapper>
                              <DatePicker
                                required
                                size="md"
                                selected={formData.publicationDate}
                                onChange={(e: Date) =>
                                  setFormData({ ...formData, publicationDate: e })
                                }
                                placeholderText="Data de Publicação"
                                dropdownMode="select"
                                dateFormat="dd/MM/yyyy"
                              />
                            </DatePickerWrapper>
                          </Col>
                          <Col md="4" className="form-group">
                            <label htmlFor="feValidityStart">Data de Válidade</label>
                            <DatePickerWrapper>
                              <DatePicker
                                required
                                size="md"
                                selected={formData.validityStart}
                                onChange={(e: Date) =>
                                  setFormData({ ...formData, validityStart: e })
                                }
                                placeholderText="Data de Válidade"
                                dropdownMode="select"
                                dateFormat="dd/MM/yyyy"
                              />
                            </DatePickerWrapper>
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="6" className="form-group">
                            <label htmlFor="feTitle">Título</label>
                            <FormInput
                              id="feTitle"
                              placeholder="Título"
                              value={formData.title}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormData({ ...formData, title: e.target.value })
                              }
                            />
                          </Col>

                          <Col md="6" className="form-group">
                            <label htmlFor="feGlobalTitleLanguage">Título Global</label>
                            <FormInput
                              id="feGlobalTitleLanguage"
                              placeholder="Título Global"
                              value={formData.titleGlobalLanguage}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormData({
                                  ...formData,
                                  titleGlobalLanguage: e.target.value,
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
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormData({ ...formData, pages: +e.target.value })
                              }
                            />
                          </Col>
                          <Col md="2" className="form-group">
                            <label htmlFor="feStatus">Status</label>
                            <FormSelect
                              id="feStatus"
                              value={formData.status}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormData({ ...formData, status: e.target.value })
                              }
                            >
                              <option value="" disabled hidden>
                                Selecione uma opção
                              </option>
                              <option>Atual</option>
                              <option>Arquivado</option>
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
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormData({ ...formData, price: +e.target.value })
                              }
                            />
                          </Col>
                          <Col md="3" className="form-group">
                            <label htmlFor="feCurrency">Moeda</label>
                            <FormSelect
                              id="feCurrency"
                              value={formData.currency}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormData({ ...formData, currency: e.target.value })
                              }
                            >
                              <option value="" disabled hidden>
                                Selecione uma opção
                              </option>
                              <option>BRL</option>
                              <option>USD</option>
                              <option>EUR</option>
                              <option>PLN</option>
                            </FormSelect>
                          </Col>
                        </Row>
                        <Button
                          type="submit"
                          onClick={submitForm}
                          disabled={loading.buttonsClicked ? true : false}
                        >
                          {isEditingMode ? "Atualizar" : "Criar"}
                        </Button>
                        {isEditingMode && (
                          <Button
                            className="ml-2"
                            type="button"
                            theme="danger"
                            onClick={deleteRecord}
                            disabled={loading.buttonsClicked ? true : false}
                            outline
                          >
                            Excluir
                          </Button>
                        )}
                        <Button
                          className="ml-2"
                          type="button"
                          theme="white"
                          disabled={loading.buttonsClicked ? true : false}
                          onClick={() => history.goBack()}
                        >
                          Voltar
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
}
