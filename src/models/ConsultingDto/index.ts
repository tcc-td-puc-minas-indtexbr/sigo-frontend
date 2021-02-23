type ConsultingDto = {
  id: number;
  uuid: string;
  businessArea: string;
  company: string;
  companyName: string;
  cnpj: string;
  agreementDate: string;
  startDate: string;
  endDate: string;
};

export const emptyConsultingDto = {
  id: 0,
  uuid: "",
  businessArea: "",
  company: "",
  companyName: "",
  cnpj: "",
  agreementDate: "",
  startDate: "",
  endDate: "",
};

export default ConsultingDto;
