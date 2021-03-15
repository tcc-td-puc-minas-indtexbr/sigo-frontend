import PageTitle from "components/common/PageTitle";
import { Spinner } from "components/spinner";
import { StandardUpdateModel, emptyStandardUpdateModel } from "models/StandardUpdate";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
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
} from "shards-react";
import { DatePickerWrapper } from "shared/styles";

export default function StandardUpdateForm() {
  const history = useHistory();
  const { addToast } = useToasts();
  const { uuid } = useParams<{ uuid?: string }>();
  const isEditingMode = uuid !== undefined;

  const standardUpdateService = React.useMemo(() => new StandardUpdateService(), []);
  // const uploaderService = React.useMemo(() => new UploaderService(), []);
  const [formData, setFormData] = useState<StandardUpdateModel>(emptyStandardUpdateModel);

  // const [standardFile, setStandardFile] = useState<File | null>(null);
  // const standardFileRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState({
    dataLoading: true,
    buttonsClicked: false,
  });

  const toogleButtonsClicked = (isClicked: boolean) =>
    setLoading({ ...loading, buttonsClicked: isClicked });

  useEffect(() => {
    async function loadStandardUpdate() {
      if (uuid !== undefined) {
        await standardUpdateService
          .get(uuid)
          .then((response) => setFormData(response))
          .catch((err) => {
            addToast("Não foi possível exibir o registro selecionado.", { appearance: "error" });
            history.goBack();
          });
      }

      setLoading({ ...loading, dataLoading: false });
    }

    loadStandardUpdate();
  }, []);

  // function onStandardFileChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   if (!e.target.files || !e.target.files[0] || !standardFileRef.current?.value) {
  //     addToast("Erro ao selecionar arquivo!", { appearance: "error" });
  //     return;
  //   }
  //
  //   const firstFile = e.target.files[0];
  //
  //   if (!firstFile.name.endsWith(".pdf")) {
  //     addToast("O arquivo deve estar no formato PDF", { appearance: "error" });
  //
  //     standardFileRef.current.value = "";
  //
  //     return;
  //   }
  //
  //   const url = generateUrl(encodeURI(firstFile.name));
  //   setFormData({ ...formData, url: url });
  //   setStandardFile(firstFile);
  // }

  // function generateUrl(fileName: string) {
  //   return `https://services.hagatus.com.br/sigo-reader/v1/read/standard/${fileName}`;
  // }

  async function submitForm(e: SyntheticEvent) {
    e.preventDefault();

    const service = isEditingMode
      ? () => standardUpdateService.update(formData.uuid, formData)
      : () => standardUpdateService.create(formData);

    executeAsync(
      () => service(),
      `Registro ${isEditingMode ? "atualizado" : "salvo"} com sucesso!`,
    );
  }

  async function deleteRecord(e: SyntheticEvent) {
    e.preventDefault();

    executeAsync(
      () => standardUpdateService.delete(formData.uuid),
      "Registro excluído com sucesso!",
    );
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
          title="Gestão de Normas - Atualizações"
          subtitle={`Sincronizar norma`}
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
                        {/*<Row form>*/}
                        {/*  <Col md="6" className="form-group">*/}
                        {/*    <label htmlFor="feIdentification">Identificação da Norma</label>*/}
                        {/*    <FormInput*/}
                        {/*      id="feIdentification"*/}
                        {/*      type="text"*/}
                        {/*      placeholder="Identificação"*/}
                        {/*      value={formData.identification}*/}
                        {/*      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>*/}
                        {/*        setFormData({ ...formData, identification: e.target.value })*/}
                        {/*      }*/}
                        {/*    />*/}
                        {/*  </Col>*/}
                        {/*  <Col md="6" className="form-group">*/}
                        {/*    <label>Norma</label>*/}
                        {/*    <div className="input-group">*/}
                        {/*      <div className="input-group-prepend">*/}
                        {/*        <Button*/}
                        {/*          outline*/}
                        {/*          type="button"*/}
                        {/*          theme="success"*/}
                        {/*          disabled={*/}
                        {/*            formData.url === "" || standardFile !== null ? true : false*/}
                        {/*          }*/}
                        {/*          onClick={() => window.open(formData.url)}*/}
                        {/*          style={*/}
                        {/*            formData.url === "" || standardFile !== null*/}
                        {/*              ? { cursor: "not-allowed" }*/}
                        {/*              : {}*/}
                        {/*          }*/}
                        {/*        >*/}
                        {/*          <i className="fa fa-download"></i> Baixar arquivo*/}
                        {/*        </Button>*/}
                        {/*      </div>*/}
                        {/*      <div className="custom-file">*/}
                        {/*        <input*/}
                        {/*          type="file"*/}
                        {/*          className="custom-file-input"*/}
                        {/*          id="feStandardFile"*/}
                        {/*          aria-describedby="inputGroupStandardFile"*/}
                        {/*          onChange={onStandardFileChange}*/}
                        {/*          ref={standardFileRef}*/}
                        {/*        />*/}
                        {/*        <label className="custom-file-label" htmlFor="feStandardFile">*/}
                        {/*          {standardFile === null*/}
                        {/*            ? "Escolher arquivo..."*/}
                        {/*            : standardFile.name}*/}
                        {/*        </label>*/}
                        {/*      </div>*/}
                        {/*    </div>*/}
                        {/*  </Col>*/}
                        {/*</Row>*/}
                        {/*<Row form>*/}
                        {/*  <Col md="3" className="form-group">*/}
                        {/*    <label htmlFor="feTitle">Título</label>*/}
                        {/*    <FormInput*/}
                        {/*      id="feTitle"*/}
                        {/*      placeholder="Título"*/}
                        {/*      value={formData.title}*/}
                        {/*      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>*/}
                        {/*        setFormData({ ...formData, title: e.target.value })*/}
                        {/*      }*/}
                        {/*    />*/}
                        {/*  </Col>*/}
                        {/*  <Col md="3" className="form-group">*/}
                        {/*    <label htmlFor="feGlobalTitleLanguage">Título Global</label>*/}
                        {/*    <FormInput*/}
                        {/*      id="feGlobalTitleLanguage"*/}
                        {/*      placeholder="Título Global"*/}
                        {/*      value={formData.titleGlobalLanguage}*/}
                        {/*      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>*/}
                        {/*        setFormData({*/}
                        {/*          ...formData,*/}
                        {/*          titleGlobalLanguage: e.target.value,*/}
                        {/*        })*/}
                        {/*      }*/}
                        {/*    />*/}
                        {/*  </Col>*/}
                        {/*  <Col md="3" className="form-group">*/}
                        {/*    <label htmlFor="fePublishDate">Data de Publicação</label>*/}
                        {/*    <DatePickerWrapper>*/}
                        {/*      <DatePicker*/}
                        {/*        required*/}
                        {/*        size="md"*/}
                        {/*        selected={formData.publicationDate}*/}
                        {/*        onChange={(e: Date) =>*/}
                        {/*          setFormData({ ...formData, publicationDate: e })*/}
                        {/*        }*/}
                        {/*        placeholderText="Data de Publicação"*/}
                        {/*        dropdownMode="select"*/}
                        {/*        dateFormat="dd/MM/yyyy"*/}
                        {/*      />*/}
                        {/*    </DatePickerWrapper>*/}
                        {/*  </Col>*/}
                        {/*  <Col md="3" className="form-group">*/}
                        {/*    <label htmlFor="feValidityStart">Data de Válidade</label>*/}
                        {/*    <DatePickerWrapper>*/}
                        {/*      <DatePicker*/}
                        {/*        required*/}
                        {/*        size="md"*/}
                        {/*        selected={formData.validityStart}*/}
                        {/*        onChange={(e: Date) =>*/}
                        {/*          setFormData({ ...formData, validityStart: e })*/}
                        {/*        }*/}
                        {/*        placeholderText="Data de Válidade"*/}
                        {/*        dropdownMode="select"*/}
                        {/*        dateFormat="dd/MM/yyyy"*/}
                        {/*      />*/}
                        {/*    </DatePickerWrapper>*/}
                        {/*  </Col>*/}
                        {/*</Row>*/}
                        {/*<Row form>*/}
                        {/*  <Col md="4" className="form-group">*/}
                        {/*    <label htmlFor="feComite">Comitê</label>*/}
                        {/*    <FormInput*/}
                        {/*      id="feComite"*/}
                        {/*      placeholder="Comitê"*/}
                        {/*      value={formData.comite}*/}
                        {/*      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>*/}
                        {/*        setFormData({ ...formData, comite: e.target.value })*/}
                        {/*      }*/}
                        {/*    />*/}
                        {/*  </Col>*/}
                        {/*  <Col md="4" className="form-group">*/}
                        {/*    <label htmlFor="feObjective">Objetivo</label>*/}
                        {/*    <FormInput*/}
                        {/*      id="feObjective"*/}
                        {/*      placeholder="Objetivo"*/}
                        {/*      value={formData.objective}*/}
                        {/*      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>*/}
                        {/*        setFormData({ ...formData, objective: e.target.value })*/}
                        {/*      }*/}
                        {/*    />*/}
                        {/*  </Col>*/}
                        {/*  <Col md="2" className="form-group">*/}
                        {/*    <label htmlFor="fePages">Páginas</label>*/}
                        {/*    <FormInput*/}
                        {/*      id="fePages"*/}
                        {/*      placeholder="Páginas"*/}
                        {/*      value={formData.pages}*/}
                        {/*      type="number"*/}
                        {/*      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>*/}
                        {/*        setFormData({ ...formData, pages: +e.target.value })*/}
                        {/*      }*/}
                        {/*    />*/}
                        {/*  </Col>*/}
                        {/*  <Col md="2" className="form-group">*/}
                        {/*    <label htmlFor="feStatus">Status</label>*/}
                        {/*    <FormSelect*/}
                        {/*      id="feStatus"*/}
                        {/*      value={formData.status}*/}
                        {/*      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>*/}
                        {/*        setFormData({ ...formData, status: e.target.value })*/}
                        {/*      }*/}
                        {/*    >*/}
                        {/*      <option value="" disabled hidden>*/}
                        {/*        Selecione uma opção*/}
                        {/*      </option>*/}
                        {/*      <option>Atual</option>*/}
                        {/*      <option>Arquivado</option>*/}
                        {/*    </FormSelect>*/}
                        {/*  </Col>*/}
                        {/*</Row>*/}
                        {/*<Row form>*/}
                        {/*  <Col md="3" className="form-group">*/}
                        {/*    <label htmlFor="feOrganization">Organização</label>*/}
                        {/*    <FormInput*/}
                        {/*      id="feOrganization"*/}
                        {/*      placeholder="Organização"*/}
                        {/*      value={formData.organization}*/}
                        {/*      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>*/}
                        {/*        setFormData({ ...formData, organization: e.target.value })*/}
                        {/*      }*/}
                        {/*    />*/}
                        {/*  </Col>*/}
                        {/*  <Col md="3" className="form-group">*/}
                        {/*    <label htmlFor="feLanguage">Idioma</label>*/}
                        {/*    <FormInput*/}
                        {/*      id="feLanguage"*/}
                        {/*      placeholder="Idioma"*/}
                        {/*      value={formData.language}*/}
                        {/*      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>*/}
                        {/*        setFormData({ ...formData, language: e.target.value })*/}
                        {/*      }*/}
                        {/*    />*/}
                        {/*  </Col>*/}
                        {/*  <Col md="3" className="form-group">*/}
                        {/*    <label htmlFor="fePrice">Preço</label>*/}
                        {/*    <FormInput*/}
                        {/*      id="fePrice"*/}
                        {/*      placeholder="Preço"*/}
                        {/*      value={formData.price}*/}
                        {/*      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>*/}
                        {/*        setFormData({ ...formData, price: +e.target.value })*/}
                        {/*      }*/}
                        {/*    />*/}
                        {/*  </Col>*/}
                        {/*  <Col md="3" className="form-group">*/}
                        {/*    <label htmlFor="feCurrency">Moeda</label>*/}
                        {/*    <FormSelect*/}
                        {/*      id="feCurrency"*/}
                        {/*      value={formData.currency}*/}
                        {/*      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>*/}
                        {/*        setFormData({ ...formData, currency: e.target.value })*/}
                        {/*      }*/}
                        {/*    >*/}
                        {/*      <option value="" disabled hidden>*/}
                        {/*        Selecione uma opção*/}
                        {/*      </option>*/}
                        {/*      <option>BRL</option>*/}
                        {/*      <option>USD</option>*/}
                        {/*      <option>EUR</option>*/}
                        {/*      <option>PLN</option>*/}
                        {/*    </FormSelect>*/}
                        {/*  </Col>*/}
                        {/*</Row>*/}
                        {/*<Button*/}
                        {/*  type="submit"*/}
                        {/*  onClick={submitForm}*/}
                        {/*  disabled={loading.buttonsClicked ? true : false}*/}
                        {/*>*/}
                        {/*  {isEditingMode ? "Atualizar" : "Criar"}*/}
                        {/*</Button>*/}
                        {/*{isEditingMode && (*/}
                        {/*  <Button*/}
                        {/*    className="ml-2"*/}
                        {/*    type="button"*/}
                        {/*    theme="danger"*/}
                        {/*    onClick={deleteRecord}*/}
                        {/*    disabled={loading.buttonsClicked ? true : false}*/}
                        {/*    outline*/}
                        {/*  >*/}
                        {/*    Excluir*/}
                        {/*  </Button>*/}
                        {/*)}*/}
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
