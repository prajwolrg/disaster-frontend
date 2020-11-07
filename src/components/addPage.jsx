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

const IncidentSchema = Yup.object().shape({
    incidentDate: Yup.date().max(today).required("Required"),
    totalDeath: Yup.number().min(0, "Death must be positive").required(),
    missingPeople: Yup.number()
        .min(0, "Must be greater than or equal to zero")
        .required(),
    affectedFamily: Yup.number().min(0, "Affected Family must be positive"),
    disasterTypeName: Yup.string().required("Required"),
    estimatedLoss: Yup.number().min(0, "Loss must be greater than 0"),
    injured: Yup.number().min(0, "Loss must be greater than 0"),
    propertyLoss: Yup.number().min(0, "Must be greater than 0"),
    damagedHouses: Yup.number().min(0, "Must be greater than 0"),
    locationID: Yup.number().min(0, "Must be greater than 0"),
    sourceID: Yup.number().required("Required"),
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
                                districtName: "",
                                disasterTypeName: "",
                                incidentDate: "",
                                description: "",
                                name: "",
                                website: "drrportal.gov.np",
                            }}
                            validationSchema={IncidentSchema}
                            onSubmit={(values) => {
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                }, 500);
                            }}
                        >
                            <Form>
                                <Field
                                    style={{ margin: 10 }}
                                    name="incidentDate"
                                    component={TextField}
                                    type="Date"
                                    label="Incident Date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    fullWidth={true}
                                ></Field>
                                <Field
                                    style={{ margin: 10 }}
                                    name="totalDeath"
                                    type="number"
                                    component={TextField}
                                    label="Total Death"
                                    variant="outlined"
                                    fullWidth={true}
                                ></Field>
                                <Field
                                    style={{ margin: 10 }}
                                    name="missingPeople"
                                    type="number"
                                    component={TextField}
                                    label="Missing People"
                                    variant="outlined"
                                    fullWidth={true}
                                ></Field>
                                <Field
                                    style={{ margin: 10 }}
                                    name="disasterTypeName"
                                    component={TextField}
                                    label="Disaster Type Name"
                                    variant="outlined"
                                    fullWidth={true}
                                ></Field>
                                <Field
                                    style={{ margin: 10 }}
                                    name="estimatedLoss"
                                    type="number"
                                    component={TextField}
                                    label="Estimated Loss"
                                    variant="outlined"
                                    fullWidth={true}
                                ></Field>
                                <Field
                                    style={{ margin: 10 }}
                                    name="injured"
                                    type="number"
                                    component={TextField}
                                    label="Injured"
                                    variant="outlined"
                                    fullWidth={true}
                                ></Field>
                                <Field
                                    style={{ margin: 10 }}
                                    name="propertyLoss"
                                    type="number"
                                    component={TextField}
                                    label="Property Loss"
                                    variant="outlined"
                                    fullWidth={true}
                                ></Field>
                                <Field
                                    style={{ margin: 10 }}
                                    name="damagedHouses"
                                    type="number"
                                    component={TextField}
                                    label="Damaged Houses"
                                    variant="outlined"
                                    fullWidth={true}
                                ></Field>
                                <Field
                                    style={{ margin: 10 }}
                                    name="sourceID"
                                    type="number"
                                    component={TextField}
                                    label="Source ID"
                                    variant="outlined"
                                    fullWidth={true}
                                ></Field>
                                <Field
                                    style={{ margin: 10 }}
                                    name="locationId"
                                    type="number"
                                    component={TextField}
                                    label="Location ID"
                                    variant="outlined"
                                    fullWidth={true}
                                ></Field>
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
