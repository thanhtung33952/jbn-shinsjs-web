import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";
import { Provider } from "react-redux";
import { initializeStore } from "store/index.js";
import PrivateRoute from "components/PrivateRoute/PrivateRoute.jsx";
import indexRoutes from "routes/index.jsx";

var hist = createBrowserHistory();

ReactDOM.render(
  <CookiesProvider>
    <Provider store={initializeStore()}>
      <Router history={hist}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            if (prop.protected === true) {
              return (
                <PrivateRoute
                  path={prop.path}
                  key={key}
                  Component={prop.component}
                />
              );
            }

            return (
              <Route path={prop.path} key={key} component={prop.component} />
            );
          })}
        </Switch>
      </Router>
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
