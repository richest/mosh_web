import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  isauth,
  isPageProtected,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isauth ? (
          isPageProtected ?
            <Component {...props} />
            :
            <Redirect
              to="/login"
            />
        )
          :
          (
            <Redirect
              to="/home"
            />
          )
      }
    />
  );
};
export default ProtectedRoute;