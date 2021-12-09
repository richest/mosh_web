import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  isauth,
  isPagePrivate,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !!isauth ? (
          isPagePrivate ?
            <Component {...props} />
            :
            <Redirect
              to="/home"
            />
        )
          :
          (
            <Redirect
              to="/login"
            />
          )
      }
    />
  );
};
export default PrivateRoute;