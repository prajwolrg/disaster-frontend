import React, { useContext } from "react";
import { Context as ApiContext } from "../../context/ApiContext";
import IncidentForm from "./IncidentForm";

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
const EditIncident = ({ open, onClose, initialValues, imagesForIncident }) => {
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
        incidentDate: formatDate(incidentDate),
      }}
      submitFunction={handleEdit}
      imagesForIncident={imagesForIncident}
    />
  );
};

export default EditIncident;
