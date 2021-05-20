import React from "react";
import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import Services from "./Services/Services";
import Home from "./Public/Home/Home";

import Dashboard from "./Dashboard/Dashboard";
import AdminPanel from "./AdminPanel/AdminPanel";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute, SignPrivateRoute } from "./helpers/PrivateRoute";
import { AdminProvider } from "./context/AdminContext";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <SignPrivateRoute path="/home" component={Home} />
          <SignPrivateRoute path="/signup" component={SignUp} />
          <SignPrivateRoute path="/signin" component={SignIn} />
          <SignPrivateRoute
            path="/forgot-password"
            component={ForgotPassword}
          />
          <SignPrivateRoute path="/reset-password" component={ResetPassword} />

          <AdminPanel>
            <AdminProvider>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/services" component={Services} />
            </AdminProvider>
          </AdminPanel>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
