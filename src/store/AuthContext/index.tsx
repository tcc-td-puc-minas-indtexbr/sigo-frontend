import React, { useState } from "react";
import { ReactNodeLike } from "prop-types";
import LoginRequest from "@models/Request/LoginRequest";
import AuthService from "../../services/AuthService";
import { LocalStorageKeys } from "shared/constants";

type User = {
  id: string,
  name: string,
  role: string,
  email: string,
  avatarUrl: string,
};

type AuthContextProps = {
  isAuthenticated: boolean;
  token: string;
  user: User;
  login: (request: LoginRequest) => Promise<boolean>;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNodeLike;
};

const userInitialState = {
  id: "",
  name: "",
  role: "",
  email: "",
  avatarUrl: "",
};

const AuthContext = React.createContext<AuthContextProps>({
  isAuthenticated: false,
  token: "",
  user: userInitialState,
  login: () => Promise.resolve(false),
  logout: () => void(0)
});

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const authService = new AuthService();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<User>(userInitialState);

  const login = async (request: LoginRequest) => {
    const response = await authService.Login(request);

    if (!response.isSuccess)
      return false;

    localStorage.setItem(LocalStorageKeys.user, JSON.stringify(response.user));
    localStorage.setItem(LocalStorageKeys.token, JSON.stringify(response.token));
    setUser(response.user);
    setToken(response.token);
    setIsAuthenticated(true);

    return true;
  };

  const logout = () => {
    localStorage.setItem(LocalStorageKeys.user, "");
    localStorage.setItem(LocalStorageKeys.token, "");
    setUser(userInitialState);
    setToken("");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      token, 
      user,
      login,
      logout
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
