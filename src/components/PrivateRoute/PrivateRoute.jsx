import React from "react";
import { instanceOf } from "prop-types";
import { Route, Redirect } from "react-router";
import { withCookies, Cookies } from "react-cookie";
// constant
import { folderRoot } from "constant/index.js";

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  handleLogOut = () => {
    const { cookies } = this.props;
    cookies.remove("authUserShinSJS", { path: `/` });
  };

  render = () => {
    const { Component, cookies, ...rest } = this.props;
    const isAuthenticated =
      cookies.get("authUserShinSJS") == null ? false : true;
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Component {...props} onLogout={this.handleLogOut} />
          ) : (
            <Redirect
              to={{
                pathname: `${folderRoot}login`,
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  };
}

export default withCookies(PrivateRoute);
