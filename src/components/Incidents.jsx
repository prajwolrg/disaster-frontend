import React, { useEffect, useContext, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddDialog from "./addPage";
import EditDialog from "./editPage";
import { Context as ApiContext } from "../context/ApiContext";
import { INCIDENT_COLUMNS } from "../constants/KEYS";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Incidents = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState();
  const [active, setActive] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const {
    state: { allIncidents },
    getAllIncidents,
    deleteIncident,
  } = useContext(ApiContext);

  useEffect(() => {
    (async () => {
      await getAllIncidents()
      setInterval(async () => {
        await getAllIncidents();
      }, 3000);
    })();
  }, []);

  const handleRowSelected = (props) => {
    setSelected(props);
    setActive(props.isSelected);
  };
  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const handleAddOpen = () => {
    setAddOpen(true);
  };
  const handleAddClose = () => {
    setAddOpen(false);
  };
  const handleDelete = async () => {
    if (selected) await deleteIncident(selected.data.incidentID);
    setSelected(null);
  };
  return (
    <>
      {allIncidents && (
        <>
          <div style={{ height: 800, width: "90%" }}>
            <DataGrid
              rows={allIncidents.map((lol) => ({ ...lol, id: lol.incidentID }))}
              columns={INCIDENT_COLUMNS}
              onRowSelected={handleRowSelected}
              checkboxSelection
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<AddIcon />}
              onClick={handleAddOpen}
            >
              Add
            </Button>
            {allIncidents && allIncidents.length > 0 && (
              <>
                <Button
                  variant="contained"
                  className={classes.button}
                  startIcon={<EditIcon />}
                  disabled={!active}
                  onClick={handleEditOpen}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  disabled={!active}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
          <AddDialog open={addOpen} onClose={handleAddClose}></AddDialog>
          {active ? (
            <>
              {selected && (
                <EditDialog
                  open={editOpen}
                  onClose={handleEditClose}
                  setSelected={setSelected}
                  initialValues={selected}
                ></EditDialog>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default Incidents;
