import React, { useEffect, useState } from "react";
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
// import data from "./dataSource.json";
import { Dialog, DialogTitle } from "@material-ui/core";
import AddDialog from "./addPage";
import EditDialog from "./editPage";

const data = [
    {
        districtName: "Rupandehi",
        sourceID: 1,
        disasterTypeName: "Flood",
        incidentID: 38,
        incidentDate: "2016-11-24T18:15:00.000Z",
        totalDeath: 21230,
        missingPeople: 12230,
        affectedFamily: 2332,
        estimatedLoss: 21120,
        injured: 1217,
        propertyLoss: 10,
        damagedHouses: 200,
        locationID: 5,
        description: "Flood is mainly in terai region!",
        name: "Kharibot",
        website: "drrportal.gov.np",
        vmID: 5,
        latitude: 44.53,
        longitude: 64.43,
        provinceNumber: 5,
    },
    {
        districtName: "Sindhupalchowk",
        sourceID: 3,
        disasterTypeName: "Earthquake",
        incidentID: 39,
        incidentDate: "2013-11-24T18:15:00.000Z",
        totalDeath: 2120,
        missingPeople: 1223,
        affectedFamily: 232,
        estimatedLoss: 2120,
        injured: 121,
        propertyLoss: 10,
        damagedHouses: 2001,
        locationID: 7,
        description: "This is shaking of earth",
        name: "Barbot",
        website: "prakop.com.np",
        vmID: 7,
        latitude: 34.53,
        longitude: 84.43,
        provinceNumber: 3,
    },
    {
        districtName: "Banke",
        sourceID: 2,
        disasterTypeName: "Fire",
        incidentID: 41,
        incidentDate: "2014-11-24T18:15:00.000Z",
        totalDeath: 210,
        missingPeople: 2230,
        affectedFamily: 332,
        estimatedLoss: 1120,
        injured: 121,
        propertyLoss: 100,
        damagedHouses: 2100,
        locationID: 6,
        description: "Fire may be industiral or wildfire",
        name: "Ghaziabad",
        website: "bipad.gov.np",
        vmID: 6,
        latitude: 41.53,
        longitude: 62.43,
        provinceNumber: 5,
    },
];

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const columns = [
    {
        field: "incidentDate",
        headerName: "Incident Date",
        width: 150,
        type: "date",
    },
    {
        field: "totalDeath",
        headerName: "Total Death",
        width: 150,
        type: "number",
    },
    {
        field: "missingPeople",
        headerName: "Missing People",
        width: 150,
        type: "number",
    },
    {
        field: "disasterTypeName",
        headerName: "Disaster Type Name",
        width: 150,
        type: "string",
    },
    {
        field: "estimatedLoss",
        headerName: "Estimated Loss",
        width: 150,
        type: "number",
    },
    {
        field: "injured",
        headerName: "Injured",
        width: 150,
        type: "number",
    },
    {
        field: "propertyLoss",
        headerName: "Property Loss",
        width: 150,
        type: "number",
    },
    {
        field: "damagedHouses",
        headerName: "Damaged Houses",
        width: 150,
        type: "number",
    },
    {
        field: "locationID",
        headerName: "Location ID",
        width: 150,
        type: "number",
    },
    {
        field: "sourceID",
        headerName: "Source ID",
        width: 150,
        type: "number",
    },
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
                    rows={data.map((lol) => {
                        lol["id"] = lol.incidentID;
                        return lol;
                    })}
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
            <AddDialog open={addOpen} onClose={handleAddClose}></AddDialog>
            {active ? (
                <>
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
