import { isAllowedToDownloadStandard } from "models/Standard";
import React from "react";
import { Button } from "shards-react";

export const columnsConfig = [
  {
    Header: "Identificação",
    accessor: "identification",
  },
  {
    Header: "Data de Publicação",
    accessor: "publicationDate",
    Cell: ({ value }: { value: Date }) => `${value.toLocaleDateString("pt-BR")}`,
  },
  {
    Header: "Data de Validade",
    accessor: "validityStart",
    Cell: ({ value }: { value: Date }) => `${value.toLocaleDateString("pt-BR")}`,
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
    accessor: "file",
    Cell: DownloadFile,
  },
];

function DownloadFile({ value }: { value: string }) {
  const allowDownload = isAllowedToDownloadStandard(value);
  return (
    <Button
      outline
      className="ml-2"
      type="button"
      theme="success"
      disabled={!allowDownload}
      onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        window.open(value, "_blank", "noopener,noreferrer");
      }}
      style={!allowDownload ? { cursor: "not-allowed" } : {}}
    >
      <i className="fa fa-download"></i>
    </Button>
  );
}
