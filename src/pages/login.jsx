import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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

export default function AdminForm({ submitFuction, title }) {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography
                    component="h1"
                    variant="h5"
                    style={{ marginBottom: 20 }}
                >
                    {title}
                </Typography>
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                    }}
                    onSubmit={(values) => {
                        submitFuction(values);
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
                {/* <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid> */}
            </div>
        </Container>
    );
}
