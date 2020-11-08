import React, { useEffect, useContext } from "react";
import { Context as ApiContext } from "../context/ApiContext";
import { INCIDENT_COLUMNS } from "../constants/COLUMNS";
import ViewTemplate from "../components/ViewTemplate";

const Incidents = () => {
  const {
    state: { allIncidents },
    getAllIncidents,
  } = useContext(ApiContext);

  useEffect(() => {
    (async () => {
      await getAllIncidents();
      setInterval(async () => {
        await getAllIncidents();
      }, 3000);
    })();
  }, []);

  return (
    <>
      <ViewTemplate incidents={allIncidents} columns={INCIDENT_COLUMNS} />
    </>
  );
};

export default Incidents;
