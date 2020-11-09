import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context as AuthContext } from "../context/AuthContext";
import LoginForm from "./AdminForm";

export default () => {
  const {
    createAdmin,
    state:{errorMessage}
  } = useContext(AuthContext);
  const history=useHistory();
  const afterSubmit = async (values) => {
    await createAdmin(values);
    if(!errorMessage) history.push("/");
  };

  return (
    <LoginForm
      submitFunction={afterSubmit}
      title="Create User"
    />
  );
};