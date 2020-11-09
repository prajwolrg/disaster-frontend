import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
const Incidents = React.lazy(() => import("./pages/Incidents"));
const SignIn = React.lazy(() => import("./pages/Login"));
const CreateUser = React.lazy(() => import("./pages/CreateUser"));

export const LoggedInRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Incidents} />
      <Route exact path="/create" component={CreateUser} />
      <Redirect to="/" />
    </Switch>
  );
};

export const LoggedOutRoutes=()=>{
  return (
    <Switch>
    <Route exact path="/" component={Incidents} />
    <Route exact path="/signin" component={SignIn} />
    <Redirect to="/signin" />
    </Switch>
  )
};
