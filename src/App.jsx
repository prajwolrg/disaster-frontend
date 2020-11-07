import React, { useState } from "react";
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import data from "./dataSource.json";
import { Dialog, DialogTitle } from "@material-ui/core";

import AddDialog from "./addPage";
import EditDialog from "./editPage";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const columns = [
    { field: "CustomerID", headerName: "Column 1", width: 150 },
    { field: "Freight", headerName: "Column 2", width: 150 },
];

export default function App() {
    const classes = useStyles();
    const [selected, setSelected] = useState();
    const [active, setActive] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

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
    return (
        <>
            <div style={{ height: 800, width: "90%" }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    onRowSelected={handleRowSelected}
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
                >
                    Delete
                </Button>
            </div>
            {active ? (
                <>
                    <AddDialog
                        open={addOpen}
                        onClose={handleAddClose}
                    ></AddDialog>
                    <EditDialog
                        open={editOpen}
                        onClose={handleEditClose}
                        initialValues={selected}
                    ></EditDialog>
                </>
            ) : (
                <></>
            )}
        </>
    );
}
