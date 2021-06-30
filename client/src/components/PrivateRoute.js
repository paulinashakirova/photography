import React from "react";
import { Route, Redirect } from "react-router-dom";

const userIsLoggedIn = () => {
  if (localStorage.getItem("token")) return true;
  return false;
};

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        userIsLoggedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}
