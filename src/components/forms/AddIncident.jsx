import React, { useContext } from "react";
import { Context as ApiContext } from "../../context/ApiContext";
import IncidentForm from "./IncidentForm";

const AddIncident = ({ open, onClose, disasterTypeName }) => {
  const { addIncident } = useContext(ApiContext);

  return (
    <IncidentForm
      type="Add"
      open={open}
      onClose={onClose}
      disasterTypeName={disasterTypeName || ""}
      initialValues={{
        incidentDate: new Date(),
        disasterTypeName: disasterTypeName || "",
      }}
      submitFunction={addIncident}
    />
  );
};

export default AddIncident;
