export type ConsultingModel = {
  uuid: string;
  businessArea: string;
  company: string;
  companyName: string;
  cnpj: string;
  agreementDate: Date;
  startDate: Date;
  endDate: Date;
  standardId: string;
  objective: string;
  details: string;
};

export const emptyConsultingModel = {
  uuid: "",
  businessArea: "",
  company: "",
  companyName: "",
  cnpj: "",
  agreementDate: new Date(Date.now()),
  startDate: new Date(Date.now()),
  endDate: new Date(Date.now()),
  standardId: "",
  objective: "",
  details: "",
};
