import React from "react";
import {
    CardContent,
    Button,
    Typography,
    Link,
    Container,
    FormControlLabel,
    InputAdornment,
    Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Dialog, DialogTitle } from "@material-ui/core";

import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import AddIcon from "@material-ui/icons/Add";
import StayPrimaryPortraitOutlinedIcon from "@material-ui/icons/StayPrimaryPortraitOutlined";

import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { TextField, Select } from "formik-material-ui";
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
const today = new Date();

const SignupSchema = Yup.object().shape({
    location: Yup.string()
        .min(3, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    dateOfBirth: Yup.date().max(today).required("Required"),
    mobileNumber: Yup.string()
        .length(10, "Invalid mobile number")
        .required("Required"),
});

const RegisterForm = (props) => {
    const classes = useStyles();
    const { open, onClose } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add items</DialogTitle>

            <Container component="main" maxWidth="xs">
                <CssBaseline></CssBaseline>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Data
                    </Typography>
                    <CardContent>
                        <Formik
                            initialValues={{
                                dateOfBirth: "",
                                location: "",
                                mobileNumber: "",
                                gender: "female",
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={(values) => {
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                }, 500);
                            }}
                        >
                            <Form>
                                <Field
                                    style={{ margin: 10 }}
                                    name="location"
                                    component={TextField}
                                    type="location"
                                    label="Location"
                                    variant="outlined"
                                    fullWidth={true}
                                ></Field>
                                <Field
                                    style={{ margin: 10 }}
                                    name="mobileNumber"
                                    component={TextField}
                                    label="Mobile Number"
                                    variant="outlined"
                                    fullWidth={true}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                +977
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <StayPrimaryPortraitOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                ></Field>
                                <Field
                                    style={{ margin: 10 }}
                                    name="dateOfBirth"
                                    component={TextField}
                                    type="Date"
                                    label="Date of Birth"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    fullWidth={true}
                                ></Field>
                                <FormControl
                                    fullWidth={true}
                                    variant="outlined"
                                    style={{ margin: 10 }}
                                >
                                    Gender
                                    <Field
                                        component={Select}
                                        name="gender"
                                        inputProps={{
                                            id: "gender",
                                        }}
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">
                                            Female
                                        </MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Field>
                                </FormControl>
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

export default RegisterForm;
