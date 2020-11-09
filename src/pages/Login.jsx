import React, { useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import LoginForm from "./AdminForm";

const Login = () => {
  const { signin, getUser } = useContext(AuthContext);
  const afterSubmit = async (values) => {
    await signin(values);
    await getUser();
  };

  return <LoginForm submitFunction={afterSubmit} title="Sign In" />;
};

export default Login;
