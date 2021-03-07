import Routes from "./routes";
import { AppProvider } from "./store/AppContext";
import { AuthProvider } from "./store/AuthContext";
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import { ToastProvider } from "react-toast-notifications";

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider placement="bottom-right" autoDismiss={true} autoDismissTimeout={5000}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
