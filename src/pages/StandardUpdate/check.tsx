import { columnsConfig } from "./config";
import Table from "../../components/datatable";
import { RoutesPath } from "../../routes/constants";
import PageTitle from "components/common/PageTitle";
import { Spinner } from "components/spinner";
import { StandardUpdateModel, emptyStandardUpdateModel } from "models/StandardUpdate";
import React, { SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";
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
  CardHeader,
} from "shards-react";
import { DatePickerWrapper } from "shared/styles";

export default function StandardUpdateCheck() {
  const history = useHistory();
  const { addToast } = useToasts();
  const [data, setData] = useState<StandardUpdateModel[]>([]);

  const standardUpdateService = React.useMemo(() => new StandardUpdateService(), []);
  // const uploaderService = React.useMemo(() => new UploaderService(), []);
  const [formData, setFormData] = useState<StandardUpdateModel>(emptyStandardUpdateModel);

  // const [standardFile, setStandardFile] = useState<File | null>(null);
  // const standardFileRef = useRef<HTMLInputElement>(null);

  const columns = React.useMemo(() => columnsConfig, []);

  const [loading, setLoading] = useState(true); //TODO: Improve loading when we have an API

  const navigateToStandardUpdate = useCallback((standardDto: StandardUpdateModel) => {
    history.push(`${RoutesPath.standardUpdate.form}/${standardDto.uuid}`);
  }, []);

  useEffect(() => {
    async function getData() {
      const response = await standardUpdateService.checkUpdates();
      setData(response);
      setLoading(false);
    }

    getData();
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

  // async function submitForm(e: SyntheticEvent) {
  //   e.preventDefault();
  //
  //   const service = isEditingMode
  //     ? () => standardUpdateService.update(formData.uuid, formData)
  //     : () => standardUpdateService.create(formData);
  //
  //   executeAsync(
  //     () => service(),
  //     `Registro ${isEditingMode ? "atualizado" : "salvo"} com sucesso!`,
  //   );
  // }

  // async function deleteRecord(e: SyntheticEvent) {
  //   e.preventDefault();
  //
  //   executeAsync(
  //     () => standardUpdateService.delete(formData.uuid),
  //     "Registro excluído com sucesso!",
  //   );
  // }

  // async function executeAsync<T>(
  //   execute: () => Promise<T>,
  //   successMessage: string,
  //   errorMessage?: string,
  // ) {
  //   try {
  //     toogleButtonsClicked(true);
  //     return await execute()
  //       .then(() => addToast(successMessage, { appearance: "success" }))
  //       .then(() => history.goBack());
  //   } catch (error) {
  //     addToast(errorMessage || "Alguma coisa deu errado 😟", { appearance: "error" });
  //   } finally {
  //     toogleButtonsClicked(false);
  //   }
  // }

  return (
    <>
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Gestão de Normas - Pesquisar por novas atualizações"
          subtitle={`Sincronizar norma`}
          className="text-sm-left"
        />
      </Row>
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              {/*<Button*/}
              {/*  className="mb-0 mr-1"*/}
              {/*  onClick={() => history.push(RoutesPath.standardUpdate.check)}*/}
              {/*>*/}
              {/*  Pesquisar por atualizações*/}
              {/*</Button>*/}
              <Button className="ml-2" type="button" theme="white" onClick={() => history.goBack()}>
                Voltar
              </Button>
            </CardHeader>
            <Col>
              <CardBody className="p-0 py-3" style={{ overflow: "auto" }}>
                <div style={{ textAlign: "center" }}>
                  {loading ? (
                    <Spinner />
                  ) : data.length > 0 ? (
                    <Table columns={columns} data={data} getTrProps={navigateToStandardUpdate} />
                  ) : (
                    "No data found"
                  )}
                </div>
              </CardBody>
            </Col>
          </Card>
        </Col>
      </Row>
    </>
  );
}
