import React, { useEffect, useState } from 'react';
import { ReactNodeLike } from 'prop-types';
import LoginRequest from '../../models/Request/LoginRequest';
import AuthService from '../../services/AuthService';
import { LocalStorageKeys } from 'shared/constants';

type User = {
  name: string;
  role: string;
  email: string;
  avatarUrl: string;
};

type AuthContextProps = {
  token: string;
  user: User;
  login: (request: LoginRequest) => Promise<boolean>;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNodeLike;
};

const userInitialState = {
  name: '',
  role: '',
  email: '',
  avatarUrl: '',
};

const AuthContext = React.createContext<AuthContextProps>({
  token: '',
  user: userInitialState,
  login: () => Promise.resolve(false),
  logout: () => void 0,
});

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const authService = new AuthService();
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<User>(userInitialState);

  const login = async (request: LoginRequest) => {
    const response = await authService.Login(request);

    if (!response.isSuccess) return false;

    localStorage.setItem(LocalStorageKeys.user, JSON.stringify(response.user));
    localStorage.setItem(
      LocalStorageKeys.token,
      JSON.stringify(response.token),
    );
    setUser(response.user);
    setToken(response.token);

    return true;
  };

  const logout = () => {
    localStorage.setItem(LocalStorageKeys.user, '');
    localStorage.setItem(LocalStorageKeys.token, '');
    setUser(userInitialState);
    setToken('');
  };

  useEffect(() => {
    const token = localStorage.getItem(LocalStorageKeys.token);
    const user = localStorage.getItem(LocalStorageKeys.user);

    if (token !== '' && token !== null && user !== '' && user !== null) {
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
