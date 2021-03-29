export type StandardModel = {
  comite: string;
  currency: string;
  file: string;
  identification: string;
  language: string;
  objective: string | null;
  organization: string;
  pages: number;
  price: number;
  publicationDate: Date;
  status: string;
  title: string;
  titleGlobalLanguage: string;
  url: string;
  uuid: string;
  validityStart: Date;
};

export const emptyStandardModel = {
  comite: "",
  currency: "",
  file: "",
  identification: "",
  language: "",
  objective: "",
  organization: "",
  pages: 0,
  price: 0,
  publicationDate: new Date(Date.now()),
  status: "",
  title: "",
  titleGlobalLanguage: "",
  url: "",
  uuid: "",
  validityStart: new Date(Date.now()),
};

export function isAllowedToDownloadStandard(file: string | undefined | null) {
  return file !== null && file !== undefined && file !== "";
}
