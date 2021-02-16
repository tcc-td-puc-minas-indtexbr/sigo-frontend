interface IStandardRoutes {
  index: string;
  form: string;
}

interface IRoutesPath {
  index: string;
  login: string;
  standard: IStandardRoutes;
}

export const RoutesPath: IRoutesPath = {
  index: "/",
  login: "/login",
  standard: {
    index: "/standard",
    form: "/standard/form",
  },
};
