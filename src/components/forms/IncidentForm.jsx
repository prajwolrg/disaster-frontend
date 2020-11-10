import React, { useContext, useEffect, useState } from "react";
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

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import AddIcon from "@material-ui/icons/Add";

import { Field, Form, Formik } from "formik";
import { TextField, Select } from "formik-material-ui";
import * as Yup from "yup";
import { Context as ApiContext } from "../../context/ApiContext";

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

const IncidentForm = ({
  open,
  onClose,
  disasterTypeName,
  submitFunction,
  initialValues,
  type,
}) => {
  const classes = useStyles();

  const {
    state: { districts, VMsForDistrict, sources, disasterTypeNames },
    getDistricts,
    getVMsForDistrict,
    getSources,
    getDisasterTypeNames,
  } = useContext(ApiContext);

  const [currentDisasterTypeName, setCurrentDisasterTypeName] = useState(
    disasterTypeName
  );

  useEffect(
    () =>
      (async () => {
        setCurrentDisasterTypeName(disasterTypeName);
        if (!districts) await getDistricts();
        if (!sources) await getSources();
        if (!disasterTypeNames) await getDisasterTypeNames();
        if (initialValues.districtName)
          await getVMsForDistrict(initialValues.districtName);
      })(),
    [disasterTypeName]
  );

  const handleClose = () => {
    onClose();
    getVMsForDistrict(null);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{type} items</DialogTitle>

      <Container component="main" maxWidth="xs">
        <CssBaseline></CssBaseline>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {type} Data
          </Typography>
          <CardContent>
            <Formik
              initialValues={initialValues}
              validationSchema={IncidentSchema}
              onSubmit={async (values, action) => {
                delete values.districtName;
                await submitFunction(values);
                action.resetForm();
                handleClose();
              }}
            >
              {({ initialValues, values }) => (
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
                  />
                  <Field
                    style={{ margin: 10 }}
                    name="totalDeath"
                    type="number"
                    component={TextField}
                    label="Total Death"
                    variant="outlined"
                    fullWidth={true}
                  />
                  <Field
                    style={{ margin: 10 }}
                    name="missingPeople"
                    type="number"
                    component={TextField}
                    label="Missing People"
                    variant="outlined"
                    fullWidth={true}
                  />
                  <FormControl
                    fullWidth={true}
                    variant="outlined"
                    style={{ margin: 10 }}
                  >
                    Disaster Type Name
                    <Field
                      component={Select}
                      name="disasterTypeName"
                      disabled={!!disasterTypeName}
                      inputProps={{
                        id: "disasterTypeName",
                      }}
                      onChange={(p) => {
                        initialValues[p.target.name] = p.target.value;
                        values[p.target.name] = p.target.value;
                        setCurrentDisasterTypeName(p.target.value);
                      }}
                    >
                      {disasterTypeNames &&
                        disasterTypeNames.map((disasterTN) => (
                          <MenuItem
                            key={disasterTN.disasterTypeName}
                            value={disasterTN.disasterTypeName}
                          >
                            {disasterTN.disasterTypeName}
                          </MenuItem>
                        ))}
                    </Field>
                  </FormControl>

                  {currentDisasterTypeName === "Earthquake" && (
                    <>
                      <Field
                        style={{
                          margin: 10,
                        }}
                        name="richterMagnitude"
                        type="number"
                        component={TextField}
                        label="Richter Magnitude"
                        variant="outlined"
                        fullWidth={true}
                      />
                      <Field
                        style={{
                          margin: 10,
                        }}
                        name="epicenter"
                        component={TextField}
                        label="Epicenter"
                        variant="outlined"
                        fullWidth={true}
                      />
                    </>
                  )}

                  {currentDisasterTypeName === "Fire" && (
                    <Field
                      style={{
                        margin: 10,
                      }}
                      name="cause"
                      component={TextField}
                      label="Cause of Fire"
                      variant="outlined"
                      fullWidth={true}
                    />
                  )}
                  {currentDisasterTypeName === "Flood" && (
                    <>
                      <Field
                        style={{
                          margin: 10,
                        }}
                        name="origin"
                        component={TextField}
                        label="Origin"
                        variant="outlined"
                        fullWidth={true}
                      />
                      <Field
                        style={{
                          margin: 10,
                        }}
                        name="height"
                        type="number"
                        component={TextField}
                        label="Height"
                        variant="outlined"
                        fullWidth={true}
                      />
                      <Field
                        style={{
                          margin: 10,
                        }}
                        name="cattleLoss"
                        type="number"
                        component={TextField}
                        label="Cattle Loss"
                        variant="outlined"
                        fullWidth={true}
                      />
                    </>
                  )}
                  <Field
                    style={{ margin: 10 }}
                    name="estimatedLoss"
                    type="number"
                    component={TextField}
                    label="Estimated Loss"
                    variant="outlined"
                    fullWidth={true}
                  />
                  <Field
                    style={{ margin: 10 }}
                    name="injured"
                    type="number"
                    component={TextField}
                    label="Injured"
                    variant="outlined"
                    fullWidth={true}
                  />
                  <Field
                    style={{ margin: 10 }}
                    name="propertyLoss"
                    type="number"
                    component={TextField}
                    label="Property Loss"
                    variant="outlined"
                    fullWidth={true}
                  />
                  <Field
                    style={{ margin: 10 }}
                    name="affectedFamily"
                    type="number"
                    component={TextField}
                    label="Affected Family"
                    variant="outlined"
                    fullWidth={true}
                  />
                  <Field
                    style={{ margin: 10 }}
                    name="damagedHouses"
                    type="number"
                    component={TextField}
                    label="Damaged Houses"
                    variant="outlined"
                    fullWidth={true}
                  />
                  <FormControl
                    fullWidth={true}
                    variant="outlined"
                    style={{ margin: 10 }}
                  >
                    Source
                    <Field
                      component={Select}
                      name="sourceID"
                      inputProps={{
                        id: "sourceID",
                      }}
                    >
                      {sources &&
                        sources.map((source) => (
                          <MenuItem
                            key={source.sourceID}
                            value={source.sourceID}
                          >
                            {source.name}
                          </MenuItem>
                        ))}
                    </Field>
                  </FormControl>
                  <FormControl
                    fullWidth={true}
                    variant="outlined"
                    style={{ margin: 10 }}
                  >
                    District
                    <Field
                      component={Select}
                      name="districtName"
                      inputProps={{
                        id: "districtName",
                      }}
                      onChange={async (p) => {
                        initialValues[p.target.name] = p.target.value;
                        values[p.target.name] = p.target.value;
                        await getVMsForDistrict(p.target.value);
                      }}
                    >
                      {districts &&
                        districts.map((district) => (
                          <MenuItem
                            key={district.districtName}
                            value={district.districtName}
                          >
                            {district.districtName}
                          </MenuItem>
                        ))}
                    </Field>
                  </FormControl>

                  {VMsForDistrict && (
                    <FormControl
                      fullWidth={true}
                      variant="outlined"
                      style={{ margin: 10 }}
                    >
                      VDC or Municipality
                      <Field
                        component={Select}
                        name="locationID"
                        inputProps={{
                          id: "locationID",
                        }}
                      >
                        {VMsForDistrict &&
                          VMsForDistrict.map((vm) => (
                            <MenuItem key={vm.vmID} value={vm.vmID}>
                              {vm.name}
                            </MenuItem>
                          ))}
                      </Field>
                    </FormControl>
                  )}
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
              )}
            </Formik>
          </CardContent>
        </div>
      </Container>
    </Dialog>
  );
};

export default IncidentForm;
