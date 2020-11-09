import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import LoginForm from "./LoginForm";

const Login = () => {
  const { signin, getUser } = useContext(AuthContext);
  const afterSubmbit = async (values) => {
    await signin(values);
    await getUser();
  };

  return <LoginForm submitFunction={afterSubmbit} title="Sign In" />;
};

export default Login;
