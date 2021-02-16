import routes from "./routes";
import { isAuthenticated } from "../store/AuthContext/isAuthenticated";
import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

const Routes: React.FC = () => {
  return (
    <Router>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={() => {
              const authenticatedUser = isAuthenticated();
              if (route.public || (!route.public && authenticatedUser)) {
                if (route.path === "/login" && authenticatedUser) return <Redirect to="/" />;

                return (
                  <route.layout>
                    <route.component />
                  </route.layout>
                );
              }

              return <Redirect to="/login" />;
            }}
          />
        );
      })}
    </Router>
  );
};

export default Routes;
