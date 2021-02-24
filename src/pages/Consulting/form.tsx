import { consultanciesTestData } from "./data";
import PageTitle from "components/common/PageTitle";
import Spinner from "components/spinner";
import ConsultingDto, { emptyConsultingDto } from "models/ConsultingDto";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ConsultingService from "services/ConsultingService";
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
import styled from "styled-components";

const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100% !important;
  }

  .react-datepicker__input-container {
    width: 100% !important;
  }
`;

const ConsultingForm: React.FC = () => {
  const history = useHistory();
  const { uuid } = useParams<{ uuid?: string }>();
  const isEditingMode = uuid !== undefined;
  const standardService = React.useMemo(() => new ConsultingService(consultanciesTestData), []);
  const [formData, setFormData] = useState<ConsultingDto>(emptyConsultingDto);
  const [loading, setLoading] = useState(true); //TODO: fix this shit loading and div center inside loading statement

  useEffect(() => {
    async function getStandard() {
      if (uuid !== undefined) {
        const response = await standardService.GetByUuid(uuid);
        setFormData(response ?? emptyConsultingDto); //TODO what should we do when id is not found
      }

      setLoading(false);
    }

    getStandard();
  }, []);

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
                    {loading ? (
                      <div style={{ textAlign: "center" }}>
                        <Spinner />
                      </div>
                    ) : (
                      <Form>
                        <Row form>
                          <Col md="4" className="form-group">
                            <label htmlFor="feBusinessArea">Área de Negócio</label>
                            <FormSelect id="feBusinessArea">
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
                                size="md"
                                selected={formData.agreementDate}
                                onChange={(e: any) =>
                                  setFormData({ ...formData, agreementDate: e })
                                }
                                placeholderText="Data do Contrato"
                                dropdownMode="select"
                              />
                            </DatePickerWrapper>
                          </Col>
                          <Col md="4" className="form-group">
                            <label htmlFor="feStartDate">Data de Início</label>
                            <DatePickerWrapper>
                              <DatePicker
                                size="md"
                                selected={formData.startDate}
                                onChange={(e: any) => setFormData({ ...formData, startDate: e })}
                                placeholderText="Data de Início"
                                dropdownMode="select"
                              />
                            </DatePickerWrapper>
                          </Col>
                          <Col md="4" className="form-group">
                            <label htmlFor="feEndDate">Data de Término</label>
                            <DatePickerWrapper>
                              <DatePicker
                                size="md"
                                selected={formData.endDate}
                                onChange={(e: any) => setFormData({ ...formData, endDate: e })}
                                placeholderText="Data de Término"
                                dropdownMode="select"
                              />
                            </DatePickerWrapper>
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

export default ConsultingForm;
