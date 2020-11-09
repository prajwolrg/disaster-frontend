import React, { useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {Alert} from "@material-ui/lab"
import { Context as AuthContext } from "../context/AuthContext";

import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AdminForm({ submitFunction, title }) {
  const classes = useStyles();
  const {state:{errorMessage}}=useContext(AuthContext);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ marginBottom: 20 }}>
          {title}
        </Typography>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(values) => {
            submitFunction(values);
          }}
        >
          <Form>
            <Field
              style={{ margin: 10 }}
              name="username"
              component={TextField}
              label="UserName"
              variant="outlined"
              fullWidth={true}
            />
            <Field
              style={{ margin: 10 }}
              name="password"
              component={TextField}
              type="password"
              label="Password"
              variant="outlined"
              fullWidth={true}
            />
            <Button
              style={{ margin: 10 }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {title}
            </Button>
          </Form>
        </Formik>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </div>
    </Container>
  );
}
