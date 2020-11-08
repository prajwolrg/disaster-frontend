export const INCIDENT_COLUMNS = [
  {
    field: "incidentDate",
    headerName: "Incident Date",
    width: 150,
    type: "dateTime",
  },
  {
    field: "disasterTypeName",
    headerName: "Disaster Type Name",
    width: 150,
    type: "string",
  },
  {
    field: "districtName",
    headerName: "District Name",
    width: 150,
    type: "string",
  },
  {
    field: "provinceNumber",
    headerName: "Province Number",
    width: 150,
    type: "number",
  },
  {
    field: "name",
    headerName: "VDC or Municipality",
    width: 150,
    type: "string",
  },
  {
    field: "totalDeath",
    headerName: "Total Death",
    width: 150,
    type: "number",
  },
  {
    field: "missingPeople",
    headerName: "Missing People",
    width: 150,
    type: "number",
  },
  {
    field: "estimatedLoss",
    headerName: "Estimated Loss",
    width: 150,
    type: "number",
  },
  {
    field: "affectedFamily",
    headerName: "Affected Family",
    width: 150,
    type: "number",
  },
  {
    field: "injured",
    headerName: "Injured",
    width: 150,
    type: "number",
  },
  {
    field: "propertyLoss",
    headerName: "Property Loss",
    width: 150,
    type: "number",
  },
  {
    field: "damagedHouses",
    headerName: "Damaged Houses",
    width: 150,
    type: "number",
  },
  {
    field: "locationID",
    headerName: "Location ID",
    width: 150,
    type: "number",
  },
  {
    field: "sourceID",
    headerName: "Source ID",
    width: 150,
    type: "number",
  },
  {
    field: "website",
    headerName: "Website",
    width: 150,
    type: "number",
  },
];

export const FIRE_COLUMNS = [
  ...INCIDENT_COLUMNS,
  {
    field: "cause",
    headerName: "Cause",
    width: 150,
    type: "string",
  },
];
export const EARTHQUAKE_COLUMNS = [
  ...INCIDENT_COLUMNS,
  {
    field: "richterMagnitude",
    headerName: "Richter Magnitude",
    width: 150,
    type: "number",
  },
  {
    field: "epicenter",
    headerName: "Epicenter",
    width: 150,
    type: "string",
  },
];
export const FLOOD_COLUMNS = [
  ...INCIDENT_COLUMNS,
  {
    field: "cattleLoss",
    headerName: "Cattle Loss",
    width: 150,
    type: "number",
  },
  {
    field: "origin",
    headerName: "Origin",
    width: 150,
    type: "string",
  },
  {
    field: "height",
    headerName: "Height",
    width: 150,
    type: "string",
  },
];
