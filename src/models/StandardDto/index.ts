type StandardDto = {
  id: number;
  uuid: string;
  identification: string;
  publication_date: string;
  validity_start: string;
  title: string;
  title_global_language: string;
  comite: string;
  pages: number;
  status: string;
  language: string;
  organization: string;
  price: number;
  currency: string;
  objective: string | null;
  url: string;
  file: string;
};

export const emptyStandardDto = {
  id: 0,
  uuid: "",
  identification: "",
  publication_date: "",
  validity_start: "",
  title: "",
  title_global_language: "",
  comite: "",
  pages: 0,
  status: "",
  language: "",
  organization: "",
  price: 0,
  currency: "",
  objective: "",
  url: "",
  file: "",
};

export default StandardDto;
