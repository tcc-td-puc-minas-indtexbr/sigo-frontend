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
