import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context as ApiContext } from "../context/ApiContext";
import {
    AppBar,
    Container,
    MenuItem,
    Select,
    Typography,
} from "@material-ui/core";
import {
    INCIDENT_COLUMNS,
    EARTHQUAKE_COLUMNS,
    FIRE_COLUMNS,
    FLOOD_COLUMNS,
} from "../constants/COLUMNS";
import ViewTemplate from "../components/ViewTemplate";
import { Context as AuthContext } from "../context/AuthContext";
import Button from "@material-ui/core/Button";
import AddSource from "../components/forms/AddSource";
import Search from "../components/Search";
import Export from "../components/Export";
import DisasterBar from "../components/DisasterBar";

const getColumns = (type) => {
    switch (type) {
        case "Earthquake":
            return EARTHQUAKE_COLUMNS;
        case "Fire":
            return FIRE_COLUMNS;
        case "Flood":
            return FLOOD_COLUMNS;
        default:
            return INCIDENT_COLUMNS;
    }
};

const Incidents = () => {
    const [type, setType] = useState("All");
    const [incidents, setIncidents] = useState();
    const [sourceOpen, setSourceOpen] = useState(false);
    const [searchFilter, setSearchFilter] = useState();
    const filterIncidents = (incidents) => {
        if (incidents && searchFilter)
            return incidents.filter((elem) => {
                let result = true;
                if (result && searchFilter.districtName)
                    result = elem.districtName === searchFilter.districtName;
                if (result && searchFilter.vmID)
                    result = elem.vmID === searchFilter.vmID;
                if (result && searchFilter.sourceID)
                    result = elem.sourceID === searchFilter.sourceID;
                if (result && searchFilter.dateFrom)
                    result =
                        elem.incidentDate.localeCompare(
                            searchFilter.dateFrom
                        ) !== -1;
                if (result && searchFilter.dateFrom)
                    result =
                        elem.incidentDate.localeCompare(searchFilter.dateTo) !==
                        1;
                return result;
            });
        else return incidents;
    };
    const {
        state: { user },
        signout,
        clearError,
    } = useContext(AuthContext);
    const history = useHistory();
    const handleChange = (event) => {
        setType(event.target.value);
    };

    const handleClick = () => {
        user ? signout() : history.push("/signin");
    };
    const handleCreate = () => {
        history.push("/create");
    };

    const {
        state: { allIncidents, disasterTypeNames },
        getAllIncidents,
        getDisasterTypeNames,
    } = useContext(ApiContext);

    useEffect(
        () =>
            (async () => {
                await getAllIncidents();
                clearError();
            })(),
        []
    );

    useEffect(() => {
        setIncidents(
            filterIncidents(
                type === "All"
                    ? allIncidents
                    : allIncidents.filter(
                          (elem) => elem.disasterTypeName === type
                      )
            )
        );
    }, [allIncidents, searchFilter, type]);

    useEffect(
        () =>
            (async () => {
                await getDisasterTypeNames();
            })(),
        []
    );

    return (
        <>
            <DisasterBar
                disasterTypeNames={disasterTypeNames}
                handleChange={handleChange}
                type={type}
                user={user}
                setSourceOpen={setSourceOpen}
                handleCreate={handleCreate}
                handleClick={handleClick}
            />
            <Container>
                <Search submitFunction={setSearchFilter} />
                <ViewTemplate
                    incidents={incidents}
                    columns={getColumns(type)}
                    disasterTypeName={type === "All" ? null : type}
                />
                <Export incidents={incidents} columns={getColumns(type)} />
                <AddSource
                    open={sourceOpen}
                    onClose={() => {
                        setSourceOpen(false);
                    }}
                />
            </Container>
        </>
    );
};

export default Incidents;
