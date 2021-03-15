import { StandardUpdateModel } from "../../models/StandardUpdate";
import { RoutesPath } from "../../routes/constants";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Tooltip, Button } from "shards-react";

export const columnsConfig = [
  {
    Header: "Identificação",
    Cell: Navigate,
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
    Cell: ({ value }: { value: boolean }) => {
      if (value) {
        return `Sim`;
      } else {
        return `Não`;
      }
    },
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

function Navigate({ row }: { row: any }) {
  const value = row.original;
  const url = RoutesPath.standardUpdate.form + "/" + value.uuid;
  return (
    <a
      onClick={() => {
        // useHistory().push(`${url}`);
        window.location.href = url;
      }}
    >
      {value.identification}
    </a>
  );
}
function Import({ row }: { row: any }) {
  const value = row.original;
  const url = RoutesPath.standard.form + "/?import=true&ref=" + value.uuid;
  return (
    <Button
      outline
      // className="ml-4"
      type="button"
      theme="success"
      disabled={value === "" ? true : false}
      onClick={() => {
        window.location.href = url;
      }}
      style={value === "" ? { cursor: "not-allowed" } : {}}
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
      onClick={() => window.open(value)}
      style={value === "" ? { cursor: "not-allowed" } : {}}
    >
      <i className="fa fa-link"></i>
    </Button>
  );
}
