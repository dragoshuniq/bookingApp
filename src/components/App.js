import React from "react";
import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import Services from "./Services/Services";
import Home from "./Public/Home/Home";
import Bookings from "./Bookings/Bookings";

import Dashboard from "./Dashboard/Dashboard";
import AdminPanel from "./AdminPanel/AdminPanel";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute, SignPrivateRoute } from "./helpers/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
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
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/services" component={Services} />
            <PrivateRoute exact path="/bookings" component={Bookings} />
          </AdminPanel>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
