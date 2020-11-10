import React, { useContext } from "react";
import {
  CardContent,
  Button,
  Typography,
  Container,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Dialog, DialogTitle } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Context as ApiContext } from "../../context/ApiContext";

import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  paper: {
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SourceSchema = Yup.object().shape({
  name: Yup.string().min(3).max(20).required(),
  website: Yup.string().url().required(),
});

const AddSource = (props) => {
  const classes = useStyles();
  const { open, onClose } = props;
  const { addDataSource } = useContext(ApiContext);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Source</DialogTitle>

      <Container component="main" maxWidth="xs">
        <CssBaseline></CssBaseline>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Source
          </Typography>
          <CardContent>
            <Formik
              initialValues={{
                name: "",
                website: "",
              }}
              validationSchema={SourceSchema}
              onSubmit={async (values,action) => {
                await addDataSource(values);
                action.resetForm();
                handleClose();
              }}
            >
              <Form>
                <Field
                  style={{ margin: 10 }}
                  name="name"
                  component={TextField}
                  label="Name"
                  variant="outlined"
                  fullWidth={true}
                />
                <Field
                  style={{ margin: 10 }}
                  name="website"
                  component={TextField}
                  label="Website"
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
                  continue
                </Button>
              </Form>
            </Formik>
          </CardContent>
        </div>
      </Container>
    </Dialog>
  );
};

export default AddSource;
