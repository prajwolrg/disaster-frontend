import React, { useEffect, useContext } from "react";
import { Context as ApiContext } from "../context/ApiContext";
import { EARTHQUAKE_COLUMNS } from "../constants/COLUMNS";
import ViewTemplate from "../components/ViewTemplate";

const Earthquakes = () => {
  const {
    state: { earthquakeIncidents },
    getEarthquakeIncidents,
  } = useContext(ApiContext);

  useEffect(() => {
    (async () => {
      await getEarthquakeIncidents();
      setInterval(async () => {
        await getEarthquakeIncidents();
      }, 3000);
    })();
  }, []);

  return (
    <>
      <ViewTemplate
        incidents={earthquakeIncidents}
        columns={EARTHQUAKE_COLUMNS}
        disasterTypeName="Earthquake"
      />
    </>
  );
};

export default Earthquakes;
