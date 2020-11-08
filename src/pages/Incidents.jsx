import React, { useEffect, useContext, useState } from "react";
import { Context as ApiContext } from "../context/ApiContext";
import { Container, MenuItem, Select } from "@material-ui/core";
import {
  INCIDENT_COLUMNS,
  EARTHQUAKE_COLUMNS,
  FIRE_COLUMNS,
  FLOOD_COLUMNS,
} from "../constants/COLUMNS";
import ViewTemplate from "../components/ViewTemplate";

const getColumns = (type) => {
  switch (type) {
    case "Earthquake":
      return EARTHQUAKE_COLUMNS;
    case "Fire":
      return FIRE_COLUMNS;
    case "Flood":
      return FLOOD_COLUMNS;
    default:
      return INCIDENT_COLUMNS;
  }
};

const Incidents = () => {
  const [type, setType] = useState("All");
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const {
    state: { allIncidents, disasterTypeNames },
    getAllIncidents,
    getDisasterTypeNames,
  } = useContext(ApiContext);

  useEffect(async () => {
    await getAllIncidents();
  }, []);

  useEffect(()=>{},[allIncidents]);

  useEffect(async () => {
    await getDisasterTypeNames();
  }, []);

  return (
    <Container>
      <Select value={type} onChange={handleChange}>
        <MenuItem value="All">All Disasters</MenuItem>
        {disasterTypeNames &&
          disasterTypeNames.map((item) => (
            <MenuItem value={item.disasterTypeName}>
              {item.disasterTypeName}
            </MenuItem>
          ))}
      </Select>
      <ViewTemplate
        incidents={
          type === "All"
            ? allIncidents
            : allIncidents.filter((elem) => elem.disasterTypeName === type)
        }
        columns={getColumns(type)}
        disasterTypeName={type === "All" ? null : type}
      />
    </Container>
  );
};

export default Incidents;
