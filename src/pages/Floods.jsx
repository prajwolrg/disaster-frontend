import React, { useEffect, useContext } from "react";
import { Context as ApiContext } from "../context/ApiContext";
import { FLOOD_COLUMNS } from "../constants/COLUMNS";
import ViewTemplate from "../components/ViewTemplate";

const Floods = () => {
  const {
    state: { floodIncidents },
    getFloodIncidents,
  } = useContext(ApiContext);

  useEffect(() => {
    (async () => {
      await getFloodIncidents();
      setInterval(async () => {
        await getFloodIncidents();
      }, 3000);
    })();
  }, []);

  return (
    <>
      <ViewTemplate incidents={floodIncidents} columns={FLOOD_COLUMNS} />
    </>
  );
};

export default Floods;

