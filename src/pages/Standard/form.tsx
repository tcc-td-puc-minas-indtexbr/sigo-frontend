import PageTitle from "components/common/PageTitle";
import { Spinner } from "components/spinner";
import { StandardModel, emptyStandardModel, isAllowedToDownloadStandard } from "models/Standard";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import StandardService from "services/StandardService";
import StandardUpdateService from "services/StandardUpdateService";
import { UploaderService } from "services/UploaderService";
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
  FormTextarea,
} from "shards-react";
import { DatePickerWrapper } from "shared/styles";
import slugify from "slugify";

export default function StandardForm() {
  const history = useHistory();

  const { addToast } = useToasts();
  const { uuid, importuuid } = useParams<{ uuid?: string; importuuid?: string }>();
  const isEditingMode = uuid !== undefined;

  const {
    register,
    handleSubmit,
    errors,
    control,
    reset,
    getValues,
    setValue,
  } = useForm<StandardModel>({
    defaultValues: emptyStandardModel,
  });

  const standardFileRef = useRef<HTMLInputElement>(null);
  const [standardFile, setStandardFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState({
    dataLoading: true,
    buttonsClicked: false,
  });

  const standardService = React.useMemo(() => new StandardService(), []);
  const uploaderService = React.useMemo(() => new UploaderService(), []);
  const standardUpdateService = React.useMemo(() => new StandardUpdateService(), []);

  const toogleButtonsClicked = (isClicked: boolean) =>
    setLoading({ ...loading, buttonsClicked: isClicked });

  useEffect(() => {
    let isSubscribed = true;
    let getStandard = () => new Promise<StandardModel>((resolve) => resolve(getValues()));

    async function loadStandard() {
      if (uuid !== undefined) {
        getStandard = () => standardService.get(uuid).then((response) => response);
      } else if (importuuid !== undefined) {
        getStandard = () =>
          standardUpdateService.get(importuuid).then((response) => {
            addToast("A norma foi importada para o formulário.", { appearance: "success" });
            return {
              ...getValues(),
              publicationDate: response.publicationDate,
              identification: response.identification,
              url: response.link,
              objective: response.description,
              title: response.title,
            };
          });
      }

      await getStandard()
        .then((standard) => {
          if (isSubscribed) {
            setFileUrl(standard.file);
            reset(standard);
          }
        })
        .catch((_) => {
          if (isSubscribed) {
            addToast("Não foi possível exibir o registro selecionado.", { appearance: "error" });
            history.goBack();
          }
        });
    }

    loadStandard().then((_) => isSubscribed && setLoading({ ...loading, dataLoading: false }));

    return () => {
      isSubscribed = false;
    };
  }, []);

  function onStandardFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0] || !standardFileRef.current?.value) {
      addToast("Erro ao selecionar arquivo!", { appearance: "error" });
      return;
    }

    const firstFile = e.target.files[0];

    if (!firstFile.name.endsWith(".pdf")) {
      addToast("O arquivo deve estar no formato PDF", { appearance: "error" });

      standardFileRef.current.value = "";

      return;
    }

    setStandardFile(firstFile);
  }

  function generateUrl(fileName: string) {
    return `https://services.hagatus.com.br/sigo-reader/v1/read/standard/${fileName}`;
  }

  function onSubmit(model: StandardModel) {
    let data = { ...model };

    if (standardFile) {
      data = { ...model, file: generateUrl(slugify(standardFile.name, "_")) };
    }

    const service = isEditingMode
      ? () => standardService.update(data.uuid, data)
      : () => standardService.create(data);

    executeAsync(
      () => uploadFile().then(service),
      `Registro ${isEditingMode ? "atualizado" : "salvo"} com sucesso!`,
    );
  }

  function deleteRecord(e: SyntheticEvent) {
    e.preventDefault();

    if (uuid) {
      executeAsync(() => standardService.delete(uuid), "Registro excluído com sucesso!");
    }
  }

  async function uploadFile() {
    if (standardFile) {
      const formDataFile = new FormData();
      formDataFile.append("file", standardFile);

      await uploaderService
        .uploadStandard(slugify(standardFile.name, "_"), formDataFile)
        .then((_) => addToast("Arquivo enviado com sucesso!", { appearance: "success" }))
        .catch((_) => addToast("Erro ao enviar arquivo 😟", { appearance: "error" }));
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
                          <Col md="3" className="form-group">
                            <label htmlFor="identification">Identificação da Norma</label>
                            <FormInput
                              id="identification"
                              name="identification"
                              placeholder="Identificação: ISO 9001:2020"
                              innerRef={register({ required: true })}
                              invalid={errors.identification ? true : false}
                            />
                          </Col>
                          <Col md="3" className="form-group">
                            <label htmlFor="url">Link</label>
                            <FormInput
                              id="url"
                              name="url"
                              placeholder="http://iso.org"
                              innerRef={register({ required: true })}
                              invalid={errors.url ? true : false}
                            />
                          </Col>
                          <Col md="3" className="form-group">
                            <label>Norma</label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <Button
                                  outline
                                  type="button"
                                  theme={`${
                                    isAllowedToDownloadStandard(fileUrl) ? "success" : "dark"
                                  }`}
                                  onClick={() =>
                                    window.open(fileUrl, "_blank", "noopener,noreferrer")
                                  }
                                  disabled={!isAllowedToDownloadStandard(fileUrl)}
                                  style={
                                    !isAllowedToDownloadStandard(fileUrl)
                                      ? { cursor: "not-allowed" }
                                      : {}
                                  }
                                >
                                  <i className="fa fa-download"></i> Baixar arquivo
                                </Button>
                              </div>
                              <FormInput
                                id="file"
                                name="file"
                                placeholder="filename"
                                innerRef={register}
                                disabled={true}
                              />
                            </div>
                          </Col>
                          <Col md="3" className="form-group">
                            <label>Atualizar</label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  id="standardFile"
                                  aria-describedby="inputGroupStandardFile"
                                  onChange={onStandardFileChange}
                                  ref={standardFileRef}
                                />
                                <label className="custom-file-label" htmlFor="standardFile">
                                  {standardFile === null
                                    ? "Escolher arquivo..."
                                    : standardFile.name}
                                </label>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="6" className="form-group">
                            <label htmlFor="title">Título</label>
                            <FormInput
                              id="title"
                              name="title"
                              placeholder="Título"
                              innerRef={register({ required: true })}
                              invalid={errors.title ? true : false}
                            />
                          </Col>

                          <Col md="3" className="form-group">
                            <label htmlFor="publicationDate">Data de Publicação</label>
                            <Controller
                              name="publicationDate"
                              control={control}
                              rules={{ required: true }}
                              render={({ onChange, value }) => (
                                <DatePickerWrapper>
                                  <DatePicker
                                    size="md"
                                    id="publicationDate"
                                    selected={value}
                                    onChange={onChange}
                                    placeholderText="Data de Publicação"
                                    dropdownMode="select"
                                    dateFormat="dd/MM/yyyy"
                                    className={errors.publicationDate && "is-invalid"}
                                  />
                                </DatePickerWrapper>
                              )}
                            />
                          </Col>
                          <Col md="3" className="form-group">
                            <label htmlFor="validityStart">Data de Válidade</label>
                            <Controller
                              name="validityStart"
                              control={control}
                              rules={{ required: true }}
                              render={({ onChange, value }) => (
                                <DatePickerWrapper>
                                  <DatePicker
                                    size="md"
                                    id="validityStart"
                                    selected={value}
                                    onChange={onChange}
                                    placeholderText="Data de Válidade"
                                    dropdownMode="select"
                                    dateFormat="dd/MM/yyyy"
                                    className={errors.validityStart && "is-invalid"}
                                  />
                                </DatePickerWrapper>
                              )}
                            />
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="6" className="form-group">
                            <label htmlFor="titleGlobalLanguage">Título Global</label>
                            <FormInput
                              id="titleGlobalLanguage"
                              name="titleGlobalLanguage"
                              placeholder="Título Global"
                              innerRef={register({ required: true })}
                              invalid={errors.titleGlobalLanguage ? true : false}
                            />
                          </Col>
                          <Col md="3" className="form-group">
                            <label htmlFor="comite">Comitê</label>
                            <FormInput
                              id="comite"
                              name="comite"
                              placeholder="Comitê"
                              innerRef={register({ required: true })}
                              invalid={errors.comite ? true : false}
                            />
                          </Col>

                          <Col md="1" className="form-group">
                            <label htmlFor="pages">Páginas</label>
                            <FormInput
                              id="pages"
                              name="pages"
                              placeholder="Páginas"
                              type="number"
                              innerRef={register({ required: true, min: 1 })}
                              invalid={errors.pages ? true : false}
                            />
                          </Col>
                          <Col md="2" className="form-group">
                            <label htmlFor="status">Status</label>
                            <FormSelect
                              id="status"
                              name="status"
                              innerRef={register({ required: true })}
                              invalid={errors.status ? true : false}
                            >
                              <option value="" disabled hidden>
                                Selecione uma opção
                              </option>
                              <option>Em Vigor</option>
                              <option>Arquivado</option>
                              <option>Cancelada</option>
                              <option>Aprovada</option>
                              <option>Em análise</option>
                            </FormSelect>
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="12" className="form-group">
                            <label htmlFor="objective">Objetivo</label>
                            <FormTextarea
                              id="objective"
                              name="objective"
                              placeholder="Objetivo"
                              innerRef={register({ required: true })}
                              invalid={errors.objective ? true : false}
                            />
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="6" className="form-group">
                            <label htmlFor="organization">Organização</label>
                            <FormInput
                              id="organization"
                              name="organization"
                              placeholder="Organização"
                              innerRef={register({ required: true })}
                              invalid={errors.organization ? true : false}
                            />
                          </Col>
                          <Col md="2" className="form-group">
                            <label htmlFor="language">Idioma</label>
                            <FormInput
                              id="language"
                              name="language"
                              placeholder="Idioma"
                              innerRef={register({ required: true })}
                              invalid={errors.language ? true : false}
                            />
                          </Col>
                          <Col md="2" className="form-group">
                            <label htmlFor="price">Preço</label>
                            <FormInput
                              id="price"
                              name="price"
                              placeholder="Preço"
                              maxLength="14"
                              innerRef={register({ required: true })}
                              invalid={errors.price ? true : false}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                let price = e.target.value.replace(/\D/g, "");
                                price = price.replace(/(\d{1})(\d{14})$/, "$1.$2");
                                price = price.replace(/(\d{1})(\d{11})$/, "$1.$2");
                                price = price.replace(/(\d{1})(\d{8})$/, "$1.$2");
                                price = price.replace(/(\d{1})(\d{5})$/, "$1.$2");
                                price = price.replace(/(\d{1})(\d{1,2})$/, "$1,$2");
                                setValue("price", price);
                              }}
                            />
                          </Col>
                          <Col md="2" className="form-group">
                            <label htmlFor="currency">Moeda</label>
                            <FormSelect
                              id="currency"
                              name="currency"
                              innerRef={register({ required: true })}
                              invalid={errors.currency ? true : false}
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
