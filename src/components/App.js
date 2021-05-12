import React from "react";
import SignUp from "./Auth/SignUp";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./helpers/PrivateRoute";
function App() {
  return (
    <Router>
      <AuthProvider>
        {/* <SignUp /> */}

        <Switch>
          <PrivateRoute path="/signup" component={SignUp} />
          {/* <SignPrivateRoute path="/signin" component={SignIn} /> */}
          {/* <SignPrivateRoute path="/forgot-password" component={ForgotPassword} /> */}
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
