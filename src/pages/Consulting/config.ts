export const columnsConfig = [
  {
    Header: "Área de Negócio",
    accessor: "businessArea",
  },
  {
    Header: "Razão Social",
    accessor: "company",
  },
  {
    Header: "Nome Fantasia",
    accessor: "companyName",
  },
  {
    Header: "CNPJ",
    accessor: "cnpj",
  },
  {
    Header: "Data do Contrato",
    accessor: "agreementDate",
    Cell: ({ value }: { value: Date }) => {
      return `${value.toLocaleDateString("pt-BR")}`;
    },
  },
  {
    Header: "Data de Início",
    accessor: "startDate",
    Cell: ({ value }: { value: Date }) => {
      return `${value.toLocaleDateString("pt-BR")}`;
    },
  },
  {
    Header: "Data de Término",
    accessor: "endDate",
    Cell: ({ value }: { value: Date }) => {
      return `${value.toLocaleDateString("pt-BR")}`;
    },
  },
];
