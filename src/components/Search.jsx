import React, { useEffect, useContext, useState } from "react";
import { Field, Form, Formik } from "formik";
import { TextField, Select } from "formik-material-ui";
import { Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import * as Yup from "yup";
import { Context as ApiContext } from "../context/ApiContext";

const today = new Date();

const SearchSchema = Yup.object().shape({
  dateFrom: Yup.date().max(today),
  dateTo: Yup.date().max(today),
});

export default ({ submitFunction }) => {
  const [resetFields, setResetFields] = useState(false);
  const {
    state: { districts, VMsForDistrict, sources },
    getDistricts,
    getVMsForDistrict,
    getSources,
  } = useContext(ApiContext);
  useEffect(
    () =>
      (async () => {
        if (!districts) await getDistricts();
        if (!sources) await getSources();
      })(),
    []
  );
  useEffect(() => {
    setResetFields(false);
  }, [resetFields]);
  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <Formik
        initialValues={{}}
        validationSchema={SearchSchema}
        onSubmit={async (values, action) => {
          submitFunction(values);
        }}
        onReset={() => {
          setResetFields(true);
          getVMsForDistrict(null);
        }}
      >
        {({ values, resetForm, handleChange, setFieldValue, submitForm }) =>
          !resetFields && (
            <Form>
              <Field
                style={{ margin: 10, marginTop: 29, backgroundColor: "white" }}
                name="dateFrom"
                component={TextField}
                type="Date"
                label="From"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              <Field
                style={{ margin: 10, marginTop: 29, backgroundColor: "white" }}
                name="dateTo"
                component={TextField}
                type="Date"
                label="To"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              <FormControl variant="outlined" style={{ margin: 10 }}>
                Source
                <Field
                  component={Select}
                  name="sourceID"
                  inputProps={{
                    id: "sourceID",
                  }}
                  style={{ backgroundColor: "white" }}
                >
                  <MenuItem value={null}>Any</MenuItem>
                  {sources &&
                    sources.map((source) => (
                      <MenuItem key={source.sourceID} value={source.sourceID}>
                        {source.name}
                      </MenuItem>
                    ))}
                </Field>
              </FormControl>
              <FormControl variant="outlined" style={{ margin: 10 }}>
                District
                <Field
                  component={Select}
                  name="districtName"
                  inputProps={{
                    id: "districtName",
                  }}
                  onChange={async (p) => {
                    handleChange(p);
                    setFieldValue("vmID", null);
                    await getVMsForDistrict(p.target.value);
                  }}
                  style={{ backgroundColor: "white" }}
                >
                  <MenuItem value={null}>Any</MenuItem>
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
              <FormControl variant="outlined" style={{ margin: 10 }}>
                VDC or Municipality
                <Field
                  component={Select}
                  name="vmID"
                  inputProps={{
                    id: "vmID",
                  }}
                  style={{ backgroundColor: "white" }}
                >
                  <MenuItem value={null}>Any</MenuItem>
                  {VMsForDistrict &&
                    VMsForDistrict.map((vm) => (
                      <MenuItem key={vm.vmID} value={vm.vmID}>
                        {vm.name}
                      </MenuItem>
                    ))}
                </Field>
              </FormControl>
              <Button
                style={{
                  marginLeft: 30,
                  marginTop: "30px",
                  marginBottom: "20px",
                }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Search
              </Button>
              <Button
                style={{
                  marginLeft: 30,
                  marginTop: "30px",
                  marginBottom: "20px",
                }}
                color="primary"
                type="reset"
                onClick={() => {
                  resetForm();
                  submitForm();
                }}
              >
                Reset
              </Button>
            </Form>
          )
        }
      </Formik>
    </div>
  );
};
