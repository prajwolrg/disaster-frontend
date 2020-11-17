import React, { useState, useContext } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIncident from "../components/forms/AddIncident";
import EditIncident from "../components/forms/EditIncident";
import { makeStyles } from "@material-ui/core/styles";

import { Context as ApiContext } from "../context/ApiContext";
import { Context as AuthContext } from "../context/AuthContext";

import Incident from "./DisasterCard";
import ConfirmDialog from "./confirmDialog";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

let selected = [];

const ViewTemplate = ({ incidents, columns, disasterTypeName }) => {
  const classes = useStyles();
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selection, setSelection] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);

  const {
    state: { imagesForIncident },
    getImagesForIncident,
    deleteMultipleIncidents,
  } = useContext(ApiContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  const handleEditOpen = async () => {
    if (selected && selected.length === 1) {
      setSelection(selected[0]);
      await getImagesForIncident(selected[0].incidentID);
      setEditOpen(true);
    }
    else setSelection({})
  };
  const handleIncidentClose = () => {
    setIncidentOpen(false);
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
    if (selection && selection.length)
      await deleteMultipleIncidents(selection.map((elem) => elem.incidentID));
  };

  const handleIncidentOpen = async (data) => {
    setSelection(data.data);
    await getImagesForIncident(data.data.incidentID);
    setIncidentOpen(true);
  };

  return (
    <>
      {user && (
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
          {incidents && incidents.length > 0 && (
            <>
              <Button
                variant="contained"
                className={classes.button}
                startIcon={<EditIcon />}
                onClick={handleEditOpen}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={() => {
                  setSelection(selected);
                  if (selected && selected.length) setConfirmOpen(true);
                }}
              >
                Delete
              </Button>
              <ConfirmDialog
                title="Delete Incident?"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={handleDelete}
              >
                Are you sure you want to delete these incidents?
              </ConfirmDialog>
            </>
          )}
        </div>
      )}
      {incidents && (
        <>
          <div style={{ height: 650, width: "100%" }}>
            <DataGrid
              rows={incidents.map((incident) => ({
                ...incident,
                id: incident.incidentID,
                incidentDate: new Date(
                  String(incident.incidentDate)
                ).toLocaleDateString(),
              }))}
              columns={columns}
              onSelectionChange={(data) => {
                if (user) selected = data.rows;
              }}
              checkboxSelection={user ? true : false}
              onRowClick={(data) => handleIncidentOpen(data)}
            />
          </div>

          {imagesForIncident && (
            <Incident
              open={incidentOpen}
              onClose={handleIncidentClose}
              incident={selection}
              admin={user}
              editOpen={setEditOpen}
              images={imagesForIncident}
            />
          )}
          <AddIncident
            open={addOpen}
            onClose={handleAddClose}
            disasterTypeName={disasterTypeName}
            admin={false}
          />
          {editOpen && (
            <EditIncident
              open={editOpen}
              onClose={handleEditClose}
              initialValues={selection}
              imagesForIncident={imagesForIncident}
            ></EditIncident>
          )}
        </>
      )}
    </>
  );
};

export default ViewTemplate;
