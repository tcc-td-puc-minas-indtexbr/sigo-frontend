interface IPageWithForm {
  index: string;
  form: string;
}

interface IRoutesPath {
  index: string;
  login: string;
  standard: IPageWithForm;
  consulting: IPageWithForm;
}

export const RoutesPath: IRoutesPath = {
  index: "/",
  login: "/login",
  standard: {
    index: "/standard",
    form: "/standard/form",
  },
  consulting: {
    index: "/consulting",
    form: "/consulting/form",
  },
};
