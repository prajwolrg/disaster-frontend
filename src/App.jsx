import { CircularProgress } from "@material-ui/core";
import React, { Suspense, useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Menus from "./components/Menus";
import Routes from "./Routes";
import { Context as AuthContext } from "./context/AuthContext";

const App = () => {
  const {getUser} =useContext(AuthContext);
  useEffect(getUser,[]);
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
