import React, { useContext } from "react";
import { Context as ApiContext } from "../../context/ApiContext";
import IncidentForm from "./IncidentForm";

const EditIncident = ({ open, onClose, initialValues }) => {
  const { updateIncident } = useContext(ApiContext);

  const { incidentID, disasterTypeName, vmID, incidentDate } = initialValues;

  const handleEdit = async (values) => {
    await updateIncident(incidentID, values);
  };

  return (
    <IncidentForm
      type="Edit"
      open={open}
      onClose={onClose}
      disasterTypeName={disasterTypeName || ""}
      initialValues={{
        ...initialValues,
        locationID: vmID,
        incidentDate: new Date(incidentDate),
      }}
      submitFunction={handleEdit}
    />
  );
};

export default EditIncident;
