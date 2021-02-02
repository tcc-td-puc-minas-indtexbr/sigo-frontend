import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import routes from './routes';
import { isAuthenticated } from '../store/AuthContext/isAuthenticated';

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

              if (isAuthenticated()) {
                if (route.path === "/login")
                  return <Redirect to="/" />

                return (
                  <route.layout>
                    <route.component />
                  </route.layout>
                );
              }

              //TODO remove this duplication
              if (route.public) {
                return (
                  <route.layout>
                    <route.component />
                  </route.layout>
                );
              }

              return <Redirect to="/login" />
            }}
          />
        );
      })}
    </Router>
  );
}

export default Routes;
