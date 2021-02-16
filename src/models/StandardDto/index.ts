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

export default StandardDto;
