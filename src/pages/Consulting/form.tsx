import PageTitle from "components/common/PageTitle";
import { Spinner } from "components/spinner";
import { ConsultingModel, emptyConsultingModel } from "models/Consulting";
import React, { useEffect, useMemo, useState } from "react";
import { SyntheticEvent } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { DatePickerWrapper } from "shared/styles";

export default function ConsultingForm() {
  const history = useHistory();

  const { addToast } = useToasts();
  const { uuid } = useParams<{ uuid?: string }>();
  const isEditingMode = uuid !== undefined;

  const { register, handleSubmit, errors, control, reset } = useForm<ConsultingModel>({
    defaultValues: emptyConsultingModel,
  });

  const [loading, setLoading] = useState({
    dataLoading: true,
    buttonsClicked: false,
  });

  const consultingService = useMemo(() => new ConsultingService(), []);

  const toogleButtonsClicked = (isClicked: boolean) =>
    setLoading({ ...loading, buttonsClicked: isClicked });

  async function loadConsulting() {
    if (uuid !== undefined) {
      await consultingService
        .get(uuid)
        .then((response) => reset({ ...response }))
        .catch((err) => {
          addToast("Não foi possível exibir o registro selecionado.", { appearance: "error" });
          history.goBack();
        });
    }

    setLoading({ ...loading, dataLoading: false });
  }

  useEffect(() => {
    loadConsulting();
  }, []);

  async function onSubmit(model: ConsultingModel) {
    const service = isEditingMode
      ? () => consultingService.update(model.uuid, model)
      : () => consultingService.create(model);

    executeAsync(service, `Registro ${isEditingMode ? "atualizado" : "salvo"} com sucesso!`);
  }

  async function deleteRecord(e: SyntheticEvent) {
    e.preventDefault();

    if (uuid) {
      executeAsync(() => consultingService.delete(uuid), "Registro excluído com sucesso!");
    }
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
                      <Spinner />
                    ) : (
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <input
                          type="hidden"
                          id="id"
                          name="uuid"
                          defaultValue={uuid}
                          ref={register}
                        />
                        <Row form>
                          <Col md="4" className="form-group">
                            <label htmlFor="businessArea">Área de Negócio</label>
                            <FormSelect
                              id="businessArea"
                              name="businessArea"
                              innerRef={register({ required: true })}
                              invalid={errors.businessArea ? true : false}
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
                            <label htmlFor="company">Razão Social</label>
                            <FormInput
                              id="company"
                              name="company"
                              placeholder="Razão Social"
                              innerRef={register({ required: true })}
                              invalid={errors.company ? true : false}
                            />
                          </Col>

                          <Col md="4" className="form-group">
                            <label htmlFor="companyName">Nome Fantasia</label>
                            <FormInput
                              id="companyName"
                              name="companyName"
                              placeholder="Nome Fantasia"
                              innerRef={register({ required: true })}
                              invalid={errors.companyName ? true : false}
                            />
                          </Col>

                          <Col md="4" className="form-group">
                            <label htmlFor="cnpj">CNPJ</label>
                            <FormInput
                              id="cnpj"
                              name="cnpj"
                              placeholder="CNPJ"
                              innerRef={register({ required: true })}
                              invalid={errors.cnpj ? true : false}
                            />
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="4" className="form-group">
                            <label htmlFor="agreementDate">Data do Contrato</label>
                            <Controller
                              name="agreementDate"
                              control={control}
                              rules={{ required: true }}
                              render={({ onChange, value }) => (
                                <DatePickerWrapper>
                                  <DatePicker
                                    size="md"
                                    id="agreementDate"
                                    selected={value}
                                    onChange={onChange}
                                    placeholderText="Data do Contrato"
                                    dropdownMode="select"
                                    dateFormat="dd/MM/yyyy"
                                    className={errors.agreementDate && "is-invalid"}
                                  />
                                </DatePickerWrapper>
                              )}
                            />
                          </Col>
                          <Col md="4" className="form-group">
                            <label htmlFor="startDate">Data de Início</label>
                            <Controller
                              name="startDate"
                              control={control}
                              rules={{ required: true }}
                              render={({ onChange, value }) => (
                                <DatePickerWrapper>
                                  <DatePicker
                                    size="md"
                                    id="startDate"
                                    selected={value}
                                    onChange={onChange}
                                    placeholderText="Data de Início"
                                    dropdownMode="select"
                                    dateFormat="dd/MM/yyyy"
                                    className={errors.startDate && "is-invalid"}
                                  />
                                </DatePickerWrapper>
                              )}
                            />
                          </Col>
                          <Col md="4" className="form-group">
                            <label htmlFor="endDate">Data de Término</label>
                            <Controller
                              name="endDate"
                              control={control}
                              rules={{ required: true }}
                              render={({ onChange, value }) => (
                                <DatePickerWrapper>
                                  <DatePicker
                                    size="md"
                                    id="endDate"
                                    selected={value}
                                    onChange={onChange}
                                    placeholderText="Data de Término"
                                    dropdownMode="select"
                                    dateFormat="dd/MM/yyyy"
                                    className={errors.endDate && "is-invalid"}
                                  />
                                </DatePickerWrapper>
                              )}
                            />
                          </Col>
                        </Row>
                        <>
                          <Button type="submit" disabled={loading.buttonsClicked ? true : false}>
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
                        </>
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
