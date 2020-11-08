import React, { useEffect, useContext } from "react";
import { Context as ApiContext } from "../context/ApiContext";
import { FIRE_COLUMNS } from "../constants/COLUMNS";
import ViewTemplate from "../components/ViewTemplate";

const Fires = () => {
  const {
    state: { fireIncidents },
    getFireIncidents,
  } = useContext(ApiContext);

  useEffect(() => {
    (async () => {
      await getFireIncidents();
      setInterval(async () => {
        await getFireIncidents();
      }, 3000);
    })();
  }, []);

  return (
    <>
      <ViewTemplate
        incidents={fireIncidents}
        columns={FIRE_COLUMNS}
        disasterTypeName="Fire"
      />
    </>
  );
};

export default Fires;
