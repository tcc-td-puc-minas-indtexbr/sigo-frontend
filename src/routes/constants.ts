interface IPageWithForm {
  index: string;
  form: string;
}

interface IPageWithSync {
  index: string;
  form: string;
  check: string;
}

interface IRoutesPath {
  index: string;
  login: string;
  standard: IPageWithForm;
  standardUpdate: IPageWithSync;
  consulting: IPageWithForm;
}

export const RoutesPath: IRoutesPath = {
  index: "/",
  login: "/login",
  standard: {
    index: "/standard",
    form: "/standard/form",
  },
  standardUpdate: {
    index: "/standard-update/",
    form: "/standard-update/form",
    check: "/standard-update/check",
  },
  consulting: {
    index: "/consulting",
    form: "/consulting/form",
  },
};
