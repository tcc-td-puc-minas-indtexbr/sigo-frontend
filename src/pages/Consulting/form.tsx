import PageTitle from "components/common/PageTitle";
import { Spinner } from "components/spinner";
import { ConsultingModel, emptyConsultingModel } from "models/Consulting";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ConsultingService from "services/ConsultingService";
import {
  Button,
  Card,
  CardBody,
  Col,
  DatePicker,
  Form,
  FormInput,
  FormSelect,
  ListGroup,
  ListGroupItem,
  Row,
} from "shards-react";
import styled from "styled-components";

const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100% !important;
  }

  .react-datepicker__input-container {
    width: 100% !important;
  }
`;

export default function ConsultingForm() {
  const { addToast } = useToasts();
  const history = useHistory();
  const { uuid } = useParams<{ uuid?: string }>();
  const isEditingMode = uuid !== undefined;

  const consultingService = useMemo(() => new ConsultingService(), []);
  const [formData, setFormData] = useState<ConsultingModel>(emptyConsultingModel);
  const [loading, setLoading] = useState({
    dataLoading: true,
    buttonsClicked: false,
  });

  const toogleButtonsClicked = (isClicked: boolean) =>
    setLoading({ ...loading, buttonsClicked: isClicked });
  const addSuccessToast = (message: string) => addToast(message, { appearance: "success" });
  const addErrorToast = () => addToast("Alguma coisa deu errado :(", { appearance: "error" });

  useEffect(() => {
    async function getStandard() {
      if (uuid !== undefined) {
        const response = await consultingService.get(uuid);

        if (response !== undefined) {
          setFormData(response);
        } else {
          history.goBack();
          addErrorToast();
        }
      }

      setLoading({ ...loading, dataLoading: false });
    }

    getStandard();
  }, []);

  async function submitForm(e: any) {
    e.preventDefault();

    function success() {
      addSuccessToast(`Registro ${isEditingMode ? "atualizado" : "salvo"} com sucesso!`);
    }

    const service = isEditingMode
      ? () => consultingService.update(formData.uuid, formData).then(success)
      : () => consultingService.create(formData).then(success);

    executeAsync(service);
  }

  async function deleteRecord(e: any) {
    e.preventDefault();

    function success() {
      addSuccessToast("Registro excluído com sucesso!");
      history.goBack();
    }

    executeAsync(() => consultingService.delete(formData.uuid).then(success));
  }

  async function executeAsync<T>(execute: () => Promise<T>) {
    try {
      toogleButtonsClicked(true);
      return await execute();
    } catch (error) {
      addErrorToast();
    } finally {
      toogleButtonsClicked(false);
    }
  }

  return (
    <>
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Consultorias e Assessorias"
          subtitle={`${isEditingMode ? "Editar" : "Adicionar"} consultoria`}
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
                            <label htmlFor="feBusinessArea">Área de Negócio</label>
                            <FormSelect
                              required
                              id="feBusinessArea"
                              value={formData.businessArea}
                              onChange={(e: any) =>
                                setFormData({ ...formData, businessArea: e.target.value })
                              }
                            >
                              <option value="" disabled hidden>
                                Selecione uma opção
                              </option>
                              <option>E-commerce</option>
                              <option>Jurídico</option>
                              <option>Fornecedores</option>
                            </FormSelect>
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="4" className="form-group">
                            <label htmlFor="feCompany">Razão Social</label>
                            <FormInput
                              required
                              id="feCompany"
                              placeholder="Razão Social"
                              value={formData.company}
                              onChange={(e: any) =>
                                setFormData({ ...formData, company: e.target.value })
                              }
                            />
                          </Col>

                          <Col md="4" className="form-group">
                            <label htmlFor="feCompanyName">Nome Fantasia</label>
                            <FormInput
                              required
                              id="feCompanyName"
                              placeholder="Nome Fantasia"
                              value={formData.companyName}
                              onChange={(e: any) =>
                                setFormData({
                                  ...formData,
                                  companyName: e.target.value,
                                })
                              }
                            />
                          </Col>

                          <Col md="4" className="form-group">
                            <label htmlFor="feCnpj">CNPJ</label>
                            <FormInput
                              required
                              id="feCnpj"
                              placeholder="CNPJ"
                              value={formData.cnpj}
                              onChange={(e: any) =>
                                setFormData({
                                  ...formData,
                                  cnpj: e.target.value,
                                })
                              }
                            />
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="4" className="form-group">
                            <label htmlFor="feAgreementDate">Data do Contrato</label>
                            <DatePickerWrapper>
                              <DatePicker
                                required
                                size="md"
                                selected={formData.agreementDate}
                                onChange={(e: any) =>
                                  setFormData({ ...formData, agreementDate: e })
                                }
                                placeholderText="Data do Contrato"
                                dropdownMode="select"
                                dateFormat="dd/MM/yyyy"
                              />
                            </DatePickerWrapper>
                          </Col>
                          <Col md="4" className="form-group">
                            <label htmlFor="feStartDate">Data de Início</label>
                            <DatePickerWrapper>
                              <DatePicker
                                required
                                size="md"
                                selected={formData.startDate}
                                onChange={(e: any) => setFormData({ ...formData, startDate: e })}
                                placeholderText="Data de Início"
                                dropdownMode="select"
                                dateFormat="dd/MM/yyyy"
                              />
                            </DatePickerWrapper>
                          </Col>
                          <Col md="4" className="form-group">
                            <label htmlFor="feEndDate">Data de Término</label>
                            <DatePickerWrapper>
                              <DatePicker
                                required
                                size="md"
                                selected={formData.endDate}
                                onChange={(e: any) => setFormData({ ...formData, endDate: e })}
                                placeholderText="Data de Término"
                                dropdownMode="select"
                                dateFormat="dd/MM/yyyy"
                              />
                            </DatePickerWrapper>
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
