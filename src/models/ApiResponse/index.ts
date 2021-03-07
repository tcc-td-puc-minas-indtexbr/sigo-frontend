export type ApiListResponse<T> = {
  data: T[];
  control: {
    offset: number;
    limit: number;
    total: number;
    count: number;
  };
  meta: {
    href: string;
    next: string;
    previous: string;
    first: string;
    last: string;
  };
  links: any[];
};

export type ApiResponse<T> = {
  data: T;
  control: {
    offset: number;
    limit: number;
    total: number;
    count: number;
  };
  meta: {
    href: string;
    next: string;
    previous: string;
    first: string;
    last: string;
  };
  links: any[];
};

export type ApiResponseError = {
  error: {
    code: number;
    label: string;
    message: string;
  };
};

export type ApiDeletionResponse = {
  code: number;
  label: string;
  message: string;
  params: string[];
  success: boolean;
};

export type UploadResponse = {
  message: string;
};

export type ConsultingDto = {
  uuid: string;
  businessArea: string;
  company: string;
  companyName: string;
  cnpj: string;
  agreementDate: string;
  startDate: string;
  endDate: string;
};

export type StandardDto = {
  comite: string;
  currency: string;
  file: string;
  identification: string;
  language: string;
  objective: string | null;
  organization: string;
  pages: number;
  price: number;
  publication_date: string;
  status: string;
  title: string;
  title_global_language: string;
  url: string;
  uuid: string;
  validity_start: string;
};
