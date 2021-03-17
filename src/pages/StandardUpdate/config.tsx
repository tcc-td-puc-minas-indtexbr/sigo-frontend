import { StandardUpdateModel } from "models/StandardUpdate";
import React from "react";
import { useHistory } from "react-router";
import { RoutesPath } from "routes/constants";
import { Button } from "shards-react";

export const columnsConfig = [
  {
    Header: "Identificação",
    accessor: "identification",
  },
  {
    Header: "Data de Publicação",
    accessor: "publicationDate",
    Cell: ({ value }: { value: Date }) => {
      return `${value.toLocaleDateString("pt-BR")}`;
    },
  },
  {
    Header: "Título",
    accessor: "title",
  },
  {
    Header: "Atualizado",
    accessor: "synchronized",
    Cell: ({ value }: { value: boolean }) => (value ? "Sim" : "Não"),
  },
  {
    Header: "Link",
    accessor: "link",
    Cell: OpenURL,
  },
  {
    Header: "Importar",
    Cell: Import,
  },
];

function Import({ row: { original } }: { row: { original: StandardUpdateModel } }) {
  const history = useHistory();
  return (
    <Button
      outline
      type="button"
      theme="success"
      onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        history.push(`${RoutesPath.standard.formImport}/${original.uuid}`);
      }}
    >
      <i className="fa fa-link"></i>
      Importar
    </Button>
  );
}

function OpenURL({ value }: { value: string }) {
  return (
    <Button
      outline
      className="ml-2"
      type="button"
      theme="primary"
      disabled={value === "" ? true : false}
      onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        window.open(value, "_blank", "noopener,noreferrer");
      }}
      style={value === "" ? { cursor: "not-allowed" } : {}}
    >
      <i className="fa fa-link"></i>
    </Button>
  );
}
