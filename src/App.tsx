import Routes from "./routes";
import { AppProvider } from "./store/AppContext";
import { AuthProvider } from "./store/AuthContext";
import pack from "../package.json";
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

console.log("App Version: ", pack.version);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <Routes />
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
