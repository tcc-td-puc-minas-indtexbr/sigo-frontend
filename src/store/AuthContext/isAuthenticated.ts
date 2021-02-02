import { LocalStorageKeys } from "../../shared/constants"

//IMprove this method to check with some api and also the way which the user and token are retrivied 
export const isAuthenticated = () => {
  const token = localStorage.getItem(LocalStorageKeys.token);
  const user = localStorage.getItem(LocalStorageKeys.token);

  return token !== "" && token !== null && user !== "" && user !== null;
};
