export type StandardUpdateModel = {
  publicationDate: Date;
  identification: string;
  uuid: string;
  link: string;
  description: string;
  synchronized: boolean;
  title: string;
};

export const emptyStandardUpdateModel = {
  publicationDate: new Date(Date.now()),
  identification: "",
  uuid: "",
  link: "",
  description: "",
  synchronized: false,
  title: "",
};
