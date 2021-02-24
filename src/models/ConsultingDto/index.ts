type ConsultingDto = {
  id: number;
  uuid: string;
  businessArea: string;
  company: string;
  companyName: string;
  cnpj: string;
  agreementDate: Date;
  startDate: Date;
  endDate: Date;
};

export const emptyConsultingDto = {
  id: 0,
  uuid: "",
  businessArea: "",
  company: "",
  companyName: "",
  cnpj: "",
  agreementDate: new Date(Date.now()),
  startDate: new Date(Date.now()),
  endDate: new Date(Date.now()),
};

export default ConsultingDto;
