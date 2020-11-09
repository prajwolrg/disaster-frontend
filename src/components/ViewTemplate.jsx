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
import { Container } from "@material-ui/core";
import ConfirmDialog from "./confirmDialog";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

let selected = [];

const ViewTemplate = ({ incidents, columns, disasterTypeName }) => {
  const classes = useStyles();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selection, setSelection] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { deleteMultipleIncidents } = useContext(ApiContext);

  const handleEditOpen = () => {
    if (selected && selected.length === 1) {
      setSelection(selected[0]);
      setEditOpen(true);
    }
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

  return (
    <Container>
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
                setConfirmOpen(true);
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
      {incidents && (
        <>
          <div style={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={incidents.map((incident) => ({
                ...incident,
                id: incident.incidentID,
              }))}
              columns={columns}
              onSelectionChange={(data) => {
                selected = data.rows;
              }}
              checkboxSelection
            />
          </div>

          <AddIncident
            open={addOpen}
            onClose={handleAddClose}
            disasterTypeName={disasterTypeName}
          />
          {editOpen && (
            <EditIncident
              open={editOpen}
              onClose={handleEditClose}
              initialValues={selection}
            ></EditIncident>
          )}
        </>
      )}
    </Container>
  );
};

export default ViewTemplate;
