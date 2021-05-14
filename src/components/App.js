import React from "react";
import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";

import Dashboard from "./Dashboard/Dashboard";
import AdminPanel from "./AdminPanel/AdminPanel";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute, SignPrivateRoute } from "./helpers/PrivateRoute";
import { Container, Navbar, Button, Row, Col } from "react-bootstrap";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <SignPrivateRoute path="/signup" component={SignUp} />
          <SignPrivateRoute path="/signin" component={SignIn} />
          <SignPrivateRoute
            path="/forgot-password"
            component={ForgotPassword}
          />
          <SignPrivateRoute path="/reset-password" component={ResetPassword} />

          <AdminPanel>
            <PrivateRoute exact path="/" component={Dashboard} />
          </AdminPanel>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
