import { CircularProgress } from "@material-ui/core";
import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Menus from "./components/Menus";
import Routes from "./Routes";

const App = () => {
  return (
    <>
      <Router>
        <Menus />
        <Suspense fallback={<CircularProgress />}>
          <Routes />
        </Suspense>
      </Router>
    </>
  );
};

export default App;
