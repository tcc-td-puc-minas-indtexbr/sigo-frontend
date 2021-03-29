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
  endDate: getEndDate(),
  standardId: "",
  objective: "",
  details: "",
};

function getEndDate(): Date {
  const currentDate = new Date(Date.now());
  currentDate.setFullYear(currentDate.getFullYear() + 1);
  return currentDate;
}
