interface IPageWithForm {
  index: string;
  form: string;
}

interface IRoutesPath {
  index: string;
  login: string;
  standard: IPageWithForm;
  consultancy: IPageWithForm;
}

export const RoutesPath: IRoutesPath = {
  index: "/",
  login: "/login",
  standard: {
    index: "/standard",
    form: "/standard/form",
  },
  consultancy: {
    index: "/consultancy",
    form: "/consultancy/form",
  },
};
