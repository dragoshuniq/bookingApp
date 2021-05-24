import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PublicProvider } from "../context/PublicContext";
import { AdminProvider } from "../context/AdminContext";

export function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <AdminProvider>
      <Route
        {...rest}
        render={(props) => {
          return currentUser ? (
            <Component {...props} />
          ) : (
            <Redirect to="/home" />
          );
        }}
      ></Route>
    </AdminProvider>
  );
}

export function SignPrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <PublicProvider>
      <Route
        {...rest}
        render={(props) => {
          return !currentUser ? <Component {...props} /> : <Redirect to="/" />;
        }}
      ></Route>
    </PublicProvider>
  );
}
