import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from './routes';
import { AppProvider } from './store/AppContext';
import { AuthProvider } from './store/AuthContext';

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import "mdbreact/dist/css/mdb.css";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={() => {
                  return (
                    <route.layout>
                      <route.component />
                    </route.layout>
                  );
                }}
              />
            );
          })}
        </AppProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
