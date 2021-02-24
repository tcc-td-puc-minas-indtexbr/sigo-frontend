import Routes from "./routes";
import { AppProvider } from "./store/AppContext";
import { AuthProvider } from "./store/AuthContext";
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Routes />
      </AppProvider>
    </AuthProvider>
  );
}
