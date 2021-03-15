import React, { useState } from "react";
import { Tooltip, Button } from "shards-react";

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
    Header: "Data de Validade",
    accessor: "validityStart",
    Cell: ({ value }: { value: Date }) => {
      return `${value.toLocaleDateString("pt-BR")}`;
    },
  },
  {
    Header: "Título",
    accessor: "title",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Idioma",
    accessor: "language",
  },
  {
    Header: "Organização",
    accessor: "organization",
  },
  {
    Header: "Objetivo",
    accessor: "objective",
  },
  {
    Header: "Baixar",
    accessor: "url",
    Cell: DownloadFile,
  },
];

function DownloadFile({ value }: { value: string }) {
  return (
    <Button
      outline
      className="ml-2"
      type="button"
      theme="success"
      disabled={value === "" ? true : false}
      onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        window.open(value, "_blank", "noopener,noreferrer");
      }}
      style={value === "" ? { cursor: "not-allowed" } : {}}
    >
      <i className="fa fa-download"></i>
    </Button>
  );
}
