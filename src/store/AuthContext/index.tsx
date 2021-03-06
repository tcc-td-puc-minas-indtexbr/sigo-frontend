import Amplify from "aws-amplify";
import { LoginRequest } from "models/Request";
import { UserModel, userModelInitialState } from "models/User";
import { ReactNodeLike } from "prop-types";
import React, { useEffect, useState } from "react";
import AuthService from "services/AuthService";
import { LocalStorageKeys } from "shared/constants";

type AuthContextProps = {
  token: string;
  user: UserModel;
  login: (request: LoginRequest) => Promise<boolean>;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNodeLike;
};

const AuthContext = React.createContext<AuthContextProps>({
  token: "",
  user: userModelInitialState,
  login: () => Promise.resolve(false),
  logout: () => void 0,
});

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const authService = new AuthService();
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<UserModel>(userModelInitialState);

  const login = async (request: LoginRequest) => {
    const response = await authService.Login(request);

    if (!response.isSuccess) return false;

    localStorage.setItem(LocalStorageKeys.user, JSON.stringify(response.user));
    localStorage.setItem(LocalStorageKeys.token, JSON.stringify(response.token));
    setUser(response.user);
    setToken(response.token);

    return true;
  };

  const logout = () => {
    localStorage.setItem(LocalStorageKeys.user, "");
    localStorage.setItem(LocalStorageKeys.token, "");

    setUser(userModelInitialState);
    localStorage.clear();
  };

  useEffect(() => {
    const token = localStorage.getItem(LocalStorageKeys.token);
    const user = localStorage.getItem(LocalStorageKeys.user);

    if (token !== "" && token !== null && user !== "" && user !== null) {
      setUser(JSON.parse(user));
      setToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
