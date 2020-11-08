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

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const ViewTemplate = ({ incidents, columns, disasterTypeName }) => {
  const classes = useStyles();
  const [selected, setSelected] = useState();
  const [active, setActive] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const { deleteIncident } = useContext(ApiContext);

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
      {incidents && (
        <>
          <div style={{ height: 800, width: "90%" }}>
            <DataGrid
              rows={incidents.map((incident) => ({
                ...incident,
                id: incident.incidentID,
              }))}
              columns={columns}
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
            {incidents && incidents.length > 0 && (
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
          <AddIncident
            open={addOpen}
            onClose={handleAddClose}
            disasterTypeName={disasterTypeName}
          />
          {active ? (
            <>
              {selected && (
                <EditIncident
                  open={editOpen}
                  onClose={handleEditClose}
                  setSelected={setSelected}
                  initialValues={selected}
                ></EditIncident>
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

export default ViewTemplate;
