import { Container } from "@material-ui/core";
import React from "react";
import Incidents from "./components/Incidents";

const App = () => {
  return (
    <>
      <Container maxWidth='xl'>
        <Incidents />
      </Container>
    </>
  );
};

export default App;
