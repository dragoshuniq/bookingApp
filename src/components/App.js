import React from "react";
import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";

import Dashboard from "./Dashboard/Dashboard";

import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute, SignPrivateRoute } from "./helpers/PrivateRoute";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <SignPrivateRoute path="/signup" component={SignUp} />
          <SignPrivateRoute path="/signin" component={SignIn} />
          <SignPrivateRoute
            path="/forgot-password"
            component={ForgotPassword}
          />
          <SignPrivateRoute path="/reset-password" component={ResetPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
