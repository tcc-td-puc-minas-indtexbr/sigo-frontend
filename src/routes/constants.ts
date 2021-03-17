interface IPageWithForm {
  index: string;
  form: string;
}

interface IPageWithSync extends IPageWithForm {
  check: string;
}

interface IStandard extends IPageWithForm {
  formImport: string;
}

interface IRoutesPath {
  index: string;
  login: string;
  standard: IStandard;
  standardUpdate: IPageWithSync;
  consulting: IPageWithForm;
}

export const RoutesPath: IRoutesPath = {
  index: "/",
  login: "/login",
  standard: {
    index: "/standard",
    form: "/standard/form",
    formImport: "/standard/form/import",
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
