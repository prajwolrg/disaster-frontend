import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context as ApiContext } from "../context/ApiContext";
import { Container, MenuItem, Select, Typography } from "@material-ui/core";
import {
  INCIDENT_COLUMNS,
  EARTHQUAKE_COLUMNS,
  FIRE_COLUMNS,
  FLOOD_COLUMNS,
} from "../constants/COLUMNS";
import ViewTemplate from "../components/ViewTemplate";
import { Context as AuthContext } from "../context/AuthContext";
import Button from "@material-ui/core/Button";

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
  const {
    state: { user },
    signout,
    clearError,
  } = useContext(AuthContext);
  const history = useHistory();
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleClick = () => {
    user ? signout() : history.push("/signin");
  };
  const handleCreate = () => {
    history.push("/create");
  };

  const {
    state: { allIncidents, disasterTypeNames },
    getAllIncidents,
    getDisasterTypeNames,
  } = useContext(ApiContext);

  useEffect(async () => {
    await getAllIncidents();
    clearError();
  }, []);

  useEffect(() => {}, [allIncidents]);

  useEffect(async () => {
    await getDisasterTypeNames();
  }, []);

  return (
    <Container>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Select
          value={type}
          onChange={handleChange}
          style={{ margin: 20, marginLeft: 30 }}
          variant="outlined"
        >
          <MenuItem value="All">
            <Typography variant="h6"> All Disasters</Typography>
          </MenuItem>
          {disasterTypeNames &&
            disasterTypeNames.map((item) => (
              <MenuItem value={item.disasterTypeName}>
                <Typography variant="body1">{item.disasterTypeName}</Typography>
              </MenuItem>
            ))}
        </Select>
        <div style={{ marginLeft: "auto" }}>
          {user && (
            <Button color="primary" onClick={handleCreate}>
              Create User
            </Button>
          )}
          <Button color="primary" onClick={handleClick}>
            {user ? "Sign Out" : "Sign In"}
          </Button>
        </div>
      </div>
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
