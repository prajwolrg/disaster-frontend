import { CircularProgress } from "@material-ui/core";
import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavTabs from "./components/Tabs";
import Routes from "./Routes";

const App = () => {
  return (
    <>
      <Router>
        <NavTabs/>
        <Suspense fallback={<CircularProgress />}>
          <Routes />
        </Suspense>
      </Router>
    </>
  );
};

export default App;
