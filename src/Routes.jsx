import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
const Incidents = React.lazy(() => import("./pages/Incidents"));
// const Fires = React.lazy(() => import("./pages/Fires"));
// const Earthquakes = React.lazy(() => import("./pages/Earthquakes"));
// const Floods = React.lazy(() => import("./pages/Floods"));

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Incidents} />
      {/* <Route exact path="/flood" component={Floods} />
      <Route exact path="/earthquake" component={Earthquakes} />
      <Route exact path="/fire" component={Fires} /> */}
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
