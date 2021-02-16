import { ReactNodeLike } from "prop-types";
import React, { useState } from "react";

type AppContextProps = {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
};

type AppProviderProps = {
  children: ReactNodeLike;
};

const AppContext = React.createContext<AppContextProps>({
  isSidebarVisible: false,
  toggleSidebar: () => void 0,
});

export const AppProvider: React.FC<AppProviderProps> = (props) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  return (
    <AppContext.Provider value={{ isSidebarVisible, toggleSidebar }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
